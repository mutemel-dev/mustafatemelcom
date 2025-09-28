---
weight: 1
title: "SharePoint Framework (SPFx) ile Geliştirmeye Başlangıç"
date: 2025-09-28T21:00:00+03:00
lastmod: 2025-09-28T21:00:00+03:00
draft: false
author: "Mustafa Temel"
authorLink: "https://mustafatemel.com"
description: "SharePoint Framework (SPFx) nedir, nasıl kurulur ve ilk web part nasıl oluşturulur? Bu rehberde SPFx geliştirme ortamını kurmaktan ilk projenizi oluşturmaya kadar her şeyi öğrenin."
images: []
resources:
- name: "featured-image"
  src: "featured-image.png"

tags: ["SharePoint", "SPFx", "SharePoint Framework", "Microsoft 365", "Web Development", "TypeScript", "React"]
categories: ["Teknoloji", "Geliştirme"]

lightgallery: false
---

# SharePoint Framework (SPFx) ile Geliştirmeye Başlangıç

Microsoft SharePoint Framework (SPFx), SharePoint Online ve Microsoft Teams için modern, duyarlı ve mobil uyumlu web web part geliştirmek için kullanılan güçlü bir geliştirme modelidir. Bu yazıda SPFx'in ne olduğunu, nasıl kurulacağını ve ilk projenizi nasıl oluşturacağınızı adım adım öğreneceksiniz.

## SharePoint Framework Nedir?

SharePoint Framework, geliştiricilerin modern JavaScript kütüphaneleri ve araçlarını kullanarak SharePoint için özelleştirmeler yapmasına olanak tanıyan bir geliştirme modelidir.

### SPFx'in Temel Avantajları

-  **Modern Web Teknolojileri**: React, Angular, Vue.js gibi popüler frameworks'ler kullanabilirsiniz
-  **TypeScript Desteği**: Güçlü tip kontrolü ve IntelliSense desteği
-  **Responsive Tasarım**: Mobil ve masaüstü cihazlarda mükemmel görünüm
-  **Office UI Fabric**: Microsoft'un tasarım diline uygun bileşenler
-  **SharePoint Context**: SharePoint verilerine kolay erişim

## Gereksinimler

SPFx geliştirmeye başlamadan önce aşağıdaki araçların sisteminizde kurulu olması gerekir:

### Zorunlu Gereksinimler

1. **Node.js** (LTS sürümü önerilir)
2. **npm** veya **yarn** paket yöneticisi
3. **Git** versiyon kontrol sistemi
4. **Visual Studio Code** (önerilen IDE)

### Önerilen Gereksinimler

- **Microsoft 365 Developer Tenant**
- **SharePoint Online** erişimi
- **JavaScript/TypeScript** bilgisi
- **React** framework bilgisi (opsiyonel)

## Geliştirme Ortamının Kurulması

### 1. Node.js Kurulumu

```bash
# Node.js versiyonunu kontrol edin
node --version

# npm versiyonunu kontrol edin
npm --version
```

{{< admonition type=tip title="İpucu" >}}
SharePoint Framework için Node.js LTS versiyonlarını kullanın. Desteklenen versiyonları [Microsoft dokumantasyonunda](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment) kontrol edebilirsiniz.
{{< /admonition >}}

### 2. SharePoint Framework Yeoman Generator Kurulumu

```bash
# SPFx Yeoman generator'ını global olarak kurun
npm install -g @microsoft/generator-sharepoint

# Yeoman'ı kurun (eğer kurulu değilse)
npm install -g yo

# Gulp CLI'yi kurun
npm install -g gulp-cli
```

### 3. Kurulumun Doğrulanması

```bash
# SPFx generator versiyonunu kontrol edin
npm list -g @microsoft/generator-sharepoint

# Yeoman generator'larını listeleyin
yo --help
```

## İlk SPFx Projesinin Oluşturulması

### 1. Yeni Proje Klasörü Oluşturma

```bash
# Yeni klasör oluşturun
mkdir my-first-webpart
cd my-first-webpart
```

### 2. SPFx Projesi Scaffolding

```bash
# Yeoman ile SPFx projesi oluşturun
yo @microsoft/sharepoint
```

Generator aşağıdaki soruları soracak:

- **Solution name**: Çözümünüzün adı (örn: my-first-webpart)
- **Target baseline**: SharePoint Online only (latest)
- **Place of files**: Use the current folder
- **Deployment target**: SharePoint Online only (latest)
- **Package manager**: npm
- **WebPart name**: İlk web part'ınızın adı
- **Description**: Web part açıklaması
- **Framework**: React (önerilir)

### 3. Proje Yapısının İncelenmesi

```
my-first-webpart/
├── config/
│   ├── package-solution.json
│   └── serve.json
├── src/
│   └── webparts/
│       └── myFirstWebPart/
│           ├── MyFirstWebPartWebPart.ts
│           └── components/
├── teams/
├── package.json
└── tsconfig.json
```

## Geliştirme Süreci

### 1. Local Workbench'te Test

```bash
# Geliştirme sunucusunu başlatın
gulp serve
```

Bu komut local workbench'i açacak: `https://localhost:4321/temp/workbench.html`

### 2. SharePoint Workbench'te Test

SharePoint sitenizin workbench'inde test etmek için:
```
https://[tenant].sharepoint.com/sites/[site]/_layouts/15/workbench.aspx
```

### 3. Paket Oluşturma

```bash
# Üretim için paket oluşturun
gulp bundle --ship
gulp package-solution --ship
```

## Temel Web Part Yapısı

### TypeScript Sınıfı

```typescript
export default class MyFirstWebPartWebPart extends BaseClientSideWebPart<IMyFirstWebPartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMyFirstWebPartProps> = React.createElement(
      MyFirstWebPart,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  // Web part özellikleri tanımı
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
```

### React Bileşeni

```typescript
export default class MyFirstWebPart extends React.Component<IMyFirstWebPartProps, {}> {
  public render(): React.ReactElement<IMyFirstWebPartProps> {
    return (
      <div className={styles.myFirstWebPart}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Merhaba SharePoint!</span>
              <p className={styles.description}>{escape(this.props.description)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
```

## SharePoint'e Deployment

### 1. App Catalog'a Yükleme

1. **package-solution.json** dosyasını yapılandırın
2. `gulp bundle --ship && gulp package-solution --ship` komutunu çalıştırın
3. **sharepoint/solution** klasöründeki `.sppkg` dosyasını App Catalog'a yükleyin
4. Uygulamayı tenant'a deploy edin

### 2. Site Collection'a Ekleme

1. Site Contents > New > App > From your organization
2. Uygulamanızı bulun ve ekleyin
3. Modern sayfalarda web part'ınızı kullanın

## En İyi Pratikler

### Performans Optimizasyonu

```javascript
// Lazy loading için React.lazy kullanın
const MyHeavyComponent = React.lazy(() => import('./MyHeavyComponent'));

// Memoization kullanın
const MemoizedComponent = React.memo(MyComponent);

// useCallback ve useMemo kullanın
const memoizedCallback = useCallback(() => {
  doSomething();
}, [dependency]);
```

### Error Handling

```typescript
// Error boundaries kullanın
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('SPFx Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Bir hata oluştu.</h1>;
    }
    return this.props.children;
  }
}
```

## Gelişmiş Konular

### 1. SharePoint REST API Kullanımı

```typescript
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

// Liste öğelerini getirme
private async getListItems(): Promise<any[]> {
  const response: SPHttpClientResponse = await this.context.spHttpClient.get(
    `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('MyList')/items`,
    SPHttpClient.configurations.v1
  );
  
  const data = await response.json();
  return data.value;
}
```

### 2. Microsoft Graph API Entegrasyonu

```typescript
import { MSGraphClient } from '@microsoft/sp-http';

// Microsoft Graph kullanımı
private async getMyProfile(): Promise<any> {
  const client: MSGraphClient = await this.context.msGraphClientFactory.getClient();
  const me = await client.api('/me').get();
  return me;
}
```

## Sorun Giderme

### Yaygın Hatalar

{{< admonition type=warning title="Dikkat" >}}
**Node.js Sürüm Uyumsuzluğu**: SPFx belirli Node.js sürümleriyle çalışır. Desteklenen sürümleri kontrol edin.
{{< /admonition >}}

```bash
# Node sürümünü değiştirmek için nvm kullanın
nvm install 16.14.0
nvm use 16.14.0
```

### Debug Teknikleri

```typescript
// Console logging
console.log('Debug info:', data);

// SharePoint Logger
import { Log } from '@microsoft/sp-core-library';

Log.info('MyWebPart', 'Information message');
Log.error('MyWebPart', new Error('Something went wrong'));
```


## Kaynaklar

-  [Microsoft SPFx Documentation](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/)
-  [PnP SPFx Samples](https://github.com/pnp/sp-dev-fx-webparts)
-  [SPFx Community](https://techcommunity.microsoft.com/t5/sharepoint-developer/ct-p/SharePointDev)
-  [Microsoft Learn SPFx](https://learn.microsoft.com/en-us/training/modules/sharepoint-spfx-get-started/)

SharePoint Framework ile geliştirmeye başlamak için bu rehber size sağlam bir temel sağlayacaktır. Sorularınız varsa yorumlarda paylaşmaktan çekinmeyin!