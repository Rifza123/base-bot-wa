# WhatsApp Bot Base (Simple)

Base WhatsApp bot yang **ringan, sederhana, dan mudah dipahami**.  
Dirancang sebagai pondasi awal untuk belajar atau mengembangkan bot WhatsApp menggunakan Baileys.

---

## Requirements

- Node.js v20 atau lebih baru
- NPM

---

## Install

Jika Node.js sudah terpasang, cukup jalankan:

```bash
npm install
````

---

## Menjalankan Bot

```bash
node index.js
# atau
node .
# atau
npm start
````

Atau langsung sertakan nomor WhatsApp:

```bash
node . 628xxxxxxxxxx
```

Jika belum ada session, bot akan meminta nomor WhatsApp dan menampilkan **pairing code** di terminal.

---

## Fitur Utama

* Pairing WhatsApp menggunakan kode (tanpa QR)
* Multi-file session
* Handler pesan sederhana
* Parsing command berbasis prefix
* Struktur kode jelas dan mudah dikembangkan

---

## Prefix & Command

Prefix yang didukung:

```
# . ‽ ٪
```

Contoh command:

```
#ping
#menu
```

---

## Menambah Command

Tambahkan command baru di bagian `switch (cht.cmd)`:

```js
case "halo":
  cht.reply("Halo 👋");
  break;
```

---

## Struktur Singkat

```
.
├── session/              # Session WhatsApp
├── lib/
│   └── systemConnext.js  # Handler koneksi
├── index.js              # File utama bot
└── package.json
```

---

## Tujuan

Base ini ditujukan sebagai:

* Pondasi bot WhatsApp
* Contoh struktur yang rapi
* Bahan belajar yang mudah dipahami

Silakan dikembangkan sesuai kebutuhan.