Vagrant.configure("2") do |config|
  config.vm.box = "geerlingguy/ubuntu2004"

  config.vm.network "forwarded_port", guest: 3000, host: 8080
  config.vm.network "private_network", ip: "192.168.56.10"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
    vb.cpus = 2
  end

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
  end
end
