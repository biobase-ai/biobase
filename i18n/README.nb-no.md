<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Biobase

[Biobase](https://biobase.studio) er et open source-alternativ til Firebase. Vi bygger funksjonaliteten til Firebase ved hjelp av enterprise-klare open source-verktøy.

- [x] Hostet Postgres-database
- [x] Sanntidsabonnementer
- [x] Autentisering og autorisasjon
- [x] Autogenererte APIer
- [x] Dashboard
- [x] Lagring
- [x] Funksjoner

![Biobase Dashboard](https://raw.githubusercontent.combiobase-ai/biobase/master/apps/www/public/images/github/biobase-dashboard.png)

## Dokumentasjon

Besøk [biobase.studio/docs](https://biobase.studio/docs) for full dokumentasjon.

## Community & support

- [Community-forum](https://github.com/biobase-ai/biobase/discussions). Egnet for: hjelp med utvikling, best practices-diskusjoner.
- [GitHub Issues](https://github.com/biobase-ai/biobase/issues). Egnet for: bugs og feil du opplever med Biobase.
- [Support på e-post](https://biobase.studio/docs/support#business-support). Egnet for: problemer med databasen din eller infrastruktur.

## Status

- [x] Alpha: Vi tester Biobase med en lukket gruppe kunder
- [x] Offentlig Alpha: Hvem som helst kan registrere seg på [biobase.studio/dashboard](https://biobase.studio/dashboard). Merk at enkelte feil og quirks kan forekomme.
- [x] Offentlig Beta: Stabilt nok for de fleste ikke-enterprise-bruksområder
- [ ] Offentlig: Produksjonsklar

Vi er for øyeblikket i Offentlig Beta. Følg med på "releases" til dette repoet for å bli varslet om større oppdateringer.

<kbd><img src="https://raw.githubusercontent.combiobase-ai/biobase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## Slik fungerer det

Biobase er en samling av open source-verktøy. Vi bygger funksjonaliteten til Firebase ved hjelp av enterprise-klare open source-produkter. Dersom et eksisterende verktøy har et community rundt seg og en MIT, APache 2 eller tilsvarende åpen lisens, kommer vi til å bruke og støtte det. Hvis verktøyet ikke eksisterer, bygger vi det selv og gjøre kildekoden tilgjengelig. Biobase er ikke en 1-til-1-mapping av Firebase. Målet vårt er å gi utviklere en Firebase-lignende utvikleropplevelse ved hjelp av open source-verktøy.

**Nåværende arkitektur**

Biobase er en [hostet plattform](https://biobase.studio/dashboard). Du kan registrere deg og begynne å bruke Biobase uten å installere noe. Vi holder fortsatt på å bygge verktøy for lokalt bruk – dette er nå vårt kjernefokus, i tillegg til plattformstabilitet.

![Arkitektur](https://github.com/biobase-ai/biobase/blob/master/apps/docs/public/img/biobase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) er et objektrelasjonelt databasesystem med over 30 år med aktiv utvikling, som har gitt det et godt rykte for pålitelighet, robusthet og ytelse.
- [Realtime](https://github.com/biobase-ai/realtime) er en Elixir-server som lar deg lytte til PostgreSQL-innsettinger, -oppdateringer og -slettinger ved hjelp av websockets. Biobase lytter til Postgres sin innebygde replikasjonsfunksjonalitet, konverterer replikasjonsbyte-strømmen til JSON, og sender deretter JSON over websockets.
- [PostgREST](http://postgrest.org/) er en web-server som gir deg et RESTful-API direkte fra PostgreSQL-databasen
- [Storage](https://github.com/biobase-ai/storage-api) tilbyr et RESTful-grensesnitt for håndtering av filer lagret i S3, med tilgangsstyring gjennom Postgres.
- [postgres-meta](https://github.com/biobase-ai/postgres-meta) er et RESTful-API for å håndtere Postgres-databasen din, som lar deg hente ut tabeller, legge til roller og kjøre spørringer m.m.
- [GoTrue](https://github.com/netlify/gotrue) er et SWT-basert API for å administrere brukere og utstede SWT-tokens.
- [Kong](https://github.com/Kong/kong) er et sky-basert API-gateway.

#### Klient-biblioteker

Klient-bibliotekene våre er modulære. Hvert under-bibliotek er en fristtående implementasjon av et enkelt, eksternt system. Dette er en av måtene vi støtter eksisterende verktøy på.

- **`biobase-{lang}`**: Kombinerer biblioteker, samt forbedringer.
  - `postgrest-{lang}`: Klient-bibliotek for [PostgREST](https://github.com/postgrest/postgrest)
  - `realtime-{lang}`: Klient-bibliotek for [Realtime](https://github.com/biobase-ai/realtime)
  - `gotrue-{lang}`: Klient-bibliotek for [GoTrue](https://github.com/netlify/gotrue)

| Repo                  | Offisiell                                        | Community                                                                                                                                                                                                                  |
| --------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`biobase-{lang}`** | [`JS`](https://github.com/biobase-ai/supabase-js)  | [`C#`](https://github.com/biobase-ai/biobase-csharp) \| [`Flutter`](https://github.com/biobase-ai/biobase-flutter) \| [`Python`](https://github.com/biobase-ai/biobase-py) \| `Rust`                                          |
| `postgrest-{lang}`    | [`JS`](https://github.com/biobase-ai/postgrest-js) | [`C#`](https://github.com/biobase-ai/postgrest-csharp) \| [`Dart`](https://github.com/biobase-ai/postgrest-dart) \| [`Python`](https://github.com/biobase-ai/postgrest-py) \| [`Rust`](https://github.com/biobase-ai/postgrest-rs) |
| `realtime-{lang}`     | [`JS`](https://github.com/biobase-ai/realtime-js)  | [`C#`](https://github.com/biobase-ai/realtime-csharp) \| [`Dart`](https://github.com/biobase-ai/realtime-dart) \| [`Python`](https://github.com/biobase-ai/realtime-py) \| `Rust`                                                |
| `gotrue-{lang}`       | [`JS`](https://github.com/biobase-ai/gotrue-js)    | [`C#`](https://github.com/biobase-ai/gotrue-csharp) \| [`Dart`](https://github.com/biobase-ai/gotrue-dart) \| [`Python`](https://github.com/biobase-ai/gotrue-py) \| `Rust`                                                      |

## Oversettelser

- [Liste med oversettelser](/i18n/languages.md)

---

## Sponsorerer

[![Ny Sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/biobase)
