\set pguser `echo "$POSTGRES_USER"`

\c _biobase
create schema if not exists _analytics;
alter schema _analytics owner to :pguser;
\c postgres
