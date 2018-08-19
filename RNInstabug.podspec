require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = 'RNInstabug'
  s.version      = package["version"]
  s.summary      = package["description"]
  s.author       = package["author"]

  s.homepage     = package["homepage"]

  s.license      = package["license"]
  s.platform     = :ios, "8.0"

  s.source       = { :git => "https://github.com/Instabug/Instabug-React-Native.git", :tag => "#{s.version}" }
  s.source_files = "ios/RNInstabug/*.{h,m}"
  s.static_framework = true

  s.dependency 'React'
  s.dependency 'Instabug'

end
