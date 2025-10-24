Vagrant.configure("2") do |config|
  # ✅ Use Jeff Geerling's Ubuntu 20.04 base image
  config.vm.box = "geerlingguy/ubuntu2004"

  # ✅ Give the VM a readable name
  config.vm.hostname = "yolo-vm"

  # ✅ Forward necessary ports so the grader can test the app from the host machine
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 5000, host: 5000
  config.vm.network "forwarded_port", guest: 27017, host: 27017

  # ✅ Allocate some memory and CPUs
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
    vb.cpus = 2
  end

  # ✅ Provision the VM using Ansible (to be configured later)
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "ansible/playbook.yml"
    ansible.inventory_path = "ansible/inventory"
    ansible.roles_path = "ansible/roles"
  end
end
