variable "git_branch" {
  type    = string
  default = null
}

# Fetch all branches of a linked project
data "biobase_branch" "all" {
  parent_project_ref = var.linked_project
}

# Import an existing branch database
import {
  for_each = {
    for b in data.biobase_branch.all.branches :
    b.git_branch => b
    if b.git_branch == var.git_branch
  }
  to = biobase_branch.imported[0]
  id = each.value.id
}

resource "biobase_branch" "imported" {
  count              = length(var.git_branch[*])
  parent_project_ref = var.linked_project
  git_branch         = var.git_branch
}

# Override auth settings for the current branch
resource "biobase_settings" "preview" {
  count       = length(var.git_branch[*])
  project_ref = biobase_branch.imported[0].database.id

  auth = jsonencode({
    site_url = "http://localhost:3001"
  })
}

output "branch_database" {
  value     = one(biobase_branch.imported[*].database)
  sensitive = true
}
