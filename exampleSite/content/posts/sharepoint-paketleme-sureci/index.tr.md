---
weight: 2
title: "SharePoint Framework Paketleme ve Dağıtım Süreci"
date: 2025-09-28T22:00:00+03:00
lastmod: 2025-09-28T22:00:00+03:00
draft: false
author: "Mustafa Temel"
authorLink: "https://mustafatemel.com"
description: "SharePoint Framework (SPFx) projelerini nasıl paketleyip SharePoint'e dağıtırız? Bu kısa rehberde paketleme sürecini adım adım öğrenin."
images: []
resources:
- name: "featured-image"
  src: "featured-image.png"

tags: ["SharePoint", "SPFx", "Deployment", "Packaging", "Microsoft 365"]
categories: ["Teknoloji", "Geliştirme"]

lightgallery: false
---

# SharePoint Framework Paketleme ve Dağıtım Süreci

SharePoint Framework (SPFx) projelerinizi geliştirdikten sonra, bunları SharePoint ortamınıza dağıtmanız gerekir. Bu süreç birkaç basit adımdan oluşur.

## Hızlı Paketleme Adımları

### 1. Projeyi Build Etme
```bash
# Üretim için build
gulp build --ship
```

### 2. Paketi Oluşturma
```bash
# .sppkg dosyasını oluştur
gulp bundle --ship
gulp package-solution --ship
```

### 3. App Catalog'a Yükleme
1. **SharePoint Admin Center** → **More features** → **Apps**
2. **App Catalog** sitesine git
3. **Apps for SharePoint** kütüphanesini aç
4. `.sppkg` dosyasını sürükle-bırak ile yükle

### 4. Uygulamayı Onaylama
- **Deploy to all sites** seçeneğini işaretle (tenant-wide deployment için)
- **Make this solution available to all sites** seç
- **Deploy** butonuna tıkla

## Dosya Yapısı

```
sharepoint/
└── solution/
    └── proje-adi.sppkg    # Paket dosyası
```

## CDN Ayarları (Opsiyonel)

Eğer CDN kullanıyorsanız:

```bash
# CDN URL'ini ayarla
gulp serve --nobrowser
```

`config/write-manifests.json` dosyasında CDN URL'ini belirtin.

## Yaygın Hatalar

❌ **"App not found"** → App Catalog'da uygulama aktif değil  
❌ **"Bundle failed"** → TypeScript hataları var  
❌ **"Deploy failed"** → Yetersiz izinler  

## Özet Komutlar

```bash
# Tam paketleme süreci
gulp clean
gulp build --ship
gulp bundle --ship  
gulp package-solution --ship
```

Bu komutları çalıştırdıktan sonra `sharepoint/solution/` klasöründe `.sppkg` dosyanız hazır olacaktır.


**💡 İpucu**: Her deployment öncesi `gulp clean` komutunu çalıştırmayı unutmayın!