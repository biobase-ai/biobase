import type { HttpRequest, Statement, BiobaseJsQuery } from '@supabase/sql-to-rest'

export type BaseResult = {
  statement: Statement
}

export type HttpResult = BaseResult &
  HttpRequest & {
    type: 'http'
    language: 'http' | 'curl'
  }

export type BiobaseJsResult = BaseResult &
  BiobaseJsQuery & {
    type: 'supabase-js'
    language: 'js'
  }

export type ResultBundle = HttpResult | BiobaseJsResult
