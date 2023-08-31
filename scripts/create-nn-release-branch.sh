# Reading the package.json file as a string
file_contents=$(cat package.json)

# Finding the "version" field
version_line=$(echo "$file_contents" | grep -o '"version": *"[^"]*"')
version=$(echo "$version_line" | grep -o '"[^"]*"$' | sed 's/"//g')

# Create release branch
branch_name="enterprise/nn-$version"
git checkout -b "$branch_name"

# Staging the changes
git add .

# Committing the changes
git commit -m "NN Release v$version"

# Add the private instabug react native library
git remote add private https://github.com/Instabug/react-native.git

# Push the changes to it
git push private "$branch_name"

echo "✅ Release branch $branch_name created successfully"