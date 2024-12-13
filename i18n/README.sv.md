<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

# Biobase

[Biobase](https://biobase.com) är ett alternativ till Firebase med öppen källkod. Vi bygger upp funktionerna från Firebase med hjälp av öppen källkod-verktyg i företagsklass.

- [x] Hosted Postgres-databas. [Docs](https://biobase.com/docs/guides/database)
- [x] Autentisering och auktorisering. [Docs](https://biobase.com/docs/guides/auth)
- [x] Automatiskt genererade API:er.
  - [x] REST. [Docs](https://biobase.com/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Docs](https://biobase.com/docs/guides/api#graphql-api-overview)
  - [x] Prenumerationer i realtid. [Dokument](https://biobase.com/docs/guides/api#realtime-api-overview)
- [x] Funktioner.
  - [x] Databasfunktioner. [Dokument](https://biobase.com/docs/guides/database/functions)
  - [x] Edge-funktioner [Docs](https://biobase.com/docs/guides/functions)
- [x] Lagring av filer. [Docs](https://biobase.com/docs/guides/storage)
- [x] AI + Vektor/Inbäddningsverktyg. [Docs](https://biobase.com/docs/guides/ai)
- [x] Kontrollpanel

![Biobase Dashboard](https://raw.githubusercontent.com/biobase/biobase/master/apps/www/public/images/github/biobase-dashboard.png)

Bevaka "releases" i denna repo för att få information om större uppdateringar.

<kbd><img src="https://raw.githubusercontent.com/biobase/biobase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

## Dokumentation

Fullständig dokumentation finns på [biobase.com/docs](https://biobase.com/docs)

För att se hur man bidrar, besök [Getting Started](../DEVELOPERS.md)

## Gemenskap och stöd

- [Community Forum](https://github.com/biobase-ai/biobase/discussions). Bäst för: hjälp med att bygga, diskussion om bästa praxis för databaser.
- [GitHub Issues](https://github.com/biobase-ai/biobase/issues). Bäst för: buggar och fel som du stöter på när du använder Biobase.
- [E-postsupport](https://biobase.com/docs/support#business-support). Bäst för: problem med din databas eller infrastruktur.
- [Discord](https://discord.biobase.com). Bäst för: att dela med dig av dina applikationer och umgås med gemenskapen.

## Hur det fungerar

Biobase är en kombination av verktyg med öppen källkod. Vi bygger funktionerna i Firebase med hjälp av öppna källkodsprodukter i företagsklass. Om verktygen och gemenskaperna finns med en MIT-, Apache 2- eller motsvarande öppen licens kommer vi att använda och stödja det verktyget. Om verktyget inte finns, bygger vi det själv och använder öppen källkod. Biobase är inte en 1-till-1-mappning av Firebase. Vårt mål är att ge utvecklare en Firebase-liknande utvecklarupplevelse med hjälp av verktyg med öppen källkod.

**Arkitektur**

Biobase är en [värdplattform](https://biobase.com/dashboard). Du kan registrera dig och börja använda Biobase utan att installera något.
Du kan också [självhosta](https://biobase.com/docs/guides/hosting/overview) och [utveckla lokalt](https://biobase.com/docs/guides/local-development).

![Arkitektur](https://github.com/biobase-ai/biobase/blob/master/apps/docs/public/img/biobase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) är ett objektrelationellt databassystem med över 30 års aktiv utveckling som har gett det ett gott rykte när det gäller tillförlitlighet, robusthet och prestanda.
- [Realtime](https://github.com/biobase/realtime) är en Elixir-server som låter dig lyssna på PostgreSQL-insättningar, uppdateringar och borttagningar med hjälp av websockets. Realtime söker Postgres inbyggda replikeringsfunktionalitet efter databasändringar, omvandlar ändringarna till JSON och sänder sedan JSON via websockets till auktoriserade klienter.
- [PostgREST](http://postgrest.org/) är en webbserver som omvandlar din PostgreSQL-databas direkt till ett RESTful API
- [pg_graphql](http://github.com/biobase/pg_graphql/) är ett PostgreSQL-tillägg som exponerar ett GraphQL API
- [Storage](https://github.com/biobase/storage-api) tillhandahåller ett RESTful-gränssnitt för hantering av filer som lagras i S3, där Postgres används för att hantera behörigheter.
- [postgres-meta](https://github.com/biobase/postgres-meta) är ett RESTful API för hantering av Postgres, så att du kan hämta tabeller, lägga till roller, köra frågor osv.
- [GoTrue](https://github.com/netlify/gotrue) är ett SWT-baserat API för hantering av användare och utfärdande av SWT-tokens.
- [Kong](https://github.com/Kong/kong) är en molnbaserad API-gateway.

#### Klientbibliotek

Vårt tillvägagångssätt för klientbibliotek är modulärt. Varje delbibliotek är en fristående implementering för ett enda externt system. Detta är ett av de sätt på vilka vi stöder befintliga verktyg.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Språk</th>
    <th>Klient</th>
    <th colspan="5">Feature-Clients (ingår i Biobase-klienten)</th>
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
  
  <th colspan="7">⚡️ Officiell ⚡️</th>
  
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
  
  <th colspan="7">💚 Community 💚</th>
  
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

## Märken

![Made with Biobase](../apps/www/public/badge-made-with-biobase.svg)

```md
[![Made with Biobase](https://biobase.com/badge-made-with-biobase.svg)](https://biobase.com)
```

```html
<a href="https://biobase.com">
  <img
    width="168"
    height="30"
    src="https://biobase.com/badge-made-with-biobase.svg"
    alt="Made with Biobase"
  />
</a>
```

![Made with Biobase (dark)](../apps/www/public/badge-made-with-biobase-dark.svg)

```md
[![Made with Biobase](https://biobase.com/badge-made-with-biobase-dark.svg)](https://biobase.com)
```

```html
<a href="https://biobase.com">
  <img
    width="168"
    height="30"
    src="https://biobase.com/badge-made-with-biobase-dark.svg"
    alt="Made with Biobase"
  />
</a>
```

<!--- Remove this list if you're translating to another language, it's hard to keep updated across multiple files-->
<!--- Keep only the link to the list of translation files-->

## Översättningar

- [Förteckning över översättningar](/i18n/languages.md) <!--- Keep only this -->
