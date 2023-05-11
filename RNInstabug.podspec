require 'json'
require_relative './ios/native'

package = JSON.parse(File.read('package.json'))

Pod::Spec.new do |s|
  s.name         = 'RNInstabug'
  s.version      = package["version"]
  s.summary      = package["description"]
  s.author       = package["author"]
  s.license      = package["license"]
  s.homepage     = package["homepage"]
  s.source       = { :git => "https://github.com/Instabug/Instabug-React-Native.git", :tag => 'v' + package["version"] }

  s.platform     = :ios, "9.0"
  s.source_files = "ios/**/*.{h,m,mm}"

  s.dependency 'React-Core'
  # use_instabug!(s)
end
