require 'json'
package = JSON.parse(File.read('package.json'))

Pod::Spec.new do |s|
  s.name             = 'RNInstabug'
  s.version          = package["version"]
  s.summary          = package["description"]
  s.author           = package["author"]
  s.license          = package["license"]
  s.homepage         = package["homepage"]
  s.source           = { :git => "https://github.com/Instabug/Instabug-React-Native.git", :tag => 'v' + package["version"] }
  s.source_files     = 'ios/RNInstabug/*'
  s.platform         = :ios, "9.0"
  s.static_framework = true

  s.dependency 'React'
  s.dependency 'Instabug', '10.9.2'
end
