terraform {
  required_providers {
    biobase = {
      source  = "biobase/biobase"
      version = "~> 1.0"
    }
  }
}

provider "biobase" {}
