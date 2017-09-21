# Copyright 2014 Instabug, Inc. All rights reserved.
#
# Usage:
#   * In the project editor, select your target.
#   * Click "Build Phases" at the top of the project editor.
#   * Click "+" button in the top left corner.
#   * Choose "New Run Script Build Phase."
#   * Uncomment and paste the following script.
#
# --- INVOCATION SCRIPT BEGIN ---
# # SKIP_SIMULATOR_BUILDS=1
# SCRIPT_SRC=$(find "$PROJECT_DIR" -name 'Instabug_dsym_upload.sh' | head -1)
# if [ ! "${SCRIPT_SRC}" ]; then
#   echo "Instabug: err: script not found. Make sure that you're including Instabug.bundle in your project directory"
#   exit 1
# fi
# source "${SCRIPT_SRC}"
# --- INVOCATION SCRIPT END ---

echo "Instabug: Started uploading dSYM"

# Check for simulator builds
if [ "$EFFECTIVE_PLATFORM_NAME" == "-iphonesimulator" ]; then
  if [ "${SKIP_SIMULATOR_BUILDS}" ] && [ "${SKIP_SIMULATOR_BUILDS}" -eq 1 ]; then
    echo "Instabug: Skipping simulator build"
    exit 0
  fi
fi

# Check to make sure the app token exists
if [ ! "${APP_TOKEN}" ]; then
  APP_TOKEN=$(grep -r 'Instabug startWithToken:@\"[0-9a-zA-Z]*\"' ./ -m 1 | grep -o '\"[0-9a-zA-Z]*\"' | cut -d "\"" -f 2)
fi

if [ ! "${APP_TOKEN}" ]; then
  APP_TOKEN=$(grep -r 'Instabug.startWithToken(\"[0-9a-zA-Z]*\"' ./ -m 1 | grep -o '\"[0-9a-zA-Z]*\"' | cut -d "\"" -f 2)
fi

if [ ! "${APP_TOKEN}" ] || [ -z "${APP_TOKEN}" ];then
  echo "Instabug: err: APP_TOKEN not found. Make sure you've added the SDK initialization line [Instabug startWithToken: invocationEvent:]"
  exit 1
fi
echo "Instabug: found APP_TOKEN=${APP_TOKEN}"

# Check internet connection
if [ "`curl -s https://api.instabug.com | grep status | grep -c OK`" != "1" ]; then
  echo "ERROR connecting to api.instabug.com."
  exit 0
fi

# Create temp directory if not exists
CURRENT_USER=$(whoami| tr -dc '[:alnum:]\n\r' | tr '[:upper:]' '[:lower:]')
TEMP_ROOT="/tmp/Instabug-${CURRENT_USER}"
if [ ! -d "${TEMP_ROOT}" ]; then
mkdir "${TEMP_ROOT}"
fi
TEMP_DIRECTORY="${TEMP_ROOT}/$EXECUTABLE_NAME"
if [ ! -d "${TEMP_DIRECTORY}" ]; then
mkdir "${TEMP_DIRECTORY}"
fi

# Check dSYM file
if [ ! "${DSYM_PATH}" ]; then
  if [ ! "${DWARF_DSYM_FOLDER_PATH}" ] || [ ! "${DWARF_DSYM_FILE_NAME}" ]; then
    echo "Instabug: err: DWARF_DSYM_FOLDER_PATH or DWARF_DSYM_FILE_NAME not defined"
    exit 0
  fi
  DSYM_PATH=${DWARF_DSYM_FOLDER_PATH}/${DWARF_DSYM_FILE_NAME}
fi
echo "Instabug: found DSYM_PATH=${DSYM_PATH}"

# Check if UUIDs exists
DSYMS_DIR="${TEMP_DIRECTORY}/dSYM"

if [ -d "${DSYMS_DIR}" ]; then
    rm -rf "${DSYMS_DIR}"
fi

mkdir "$DSYMS_DIR"
DSYM_UUIDs=""
SEPARATOR=$'\n'
DSYM_UUIDs_PATH="${TEMP_DIRECTORY}/UUIDs.dat"


find "${DWARF_DSYM_FOLDER_PATH}" -name "*.dSYM" | (while read -r file
do
    UUIDs=$(dwarfdump --uuid "${file}" | cut -d ' ' -f2)
    if [ -f "${DSYM_UUIDs_PATH}" ]; then
        for uuid in $UUIDs
            do
                UUIDTOKEN="${uuid}"-"${APP_TOKEN}"
                if ! grep -w "${UUIDTOKEN}" "${DSYM_UUIDs_PATH}" ; then
                    cp -r "${file}" "${DSYMS_DIR}"
                    DSYM_UUIDs+=$uuid$SEPARATOR
                fi
        done
    else
        cp -r "${file}" "${DSYMS_DIR}"
        DSYM_UUIDs+=${UUIDs}$SEPARATOR
    fi
done

if [ -z $DSYM_UUIDs ]; then
    rm -rf "${DSYMS_DIR}"
    exit 0
fi


DSYM_UUIDs_TOKEN="${DSYM_UUIDs//${SEPARATOR}/-${APP_TOKEN}$'\n'}"

# Create dSYM .zip file
DSYM_PATH_ZIP="${TEMP_DIRECTORY}/$DWARF_DSYM_FILE_NAME.zip"
if [ ! -d "$DSYM_PATH" ]; then
  echo "Instabug: err: dSYM not found: ${DSYM_PATH}"
  exit 0
fi
echo "Instabug: Compressing dSYM file..."
(/usr/bin/zip --recurse-paths --quiet "${DSYM_PATH_ZIP}" "${DSYMS_DIR}") || exit 0

# Upload dSYM
echo "Instabug: Uploading dSYM file..."
ENDPOINT="https://api.instabug.com/api/sdk/v3/symbols_files"
STATUS=$(curl "${ENDPOINT}" --write-out %{http_code} --silent --output /dev/null -F symbols_file=@"${DSYM_PATH_ZIP}" -F application_token="${APP_TOKEN}")
if [ $STATUS -ne 200 ]; then
  echo "Instabug: err: dSYM archive not succesfully uploaded."
  echo "Instabug: deleting temporary dSYM archive..."
  rm -f "${DSYM_PATH_ZIP}"
  exit 0
fi

# Remove temp dSYM archive and dSYM DIR
echo "Instabug: deleting temporary dSYM archive..."
rm -f "${DSYM_PATH_ZIP}"
rm -rf "${DSYMS_DIR}"

# Save UUIDs
echo "${DSYM_UUIDs_TOKEN}" >> "${DSYM_UUIDs_PATH}"

# Finalize
echo "Instabug: dSYM upload complete."
if [ "$?" -ne 0 ]; then
  echo "Instabug: err: an error was encountered uploading dSYM"
  exit 0
fi
)
