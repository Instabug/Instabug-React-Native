#!/usr/bin/env ruby
begin
	require 'xcodeproj'
rescue LoadError
	puts('xcodeproj doesn\'t exist')
	Kernel.exit(0)
end
require 'fileutils'

# Replace these with your values
current_path = Dir.pwd
project_path = Dir.glob("#{current_path}/ios/*.xcodeproj").first
file_name = File.basename(project_path, ".xcodeproj")
project_location = './ios/'+file_name+'.xcodeproj'
target_name = file_name
framework_root = '../node_modules/instabug-reactnative/ios'
framework_name = 'Instabug.framework'

# Get useful variables
project = Xcodeproj::Project.open(project_location)
frameworks_group = project.groups.find { |group| group.display_name == 'Frameworks' }
if frameworks_group == nil 
    frameworks_group = project.new_group('Frameworks')
end
target = project.targets.find { |target| target.to_s == target_name }
frameworks_build_phase = target.build_phases.find { |build_phase| build_phase.to_s == 'FrameworksBuildPhase' }

# Add new "Embed Frameworks" build phase to target
embed_frameworks_build_phase = project.new(Xcodeproj::Project::Object::PBXCopyFilesBuildPhase)
embed_frameworks_build_phase.name = 'Embed Frameworks'
embed_frameworks_build_phase.symbol_dst_subfolder_spec = :frameworks
target.build_phases << embed_frameworks_build_phase

# Add framework search path to target
['Debug', 'Release'].each do |config|
  paths = ['$(inherited)', framework_root]
  target.build_settings(config)['FRAMEWORK_SEARCH_PATHS'] = paths
end

# Add framework to target as "Embedded Frameworks"
framework_ref = frameworks_group.new_file("#{framework_root}/#{framework_name}")
build_file = embed_frameworks_build_phase.add_file_reference(framework_ref)
frameworks_build_phase.add_file_reference(framework_ref)
build_file.settings = { 'ATTRIBUTES' => ['CodeSignOnCopy', 'RemoveHeadersOnCopy'] }

# Save Xcode project
project.save