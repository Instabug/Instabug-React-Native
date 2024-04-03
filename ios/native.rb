$instabug = { :version => '12.9.0' }

def use_instabug! (spec = nil)
  version = $instabug[:version]

  if (!spec)
    pod 'Instabug', version
  else
    spec.dependency 'Instabug', version
  end

  $instabug
end
