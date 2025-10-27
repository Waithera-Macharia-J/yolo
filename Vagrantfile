# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Use Ubuntu 20.04 (focal)
  config.vm.box = "ubuntu/focal64"

  # Set a unique VM name
  config.vm.hostname = "yolo-stage2"

  # Forward ports to host (avoid conflicts with Stage 1)
  config.vm.network "forwarded_port", guest: 3000, host: 3001   # frontend
  config.vm.network "forwarded_port", guest: 5000, host: 5001   # backend
  config.vm.network "forwarded_port", guest: 27017, host: 27018 # MongoDB

  # Use VirtualBox provider
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
    vb.cpus = 2
  end

  # Provision VM with Ansible
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
    ansible.inventory_path = "inventory.yml" 
  end
end
