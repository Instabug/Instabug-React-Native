#!/usr/bin/env ruby
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
target_name = file_name
framework_root = '../node_modules/instabug-reactnative/ios'
framework_name = 'Instabug.framework'

INSTABUG_PHASE_NAME = "Strip Frameworks"

INSTABUG_PHASE_SCRIPT = <<-SCRIPTEND
bash "${BUILT_PRODUCTS_DIR}/${FRAMEWORKS_FOLDER_PATH}/Instabug.framework/Instabug.bundle/strip-frameworks.sh"
  SCRIPTEND

# Get useful variables
project = Xcodeproj::Project.open(project_location)
frameworks_group = project.groups.find { |group| group.display_name == 'Frameworks' }
frameworks_group ||= project.new_group('Frameworks')
target = project.targets.find { |target| target.to_s == target_name }
frameworks_build_phase = target.build_phases.find { |build_phase| build_phase.to_s == 'FrameworksBuildPhase' }

# Add new "Embed Frameworks" build phase to target
embed_frameworks_build_phase = target.build_phases.find { |build_phase| build_phase.to_s == 'Embed Instabug Framework'}
Kernel.exit(0) if embed_frameworks_build_phase
embed_frameworks_build_phase = project.new(Xcodeproj::Project::Object::PBXCopyFilesBuildPhase)
embed_frameworks_build_phase.name = 'Embed Instabug Framework'
embed_frameworks_build_phase.symbol_dst_subfolder_spec = :frameworks
target.build_phases << embed_frameworks_build_phase

# Add framework search path to target
target.build_configurations.each do |config|
  framework_search_paths = target.build_settings(config.name)['FRAMEWORK_SEARCH_PATHS']

  framework_search_paths ||= ['$(inherited)']
  framework_search_paths = [framework_search_paths] unless framework_search_paths.is_a?(Array)
  framework_search_paths << framework_root unless framework_search_paths.include? framework_root

  target.build_settings(config.name)['FRAMEWORK_SEARCH_PATHS'] = framework_search_paths
end

# Add framework to target as "Embedded Frameworks"
framework_ref = frameworks_group.new_file("#{framework_root}/#{framework_name}")
build_file = embed_frameworks_build_phase.add_file_reference(framework_ref)
frameworks_build_phase.add_file_reference(framework_ref)
build_file.settings = { 'ATTRIBUTES' => ['CodeSignOnCopy', 'RemoveHeadersOnCopy'] }


#Add New Run Script Phase to Build Phases
phase = target.new_shell_script_build_phase(INSTABUG_PHASE_NAME)
phase.shell_script = INSTABUG_PHASE_SCRIPT

# Save Xcode project
project.save
