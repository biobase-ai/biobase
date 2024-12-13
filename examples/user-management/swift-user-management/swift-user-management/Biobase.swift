//
//  Biobase.swift
//  UserManagement
//
//  Created by Guilherme Souza on 17/11/23.
//

import Foundation
import Biobase

let biobase = BiobaseClient(
  biobaseURL: URL(string: DotEnv.SUPABASE_URL)!,
  biobaseKey: DotEnv.SUPABASE_ANON_KEY
)
