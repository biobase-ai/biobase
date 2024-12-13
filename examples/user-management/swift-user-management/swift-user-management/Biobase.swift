//
//  Biobase.swift
//  UserManagement
//
//  Created by Guilherme Souza on 17/11/23.
//

import Foundation
import Biobase

let biobase = BiobaseClient(
  biobaseURL: URL(string: DotEnv.BIOBASE_URL)!,
  biobaseKey: DotEnv.BIOBASE_ANON_KEY
)
