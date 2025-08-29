---
title: "Pihole Auto Sync "
description: Config Pihole auto sync dengan nebula sync
category: Networking
author:
  name: Fachmi
  title: Admin
  image: /assets/images/Logo/font-logo.png
pubDate: 2025-08-29T15:08:54.209Z
image: /assets/images/Blog/pihole6.jpg
---
# Pihole + Nebula-Sync
Panduan Instalasi dan Sinkronisasi Pi-hole DNS dengan Nebula Sync

## Topologi Jaringan

![Topologi](/assets/images/Blog/pihole_nebula.png)

> Catatan:
> 
> *   DNS-01 dan DNS-02 menjalankan Pi-hole native (tidak dibahas rinci di sini).
> *   DNS-03 menggunakan Docker (Raspberry Pi + OpenMediaVault dengan jaringan macvlan).
> *   Sinkronisasi konfigurasi dan daftar blokir dilakukan dengan **nebula-sync** dari DNS-01 ke DNS-02 dan DNS-03.

* * *

## Konfigurasi Docker Compose (DNS-03)

```yaml
docker-compose.yml

version: '3.8'

services:
  pihole:
    container_name: pihole-dns-over-https
    image: bariscimen/pihole-dns-over-https:latest
    hostname: DNS-03
    mac_address: 02:42:ac:11:00:03
    networks:
      macvlan:
        ipv4_address: 192.168.48.12
    environment:
      TZ: 'Asia/Jakarta'
      WEBPASSWORD: 'P@sswordSayaPanjang'
      DNSMASQ_LISTENING: all
      DNS_FQDN_REQUIRED: "true"
      # DOH_DNS1: 'https://8.8.8.8/dns-query' # Uncomment to use Google DNS over HTTPS instead of Cloudflare
      # DOH_DNS2: 'https://8.8.4.4/dns-query' # Uncomment to use Google DNS over HTTPS instead of Cloudflare
    volumes:
      - /Appdata/piholev6/etc/pihole:/etc/pihole
      - /Appdata/piholev6/etc/dnsmasq.d:/etc/dnsmasq.d
    cap_add:
      - NET_ADMIN
    restart: unless-stopped

  nebula-sync:
    image: ghcr.io/lovelaze/nebula-sync:latest
    container_name: nebula-sync
    restart: unless-stopped
    networks:
      macvlan:
      bridge_net:
    env_file: .env
    volumes:
      - /Appdata/piholev6/etc/pihole:/etc/pihole

networks:
  macvlan:
    external: true
  bridge_net:
    driver: bridge

```

* * *

## File Environment .env untuk DNS-03

```conf
PRIMARY=http://192.168.48.10|PASSWORD
REPLICAS=http://192.168.48.11|PASSWORD,http://192.168.48.12|PASSWORD
FULL_SYNC=false
RUN_GRAVITY=false
CRON=*/15 * * * *

CLIENT_SKIP_TLS_VERIFICATION=true
TZ=Asia/Jakarta

SYNC_CONFIG_DNS=true
SYNC_CONFIG_DHCP=false
SYNC_CONFIG_NTP=false
SYNC_CONFIG_RESOLVER=false
SYNC_CONFIG_DATABASE=false
SYNC_CONFIG_MISC=false
SYNC_CONFIG_DEBUG=false

SYNC_GRAVITY_DHCP_LEASES=false
SYNC_GRAVITY_GROUP=false
SYNC_GRAVITY_AD_LIST=true
SYNC_GRAVITY_AD_LIST_BY_GROUP=true
SYNC_GRAVITY_DOMAIN_LIST=true
SYNC_GRAVITY_DOMAIN_LIST_BY_GROUP=true
SYNC_GRAVITY_CLIENT=false
SYNC_GRAVITY_CLIENT_BY_GROUP=false
```

> Ganti PASSWORD dengan token API Pi-hole masing-masing server.

* * *

## Langkah Instalasi Singkat (untuk DNS-03)

1.  **Siapkan jaringan macvlan di Docker host** (hanya perlu dilakukan sekali):
    
    ```bash
    docker network create -d macvlan \
      --subnet=192.168.48.0/24 \
      --gateway=192.168.48.1 \
      -o parent=eth0 macvlan
    ```
2.  **Buat folder untuk konfigurasi**:
    
    ```bash
    mkdir -p /Appdata/piholev6/etc/pihole
    mkdir -p /Appdata/piholev6/etc/dnsmasq.d
    ```
3.  **Simpan file docker-compose.yml dan .env di /Appdata/Pihole/**.
4.  **Jalankan layanan**:
    
    ```bash
    cd /Appdata/Pihole
    docker compose up -d
    ```

* * *

## Verifikasi

*   Akses antarmuka web DNS-03: http://192.168.48.12
*   Cek log nebula-sync:
    
    ```bash
    docker logs nebula-sync
    ```
*   Cek curl API:
    
    ```sh
    curl http://192.168.48.12/api.php
    ```

Jika semuanya berhasil, DNS-03 akan tersinkronisasi dengan DNS-01 dan DNS-02 melalui nebula-sync setiap 15 menit.