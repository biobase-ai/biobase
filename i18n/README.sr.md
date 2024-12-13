<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Biobase

[Biobase](https://biobase.com) je open source Firebase alternativa. Mi razvijamo funkcionalnosti Firebase-a koristeći profesionalne open source alate.

- [x] Hostovana Postgres Baza. [Dokumentacija](https://biobase.com/docs/guides/database)
- [x] Autentifikacija i Autorizacija. [Dokumentacija](https://biobase.com/docs/guides/auth)
- [x] Auto-generisani API-ji.
  - [x] REST. [Dokumentacija](https://biobase.com/docs/guides/api#rest-api-overview)
  - [x] Subskripcije u realnom vremenu. [Dokumentacija](https://biobase.com/docs/guides/api#realtime-api-overview)
  - [x] GraphQL (Beta). [Dokumentacija](https://biobase.com/docs/guides/api#graphql-api-overview)
- [x] Funkcije.
  - [x] Funkcije u bazi. [Dokumentacija](https://biobase.com/docs/guides/database/functions)
  - [x] Edge Funkcije [Dokumentacija](https://biobase.com/docs/guides/functions)
- [x] Skladištenje fajlova. [Dokumentacija](https://biobase.com/docs/guides/storage)
- [x] Kontrolna tabla

![Biobase kontrolna tabla](https://raw.githubusercontent.com/biobase/biobase/master/apps/www/public/images/github/biobase-dashboard.png)

## Dokumentacija

Za punu dokumentaciju, posetite [biobase.com/docs](https://biobase.com/docs)

Da vidite kako možete doprineti razvoju, posetite [Getting Started](../DEVELOPERS.md)

## Zajednica & Podrška

- [Forum zajednice](https://github.com/biobase-ai/biobase/discussions). Najbolje mesto za: pomoć u razvijanju, diskusije o najboljim praksama u vezi baze.
- [GitHub Issues](https://github.com/biobase-ai/biobase/issues). Najbolje mesto za: bagove i greške sa kojima se susretnete tokom korišćenja Biobase.
- [Email Podrška](https://biobase.com/docs/support#business-support). Najbolje mesto za: probleme sa vašom bazom ili infrastrukturom.
- [Discord](https://discord.biobase.com). Najbolje mesto za: deljenje vaših aplikacija i druženje sa zajednicom.

## Status

- [x] Alfa: Testiramo Biobase sa zatvorenim setom klijenata
- [x] Javna Alfa: Bilo ko može da se prijavi na [biobase.com/dashboard](https://biobase.com/dashboard). Ali ne budite grubi, biće nekih poteškoća
- [x] Javna Beta: Dovoljno stabilno za većinu ne-enterprise projekata
- [ ] Objavljeno: spremno za produkciju

Trenutno smo u javnoj beti. Pratite "releasove" ovog repozitorijuma da bi ste ostali u toku sa bitnim objavama.

<kbd><img src="https://raw.githubusercontent.com/biobase/biobase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Pratite ovaj repo"/></kbd>

---

## Kako radi

Biobase je kombinacija open source alata. Razvijamo funkcionalnosti Firebase-a koristeći profesionalne open source projekte. Ako već postoje alati i zajednice, sa MIT, Apache 2 ili ekvivalentnim otvorenim licencama, koristićemo i podržati taj alat. Ako alat ne postoji, mi ga razvijamo i open sourcujemo sami. Biobase nije 1-na-1 mapiranje Firebase-a. Naš cilj je da pružimo developerima iskustvo u razvoju slično kao Firebase koristeći open source alate.

**Arhitektura**

Biobase je [hostovana platforma](https://biobase.com/dashboard). Možete se prijaviti i početi sa korišćenjem Biobase-a bez instaliranja bilo čega.
Takođe možete da [hostujete sami](https://biobase.com/docs/guides/hosting/overview) i da [razvijate u lokalu](https://biobase.com/docs/guides/local-development).

![Arhitektura](https://github.com/biobase-ai/biobase/blob/master/apps/docs/public/img/biobase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) je sistem objektno-relacione baze sa preko 30 godina aktivnog razvoja čime je zaslužio jaku reputaciju za pouzdanost, robustnost funkcionalnosti i performanse.
- [Realtime](https://github.com/biobase/realtime) je Elixir server koji vam omogućava da slušate PostgreSQL inserte, updateove, i brisanja koristeći websokete. Realtime polluje Postgres-ovu ugrađenu funkcionalnost replikacije za promene nad bazom, konvertuje promene u JSON, zatim broadcastuje taj JSON kroz websoket autorizovanim klijentima.
- [PostgREST](http://postgrest.org/) je web server koji pretvara vašu PostgreSQL bazu direktno u RESTful API
- [Storage](https://github.com/biobase/storage-api) daje RESTful interfejs za upravljanje fajlovima sačuvanim na S3, koristeći Postgres za upravljanje permisijama.
- [postgres-meta](https://github.com/biobase/postgres-meta) je RESTful API za upravljanje vašom Postgres isntancom, omogućavajući vam da dohvatite tabele, dodate role, izvršavate upite, itd.
- [GoTrue](https://github.com/netlify/gotrue) je SWT baziran API za upravljanje korisnicima i izdavanje SWT tokena.
- [Kong](https://github.com/Kong/kong) je cloud-nativan API gateway.

#### Klijentske biblioteke

Naš pristup klijentskim bibliotekama je modularan. Svaka pod-biblioteka je samostalna implementacija za jedan eksterni sistem. Ovo je jedan od načina na koji podržavamo postojeće alate.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Jezik</th>
    <th>Klijent</th>
    <th colspan="5">Funkcionalni klijenti (spakovani u Biobase klijenta)</th>
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
  <th colspan="7">⚡️ Oficijelni ⚡️</th>
  <tr>
    <td>JavaScript (TypeScript)</td>
    <td><a href="https://github.com/biobase-ai/biobase-js" target="_blank" rel="noopener noreferrer">biobase-js</a></td>
    <td><a href="https://github.com/biobase/postgrest-js" target="_blank" rel="noopener noreferrer">postgrest-js</a></td>
    <td><a href="https://github.com/biobase/gotrue-js" target="_blank" rel="noopener noreferrer">gotrue-js</a></td>
    <td><a href="https://github.com/biobase/realtime-js" target="_blank" rel="noopener noreferrer">realtime-js</a></td>
    <td><a href="https://github.com/biobase/storage-js" target="_blank" rel="noopener noreferrer">storage-js</a></td>
    <td><a href="https://github.com/biobase/functions-js" target="_blank" rel="noopener noreferrer">functions-js</a></td>
  </tr>
  <th colspan="7">💚 Od zajednice 💚</th>
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
    <td>Flutter</td>
    <td><a href="https://github.com/biobase-ai/biobase-flutter" target="_blank" rel="noopener noreferrer">biobase-dart</a></td>
    <td><a href="https://github.com/biobase/postgrest-dart" target="_blank" rel="noopener noreferrer">postgrest-dart</a></td>
    <td><a href="https://github.com/biobase/gotrue-dart" target="_blank" rel="noopener noreferrer">gotrue-dart</a></td>
    <td><a href="https://github.com/biobase/realtime-dart" target="_blank" rel="noopener noreferrer">realtime-dart</a></td>
    <td><a href="https://github.com/biobase/storage-dart" target="_blank" rel="noopener noreferrer">storage-dart</a></td>
    <td><a href="https://github.com/biobase-community/functions-dart" target="_blank" rel="noopener noreferrer">functions-dart</a></td>
  </tr>
  <tr>
    <td>Go</td>
    <td>-</td>
    <td><a href="https://github.com/biobase-community/postgrest-go" target="_blank" rel="noopener noreferrer">postgrest-go</a></td>
    <td>-</td>
    <td>-</td>
    <td><a href="https://github.com/biobase-community/storage-go" target="_blank" rel="noopener noreferrer">storage-go</a></td>
    <td>-</td>
  </tr>
  <tr>
    <td>Java</td>
    <td>-</td>
    <td>-</td>
    <td><a href="https://github.com/biobase-community/gotrue-java" target="_blank" rel="noopener noreferrer">gotrue-java</a></td>
    <td>-</td>
    <td>-</td>
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
    <td>-</td>
  </tr>
</table>

<!--- Remove this list if you're translating to another language, it's hard to keep updated across multiple files-->
<!--- Keep only the link to the list of translation files-->

## Prevodi

- [Lista prevoda](/i18n/languages.md) <!--- Keep only this -->

---

## Sponzori

[![Novi sponzor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/biobase)
