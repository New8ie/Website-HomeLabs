---
title: Powershell Profile
description: Create Powershell Profile
pubDate: 2025-08-08
category: Windows
author:
  name: Fachmi
  title: Admin
  image: /assets/images/Logo/font-logo.png
image: /assets/images/Blog/Brands/powershell.jpg
---

# Create PROFILE Powershell

Buka PowerShell dan jalankan:

```powershell
$PROFILE

```

Contoh output:

```powershell
C:\Users\Administrator\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1

```

---

## 2. Buat File Profile (Jika Belum Ada)

```powershell
if (!(Test-Path -Path $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force
}

```

---

## 3. Edit File Profile

Kamu bisa buka profil menggunakan Notepad:

```powershell
notepad $PROFILE

```

Lalu copy skrip berikut:

```powershell
# === PowerShell Profile: Custom Alias ===

# Umum
Set-Alias ll Get-ChildItem
Set-Alias gs Get-Service
Set-Alias pingtest Test-Connection
Set-Alias ipconfig Get-NetIPAddress
function reload { . $PROFILE; Write-Host "✅ Profile Reloaded!" -ForegroundColor Green }

# Hyper-V: Aliases dan fungsi praktis
Set-Alias gvm Get-VM
Set-Alias svm Start-VM
Set-Alias stvm Stop-VM
Set-Alias rvm Restart-VM
Set-Alias svmrc Show-VMConsole

function vmstatus {
    Get-VM | Select-Object Name, State, CPUUsage, MemoryAssigned, Uptime | Format-Table -AutoSize
}

function vmip {
    Get-VM | ForEach-Object {
        $vm = $_
        $nics = Get-VMNetworkAdapter -VMName $vm.Name
        foreach ($nic in $nics) {
            [PSCustomObject]@{
                VMName = $vm.Name
                IPAddress = $nic.IPAddresses -join ', '
            }
        }
    } | Format-Table -AutoSize
}

function hvrefresh {
    Write-Host "🔄 Refreshing Hyper-V info..." -ForegroundColor Cyan
    Get-VM | Out-Null
    Get-VMNetworkAdapter | Out-Null
    Write-Host "✅ Refreshed." -ForegroundColor Green
}

Write-Host "✔ PowerShell profile loaded. Ready for Hyper-V admin." -ForegroundColor Cyan

```

---

## 4. Reload Profile

Setelah simpan, jalankan:

```powershell
. $PROFILE

```

---

## Alias yang Bisa Kamu Gunakan

<figure class="table"><table><thead><tr><th>Alias/Fungsi</th><th>Deskripsi</th></tr></thead><tbody><tr><td>ll</td><td>List direktori (mirip ls -l)</td></tr><tr><td>gs</td><td>Get-Service</td></tr><tr><td>pingtest</td><td>Ping test (Test-Connection)</td></tr><tr><td>ipconfig</td><td>Get IP info</td></tr><tr><td>reload</td><td>Reload profil</td></tr><tr><td>gvm</td><td>Get-VM</td></tr><tr><td>svm &lt;vm&gt;</td><td>Start-VM</td></tr><tr><td>stvm &lt;vm&gt;</td><td>Stop-VM</td></tr><tr><td>rvm &lt;vm&gt;</td><td>Restart-VM</td></tr><tr><td>svmrc &lt;vm&gt;</td><td>Show console (butuh tambahan jika pakai GUI)</td></tr><tr><td>vmstatus</td><td>Menampilkan status ringkas semua VM</td></tr><tr><td>vmip</td><td>Menampilkan IP dari VM</td></tr><tr><td>hvrefresh</td><td>Refresh info VM dan network adapter</td></tr></tbody></table></figure>
