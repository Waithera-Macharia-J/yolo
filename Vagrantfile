Vagrant.configure("2") do |config|
  # Base box
  config.vm.box = "ubuntu/focal64"
  config.vm.hostname = "yolo-stage2"

  # Forward ports to avoid conflicts with Stage 1
  config.vm.network "forwarded_port", guest: 3000, host: 3001   # frontend
  config.vm.network "forwarded_port", guest: 5000, host: 5001   # backend
  config.vm.network "forwarded_port", guest: 27017, host: 27018 # MongoDB

  # VirtualBox provider settings
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
    vb.cpus = 2
  end

  # Provision VM with Ansible
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "ansible/playbook.yml"
    # Use YAML inventory file for clarity
    ansible.inventory_path = "inventory.yml"
    ansible.verbose = "v"   # optional, helps debug
  end
end
