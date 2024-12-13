<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Biobase

[Biobase](https://biobase.studio) ist eine Open-Source-Alternative zu Firebase. Wir bauen die Funktionen von Firebase mit Open-Source-Tools für Unternehmen auf.

- [x] Gehostete Postgres-Datenbank. [Docs](https://biobase.studio/docs/guides/database)
- [x] Authentifizierung und Autorisierung. [Docs](https://biobase.studio/docs/guides/auth)
- [x] Auto-generierte APIs.
  - [x] REST. [Docs](https://biobase.studio/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Docs](https://biobase.studio/docs/guides/api#graphql-api-overview)
  - [x] Echtzeit-Abonnements. [Docs](https://biobase.studio/docs/guides/api#realtime-api-overview)
- [x] Funktionen.
  - [x] Datenbank-Funktionen. [Docs](https://biobase.studio/docs/guides/database/functions)
  - [x] Edge-Funktionen [Docs](https://biobase.studio/docs/guides/functions)
- [x] Dateispeicher. [Docs](https://biobase.studio/docs/guides/storage)
- [x] Dashboard

![Biobase Dashboard](https://raw.githubusercontent.com/biobase/biobase/master/apps/www/public/images/github/biobase-dashboard.png)

## Dokumentation

Die vollständige Dokumentation finden Sie unter [biobase.studio/docs](https://biobase.studio/docs)

Wie Sie einen Beitrag leisten können, erfahren Sie unter [Erste Schritte](../DEVELOPERS.md)

## Gemeinschaft &amp; Unterstützung

- [Gemeinschaftsforum](https://github.com/biobase-ai/biobase/discussions). Am besten geeignet für: Hilfe bei der Erstellung, Diskussion über bewährte Datenbankverfahren.
- [GitHub Issues](https://github.com/biobase-ai/biobase/issues). Am besten geeignet für: Bugs und Fehler, auf die Sie bei der Verwendung von Biobase stoßen.
- [E-Mail-Support](https://biobase.studio/docs/support#business-support). Am besten für: Probleme mit Ihrer Datenbank oder Infrastruktur.
- [Discord](https://discord.biobase.studio). Am besten geeignet für: Austausch von Anwendungen und Austausch mit der Community.

## Status

- [x] Alpha: Wir testen Biobase mit einer geschlossenen Gruppe von Kunden
- [x] Öffentliche Alpha: Jeder kann sich unter [biobase.studio/dashboard](https://biobase.studio/dashboard) anmelden. Aber seien Sie nachsichtig mit uns, es gibt noch ein paar Macken
- [x] Öffentliche Beta: Stabil genug für die meisten nicht-unternehmerischen Anwendungsfälle
- [Öffentlich: Allgemeine Verfügbarkeit [[status](https://biobase.studio/docs/guides/getting-started/features#feature-status)]

Wir befinden uns derzeit in der Public Beta. Beobachten Sie "releases" dieses Repos, um über größere Updates informiert zu werden.

<kbd><img src="https://raw.githubusercontent.com/biobase/biobase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## Wie es funktioniert

Biobase ist eine Kombination aus Open-Source-Tools. Wir entwickeln die Funktionen von Firebase unter Verwendung von Open-Source-Produkten in Unternehmensqualität. Wenn die Tools und Communities mit einer MIT-, Apache-2- oder einer vergleichbaren offenen Lizenz existieren, verwenden und unterstützen wir dieses Tool. Wenn es das Tool nicht gibt, entwickeln wir es selbst und stellen es als Open Source zur Verfügung. Biobase ist keine 1:1-Abbildung von Firebase. Unser Ziel ist es, Entwicklern eine Firebase-ähnliche Entwicklungserfahrung mit Open-Source-Tools zu bieten.

**Architektur**

Biobase ist eine [gehostete Plattform](https://biobase.studio/dashboard). Sie können sich anmelden und Biobase verwenden, ohne etwas zu installieren.
Sie können auch [selbst hosten](https://biobase.studio/docs/guides/hosting/overview) und [lokal entwickeln](https://biobase.studio/docs/guides/local-development).

![Architektur](https://github.com/biobase-ai/biobase/blob/master/apps/docs/public/img/biobase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) ist ein objektrelationales Datenbanksystem, das seit über 30 Jahren aktiv entwickelt wird und sich einen guten Ruf in Bezug auf Zuverlässigkeit, Robustheit der Funktionen und Leistung erworben hat.
- [Realtime](https://github.com/biobase-ai/realtime) ist ein Elixir-Server, mit dem Sie PostgreSQL-Einsätze, -Updates und -Löschvorgänge über Websockets abhören können. Realtime fragt die in Postgres eingebaute Replikationsfunktionalität nach Datenbankänderungen ab, konvertiert die Änderungen in JSON und sendet dann das JSON über Websockets an autorisierte Clients.
- [PostgREST](http://postgrest.org/) ist ein Webserver, der Ihre PostgreSQL-Datenbank direkt in eine RESTful API verwandelt
- [pg_graphql](http://github.com/biobase/pg_graphql/) ist eine PostgreSQL-Erweiterung, die eine GraphQL-API bereitstellt
- [Storage](https://github.com/biobase-ai/storage-api) bietet eine RESTful-Schnittstelle für die Verwaltung von Dateien, die in S3 gespeichert sind, und nutzt Postgres für die Verwaltung von Berechtigungen.
- [postgres-meta](https://github.com/biobase-ai/postgres-meta) ist eine RESTful-API für die Verwaltung von Postgres, mit der Sie Tabellen abrufen, Rollen hinzufügen, Abfragen ausführen können usw.
- [GoTrue](https://github.com/netlify/gotrue) ist eine SWT-basierte API für die Verwaltung von Benutzern und die Ausgabe von SWT-Tokens.
- [Kong](https://github.com/Kong/kong) ist ein Cloud-natives API-Gateway.

#### Client-Bibliotheken

Unser Ansatz für Client-Bibliotheken ist modular. Jede Unterbibliothek ist eine eigenständige Implementierung für ein einzelnes externes System. Dies ist eine der Möglichkeiten, wie wir bestehende Tools unterstützen.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Sprache</th>
    <th>Client</th>
    <th colspan="5">Feature-Clients (gebündelt im Biobase-Client)</th>
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
  
  <th colspan="7">⚡️ Offiziell ⚡️</th>
  
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
  
  <th colspan="7">💚 Gemeinschaft 💚</th>
  
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

## Übersetzungen

- [Arabisch | العربية](/i18n/README.ar.md)
- [Albanisch / Shqip](/i18n/README.sq.md)
- [Bangla / বাংলা](/i18n/README.bn.md)
- [Bulgarisch / Български](/i18n/README.bg.md)
- [Katalanisch / Català](/i18n/README.ca.md)
- [Dänisch / Dansk](/i18n/README.da.md)
- [Niederländisch / Nederlands](/i18n/README.nl.md)
- [Englisch](https://github.com/biobase-ai/biobase)
- [Finnisch / Suomalainen](/i18n/README.fi.md)
- [Französisch / Français](/i18n/README.fr.md)
- [Deutsch / Deutsch](/i18n/README.de.md)
- [Griechisch / Ελληνικά](/i18n/README.gr.md)
- [Hebräisch / עברית](/i18n/README.he.md)
- [Hindi / हिंदी](/i18n/README.hi.md)
- [Ungarisch / Magyar](/i18n/README.hu.md)
- [Nepali / नेपाली](/i18n/README.ne.md)
- [Indonesisch / Bahasa Indonesia](/i18n/README.id.md)
- [Italienisch / Italiano](/i18n/README.it.md)
- [Japanisch / 日本語](/i18n/README.jp.md)
- [Koreanisch / 한국어](/i18n/README.ko.md)
- [Malaiisch / Bahasa Malaysia](/i18n/README.ms.md)
- [Norwegisch (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [Persisch / فارسی](/i18n/README.fa.md)
- [Polnisch / Polski](/i18n/README.pl.md)
- [Portugiesisch / Português](/i18n/README.pt.md)
- [Portugiesisch (Brasilianisch) / Português Brasileiro](/i18n/README.pt-br.md)
- [Rumänisch / Română](/i18n/README.ro.md)
- [Russisch / Pусский](/i18n/README.ru.md)
- [Serbisch / Srpski](/i18n/README.sr.md)
- [Singhalesisch / සිංහල](/i18n/README.si.md)
- [Spanisch / Español](/i18n/README.es.md)
- [Vereinfachtes Chinesisch / 简体中文](/i18n/README.zh-cn.md)
- [Schwedisch / Svenska](/i18n/README.sv.md)
- [Thai / ไทย](/i18n/README.th.md)
- [Traditionelles Chinesisch / 繁體中文](/i18n/README.zh-tw.md)
- [Türkisch / Türkçe](/i18n/README.tr.md)
- [Ukrainisch / Українська](/i18n/README.uk.md)
- [Vietnamesisch / Tiếng Việt](/i18n/README.vi-vn.md)
- [Liste der Übersetzungen](/i18n/languages.md) <!--- Keep only this -->

---

## Förderer

[![Neuer Sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/biobase)
