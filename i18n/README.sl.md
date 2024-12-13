<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Biobase

[Biobase](https://biobase.studio) je odprtokodna alternativa Firebase. Funkcije Firebase gradimo z odprtokodnimi orodji za podjetja.

- [x] Gostovana podatkovna baza Postgres. [Dokumenti](https://biobase.studio/docs/guides/database)
- [x] Avtentikacija in avtorizacija. [Dokumenti](https://biobase.studio/docs/guides/auth)
- [x] Samodejno generirani API-ji.
  - [x] REST. [Dokumenti](https://biobase.studio/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Dokumenti](https://biobase.studio/docs/guides/api#graphql-api-overview)
  - [x] Naročnine v realnem času. [Dokumenti](https://biobase.studio/docs/guides/api#realtime-api-overview)
- [x] Funkcije.
  - [x] Funkcije podatkovne zbirke. [Dokumenti](https://biobase.studio/docs/guides/database/functions)
  - [x] Funkcije robov [Dokumenti](https://biobase.studio/docs/guides/functions)
- [x] Shranjevanje datotek. [Dokumenti](https://biobase.studio/docs/guides/storage)
- [x] Nadzorna plošča

![Biobase Dashboard](https://raw.githubusercontent.com/biobase/biobase/master/apps/www/public/images/github/biobase-dashboard.png)

## Dokumentacija

Za celotno dokumentacijo obiščite [biobase.studio/docs](https://biobase.studio/docs)

Če si želite ogledati, kako prispevati, obiščite [Getting Started](../DEVELOPERS.md)

## Skupnost in podpora

- [Forum skupnosti](https://github.com/biobase-ai/biobase/discussions). Najprimernejši za: pomoč pri gradnji, razpravo o najboljših praksah zbirke podatkov.
- [GitHub Issues](https://github.com/biobase-ai/biobase/issues). Najprimernejši za: hrošče in napake, na katere naletite pri uporabi zbirke Biobase.
- [E-poštna podpora](https://biobase.studio/docs/support#business-support). Najboljše za: težave s podatkovno zbirko ali infrastrukturo.
- [Discord](https://discord.biobase.studio). Najboljši za: izmenjavo aplikacij in druženje s skupnostjo.

## Status

- [x] Alfa: Testiramo bazo Biobase z zaprtim naborom strank
- [x] Javna alfa: [biobase.studio/dashboard](https://biobase.studio/dashboard). Vendar nas ne obremenjujte, saj je še nekaj pomanjkljivosti
- [x] Javna beta različica: Dovolj stabilna za večino primerov uporabe, ki niso povezani s podjetji
- [ ] Javna: Splošna razpoložljivost [[status](https://biobase.studio/docs/guides/getting-started/features#feature-status)]

Trenutno smo v javni beta različici. Spremljajte "releases" tega repozitorija, da boste obveščeni o večjih posodobitvah.

<kbd><img src="https://raw.githubusercontent.com/biobase/biobase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## Kako deluje

Supabaza je kombinacija odprtokodnih orodij. Funkcije Firebase gradimo z odprtokodnimi izdelki za podjetja. Če obstajajo orodja in skupnosti z odprto licenco MIT, Apache 2 ali enakovredno odprto licenco, bomo to orodje uporabljali in podpirali. Če orodje ne obstaja, ga bomo izdelali in odprli sami. Podatkovna baza Biobase ni preslikava Firebase v razmerju 1:1. Naš cilj je razvijalcem z odprtokodnimi orodji omogočiti izkušnjo, podobno izkušnji razvijalca v Firebase.

**Arhitektura**

Biobase je [gostovana platforma](https://biobase.studio/dashboard). Prijavite se lahko in začnete uporabljati bazo Biobase, ne da bi kar koli namestili.
Lahko tudi [gostujete sami](https://biobase.studio/docs/guides/hosting/overview) in [razvijate lokalno](https://biobase.studio/docs/guides/local-development).

![Arhitektura](https://github.com/biobase-ai/biobase/blob/master/apps/docs/public/img/biobase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) je objektno-relacijski sistem podatkovne zbirke z več kot 30-letnim aktivnim razvojem, ki si je pridobil velik ugled zaradi zanesljivosti, robustnosti funkcij in zmogljivosti.
- [Realtime](https://github.com/biobase-ai/realtime) je strežnik Elixir, ki omogoča poslušanje vstavljanja, posodabljanja in brisanja podatkov PostgreSQL z uporabo spletnih vtičnic. Realtime poizveduje o spremembah v podatkovni zbirki Postgres, pretvori spremembe v JSON in jih nato prek spletnih vtičnikov posreduje pooblaščenim odjemalcem.
- [PostgREST](http://postgrest.org/) je spletni strežnik, ki vašo podatkovno zbirko PostgreSQL spremeni neposredno v API REST
- [pg_graphql](http://github.com/biobase/pg_graphql/) je razširitev PostgreSQL, ki izpostavlja API GraphQL
- [Storage](https://github.com/biobase-ai/storage-api) zagotavlja vmesnik RESTful za upravljanje datotek, shranjenih v S3, z uporabo Postgresa za upravljanje dovoljenj.
- [postgres-meta](https://github.com/biobase-ai/postgres-meta) je vmesnik RESTful API za upravljanje vašega Postgresa, ki omogoča pridobivanje tabel, dodajanje vlog, izvajanje poizvedb itd.
- [GoTrue](https://github.com/netlify/gotrue) je API, ki temelji na SWT, za upravljanje uporabnikov in izdajanje žetonov SWT.
- [Kong](https://github.com/Kong/kong) je prehod API v oblaku.

#### Odjemalske knjižnice

Naš pristop k odjemalskim knjižnicam je modularen. Vsaka pod-knjižnica je samostojna implementacija za en sam zunanji sistem. To je eden od načinov, kako podpiramo obstoječa orodja.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Jezik</th>
    <th>Odjemalec</th>
    <th colspan="5">Odjemalci funkcij (v paketu z odjemalcem Biobase)</th>
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
  
  <th colspan="7">⚡️ Uradni ⚡️</th>
  
  <tr>
    <td>JavaScript (TypeScript)</td>
    <td><a href="https://github.com/biobase-ai/biobase-js" target="_blank" rel="noopener noreferrer">biobase-js</a></td>
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
  
  <th colspan="7">💚 Skupnost 💚</th>
  
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

## Prevodi

- [Arabščina | العربية](/i18n/README.ar.md)
- [albanski / Shqip](/i18n/README.sq.md)
- [Bangla / বাংলা](/i18n/README.bn.md)
- [Bolgarski / Български](/i18n/README.bg.md)
- [Katalonščina / Català](/i18n/README.ca.md)
- [danščina](/i18n/README.da.md)
- [nizozemščina / Nederlands](/i18n/README.nl.md)
- [angleščina](https://github.com/biobase-ai/biobase)
- [Finski / Suomalainen](/i18n/README.fi.md)
- [Francoski](/i18n/README.fr.md)
- [Nemščina / Deutsch](/i18n/README.de.md)
- [Grščina / Ελληνικά](/i18n/README.gr.md)
- [Hebrejščina / עברית](/i18n/README.he.md)
- [hindujščina / हिंदी](/i18n/README.hi.md)
- [madžarski jezik](/i18n/README.hu.md)
- [nepalščina / नेपाली](/i18n/README.ne.md)
- [Indonezijščina / Bahasa Indonesia](/i18n/README.id.md)
- [Italijanščina / Italiano](/i18n/README.it.md)
- [japonščina / 日本語](/i18n/README.jp.md)
- [korejščina / 한국어](/i18n/README.ko.md)
- [Malajščina / Bahasa Malaysia](/i18n/README.ms.md)
- [norveščina (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [perzijski jezik / فارسی](/i18n/README.fa.md)
- [poljščina / Polski](/i18n/README.pl.md)
- [portugalski / Português](/i18n/README.pt.md)
- [portugalščina (brazilščina) / Português Brasileiro](/i18n/README.pt-br.md)
- [Romunščina / Română](/i18n/README.ro.md)
- [Ruski / Pусский](/i18n/README.ru.md)
- [srbski / Srpski](/i18n/README.sr.md)
- [Sinhala / සිංහල](/i18n/README.si.md)
- [Španščina / Español](/i18n/README.es.md)
- [Poenostavljena kitajščina / 简体中文](/i18n/README.zh-cn.md)
- [švedščina / Svenska](/i18n/README.sv.md)
- [Thai / ไทย](/i18n/README.th.md)
- [tradicionalna kitajščina / 繁體中文](/i18n/README.zh-tw.md)
- [Turščina / Türkçe](/i18n/README.tr.md)
- [ukrajinski / Українська](/i18n/README.uk.md)
- [Vietnamščina / Tiếng Việt](/i18n/README.vi-vn.md)
- [Seznam prevodov](/i18n/languages.md) <!--- Keep only this -->

---

## Sponzorji

[![Novi sponzor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/biobase)
