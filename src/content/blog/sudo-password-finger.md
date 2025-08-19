---
title: "Sudo password with fingerprint "
description: "Setup finger print"
pubDate: 2025-08-08
category: "MacOS"
image: "/assets/images/Blog/5_Sudo-password-With-Finger.webp"
author:
  name: "Fachmi"
  title: "SysAdmin"
  image: "/assets/images/Logo/font-logo.png"
---
# Sudo-password-With-Finger
### Switch to the root user.

Switch to the root user by typing the command `sudo su -` and enter the password:  
 

```bash
sudo su -
```

<figure class="image image_resized" style="width:25%;"><img style="aspect-ratio:800/557;" src="/assets/images/Blog/Sudo-password-With-Finger_.png" width="800" height="557"></figure>

### Edit `/etc/pam.d/sudo`:

Open the `/etc/pam.d/sudo` file with you favorite editor such as `vim` or `nano`:  
 

```bash
nano /etc/pam.d/sudo

```

<figure class="image image_resized" style="width:25%;"><img style="aspect-ratio:800/557;" src="/assets/images/Blog/3_Sudo-password-With-Finger.webp" alt="Open /etc/pam.d/sudo" width="800" height="557"></figure>

The contents of this file should look like one of the following example:  
 

<figure class="image image_resized" style="width:25%;"><img style="aspect-ratio:800/557;" src="/assets/images/Blog/Sudo-password-With-Finger.webp" alt="/etc/pam.d/sudo file contents" width="800" height="557"></figure>

Add the following line to the top of the file:  
 

```bash
auth       sufficient     pam_tid.so

```

The modified contents of `/etc/pam.d/sudo` file should look like following example:  
 

<figure class="image image_resized" style="width:25%;"><img style="aspect-ratio:800/539;" src="/assets/images/Blog/1_Sudo-password-With-Finger.webp" alt="Modified /etc/pam.d/sudo file contents" width="800" height="539"></figure>

### Save the file:

*   for nano, press the specified combination (with sign “+”) of keys simultaneously:

```bash
CTRL+o 
CTRL+x

```

*   for vim:

```bash
<ESC>
:wq

```

### Allow the system to save the changes.

Press OK button:  
 

<figure class="image image_resized" style="width:25%;"><img style="aspect-ratio:744/744;" src="/assets/images/Blog/Sudo-password-With-Finger.webp" alt="Allow to modify system settings" width="744" height="744"></figure>

> Also note that pam\_smartcard.so may not be present on older MacOS versions. Tested with macOS Ventura (13.1).

### Exit from the shell.

Exit from the `root` shell by typing command: `exit`.

Try to use `sudo`, and you should be prompted to authenticate with **Touch ID** as shown below.  
 

```bash
sudo echo "Check Touch ID"

```

<figure class="image image_resized" style="width:25%;"><img style="aspect-ratio:800/517;" src="/assets/images/Blog/5_Sudo-password-With-Finger.webp" alt="Running Touch ID with sudo comand" width="800" height="517"></figure>

If you click ‘Cancel,’ you can just enter your password at the terminal prompt. If you click ‘Use Password’ you can enter your password in the dialog box.

If you connect to your macOS via SSH, it will revert to using your password, since you cannot send **Touch ID** fingerprints over SSH.

```sh
# sudo: auth account password session
auth       sufficient     pam_tid.so
auth       sufficient     pam_smartcard.so
auth       required       pam_opendirectory.so
account    required       pam_permit.so
password   required       pam_deny.so
session    required       pam_permit.so
```