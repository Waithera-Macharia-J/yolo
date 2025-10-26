Vagrant.configure("2") do |config|
  config.vm.box = "geerlingguy/ubuntu2004"
  config.vm.hostname = "yolo-vm"
  config.vm.network "private_network", ip: "192.168.56.10"

  # ✅ Ensures your host project folder is accessible inside the VM
  config.vm.synced_folder ".", "/vagrant"

  # Optional: Automatically run Ansible playbook on provision
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "ansible/playbook.yml"
  end
end
