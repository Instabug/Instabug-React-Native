require 'json'
package = JSON.parse(File.read('package.json'))

#!/usr/bin/env ruby
begin
	require 'xcodeproj'
rescue LoadError
	puts("xcodeproj gem doesn't exist. Please run \"gem install xcodeproj\" to install it, and re-run \"react-native link #{package["name"]}\" again")
	Kernel.exit(0)
end

# Replace these with your values
current_path = Dir.pwd
project_path = Dir.glob("#{current_path}/ios/*.xcodeproj").first
file_name = File.basename(project_path, ".xcodeproj")
project_location = "./ios/#{file_name}.xcodeproj"
default_target_name = file_name
framework_root = "../node_modules/#{package["name"]}/ios"
framework_name = 'Instabug.xcframework'

INSTABUG_UPLOAD_NAME = "Upload Sourcemap"

INSTABUG_UPLOAD_SCRIPT = <<-SCRIPTEND
bash "../node_modules/#{package["name"]}/ios/upload_sourcemap.sh"
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

# Add Instabug to every target that is of type application
targets.each do |target|
	# Add new "Embed Frameworks" build phase to target
	embed_frameworks_build_phase = target.build_phases.find { |build_phase| build_phase.to_s == 'Embed Instabug Framework'}
	Kernel.exit(0) if embed_frameworks_build_phase
	embed_frameworks_build_phase = project.new(Xcodeproj::Project::Object::PBXCopyFilesBuildPhase)
	embed_frameworks_build_phase.name = 'Embed Instabug Framework'
	embed_frameworks_build_phase.symbol_dst_subfolder_spec = :frameworks
	target.build_phases << embed_frameworks_build_phase

	# Add static library to non default targets' build phase
	if target.name != default_target_name
		static_library_file_reference = default_target.frameworks_build_phase.files_references.find { |file_reference| file_reference.path == 'libRNInstabug.a' }
		target.frameworks_build_phase.add_file_reference(static_library_file_reference)
	end

	# Add framework search path to target
	target.build_configurations.each do |config|
	  framework_search_paths = target.build_settings(config.name)['FRAMEWORK_SEARCH_PATHS']

	  framework_search_paths ||= ['$(inherited)']
	  framework_search_paths = [framework_search_paths] unless framework_search_paths.is_a?(Array)
	  framework_search_paths << framework_root unless framework_search_paths.include? framework_root

	  target.build_settings(config.name)['FRAMEWORK_SEARCH_PATHS'] = framework_search_paths
	end

	# Add framework to target as "Embedded Frameworks"

	build_file = embed_frameworks_build_phase.add_file_reference(framework_ref)
	target.frameworks_build_phase.add_file_reference(framework_ref)
	build_file.settings = { 'ATTRIBUTES' => ['CodeSignOnCopy', 'RemoveHeadersOnCopy'] }

	#Add New Run Script Phase to Build Phases
	upload_build_phase = target.new_shell_script_build_phase(INSTABUG_UPLOAD_NAME)
	upload_build_phase.shell_script = INSTABUG_UPLOAD_SCRIPT
	upload_build_phase.run_only_for_deployment_postprocessing = '1'
end

# Save Xcode project
project.save
