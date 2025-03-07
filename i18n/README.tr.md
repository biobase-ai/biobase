<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Biobase

[Biobase](https://biobase.studio) açık kaynaklı bir Firebase alternatifidir. Kurumsal düzeyde açık kaynak araçları kullanarak Firebase'in özelliklerini geliştiriyoruz.

- [x] Barındırılan Postgres Veritabanı. [Dokümanlar](https://biobase.studio/docs/guides/database)
- [x] Kimlik Doğrulama ve Yetkilendirme. [Dokümanlar](https://biobase.studio/docs/guides/auth)
- [x] Otomatik oluşturulan API'ler.
  - [x] REST. [Dokümanlar](https://biobase.studio/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Docs](https://biobase.studio/docs/guides/api#graphql-api-overview)
  - [x] Gerçek zamanlı abonelikler. [Dokümanlar](https://biobase.studio/docs/guides/api#realtime-api-overview)
- [x] Fonksiyonlar.
  - [x] Veritabanı Fonksiyonları. [Dokümanlar](https://biobase.studio/docs/guides/database/functions)
  - [x] Kenar İşlevleri [Dokümanlar](https://biobase.studio/docs/guides/functions)
- [x] Dosya Depolama. [Docs](https://biobase.studio/docs/guides/storage)
- [x] AI + Vektör / Gömme Araçları. [Dokümanlar](https://biobase.studio/docs/guides/ai)
- [x] Gösterge Tablosu

![Biobase Dashboard](https://raw.githubusercontent.combiobase-ai/biobase/master/apps/www/public/images/github/biobase-dashboard.png)

## Dokümantasyon

Belgelerin tamamı için [biobase.studio/docs](https://biobase.studio/docs) adresini ziyaret edin

Nasıl Katkıda bulunacağınızı görmek için [Başlarken](../DEVELOPERS.md) adresini ziyaret edin

## Topluluk ve Destek

- [Topluluk Forumu](https://github.com/biobase-ai/biobase/discussions). Şunlar için en iyisi: oluşturma konusunda yardım, veritabanı en iyi uygulamaları hakkında tartışma.
- [GitHub Sorunları](https://github.com/biobase-ai/biobase/issues). Biobase'i kullanırken karşılaştığınız hatalar ve hatalar için en iyisi.
- [E-posta Desteği](https://biobase.studio/docs/support#business-support). Veritabanınız veya altyapınızla ilgili sorunlar için en iyisi.
- [Discord](https://discord.biobase.studio). Uygulamalarınızı paylaşmak ve toplulukla takılmak için en iyisi.

## Nasıl çalışır

Biobase açık kaynak araçlarının bir birleşimidir. Firebase'in özelliklerini kurumsal düzeyde, açık kaynaklı ürünler kullanarak oluşturuyoruz. Araçlar ve topluluklar MIT, Apache 2 veya eşdeğer bir açık lisansla mevcutsa, bu aracı kullanacak ve destekleyeceğiz. Araç mevcut değilse, kendimiz oluşturur ve açık kaynak kullanırız. Biobase, Firebase'in bire bir eşlemesi değildir. Amacımız, geliştiricilere açık kaynak araçları kullanarak Firebase benzeri bir geliştirici deneyimi sunmaktır.

**Mimari**

Biobase [barındırılan bir platformdur](https://biobase.studio/dashboard). Biobase'e kaydolabilir ve hiçbir şey yüklemeden kullanmaya başlayabilirsiniz.
Ayrıca [self-host](https://biobase.studio/docs/guides/hosting/overview) ve [yerel olarak geliştirebilirsiniz](https://biobase.studio/docs/guides/local-development).

![Mimarlık](https://github.com/biobase-ai/biobase/blob/master/apps/docs/public/img/biobase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/), 30 yılı aşkın süredir aktif olarak geliştirilmekte olan ve güvenilirlik, özellik sağlamlığı ve performans açısından güçlü bir üne sahip olan nesne ilişkisel bir veritabanı sistemidir.
- [Realtime](https://github.com/biobase-ai/realtime), websockets kullanarak PostgreSQL ekleme, güncelleme ve silme işlemlerini dinlemenizi sağlayan bir Elixir sunucusudur. Realtime, veritabanı değişiklikleri için Postgres'in yerleşik çoğaltma işlevini yoklar, değişiklikleri JSON'a dönüştürür ve ardından JSON'u web soketleri üzerinden yetkili istemcilere yayınlar.
- [PostgREST](http://postgrest.org/), PostgreSQL veritabanınızı doğrudan RESTful API'ye dönüştüren bir web sunucusudur
- [pg_graphql](http://github.com/biobase/pg_graphql/) GraphQL API'si sunan bir PostgreSQL uzantısı
- [Storage](https://github.com/biobase-ai/storage-api), izinleri yönetmek için Postgres kullanarak S3'te depolanan Dosyaları yönetmek için RESTful bir arayüz sağlar.
- [postgres-meta](https://github.com/biobase-ai/postgres-meta) Postgres'inizi yönetmek için RESTful bir API'dir ve tabloları getirmenize, roller eklemenize ve sorgular çalıştırmanıza vb. olanak tanır.
- [GoTrue](https://github.com/netlify/gotrue) kullanıcıları yönetmek ve SWT belirteçleri vermek için SWT tabanlı bir API'dir.
- [Kong](https://github.com/Kong/kong) bulut tabanlı bir API ağ geçididir.

#### İstemci kütüphaneleri

İstemci kütüphaneleri için yaklaşımımız modülerdir. Her bir alt kütüphane, tek bir harici sistem için bağımsız bir uygulamadır. Bu, mevcut araçları destekleme yöntemlerimizden biridir.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Dil</th>
    <th>Müşteri</th>
    <th colspan="5">Özellik İstemcileri (Biobase istemcisinde paketlenmiştir)</th>
  </tr>
  
  <tr>
    <th></th>
    <th>Biobase</th>
    <th><a href="https://github.com/postgrest/postgrest" target="_blank" rel="noopener noreferrer">PostgREST</a></th>
    <th><a href="https://github.com/biobase-ai/gotrue" target="_blank" rel="noopener noreferrer">GoTrue</a></th>
    <th><a href="https://github.com/biobase-ai/realtime" target="_blank" rel="noopener noreferrer">Realtime</a></th>
    <th><a href="https://github.com/biobase-ai/storage-api" target="_blank" rel="noopener noreferrer">Storage</a></th>
    <th>Functions</th>
  </tr>
  <!-- TEMPLATE FOR NEW ROW -->
  <!-- START ROW
  <tr>
    <td>lang</td>
    <td><a href="https://github.com/biobase-ai-community/biobase-lang" target="_blank" rel="noopener noreferrer">biobase-lang</a></td>
    <td><a href="https://github.com/biobase-ai-community/postgrest-lang" target="_blank" rel="noopener noreferrer">postgrest-lang</a></td>
    <td><a href="https://github.com/biobase-ai-community/gotrue-lang" target="_blank" rel="noopener noreferrer">gotrue-lang</a></td>
    <td><a href="https://github.com/biobase-ai-community/realtime-lang" target="_blank" rel="noopener noreferrer">realtime-lang</a></td>
    <td><a href="https://github.com/biobase-ai-community/storage-lang" target="_blank" rel="noopener noreferrer">storage-lang</a></td>
  </tr>
  END ROW -->
  
  <th colspan="7">⚡️ Resmi ⚡️</th>
  
  <tr>
    <td>JavaScript (TypeScript)</td>
    <td><a href="https://github.com/biobase-ai/supabase-js" target="_blank" rel="noopener noreferrer">supabase-js</a></td>
    <td><a href="https://github.com/biobase-ai/postgrest-js" target="_blank" rel="noopener noreferrer">postgrest-js</a></td>
    <td><a href="https://github.com/biobase-ai/gotrue-js" target="_blank" rel="noopener noreferrer">gotrue-js</a></td>
    <td><a href="https://github.com/biobase-ai/realtime-js" target="_blank" rel="noopener noreferrer">realtime-js</a></td>
    <td><a href="https://github.com/biobase-ai/storage-js" target="_blank" rel="noopener noreferrer">storage-js</a></td>
    <td><a href="https://github.com/biobase-ai/functions-js" target="_blank" rel="noopener noreferrer">functions-js</a></td>
  </tr>
    <tr>
    <td>Flutter</td>
    <td><a href="https://github.com/biobase-ai/biobase-flutter" target="_blank" rel="noopener noreferrer">biobase-flutter</a></td>
    <td><a href="https://github.com/biobase-ai/postgrest-dart" target="_blank" rel="noopener noreferrer">postgrest-dart</a></td>
    <td><a href="https://github.com/biobase-ai/gotrue-dart" target="_blank" rel="noopener noreferrer">gotrue-dart</a></td>
    <td><a href="https://github.com/biobase-ai/realtime-dart" target="_blank" rel="noopener noreferrer">realtime-dart</a></td>
    <td><a href="https://github.com/biobase-ai/storage-dart" target="_blank" rel="noopener noreferrer">storage-dart</a></td>
    <td><a href="https://github.com/biobase-ai/functions-dart" target="_blank" rel="noopener noreferrer">functions-dart</a></td>
  </tr>
  
  <th colspan="7">💚 Topluluk 💚</th>
  
  <tr>
    <td>C#</td>
    <td><a href="https://github.com/biobase-ai-community/biobase-csharp" target="_blank" rel="noopener noreferrer">biobase-csharp</a></td>
    <td><a href="https://github.com/biobase-ai-community/postgrest-csharp" target="_blank" rel="noopener noreferrer">postgrest-csharp</a></td>
    <td><a href="https://github.com/biobase-ai-community/gotrue-csharp" target="_blank" rel="noopener noreferrer">gotrue-csharp</a></td>
    <td><a href="https://github.com/biobase-ai-community/realtime-csharp" target="_blank" rel="noopener noreferrer">realtime-csharp</a></td>
    <td><a href="https://github.com/biobase-ai-community/storage-csharp" target="_blank" rel="noopener noreferrer">storage-csharp</a></td>
    <td><a href="https://github.com/biobase-ai-community/functions-csharp" target="_blank" rel="noopener noreferrer">functions-csharp</a></td>
  </tr>
  <tr>
    <td>Go</td>
    <td>-</td>
    <td><a href="https://github.com/biobase-ai-community/postgrest-go" target="_blank" rel="noopener noreferrer">postgrest-go</a></td>
    <td><a href="https://github.com/biobase-ai-community/gotrue-go" target="_blank" rel="noopener noreferrer">gotrue-go</a></td>
    <td>-</td>
    <td><a href="https://github.com/biobase-ai-community/storage-go" target="_blank" rel="noopener noreferrer">storage-go</a></td>
    <td><a href="https://github.com/biobase-ai-community/functions-go" target="_blank" rel="noopener noreferrer">functions-go</a></td>
  </tr>
  <tr>
    <td>Java</td>
    <td>-</td>
    <td>-</td>
    <td><a href="https://github.com/biobase-ai-community/gotrue-java" target="_blank" rel="noopener noreferrer">gotrue-java</a></td>
    <td>-</td>
    <td><a href="https://github.com/biobase-ai-community/storage-java" target="_blank" rel="noopener noreferrer">storage-java</a></td>
    <td>-</td>
  </tr>
  <tr>
    <td>Kotlin</td>
    <td><a href="https://github.com/biobase-ai-community/biobase-kt" target="_blank" rel="noopener noreferrer">biobase-kt</a></td>
    <td><a href="https://github.com/biobase-ai-community/biobase-kt/tree/master/Postgrest" target="_blank" rel="noopener noreferrer">postgrest-kt</a></td>
    <td><a href="https://github.com/biobase-ai-community/biobase-kt/tree/master/GoTrue" target="_blank" rel="noopener noreferrer">gotrue-kt</a></td>
    <td><a href="https://github.com/biobase-ai-community/biobase-kt/tree/master/Realtime" target="_blank" rel="noopener noreferrer">realtime-kt</a></td>
    <td><a href="https://github.com/biobase-ai-community/biobase-kt/tree/master/Storage" target="_blank" rel="noopener noreferrer">storage-kt</a></td>
    <td><a href="https://github.com/biobase-ai-community/biobase-kt/tree/master/Functions" target="_blank" rel="noopener noreferrer">functions-kt</a></td>
  </tr>
  <tr>
    <td>Python</td>
    <td><a href="https://github.com/biobase-ai-community/biobase-py" target="_blank" rel="noopener noreferrer">biobase-py</a></td>
    <td><a href="https://github.com/biobase-ai-community/postgrest-py" target="_blank" rel="noopener noreferrer">postgrest-py</a></td>
    <td><a href="https://github.com/biobase-ai-community/gotrue-py" target="_blank" rel="noopener noreferrer">gotrue-py</a></td>
    <td><a href="https://github.com/biobase-ai-community/realtime-py" target="_blank" rel="noopener noreferrer">realtime-py</a></td>
    <td><a href="https://github.com/biobase-ai-community/storage-py" target="_blank" rel="noopener noreferrer">storage-py</a></td>
    <td><a href="https://github.com/biobase-ai-community/functions-py" target="_blank" rel="noopener noreferrer">functions-py</a></td>
  </tr>
  <tr>
    <td>Ruby</td>
    <td><a href="https://github.com/biobase-ai-community/biobase-rb" target="_blank" rel="noopener noreferrer">biobase-rb</a></td>
    <td><a href="https://github.com/biobase-ai-community/postgrest-rb" target="_blank" rel="noopener noreferrer">postgrest-rb</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Rust</td>
    <td>-</td>
    <td><a href="https://github.com/biobase-ai-community/postgrest-rs" target="_blank" rel="noopener noreferrer">postgrest-rs</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Swift</td>
    <td><a href="https://github.com/biobase-ai-community/biobase-swift" target="_blank" rel="noopener noreferrer">biobase-swift</a></td>
    <td><a href="https://github.com/biobase-ai-community/postgrest-swift" target="_blank" rel="noopener noreferrer">postgrest-swift</a></td>
    <td><a href="https://github.com/biobase-ai-community/gotrue-swift" target="_blank" rel="noopener noreferrer">gotrue-swift</a></td>
    <td><a href="https://github.com/biobase-ai-community/realtime-swift" target="_blank" rel="noopener noreferrer">realtime-swift</a></td>
    <td><a href="https://github.com/biobase-ai-community/storage-swift" target="_blank" rel="noopener noreferrer">storage-swift</a></td>
    <td><a href="https://github.com/biobase-ai-community/functions-swift" target="_blank" rel="noopener noreferrer">functions-swift</a></td>
  </tr>
  <tr>
    <td>Godot Engine (GDScript)</td>
    <td><a href="https://github.com/biobase-ai-community/godot-engine.biobase" target="_blank" rel="noopener noreferrer">biobase-gdscript</a></td>
    <td><a href="https://github.com/biobase-ai-community/postgrest-gdscript" target="_blank" rel="noopener noreferrer">postgrest-gdscript</a></td>
    <td><a href="https://github.com/biobase-ai-community/gotrue-gdscript" target="_blank" rel="noopener noreferrer">gotrue-gdscript</a></td>
    <td><a href="https://github.com/biobase-ai-community/realtime-gdscript" target="_blank" rel="noopener noreferrer">realtime-gdscript</a></td>
    <td><a href="https://github.com/biobase-ai-community/storage-gdscript" target="_blank" rel="noopener noreferrer">storage-gdscript</a></td>
    <td><a href="https://github.com/biobase-ai-community/functions-gdscript" target="_blank" rel="noopener noreferrer">functions-gdscript</a></td>
  </tr>
  
</table>

<!--- Remove this list if you're translating to another language, it's hard to keep updated across multiple files-->
<!--- Keep only the link to the list of translation files-->

## Rozetler

![Made with Biobase](../apps/www/public/badge-made-with-biobase.svg)

```md
[![Made with Biobase](https://biobase.studio/badge-made-with-biobase.svg)](https://biobase.studio)
```

```html
<a href="https://biobase.studio">
  <img
    width="168"
    height="30"
    src="https://biobase.studio/badge-made-with-biobase.svg"
    alt="Made with Biobase"
  />
</a>
```

![Made with Biobase (dark)](../apps/www/public/badge-made-with-biobase-dark.svg)

```md
[![Made with Biobase](https://biobase.studio/badge-made-with-biobase-dark.svg)](https://biobase.studio)
```

```html
<a href="https://biobase.studio">
  <img
    width="168"
    height="30"
    src="https://biobase.studio/badge-made-with-biobase-dark.svg"
    alt="Made with Biobase"
  />
</a>
```

## Çeviriler

- [Arapça | العربية](/i18n/README.ar.md)
- [Arnavutça / Shqip](/i18n/README.sq.md)
- [Bangla / বাংলা](/i18n/README.bn.md)
- [Bulgarca / Български](/i18n/README.bg.md)
- [Katalanca / Català](/i18n/README.ca.md)
- [Danca / Dansk](/i18n/README.da.md)
- [Hollandaca / Nederlands](/i18n/README.nl.md)
- [İngilizce](https://github.com/biobase-ai/biobase)
- [Fince / Suomalainen](/i18n/README.fi.md)
- [Fransızca / Français](/i18n/README.fr.md)
- [Almanca / Deutsch](/i18n/README.de.md)
- [Yunanca / Ελληνικά](/i18n/README.gr.md)
- [İbranice / עברית](/i18n/README.he.md)
- [Hintçe / हिंदी](/i18n/README.hi.md)
- [Macarca / Magyar](/i18n/README.hu.md)
- [Nepalce / नेपाली](/i18n/README.ne.md)
- [Endonezce / Bahasa Endonezya](/i18n/README.id.md)
- [İtalyanca / Italiano](/i18n/README.it.md)
- [Japonca / 日本語](/i18n/README.jp.md)
- [Korece / 한국어](/i18n/README.ko.md)
- [Malayca / Bahasa Malezya](/i18n/README.ms.md)
- [Norveççe (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [Farsça / فارسی](/i18n/README.fa.md)
- [Lehçe / Polski](/i18n/README.pl.md)
- [Portekizce / Português](/i18n/README.pt.md)
- [Portekizce (Brezilya) / Português Brasileiro](/i18n/README.pt-br.md)
- [Rumence / Română](/i18n/README.ro.md)
- [Rusça / Pусский](/i18n/README.ru.md)
- [Sırpça / Srpski](/i18n/README.sr.md)
- [Sinhala / සිංහල](/i18n/README.si.md)
- [İspanyolca / Español](/i18n/README.es.md)
- [Basitleştirilmiş Çince / 简体中文](/i18n/README.zh-cn.md)
- [İsveççe / Svenska](/i18n/README.sv.md)
- [Thai / ไทย](/i18n/README.th.md)
- [Geleneksel Çince / 繁體中文](/i18n/README.zh-tw.md)
- [Türkçe / Turkish](/i18n/README.tr.md)
- [Ukraynaca / Українська](/i18n/README.uk.md)
- [Vietnamca / Tiếng Việt](/i18n/README.vi-vn.md)
- [Çevirilerin listesi](/i18n/languages.md) <!--- Keep only this -->

---

## Sponsorlar

[![Yeni Sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/biobase)
