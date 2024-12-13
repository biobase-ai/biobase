<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Biobase

[Biobase](https://biobase.studio) est une alternative open source à Firebase. Nous construisons les fonctionnalités de Firebase en utilisant des outils open source de niveau entreprise.

- [x] Base de données Postgres hébergée. [Docs](https://biobase.studio/docs/guides/database)
- [x] Authentification et autorisation. [Docs](https://biobase.studio/docs/guides/auth)
- [x] API générées automatiquement.
  - [x] REST. [Docs](https://biobase.studio/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Docs](https://biobase.studio/docs/guides/api#graphql-api-overview)
  - [x] Abonnements en temps réel. [Docs](https://biobase.studio/docs/guides/api#realtime-api-overview)
- [x] Fonctions.
  - [x] Fonctions de base de données. [Docs](https://biobase.studio/docs/guides/database/functions)
  - [x] Fonctions Edge [Docs](https://biobase.studio/docs/guides/functions)
- [x] Stockage de fichiers. [Docs](https://biobase.studio/docs/guides/storage)
- [x] Tableau de bord

![Tableau de bord Biobase](https://raw.githubusercontent.combiobase-ai/biobase/master/apps/www/public/images/github/biobase-dashboard.png)

## Documentation

Pour une documentation complète, visitez [biobase.studio/docs](https://biobase.studio/docs)

Pour savoir comment contribuer, visitez [Getting Started](../DEVELOPERS.md)

## Communauté et support

- [Forum communautaire](https://github.com/biobase-ai/biobase/discussions). Idéal pour : l'aide à la construction, la discussion sur les meilleures pratiques en matière de base de données.
- [GitHub Issues](https://github.com/biobase-ai/biobase/issues). Idéal pour : les bugs et les erreurs que vous rencontrez en utilisant Biobase.
- [Support par email](https://biobase.studio/docs/support#business-support). Idéal pour : les problèmes avec votre base de données ou votre infrastructure.
- [Discord](https://discord.biobase.studio). Le meilleur pour : partager vos applications et passer du temps avec la communauté.

## Statut

- [x] Alpha : Nous testons Biobase avec un groupe fermé de clients
- [x] Alpha publique : Tout le monde peut s'inscrire sur [biobase.studio/dashboard](https://biobase.studio/dashboard). Mais allez-y doucement, il y a quelques problèmes
- [x] Bêta publique : Suffisamment stable pour la plupart des cas d'utilisation hors entreprise
- [ ] Public : Disponibilité générale [[status](https://biobase.studio/docs/guides/getting-started/features#feature-status)]

Nous sommes actuellement en bêta publique. Surveillez les "releases" de ce repo pour être informé des mises à jour majeures.

<kbd><img src="https://raw.githubusercontent.combiobase-ai/biobase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## Comment ça marche

Biobase est une combinaison d'outils open source. Nous construisons les fonctionnalités de Firebase en utilisant des produits open source de qualité professionnelle. Si les outils et les communautés existent, avec une licence MIT, Apache 2, ou une licence ouverte équivalente, nous utiliserons et supporterons cet outil. Si l'outil n'existe pas, nous le construisons et l'ouvrons nous-mêmes. Biobase n'est pas un mapping 1 pour 1 de Firebase. Notre objectif est de donner aux développeurs une expérience de développement similaire à celle de Firebase en utilisant des outils open source.

**Architecture**

Biobase est une [plateforme hébergée](https://biobase.studio/dashboard). Vous pouvez vous inscrire et commencer à utiliser Biobase sans rien installer.
Vous pouvez également [auto-héberger](https://biobase.studio/docs/guides/hosting/overview) et [développer localement](https://biobase.studio/docs/guides/local-development).

![Architecture](https://github.com/biobase-ai/biobase/blob/master/apps/docs/public/img/biobase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) est un système de base de données objet-relationnel avec plus de 30 ans de développement actif qui lui a valu une solide réputation de fiabilité, de robustesse et de performance.
- [Realtime](https://github.com/biobase-ai/realtime) est un serveur Elixir qui vous permet d'écouter les insertions, les mises à jour et les suppressions de PostgreSQL en utilisant des websockets. Realtime interroge la fonctionnalité de réplication intégrée de Postgres pour les changements de base de données, convertit les changements en JSON, puis diffuse le JSON via des websockets aux clients autorisés.
- [PostgREST](http://postgrest.org/) est un serveur web qui transforme votre base de données PostgreSQL en une API RESTful
- [pg_graphql](http://github.com/biobase/pg_graphql/) est une extension de PostgreSQL qui expose une API GraphQL
- [Storage](https://github.com/biobase-ai/storage-api) fournit une interface RESTful pour gérer les fichiers stockés dans S3, en utilisant Postgres pour gérer les permissions.
- [postgres-meta](https://github.com/biobase-ai/postgres-meta) est une API RESTful pour gérer votre Postgres, vous permettant de récupérer des tables, d'ajouter des rôles, et d'exécuter des requêtes, etc.
- [GoTrue](https://github.com/netlify/gotrue) est une API basée sur SWT pour gérer les utilisateurs et émettre des jetons SWT.
- [Kong](https://github.com/Kong/kong) est une passerelle API native.

#### Bibliothèques client

Notre approche des bibliothèques clientes est modulaire. Chaque sous-bibliothèque est une implémentation autonome pour un seul système externe. C'est l'une des façons dont nous soutenons les outils existants.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Langue</th>
    <th>Client</th>
    <th colspan="5">Feature-Clients (intégrés dans le client Biobase)</th>
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
  
  <th colspan="7">⚡️ Officiel ⚡️</th>
  
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
  
  <th colspan="7">💚 Community 💚</th>
  
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

## Traductions

- [Arabe | العربية](/i18n/README.ar.md)
- [Albanais / Shqip](/i18n/README.sq.md)
- [Bangla / বাংলা](/i18n/README.bn.md)
- [Bulgare / Български](/i18n/README.bg.md)
- [Catalan / Català](/i18n/README.ca.md)
- [Danois / Dansk](/i18n/README.da.md)
- [néerlandais / Nederlands](/i18n/README.nl.md)
- [anglais](https://github.com/biobase-ai/biobase)
- [Finnish / Suomalainen](/i18n/README.fi.md)
- [French / Français](/i18n/README.fr.md)
- [German / Deutsch](/i18n/README.de.md)
- [Grec / Ελληνικά](/i18n/README.gr.md)
- [Hébreu / עברית](/i18n/README.he.md)
- [Hindi / हिंदी](/i18n/README.hi.md)
- [Hongrois / Magyar](/i18n/README.hu.md)
- [Népalais / नेपाली](/i18n/README.ne.md)
- [Indonésien / Bahasa Indonesia](/i18n/README.id.md)
- [Italien / Italiano](/i18n/README.it.md)
- [Japonais / 日本語](/i18n/README.jp.md)
- [Coréen / 한국어](/i18n/README.ko.md)
- [Malais / Bahasa Malaysia](/i18n/README.ms.md)
- [Norvégien (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [Persan / فارسی](/i18n/README.fa.md)
- [Polonais / Polski](/i18n/README.pl.md)
- [Portugais / Português](/i18n/README.pt.md)
- [Portugais (brésilien) / Português Brasileiro](/i18n/README.pt-br.md)
- [Roumain / Română](/i18n/README.ro.md)
- [Russe / Pусский](/i18n/README.ru.md)
- [Serbe / Srpski](/i18n/README.sr.md)
- [Sinhala / සිංහල](/i18n/README.si.md)
- [Spanish / Español](/i18n/README.es.md)
- [Chinois simplifié / 简体中文](/i18n/README.zh-cn.md)
- [Suédois / Svenska](/i18n/README.sv.md)
- [Thai / ไทย](/i18n/README.th.md)
- [Chinois traditionnel / 繁體中文](/i18n/README.zh-tw.md)
- [Turc / Türkçe](/i18n/README.tr.md)
- [Ukrainien / Українська](/i18n/README.uk.md)
- [Vietnamien / Tiếng Việt](/i18n/README.vi-vn.md)
- [Liste des traductions](/i18n/languages.md) <!--- Keep only this -->

---

## Commanditaires

[ ![Nouveau sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/biobase)
