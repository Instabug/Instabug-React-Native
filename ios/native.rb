$instabug = { :version => '15.1.1' }

def use_instabug! (spec = nil)
  version = $instabug[:version]
  if (!spec)
    pod 'Instabug', version
  else
    spec.dependency 'Instabug', version
  end

  $instabug
end
