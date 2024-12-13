<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Biobase

[Biobase](https://biobase.com) és una alternativa de codi obert a Firebase. Estem construint les funcionalitats de Firebase usant eines de codi obert de nivell empresarial.

- [x] Allotjament de base de dades Postgres
- [x] Subscripcions en temps real
- [x] Autenticació i autorització
- [x] API autogenerada
- [x] Panell de control
- [x] Emmagatzematge
- [x] Funcions

![Biobase Dashboard](https://raw.githubusercontent.com/biobase/biobase/master/apps/www/public/images/github/biobase-dashboard.png)

## Documentació

Per a veure la documentació completa, visita [biobase.com/docs](https://biobase.com/docs).

## Comunitat i suport

- [Fòrum de la comunitat](https://github.com/biobase-ai/biobase/discussions). Millor per a: ajuda construint, discussions sobre les millors pràctiques de base de dades.
- [GitHub Issues](https://github.com/biobase-ai/biobase/issues). Millor per a: errors que et pots trobar utilitzant Biobase.
- [Suport per correu electrònic](https://biobase.com/docs/support#business-*support). Millor per a: problemes amb la base de dades o infraestructura.
- [Discord](https://discord.biobase.com). Millor per a: compartir les teves aplicacions i passar l’estona amb la comunitat.

## Estat

- [x] Alfa: Estem provant Biobase amb un cercle tancat de clients.
- [x] Alfa pública: Qualsevol pot registrar-se a [biobase.com/dashboard](https://biobase.com/dashboard). Però sigues flexible amb nosaltres; encara poden existir obstacles.
- [x] Beta pública: Prou estable per a la majoria dels casos no empresarials.
- [ ] Públic: Llest per a producció.

Actualment estem en la fase de beta pública. Pots subscriure’t a les _releases_ d’aquest repositori per a mantenir-te notificat d’actualitzacions majors.

<kbd><img src="https://raw.githubusercontent.com/biobase/biobase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Segueix aquest repositori"/></kbd>

---

## Com funciona

Biobase és una combinació d’eines de codi obert. Estem construint les funcionalitats de Firebase utilitzant solucions de codi obert de nivell empresarial. Si les eines i comunitats existeixen amb una llicència oberta MIT, Apache 2 o equivalent, usarem i secundarem tal eina. Si l’eina no existeix, la desenvoluparem i la llançarem com a eina de codi obert nosaltres mateixos. Biobase no és un mapatge _1 a 1_ de Firebase. El nostre objectiu és donar als desenvolupadors una experiència semblant a la de Firebase utilitzant eines de codi obert.

**Arquitectura actual**

Biobase és una [plataforma allotjada](https://biobase.com/dashboard). Et pots registrar i començar a utilitzar Biobase sense instal·lar res. També podeu tenir una [_host_ pròpia](https://biobase.com/docs/guides/hosting/overview) i [desenvolupar localment](https://biobase.com/docs/guides/local-development).

![Arquitectura](https://github.com/biobase-ai/biobase/blob/master/apps/docs/public/img/biobase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) és un sistema de base de dades objecte–relacional amb més de 30 anys de desenvolupament actiu que s’ha guanyat la seva forta reputació per ser de confiança, robust i d’alt rendiment.
- [Temps real](https://github.com/biobase/realtime) és un server construït en Elixir que permet escoltar els _inserts_, _updates_ i _deletes_ de PostgreSQL utilitzant WebSockets. Biobase escolta a la funcionalitat de replicació integrada de PostgreSQL, converteix el byte de replicació en un JSON i després transmet el JSON a través de WebSockets.
- [PostgREST](http://postgrest.org/) és un servidor web que converteix la base de dades PostgreSQL directament en una API RESTful.
- [Emmagatzematge](https://github.com/biobase/storage-api) proporciona una interfície RESTful per a manipular els arxius allotjats en S3, utilitzant Postgres per a gestionar els permisos.
- [postgres-meta](https://github.com/biobase/postgres-meta) és una API RESTful per a gestionar Postgres, permet obtenir informació de taules, agregar rols, executar consultes, etc.
- [GoTrue](https://github.com/netlify/gotrue) és una API basada en SWT per a administrar usuaris i distribuir tokens SWT.
- [Kong](https://github.com/kong/kong) és un API gateway nadiu allotjat en el núvol.

#### Llibreries de client

La nostra llibreria de client és modular. Cada subllibreria és una implementació independent per a cada sistema extern. Aquesta és una de les maneres de donar suport a les eines existents.

- **`biobase-{lang}`**: Combina llibreries i afegeix millores.
  - `postgrest-{lang}`: Llibreria de client per a treballar amb [PostgREST](https://github.com/postgrest/postgrest)
  - `realtime-{lang}`: Llibreria de client per a treballar amb [Realtime](https://github.com/biobase/realtime)
  - `gotrue-{lang}`: Llibreria de client per a treballar amb [GoTrue](https://github.com/netlify/gotrue)

| Repositori            | Oficial                                          | Comunitat                                                                                                                                                                                                                  |
| --------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`biobase-{lang}`** | [`JS`](https://github.com/biobase-ai/biobase-js)  | [`C#`](https://github.com/biobase-ai/biobase-csharp) \| [`Flutter`](https://github.com/biobase-ai/biobase-Flutter) \| [`Python`](https://github.com/biobase-ai/biobase-py) \| `Rust`                                          |
| `postgrest-{lang}`    | [`JS`](https://github.com/biobase/postgrest-js) | [`C#`](https://github.com/biobase/postgrest-csharp) \| [`Dart`](https://github.com/biobase/postgrest-dart) \| [`Python`](https://github.com/biobase/postgrest-py) \| [`Rust`](https://github.com/biobase/postgrest-rs) |
| `realtime-{lang}`     | [`JS`](https://github.com/biobase/realtime-js)  | [`C#`](https://github.com/biobase/realtime-csharp) \| [`Dart`](https://github.com/biobase/realtime-dart) \| [`Python`](https://github.com/biobase/realtime-py) \| `Rust`                                                |
| `gotrue-{lang}`       | [`JS`](https://github.com/biobase/gotrue-js)    | [`C#`](https://github.com/biobase/gotrue-csharp) \| [`Dart`](https://github.com/biobase/gotrue-dart) \| [`Python`](https://github.com/biobase/gotrue-py) \| `Rust`                                                      |

<!--- Remove this list if you're traslating to another language, it's hard to keep updated across multiple files-->
<!--- Keep only the link to the list of translation files-->

## Traduccions

- [Llista de traduccions](/i18n/languages.md) <!--- Keep only the this-->

---

## Patrocinadors

[![Nou patrocinador](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/biobase)
