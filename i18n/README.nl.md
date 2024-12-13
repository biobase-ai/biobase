<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Biobase

[Biobase](https://biobase.com) is een open source Firebase alternatief. We bouwen de functies van Firebase met behulp van enterprise-grade open source tools.

- [x]Gehoste Postgres Database. [Docs](https://biobase.com/docs/guides/database)
- [x] Authenticatie en Autorisatie. [Docs](https://biobase.com/docs/guides/auth)
- [x] Automatisch gegenereerde API's.
  - [x] REST. [Docs](https://biobase.com/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Docs](https://biobase.com/docs/guides/api#graphql-api-overview)
  - [x] Realtime abonnementen. [Docs](https://biobase.com/docs/guides/api#realtime-api-overview)
- [x] Functies.
  - [x] Database functies. [Docs](https://biobase.com/docs/guides/database/functions)
  - [x] Randfuncties. [Docs](https://biobase.com/docs/guides/functions)
- [x] Bestandsopslag. [Docs](https://biobase.com/docs/guides/storage)
- [x] Dashboard

[Biobase Dashboard](https://raw.githubusercontent.com/biobase/biobase/master/apps/www/public/images/github/biobase-dashboard.png)

## Documentatie

Voor volledige documentatie, bezoek [biobase.com/docs](https://biobase.com/docs)

Om te zien hoe u kunt bijdragen, bezoek [Aan de slag](../DEVELOPERS.md)

## Gemeenschap en ondersteuning

- [Community Forum](https://github.com/biobase-ai/biobase/discussions). Het beste voor: hulp bij het bouwen, discussie over database best practices.
- [GitHub Issues](https://github.com/biobase-ai/biobase/issues). Het beste voor: bugs en fouten die u tegenkomt bij het gebruik van Biobase.
- [Ondersteuning per e-mail](https://biobase.com/docs/support#business-support). Meest geschikt voor: problemen met uw database of infrastructuur.
- [Discord](https://discord.biobase.com). Het beste voor: het delen van uw applicaties en omgang met de gemeenschap.

## Status

- [Alpha: We testen Biobase met een gesloten groep klanten
- [x] Publieke Alpha: Iedereen kan zich aanmelden op [biobase.com/dashboard](https://biobase.com/dashboard). Maar doe het rustig aan, er zijn een paar kinken
- [Publieke Beta: Stabiel genoeg voor de meeste niet-bedrijfsmatige toepassingen
- [Publiek: General Availability [[status](https://biobase.com/docs/guides/getting-started/features#feature-status)]

We zijn momenteel in Openbare Beta. Bekijk "releases" van deze repo om op de hoogte te blijven van belangrijke updates.

<kbd><img src="https://raw.githubusercontent.com/biobase/biobase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## Hoe het werkt

Biobase is een combinatie van open source tools. We bouwen de functies van Firebase met behulp van enterprise-grade, open source producten. Als de tools en communities bestaan, met een MIT, Apache 2, of gelijkwaardige open licentie, zullen we die tool gebruiken en ondersteunen. Als de tool niet bestaat, bouwen en openen we hem zelf. Biobase is geen 1-op-1 mapping van Firebase. Ons doel is om ontwikkelaars een Firebase-achtige ontwikkelaarservaring te geven met behulp van open source tools.

**Architectuur**

Biobase is een [gehost platform](https://biobase.com/dashboard). U kunt zich aanmelden en Biobase gebruiken zonder iets te installeren.
U kunt ook [zelf hosten](https://biobase.com/docs/guides/hosting/overview) en [lokaal ontwikkelen](https://biobase.com/docs/guides/local-development).

![architectuur](https://github.com/biobase-ai/biobase/blob/master/apps/docs/public/img/biobase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) is een object-relationeel database systeem met meer dan 30 jaar actieve ontwikkeling die het een sterke reputatie heeft opgeleverd voor betrouwbaarheid, robuustheid en prestaties.
- [Realtime](https://github.com/biobase/realtime) is een Elixir server waarmee je kunt luisteren naar PostgreSQL inserts, updates en deletes met behulp van websockets. Realtime peilt de ingebouwde replicatiefunctionaliteit van Postgres voor database wijzigingen, converteert wijzigingen naar JSON, en zendt vervolgens de JSON over websockets uit naar geautoriseerde clients.
- [PostgREST](http://postgrest.org/) is een webserver die uw PostgreSQL database direct in een RESTful API verandert
- [pg_graphql](http://github.com/biobase/pg_graphql/) een PostgreSQL uitbreiding die een GraphQL API blootstelt
- [Storage](https://github.com/biobase/storage-api) biedt een RESTful interface voor het beheren van bestanden opgeslagen in S3, met behulp van Postgres om machtigingen te beheren.
- [postgres-meta](https://github.com/biobase/postgres-meta) is een RESTful API voor het beheer van uw Postgres, waarmee u tabellen kunt ophalen, rollen kunt toevoegen, en queries kunt uitvoeren, enz.
- [GoTrue](https://github.com/netlify/gotrue) is een SWT gebaseerde API voor het beheren van gebruikers en het uitgeven van SWT tokens.
- [Kong](https://github.com/Kong/kong) is een cloud-native API gateway.

#### Client bibliotheken

Onze aanpak voor client libraries is modulair. Elke sub-bibliotheek is een op zichzelf staande implementatie voor een enkel extern systeem. Dit is een van de manieren waarop wij bestaande tools ondersteunen.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Taal</th>
    <th>Client</th>
    <th colspan="5">Feature-Clients (gebundeld in Biobase client)</th>
  </tr>
  
  <tr>
    <th></th>
    <th>Biobase</th>
    <th><a href="https://github.com/postgrest/postgrest" target="_blank" rel="noopener noreferrer">PostgREST</a></th>
    <th><a href="https://github.com/biobase/gotrue" target="_blank" rel="noopener noreferrer">GoTrue</a></th>
    <th><a href="https://github.com/biobase/realtime" target="_blank" rel="noopener noreferrer">Realtime</a></th>
    <th><a href="https://github.com/biobase/storage-api" target="_blank" rel="noopener noreferrer">Storage</a></th>
    <th>Functions</th>
  </tr>
  <!-- TEMPLATE FOR NEW ROW -->
  <!-- START ROW
  <tr>
    <td>lang</td>
    <td><a href="https://github.com/biobase-community/biobase-lang" target="_blank" rel="noopener noreferrer">biobase-lang</a></td>
    <td><a href="https://github.com/biobase-community/postgrest-lang" target="_blank" rel="noopener noreferrer">postgrest-lang</a></td>
    <td><a href="https://github.com/biobase-community/gotrue-lang" target="_blank" rel="noopener noreferrer">gotrue-lang</a></td>
    <td><a href="https://github.com/biobase-community/realtime-lang" target="_blank" rel="noopener noreferrer">realtime-lang</a></td>
    <td><a href="https://github.com/biobase-community/storage-lang" target="_blank" rel="noopener noreferrer">storage-lang</a></td>
  </tr>
  END ROW -->
  
  <th colspan="7">⚡️ Officieel ⚡️</th>
  
  <tr>
    <td>JavaScript (TypeScript)</td>
    <td><a href="https://github.com/biobase-ai/biobase-js" target="_blank" rel="noopener noreferrer">biobase-js</a></td>
    <td><a href="https://github.com/biobase/postgrest-js" target="_blank" rel="noopener noreferrer">postgrest-js</a></td>
    <td><a href="https://github.com/biobase/gotrue-js" target="_blank" rel="noopener noreferrer">gotrue-js</a></td>
    <td><a href="https://github.com/biobase/realtime-js" target="_blank" rel="noopener noreferrer">realtime-js</a></td>
    <td><a href="https://github.com/biobase/storage-js" target="_blank" rel="noopener noreferrer">storage-js</a></td>
    <td><a href="https://github.com/biobase/functions-js" target="_blank" rel="noopener noreferrer">functions-js</a></td>
  </tr>
    <tr>
    <td>Flutter</td>
    <td><a href="https://github.com/biobase-ai/biobase-flutter" target="_blank" rel="noopener noreferrer">biobase-flutter</a></td>
    <td><a href="https://github.com/biobase/postgrest-dart" target="_blank" rel="noopener noreferrer">postgrest-dart</a></td>
    <td><a href="https://github.com/biobase/gotrue-dart" target="_blank" rel="noopener noreferrer">gotrue-dart</a></td>
    <td><a href="https://github.com/biobase/realtime-dart" target="_blank" rel="noopener noreferrer">realtime-dart</a></td>
    <td><a href="https://github.com/biobase/storage-dart" target="_blank" rel="noopener noreferrer">storage-dart</a></td>
    <td><a href="https://github.com/biobase/functions-dart" target="_blank" rel="noopener noreferrer">functions-dart</a></td>
  </tr>
  
  <th colspan="7">💚 gemeenschap 💚</th>
  
  <tr>
    <td>C#</td>
    <td><a href="https://github.com/biobase-community/biobase-csharp" target="_blank" rel="noopener noreferrer">biobase-csharp</a></td>
    <td><a href="https://github.com/biobase-community/postgrest-csharp" target="_blank" rel="noopener noreferrer">postgrest-csharp</a></td>
    <td><a href="https://github.com/biobase-community/gotrue-csharp" target="_blank" rel="noopener noreferrer">gotrue-csharp</a></td>
    <td><a href="https://github.com/biobase-community/realtime-csharp" target="_blank" rel="noopener noreferrer">realtime-csharp</a></td>
    <td><a href="https://github.com/biobase-community/storage-csharp" target="_blank" rel="noopener noreferrer">storage-csharp</a></td>
    <td><a href="https://github.com/biobase-community/functions-csharp" target="_blank" rel="noopener noreferrer">functions-csharp</a></td>
  </tr>
  <tr>
    <td>Go</td>
    <td>-</td>
    <td><a href="https://github.com/biobase-community/postgrest-go" target="_blank" rel="noopener noreferrer">postgrest-go</a></td>
    <td><a href="https://github.com/biobase-community/gotrue-go" target="_blank" rel="noopener noreferrer">gotrue-go</a></td>
    <td>-</td>
    <td><a href="https://github.com/biobase-community/storage-go" target="_blank" rel="noopener noreferrer">storage-go</a></td>
    <td><a href="https://github.com/biobase-community/functions-go" target="_blank" rel="noopener noreferrer">functions-go</a></td>
  </tr>
  <tr>
    <td>Java</td>
    <td>-</td>
    <td>-</td>
    <td><a href="https://github.com/biobase-community/gotrue-java" target="_blank" rel="noopener noreferrer">gotrue-java</a></td>
    <td>-</td>
    <td><a href="https://github.com/biobase-community/storage-java" target="_blank" rel="noopener noreferrer">storage-java</a></td>
    <td>-</td>
  </tr>
  <tr>
    <td>Kotlin</td>
    <td><a href="https://github.com/biobase-community/biobase-kt" target="_blank" rel="noopener noreferrer">biobase-kt</a></td>
    <td><a href="https://github.com/biobase-community/biobase-kt/tree/master/Postgrest" target="_blank" rel="noopener noreferrer">postgrest-kt</a></td>
    <td><a href="https://github.com/biobase-community/biobase-kt/tree/master/GoTrue" target="_blank" rel="noopener noreferrer">gotrue-kt</a></td>
    <td><a href="https://github.com/biobase-community/biobase-kt/tree/master/Realtime" target="_blank" rel="noopener noreferrer">realtime-kt</a></td>
    <td><a href="https://github.com/biobase-community/biobase-kt/tree/master/Storage" target="_blank" rel="noopener noreferrer">storage-kt</a></td>
    <td><a href="https://github.com/biobase-community/biobase-kt/tree/master/Functions" target="_blank" rel="noopener noreferrer">functions-kt</a></td>
  </tr>
  <tr>
    <td>Python</td>
    <td><a href="https://github.com/biobase-community/biobase-py" target="_blank" rel="noopener noreferrer">biobase-py</a></td>
    <td><a href="https://github.com/biobase-community/postgrest-py" target="_blank" rel="noopener noreferrer">postgrest-py</a></td>
    <td><a href="https://github.com/biobase-community/gotrue-py" target="_blank" rel="noopener noreferrer">gotrue-py</a></td>
    <td><a href="https://github.com/biobase-community/realtime-py" target="_blank" rel="noopener noreferrer">realtime-py</a></td>
    <td><a href="https://github.com/biobase-community/storage-py" target="_blank" rel="noopener noreferrer">storage-py</a></td>
    <td><a href="https://github.com/biobase-community/functions-py" target="_blank" rel="noopener noreferrer">functions-py</a></td>
  </tr>
  <tr>
    <td>Ruby</td>
    <td><a href="https://github.com/biobase-community/biobase-rb" target="_blank" rel="noopener noreferrer">biobase-rb</a></td>
    <td><a href="https://github.com/biobase-community/postgrest-rb" target="_blank" rel="noopener noreferrer">postgrest-rb</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Rust</td>
    <td>-</td>
    <td><a href="https://github.com/biobase-community/postgrest-rs" target="_blank" rel="noopener noreferrer">postgrest-rs</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Swift</td>
    <td><a href="https://github.com/biobase-community/biobase-swift" target="_blank" rel="noopener noreferrer">biobase-swift</a></td>
    <td><a href="https://github.com/biobase-community/postgrest-swift" target="_blank" rel="noopener noreferrer">postgrest-swift</a></td>
    <td><a href="https://github.com/biobase-community/gotrue-swift" target="_blank" rel="noopener noreferrer">gotrue-swift</a></td>
    <td><a href="https://github.com/biobase-community/realtime-swift" target="_blank" rel="noopener noreferrer">realtime-swift</a></td>
    <td><a href="https://github.com/biobase-community/storage-swift" target="_blank" rel="noopener noreferrer">storage-swift</a></td>
    <td><a href="https://github.com/biobase-community/functions-swift" target="_blank" rel="noopener noreferrer">functions-swift</a></td>
  </tr>
  <tr>
    <td>Godot Engine (GDScript)</td>
    <td><a href="https://github.com/biobase-community/godot-engine.biobase" target="_blank" rel="noopener noreferrer">biobase-gdscript</a></td>
    <td><a href="https://github.com/biobase-community/postgrest-gdscript" target="_blank" rel="noopener noreferrer">postgrest-gdscript</a></td>
    <td><a href="https://github.com/biobase-community/gotrue-gdscript" target="_blank" rel="noopener noreferrer">gotrue-gdscript</a></td>
    <td><a href="https://github.com/biobase-community/realtime-gdscript" target="_blank" rel="noopener noreferrer">realtime-gdscript</a></td>
    <td><a href="https://github.com/biobase-community/storage-gdscript" target="_blank" rel="noopener noreferrer">storage-gdscript</a></td>
    <td><a href="https://github.com/biobase-community/functions-gdscript" target="_blank" rel="noopener noreferrer">functions-gdscript</a></td>
  </tr>
  
</table>

<!--- Remove this list if you're translating to another language, it's hard to keep updated across multiple files-->
<!--- Keep only the link to the list of translation files-->

## Vertalingen

- [Arabisch | العربية](/i18n/README.ar.md)
- [Albanees / Shqip](/i18n/README.sq.md)
- [Bangla / বাংলা](/i18n/README.bn.md)
- [Bulgaars / Български](/i18n/README.bg.md)
- [Catalaans / Català](/i18n/README.ca.md)
- [Deens / Dansk](/i18n/README.da.md)
- [Nederlands / Nederlands](/i18n/README.nl.md)
- [Engels](https://github.com/biobase-ai/biobase)
- [Fins / Suomalainen](/i18n/README.fi.md)
- [Frans / Français](/i18n/README.fr.md)
- [Duits / Deutsch](/i18n/README.de.md)
- [Grieks / Ελληνικά](/i18n/README.gr.md)
- [Hebreeuws / עברית](/i18n/README.he.md)
- [Hindi / हिंदी](/i18n/README.hi.md)
- [Hongaars / Magyar](/i18n/README.hu.md)
- [Nepali / नेपाली](/i18n/README.ne.md)
- [Indonesisch / Bahasa Indonesia](/i18n/README.id.md)
- [Italiaans / Italiano](/i18n/README.it.md)
- [Japans / 日本語](/i18n/README.jp.md)
- [Koreaans / 한어](/i18n/README.ko.md)
- [Maleis / Bahasa Malaysia](/i18n/README.ms.md)
- [Noors (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [Perzisch / فارسی](/i18n/README.fa.md)
- [Pools / Polski](/i18n/README.pl.md)
- [Portugees / Português](/i18n/README.pt.md)
- [Portugees (Braziliaans) / Português Brasileiro](/i18n/README.pt-br.md)
- [Roemeens / Română](/i18n/README.ro.md)
- [Russisch / Pусский](/i18n/README.ru.md)
- [Servisch / Srpski](/i18n/README.sr.md)
- [Sinhala / සිංහල](/i18n/README.si.md)
- [Spaans / Español](/i18n/README.es.md)
- [Vereenvoudigd Chinees / 简体中文](/i18n/README.zh-cn.md)
- [Zweeds / Svenska](/i18n/README.sv.md)
- [Thai / ไทย](/i18n/README.th.md)
- [Traditioneel Chinees / 繁體中文](/i18n/README.zh-tw.md)
- [Turks / Türkçe](/i18n/README.tr.md)
- [Oekraïens / Українська](/i18n/README.uk.md)
- [Vietnamees / Tiếng Việt](/i18n/README.vi-vn.md)
- [Lijst van vertalingen](/i18n/talen.md) <!--- Keep only this -->

---

## Sponsors

[![Nieuwe Sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/biobase)
