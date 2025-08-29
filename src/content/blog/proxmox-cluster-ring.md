---
title: Proxmox Cluster Ring Topologi
description: Membangun routing dinamis berbasis OSPFv2 (IPv4-only)
pubDate: 2025-08-08
category: Virtual
author:
  name: Fachmi
  title: Admin
  image: /assets/images/Blog/Brands/proxmox-logo.png
image: /assets/images/Blog/networking.jpeg
---

# OSPFv2 (IPv4-only) untuk Proxmox Cluster Ring Topologi

Dokumentasi Implementasi OSPFv2 (IPv4-only) untuk Proxmox Cluster Ring Topologi

---

##  Tujuan

Membangun routing dinamis berbasis **OSPFv2 (IPv4-only)** untuk jaringan **cluster dan Ceph Proxmox** pada topologi ring antar tiga node dengan interface Thunderbolt point-to-point.

---

##  Topologi Ring Thunderbolt

    NODE1["NODE1<br/>10.1.20.3<br/><span style='color:red'>10.10.10.1 en06tb1<br/>10.10.30.2 en05tb0</span>"]
    NODE2["NODE2<br/>10.1.20.4<br/><span style='color:red'>10.10.10.2 en05tb0<br/>10.10.20.1 en06tb1</span>"]
    NODE3["NODE3<br/>10.1.20.5<br/><span style='color:red'>10.10.30.1 en06tb1<br/>10.10.20.2 en05tb0</span>"]

    NODE1 -- "20 Gbps" --> NODE2
    NODE2 -- "20 Gbps" --> NODE3
    NODE3 -- "20 Gbps" --> NODE1

![Ring](/assets/images/Blog/topologi-ring.png)
### IP Plan

<figure class="table"><table><thead><tr><th>Link</th><th>Interface Node A</th><th>Interface Node B</th><th>Subnet</th></tr></thead><tbody><tr><td>Node1 &lt;-&gt; Node2</td><td><code>thunder0</code></td><td><code>thunder1</code></td><td>10.10.10.0/30</td></tr><tr><td>Node2 &lt;-&gt; Node3</td><td><code>thunder0</code></td><td><code>thunder1</code></td><td>10.10.20.0/30</td></tr><tr><td>Node3 &lt;-&gt; Node1</td><td><code>thunder0</code></td><td><code>thunder1</code></td><td>10.10.30.0/30</td></tr></tbody></table></figure>

### IP Assignment

- **Node1:**
  - `thunder0`: `10.10.10.1/30`
  - `thunder1`: `10.10.30.2/30`
- **Node2:**
  - `thunder0`: `10.10.10.2/30`
  - `thunder1`: `10.10.20.1/30`
- **Node3:**
  - `thunder0`: `10.10.20.2/30`
  - `thunder1`: `10.10.30.1/30`

---

## Instalasi FRR (Routing Engine)

### Debian/Proxmox (pada semua node)

```bash

apt update
apt install frr frr-pythontools -y

```

### Aktifkan OSPF

Edit `/etc/frr/daemons`:

```conf

osfpd=yes
zebra=yes

```

Kemudian:

```bash

systemctl restart frr

```

---

## 🔧 Konfigurasi FRR (per Node)

### Node1 - `/etc/frr/frr.conf`

```bash
frr version 10.2.2
frr defaults traditional
hostname node1-nuc-i5
log file /var/log/frr/frr.log
no ipv6 forwarding
service integrated-vtysh-config
!
interface en05tb0
ip ospf area 0.0.0.0
ip ospf cost 10
ip ospf dead-interval 3
ip ospf hello-interval 1
ip ospf network point-to-point
no ip ospf passive
exit
!
interface en06tb1
ip ospf area 0.0.0.0
ip ospf cost 10
ip ospf dead-interval 3
ip ospf hello-interval 1
ip ospf network point-to-point
no ip ospf passive
exit
!
interface lo
ip address 10.1.20.3/32
ip ospf area 0.0.0.0
ip ospf passive
exit
!
interface vmbr0
ip ospf area 0.0.0.0
ip ospf cost 120
no ip ospf passive
exit
!
router ospf
ospf router-id 1.1.1.1
auto-cost reference-bandwidth 40000
redistribute connected
passive-interface default
exit
!
end
```

### Node2 - `/etc/frr/frr.conf`

```bash
frr version 10.2.2
frr defaults traditional
hostname node1-nuc-i5
log file /var/log/frr/frr.log
no ipv6 forwarding
service integrated-vtysh-config
!
interface en05tb0
ip ospf area 0.0.0.0
ip ospf cost 10
ip ospf dead-interval 3
ip ospf hello-interval 1
ip ospf network point-to-point
no ip ospf passive
exit
!
interface en06tb1
ip ospf area 0.0.0.0
ip ospf cost 10
ip ospf dead-interval 3
ip ospf hello-interval 1
ip ospf network point-to-point
no ip ospf passive
exit
!
interface lo
ip address 10.1.20.4/32
ip ospf area 0.0.0.0
ip ospf passive
exit
!
interface vmbr0
ip ospf area 0.0.0.0
ip ospf cost 120
no ip ospf passive
exit
!
router ospf
ospf router-id 2.2.2.2
auto-cost reference-bandwidth 40000
redistribute connected
passive-interface default
exit
!
end
```

### Node3 - /etc/frr/frr.conf

```bash
frr version 10.2.2
frr defaults traditional
hostname node1-nuc-i5
log file /var/log/frr/frr.log
no ipv6 forwarding
service integrated-vtysh-config
!
interface en05tb0
ip ospf area 0.0.0.0
ip ospf cost 10
ip ospf dead-interval 3
ip ospf hello-interval 1
ip ospf network point-to-point
no ip ospf passive
exit
!
interface en06tb1
ip ospf area 0.0.0.0
ip ospf cost 10
ip ospf dead-interval 3
ip ospf hello-interval 1
ip ospf network point-to-point
no ip ospf passive
exit
!
interface lo
ip address 10.1.20.5/32
ip ospf area 0.0.0.0
ip ospf passive
exit
!
interface vmbr0
ip ospf area 0.0.0.0
ip ospf cost 120
no ip ospf passive
exit
!
router ospf
ospf router-id 3.3.3.3
auto-cost reference-bandwidth 40000
redistribute connected
passive-interface default
exit
!
end
```

---

## ⚖️ Validasi Routing

### Lihat routing table:

```bash

ip route

```

### Cek tetangga OSPF:

```bash

vtysh -c "show ip ospf neighbor"

```

### Debug log OSPF:

```bash

tail -f /var/log/frr/frr.log

```

---

## Integrasi dengan Proxmox

### `/etc/pve/datacenter.cfg`

Tambahkan:

```bash

migration_network: 10.10.0.0/16

```

### Ceph

Pastikan IP OSPF digunakan di config Ceph:

```bash

mon host = 10.10.10.1,10.10.20.1,10.10.30.1

```

---

## Firewall (Opsional)

Pastikan protokol OSPF (IP Proto 89) diizinkan di semua antarmuka Thunderbolt:

```bash

iptables -A INPUT -i thunder+ -p ospf -j ACCEPT

```

---

## Monitoring

```bash

vtysh -c "show ip ospf" # status umum OSPF
vtysh -c "show ip ospf interface"
vtysh -c "show ip ospf database"

```

---

## Replikasi dan Live Migration

Dengan OSPF aktif, antar node akan otomatis mengetahui route terbaik untuk migrasi dan storage Ceph, termasuk fallback jika salah satu link mati.

---

## Penutup

- Implementasi OSPFv2 ini stabil untuk homelab.
- Tidak memerlukan IPv6.
- Mudah di-maintain dan diperluas.

Bisa ditingkatkan ke dual-stack OSPFv2 + OSPFv3 di masa depan jika diperlukan.

## Bonus Sample Config

Node 1

```bash

root@node1-nuc-i5:~# cat /etc/frr/frr.conf
frr version 10.2.2
frr defaults traditional
hostname node1-nuc-i5
log file /var/log/frr/frr.log
no ipv6 forwarding
service integrated-vtysh-config
!
interface en05tb0
ip ospf area 0.0.0.0
ip ospf cost 10
ip ospf dead-interval 3
ip ospf hello-interval 1
ip ospf network point-to-point
no ip ospf passive
exit
!
interface en06tb1
ip ospf area 0.0.0.0
ip ospf cost 10
ip ospf dead-interval 3
ip ospf hello-interval 1
ip ospf network point-to-point
no ip ospf passive
exit
!
interface lo
ip address 10.1.20.3/32
ip ospf area 0.0.0.0
ip ospf passive
exit
!
interface vmbr0
ip ospf area 0.0.0.0
ip ospf cost 120
ip ospf dead-interval 3
ip ospf hello-interval 1
no ip ospf passive
exit
!
router ospf
ospf router-id 1.1.1.1
auto-cost reference-bandwidth 40000
redistribute connected
passive-interface default
exit
!

```

Node 2

```bash
root@node2-nuc-i5:~# cat /etc/frr/frr.conf
frr version 10.2.2
frr defaults traditional
hostname node2-nuc-i5
log file /var/log/frr/frr.log
no ipv6 forwarding
service integrated-vtysh-config
!
interface en05tb0
ip ospf area 0.0.0.0
ip ospf cost 10
ip ospf dead-interval 3
ip ospf hello-interval 1
ip ospf network point-to-point
no ip ospf passive
exit
!
interface en06tb1
ip ospf area 0.0.0.0
ip ospf cost 10
ip ospf dead-interval 3
ip ospf hello-interval 1
ip ospf network point-to-point
no ip ospf passive
exit
!
interface lo
ip address 10.1.20.4/32
ip ospf area 0.0.0.0
ip ospf passive
exit
!
router ospf
ospf router-id 2.2.2.2
auto-cost reference-bandwidth 40000
redistribute connected
passive-interface default
exit
!

```

Node 3

```bash

root@node3-nuc-i3:~# cat /etc/frr/frr.conf
frr version 10.2.2
frr defaults traditional
hostname node1-nuc-i5
log file /var/log/frr/frr.log
no ipv6 forwarding
service integrated-vtysh-config
!
interface en05tb0
ip ospf area 0.0.0.0
ip ospf cost 10
ip ospf dead-interval 3
ip ospf hello-interval 1
ip ospf network point-to-point
no ip ospf passive
exit
!
interface en06tb1
ip ospf area 0.0.0.0
ip ospf cost 10
ip ospf dead-interval 3
ip ospf hello-interval 1
ip ospf network point-to-point
no ip ospf passive
exit
!
interface lo
ip address 10.1.20.5/32
ip ospf area 0.0.0.0
ip ospf passive
exit
!
router ospf
ospf router-id 3.3.3.3
auto-cost reference-bandwidth 40000
redistribute connected
passive-interface default
exit
!

```


