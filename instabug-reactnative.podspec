Pod::Spec.new do |s|
  s.name         = "instabug-reactnative"
  s.version      = "1.0.7"
  s.summary      = "React Native wrapper for Instabug"
  s.author       = { 'Daniel Rosa' => 'djhrosa@gmail.com' }
  s.license      = 'MIT'
  s.homepage     = 'n/a'
  s.source       = { :git => "https://github.com/Instabug/instabug-reactnative.git" }
  s.source_files = 'ios/RNInstabug/*'
  s.platform     = :ios, "8.0"
  s.dependency 'Instabug'
  s.dependency 'React'
end
