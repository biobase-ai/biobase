\set pguser `echo "$POSTGRES_USER"`

CREATE DATABASE _biobase WITH OWNER :pguser;
