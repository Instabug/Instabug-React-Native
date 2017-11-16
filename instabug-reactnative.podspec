require 'json'
version = JSON.parse(File.read('package.json'))["version"]

Pod::Spec.new do |s|
  s.name         = "instabug-reactnative"
  s.version      = version
  s.summary      = "React Native wrapper for Instabug"
  s.author       = 'Hossam Hassan && Yousef Hamza'
  s.license      = 'MIT'
  s.homepage     = 'https://github.com/Instabug/instabug-reactnative#readme'
  s.source       = { :git => "https://github.com/Instabug/instabug-reactnative.git" }
  s.source_files = 'ios/RNInstabug/*'
  s.platform     = :ios, "8.0"
  s.ios.vendored_frameworks = 'ios/Instabug.framework'
  s.dependency 'React'
end
