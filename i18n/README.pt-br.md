<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Biobase

[Biobase](https://biobase.studio) é uma alternativa de código aberto ao Firebase. Estamos desenvolvendo os recursos do Firebase usando ferramentas de código aberto de nível empresarial.

- [x] Banco de dados Postgres hospedado. [Docs](https://biobase.studio/docs/guides/database)
- [x] Autenticação e autorização. [Docs](https://biobase.studio/docs/guides/auth)
- [x] APIs geradas automaticamente.
  - [x] REST. [Docs](https://biobase.studio/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Docs](https://biobase.studio/docs/guides/api#graphql-api-overview)
  - [x] Assinaturas em tempo real. [Docs](https://biobase.studio/docs/guides/api#realtime-api-overview)
- [x] Funções.
  - [x] Funções de banco de dados. [Docs](https://biobase.studio/docs/guides/database/functions)
  - [x] Funções de borda [Docs](https://biobase.studio/docs/guides/functions)
- [x] Armazenamento de arquivos. [Docs](https://biobase.studio/docs/guides/storage)
- [x] AI + Vector/Toolkit de incorporações. [Docs](https://biobase.studio/docs/guides/ai)
- [x] Dashboard

![Biobase Dashboard](https://raw.githubusercontent.com/biobase-ai/biobase/master/apps/www/public/images/github/biobase-dashboard.png)

Clique em Watch e selecione "releases" deste repositório para ser notificado sobre atualizações importantes.

<kbd><img src="https://raw.githubusercontent.com/biobase-ai/biobase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

## Documentação

Para obter a documentação completa, visite [biobase.studio/docs](https://biobase.studio/docs)

Para ver como contribuir, visite [Getting Started](../DEVELOPERS.md)

## Comunidade e suporte

- [Fórum da comunidade](https://github.com/biobase-ai/biobase/discussions). Ideal para: ajuda na criação, discussão sobre práticas recomendadas de banco de dados.
- [GitHub Issues](https://github.com/biobase-ai/biobase/issues). Melhor para: bugs e erros que você encontra usando o Biobase.
- [Suporte por e-mail](https://biobase.studio/docs/support#business-support). Ideal para: problemas com seu banco de dados ou infraestrutura.
- [Discord](https://discord.biobase.studio). Ideal para: compartilhar seus aplicativos e interagir com a comunidade.

## Como funciona

Biobase é uma combinação de ferramentas de código aberto. Estamos desenvolvendo os recursos do Firebase usando produtos de código aberto de nível empresarial. Se as ferramentas e as comunidades existirem, com uma licença aberta MIT, Apache 2 ou equivalente, usaremos e daremos suporte a essa ferramenta. Se a ferramenta não existir, nós mesmos a criaremos e abriremos o código-fonte. Biobase não é um mapeamento 1 para 1 do Firebase. Nosso objetivo é oferecer aos desenvolvedores uma experiência semelhante à do Firebase usando ferramentas de código aberto.

**Arquitetura**

Biobase é uma [plataforma hospedada](https://biobase.studio/dashboard). Você pode se registrar e começar a usar o Biobase sem instalar nada.
Você também pode [auto-hospedar](https://biobase.studio/docs/guides/hosting/overview) e [desenvolver localmente](https://biobase.studio/docs/guides/local-development).

![Arquitetura](https://github.com/biobase-ai/biobase/blob/master/apps/docs/public/img/biobase-architecture.svg)

- o [PostgreSQL](https://www.postgresql.org/) é um sistema de banco de dados objeto-relacional com mais de 30 anos de desenvolvimento ativo que lhe rendeu uma forte reputação de confiabilidade, robustez de recursos e desempenho.
- [Realtime](https://github.com/biobase-ai/realtime) é um servidor Elixir que permite que você ouça inserções, atualizações e exclusões do PostgreSQL usando websockets. O Realtime pesquisa a funcionalidade de replicação integrada do PostgreSQL em busca de alterações no banco de dados, converte as alterações em JSON e, em seguida, transmite o JSON por meio de websockets para clientes autorizados.
- [PostgREST](http://postgrest.org/) é um servidor da Web que transforma seu banco de dados PostgreSQL diretamente em uma API RESTful
- [GoTrue](https://github.com/netlify/gotrue) é uma API baseada em SWT para gerenciar usuários e emitir tokens SWT.
- [pg_graphql](http://github.com/biobase-ai/pg_graphql/) é uma extensão do PostgreSQL que expõe uma API GraphQL
- [Storage](https://github.com/biobase-ai/storage-api) fornece uma interface RESTful para gerenciar arquivos armazenados no S3, usando o Postgres para gerenciar permissões.
- [postgres-meta](https://github.com/biobase-ai/postgres-meta) é uma API RESTful para gerenciar seu Postgres, permitindo que você busque tabelas, adicione funções e execute consultas, etc.
- [Kong](https://github.com/Kong/kong) é um gateway de API nativo da nuvem.

#### Bibliotecas de clientes

Nossa abordagem para bibliotecas de clientes é modular. Cada sub-biblioteca é uma implementação autônoma para um único sistema externo. Essa é uma das maneiras pelas quais oferecemos suporte às ferramentas existentes.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Linguagem</th>
    <th>Cliente</th>
    <th colspan="5">Feature-Clients (incluídos no cliente Biobase)</th>
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
  
  <th colspan="7">⚡️ Oficial ⚡️</th>
  
  <tr>
    <td>JavaScript (TypeScript)</td>
    <td><a href="https://github.com/supabase/supabase-js" target="_blank" rel="noopener noreferrer">supabase-js</a></td>
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
  
  <th colspan="7">💚 comunidade 💚</th>
  
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
    <td><a href="https://github.com/biobase-ai/biobase-swift" target="_blank" rel="noopener noreferrer">biobase-swift</a></td>
    <td><a href="https://github.com/biobase-ai/biobase-swift/tree/main/Sources/PostgREST" target="_blank" rel="noopener noreferrer">postgrest-swift</a></td>
    <td><a href="https://github.com/biobase-ai/biobase-swift/tree/main/Sources/Auth" target="_blank" rel="noopener noreferrer">auth-swift</a></td>
    <td><a href="https://github.com/biobase-ai/biobase-swift/tree/main/Sources/Realtime" target="_blank" rel="noopener noreferrer">realtime-swift</a></td>
    <td><a href="https://github.com/biobase-ai/biobase-swift/tree/main/Sources/Storage" target="_blank" rel="noopener noreferrer">storage-swift</a></td>
    <td><a href="https://github.com/biobase-ai/biobase-swift/tree/main/Sources/Functions" target="_blank" rel="noopener noreferrer">functions-swift</a></td>
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

## Badges

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

## Traduções

- [Árabe | العربية](/i18n/README.ar.md)
- [Albanês / Shqip](/i18n/README.sq.md)
- [Bangla / বাংলা](/i18n/README.bn.md)
- [Búlgaro / Български](/i18n/README.bg.md)
- [Catalan / Català](/i18n/README.ca.md)
- [Dinamarquês / Dansk](/i18n/README.da.md)
- [Holandês / Nederlands](/i18n/README.nl.md)
- [Inglês](https://github.com/biobase-ai/biobase)
- [Finlandês / Suomalainen](/i18n/README.fi.md)
- [Francês / Français](/i18n/README.fr.md)
- [German / Deutsch](/i18n/README.de.md)
- [Grego / Ελληνικά](/i18n/README.gr.md)
- [Hebraico / עברית](/i18n/README.he.md)
- [Hindi / हिंदी](/i18n/README.hi.md)
- [Húngaro / Magyar](/i18n/README.hu.md)
- [Nepalês / नेपाली](/i18n/README.ne.md)
- [Indonésio / Bahasa Indonesia](/i18n/README.id.md)
- [Italiano / Italiano](/i18n/README.it.md)
- [Japonês / 日本語](/i18n/README.jp.md)
- [Coreano / 한국어](/i18n/README.ko.md)
- [Malaio / Bahasa Malaysia](/i18n/README.ms.md)
- [Norueguês (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [Persa / فارسی](/i18n/README.fa.md)
- [Polonês / Polski](/i18n/README.pl.md)
- [Português / Português](/i18n/README.pt.md)
- [Portuguese (Brazilian) / Português Brasileiro](/i18n/README.pt-br.md)
- [Romeno / Română](/i18n/README.ro.md)
- [Russo / Pусский](/i18n/README.ru.md)
- [Sérvio / Srpski](/i18n/README.sr.md)
- [Sinhala / සිංහල](/i18n/README.si.md)
- [Espanhol / Español](/i18n/README.es.md)
- [Chinês simplificado / 简体中文](/i18n/README.zh-cn.md)
- [Sueco / Svenska](/i18n/README.sv.md)
- [Tailandês / ไทย](/i18n/README.th.md)
- [Chinês tradicional / 繁體中文](/i18n/README.zh-tw.md)
- [Turco / Türkçe](/i18n/README.tr.md)
- [Ucraniano / Українська](/i18n/README.uk.md)
- [Vietnamita / Tiếng Việt](/i18n/README.vi-vn.md)
- [Lista de traduções](/i18n/languages.md) <!--- Keep only this -->
