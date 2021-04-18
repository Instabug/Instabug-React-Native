#!/usr/bin/env ruby
# require 'fileutils'

# FileUtils.rm_rf('node_modules/instabug-reactnative/ios/Instabug.framework')

begin
	require 'xcodeproj'
rescue LoadError
	puts('xcodeproj gem doesn\'t exist. Please run \'gem install xcodeproj\' to install it, and re-run \'react-native link instabug-reactnative\' again')
	Kernel.exit(0)
end

# Replace these with your values
current_path = Dir.pwd
project_path = Dir.glob("#{current_path}/ios/*.xcodeproj").first
file_name = File.basename(project_path, ".xcodeproj")
project_location = "./ios/#{file_name}.xcodeproj"

INSTABUG_PHASE_NAME = "Strip Frameworks"

INSTABUG_PHASE_SCRIPT = <<-SCRIPTEND
bash "${BUILT_PRODUCTS_DIR}/${FRAMEWORKS_FOLDER_PATH}/Instabug.framework/strip-frameworks.sh"
  SCRIPTEND

INSTABUG_UPLOAD_NAME = "Upload Sourcemap"

INSTABUG_UPLOAD_SCRIPT = <<-SCRIPTEND
bash "../node_modules/instabug-reactnative/ios/upload_sourcemap.sh"
SCRIPTEND

# Get useful variables
project = Xcodeproj::Project.open(project_location)
targets = project.targets.select { |target| (target.is_a? Xcodeproj::Project::Object::PBXNativeTarget) &&
	 																				  (target.product_type == "com.apple.product-type.application") &&
																					  (target.platform_name == :ios) }

targets.each do |target|
	#Add New Run Script Phase to Build Phases
	upload_build_phase = target.new_shell_script_build_phase(INSTABUG_UPLOAD_NAME)
	upload_build_phase.shell_script = INSTABUG_UPLOAD_SCRIPT
	upload_build_phase.run_only_for_deployment_postprocessing = '1'
end

# Save Xcode project
project.save
