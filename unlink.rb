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
target_name = file_name
framework_root = '../node_modules/instabug-reactnative/ios'
framework_name = 'Instabug.framework'

INSTABUG_PHASE_NAME = "Strip Frameworks"

# Get useful variables
project = Xcodeproj::Project.open(project_location)
frameworks_group = project.groups.find { |group| group.display_name == 'Frameworks' }
target = project.targets.find { |target| target.to_s == target_name }
frameworks_build_phase = target.build_phases.find { |build_phase| build_phase.to_s == 'FrameworksBuildPhase' }

# Remove "Embed Frameworks" build phase to target
embed_frameworks_build_phase = target.build_phases.find { |build_phase| build_phase.to_s == 'Embed Instabug Framework'}
Kernel.exit(0) unless embed_frameworks_build_phase
target.build_phases.delete(embed_frameworks_build_phase)

# Remove framework search path from target
['Debug', 'Release'].each do |config|
	target.build_settings(config)['FRAMEWORK_SEARCH_PATHS'].delete(framework_root)
end

# Remove framework from target from "Embedded Frameworks"
framework_ref = frameworks_group.files.find { |file_reference| file_reference.path == "#{framework_root}/#{framework_name}"}
frameworks_build_phase.remove_file_reference(framework_ref)
framework_ref.remove_from_project

#Delete New Run Script Phase from Build Phases
shell_script_build_phase = target.shell_script_build_phases.find { |build_phase| build_phase.to_s == INSTABUG_PHASE_NAME }
target.build_phases.delete(shell_script_build_phase)

# Save Xcode project
project.save