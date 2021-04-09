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
default_target_name = file_name
framework_root = '../node_modules/instabug-reactnative/ios'
framework_name = 'Instabug.xcframework'

INSTABUG_UPLOAD_NAME = "Upload Sourcemap"

INSTABUG_UPLOAD_SCRIPT = <<-SCRIPTEND
bash "../node_modules/instabug-reactnative/ios/upload_sourcemap.sh"
SCRIPTEND

# Get useful variables
project = Xcodeproj::Project.open(project_location)
frameworks_group = project.groups.find { |group| group.display_name == 'Frameworks' }
frameworks_group ||= project.new_group('Frameworks')
default_target = project.targets.find { |target| target.to_s == default_target_name } || project.targets.first
targets = project.targets.select { |target| (target.is_a? Xcodeproj::Project::Object::PBXNativeTarget) &&
	 																				  (target.product_type == "com.apple.product-type.application") &&
																					  (target.platform_name == :ios) }
framework_ref = frameworks_group.new_file("#{framework_root}/#{framework_name}")

targets.each do |target|
	#Add New Run Script Phase to Build Phases
	upload_build_phase = target.new_shell_script_build_phase(INSTABUG_UPLOAD_NAME)
	upload_build_phase.shell_script = INSTABUG_UPLOAD_SCRIPT
	upload_build_phase.run_only_for_deployment_postprocessing = '1'
end

# Save Xcode project
project.save
