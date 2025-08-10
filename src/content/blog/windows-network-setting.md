---
title: "Windows Server Bridge External Network"
description: "Create Bridge Network Hyper-V"
pubDate: 2025-08-08
category: "Virtual"
image: "/assets/images/Logo/hyper-v.png"
author:
  name: "Fachmi"
  title: "Admin"
  image: "/assets/images/Logo/hyper-v.png"
---
# Network Setting
## **Bridge External Network dan management OS**

1.  Add Virtual Switch
2.  Pilih External Network (Ceklist “Allow Management Operating System” kalau mau dijadikan sebagai network windows server juga)

![Tampilan Dashboard Hyper-V-2](/assets/images/Blog/2_Network_Setting_image.png)

## **VirtualSwitch NIC Team Hyper-v**

**Membuat VMswitch NIC Team Hanya bisa melalui Powershell**

How to Fix the issue of creating Hyper-V switch with NIC Teaming on Windows Server How to Fix the issue of creating Hyper-V switch with NIC Teaming on Windows Server 2022 or 2025 

```
PS C:\Users\Administrator> New-VMSwitch -Name "SET-Switch" -NetAdapterName ether01,ether02,ether03 -EnableEmbeddedTeaming $true
```

![Tampilan Dashboard Hyper-V](/assets/images/Blog/Network_Setting_image.png)
---
**Set IP Ke Host**

![Tampilan Dashboard Hyper-V-4](/assets/images/Blog/4_Network_Setting_image.png)
![Tampilan Dashboard Hyper-V-3](/assets/images/Blog/3_Network_Setting_image.png)

Set VLAN ke VM Guest
![Tampilan Dashboard Hyper-V-1](/assets/images/Blog/1_Network_Setting_image.png)
