---
title: Manage python directory venv
description: Manage python directory venvt
pubDate: 2025-08-08
category: MacOS
author:
  name: Fachmi
  title: SysAdmin
  image: /assets/images/Logo/font-logo.png
image: /assets/images/Blog/python.jpg
---
# Merapihkan Directory venv
## 🎯 Tujuan Upgrade:

1.  🔄 Auto-completion untuk mkvenv, workon, rmvenv
2.  🧰 Installer skrip alias otomatis
3.  📁 workon otomatis cd ke direktori proyek (jika ada folder ~/Projects/<nama>)

* * *

## ✅ STRUKTUR DIREKTORI

Kita asumsikan struktur berikut:

```
~/.config/venv/         # venv disimpan di sini
~/Projects/             # folder proyek real disimpan di sini 
```

* * *

## 🛠️ 1. Update alias: ~/.config/zsh/alias\_venv.zsh

Ganti isi file menjadi seperti ini:

```
# ============================================
# 🔁 Virtualenv Management with pyenv
# ============================================
export VENV_HOME="$HOME/.config/venv"
export PROJECTS_HOME="$HOME/Projects"

# Membuat virtualenv: mkvenv nama_venv [3.10|3.11]
mkvenv() {
  local name="$1"
  local version="${2:-3.10}"
  local pybin

  if [[ -z "$name" ]]; then
    echo "🧠 Gunakan: mkvenv <nama> [versi]"
    return 1
  fi

  mkdir -p "$VENV_HOME"

  if ! pyenv versions --bare | grep -q "^${version}"; then
    echo "❌ Python ${version} belum terinstall di pyenv."
    return 1
  fi

  pybin="$(pyenv prefix ${version})/bin/python"

  echo "📦 Membuat venv '$name' dengan Python $version..."
  "$pybin" -m venv "$VENV_HOME/$name"
  echo "✅ Selesai. Gunakan: workon $name"
}

# Aktifkan venv dan auto-cd jika folder proyek ada
workon() {
  local name="$1"
  local venv_path="$VENV_HOME/$name"
  local project_path="$PROJECTS_HOME/$name"

  if [[ -z "$name" ]]; then
    echo "🧠 Gunakan: workon <nama>"
    return 1
  fi

  if [[ ! -d "$venv_path" ]]; then
    echo "❌ Venv '$name' tidak ditemukan di $VENV_HOME"
    return 1
  fi

  echo "⚡ Mengaktifkan venv '$name'..."
  source "$venv_path/bin/activate"

  if [[ -d "$project_path" ]]; then
    echo "📁 Berpindah ke direktori proyek: $project_path"
    cd "$project_path"
  fi
}

# Menghapus virtualenv
rmvenv() {
  local name="$1"
  local venv_path="$VENV_HOME/$name"

  if [[ -z "$name" || ! -d "$venv_path" ]]; then
    echo "❌ Venv '$name' tidak ditemukan."
    return 1
  fi

  echo "🗑 Menghapus venv '$name'..."
  rm -rf "$venv_path"
  echo "✅ Venv '$name' dihapus."
}

# ============================================
# 🔤 Auto-completion
# ============================================
_venv_complete() {
  compadd $(ls "$VENV_HOME")
}

compdef _venv_complete workon
compdef _venv_complete rmvenv

```

* * *

## 🧰 2. Skrip Installer Alias Otomatis (sekali jalan)

**File: ~/.config/zsh/install\_alias\_venv.zsh**

zsh

```
#!/bin/zsh

mkdir -p ~/.config/zsh

cat > ~/.config/zsh/alias_venv.zsh <<'EOF'
# (paste isi alias_venv.zsh dari atas di sini, yang lengkap)
EOF

# Tambah ke .zshrc jika belum ada
if ! grep -q "alias_venv.zsh" ~/.zshrc; then
  echo '[[ -f "$HOME/.config/zsh/alias_venv.zsh" ]] && source "$HOME/.config/zsh/alias_venv.zsh"' >> ~/.zshrc
  echo "✅ alias_venv.zsh sudah ditambahkan ke ~/.zshrc"
else
  echo "ℹ️ alias_venv.zsh sudah ada di ~/.zshrc"
fi

echo "✅ Selesai. Jalankan 'source ~/.zshrc' untuk memuat ulang."
```

Jalankan installer:

```
zsh ~/.config/zsh/install_alias_venv.zsh

```

* * *

## ✅ 3. Contoh Penggunaan

```
mkvenv myproject 3.11   # Buat virtualenv + Python 3.11
workon myproject        # Aktifkan venv & auto-cd ke ~/Projects/myproject (jika ada)
rmvenv myproject        # Hapus venv 
```

Otomatis akan ada auto-completion saat kamu tekan Tab untuk workon dan rmvenv 🎉