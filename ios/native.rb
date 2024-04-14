$instabug = { :version => '12.9.2' }

def use_instabug! (spec = nil)
  version = $instabug[:version]

  if (!spec)
    pod 'Instabug', version
  else
    spec.dependency 'Instabug'
  end

  $instabug
end
