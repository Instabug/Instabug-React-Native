#!/usr/bin/env ruby
begin
	require 'xcodeproj'
rescue LoadError
	puts('xcodeproj doesn\'t exist')
	Kernel.exit(0)
end

# Replace these with your values
current_path = Dir.pwd
project_path = Dir.glob("#{current_path}/ios/*.xcodeproj").first
file_name = File.basename(project_path, ".xcodeproj")
project_location = "./ios/#{file_name}.xcodeproj"

INSTABUG_UPLOAD_NAME = "Upload Sourcemap"

# Get useful variables
project = Xcodeproj::Project.open(project_location)
targets = project.targets.select { |target| (target.is_a? Xcodeproj::Project::Object::PBXNativeTarget) &&
	 																				  (target.product_type == "com.apple.product-type.application") &&
																					  (target.platform_name == :ios) }

targets.each do |target|
	#Delete New Run Script Phase from Build Phases
	shell_script_build_phase = target.shell_script_build_phases.find { |build_phase| build_phase.to_s == INSTABUG_UPLOAD_NAME }
	target.build_phases.delete(shell_script_build_phase)
end

# Save Xcode project
project.save
