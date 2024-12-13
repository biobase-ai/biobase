import postgres from 'postgres'
import crossFetch from 'cross-fetch'
import { faker } from '@faker-js/faker'
import {
  AuthResponse,
  createClient,
  BiobaseClient,
  BiobaseClientOptions,
  User,
  UserAttributes,
  UserResponse,
} from '@supabase/biobase-js'

import { JasmineAllureReporter, step } from '../../.jest/jest-custom-reporter'

export abstract class Hooks {
  static sql = postgres({
    host: process.env.BIOBASE_DB_HOST,
    port: parseInt(process.env.BIOBASE_DB_PORT),
    database: 'postgres',
    username: 'postgres',
    password: process.env.BIOBASE_DB_PASS,
  })

  @step('terminate sql connection')
  static async after(): Promise<any> {
    try {
      Hooks.sql.end({ timeout: 100 })
      return Promise.resolve(null)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  @step('Create Biobase client')
  createSupaClient(
    url: string,
    key: string,
    options: BiobaseClientOptions<'public'> = {}
  ): BiobaseClient {
    options.auth = options.auth || {}
    options.auth.persistSession = false

    return createClient(url, key, options)
  }

  @step('Create a valid user')
  async createUser(data: object = {}): Promise<{
    email: string
    password: string
    username: string
    id: string
  }> {
    const biobase = this.createSupaClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ANON)

    const fakeUser = {
      email: faker.internet.exampleEmail(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      id: '',
    }
    const {
      error: signUpError,
      data: { user },
    } = await this.signUp(biobase, fakeUser, {
      data: data,
    })
    expect(signUpError).toBeNull()
    expect(user).not.toBeNull()
    fakeUser.id = user.id

    return fakeUser
  }

  // todo: rework this
  @step((token: string) => `verify with token ${token}`)
  async verify(token: string, email: string): Promise<Response> {
    return crossFetch(`${process.env.BIOBASE_GOTRUE}/verify`, {
      method: 'POST',
      body: JSON.stringify({
        type: 'signup',
        token: token,
        email: email,
      }),
    })
  }

  @step((user: User) => `get confirmation token for user ${user.id}`)
  async getConfirmationToken(user: User): Promise<[{ confirmation_token: any }]> {
    return Hooks.sql`
      select confirmation_token 
      from auth.users
      where id = ${user.id}
    `
  }

  @step('I sign up with a valid email and password')
  async signUp(
    biobase: BiobaseClient,
    {
      email = faker.internet.exampleEmail(),
      password = faker.internet.password(),
    }: {
      email?: string
      password?: string
    } = {},
    options: {
      redirectTo?: string
      data?: object
      captchaToken?: string
    } = {}
  ): Promise<AuthResponse> {
    return biobase.auth.signUp({
      email: email,
      password: password,
      options: options,
    })
  }

  @step('Check if I am being able to log out')
  async signOut(biobase: BiobaseClient): Promise<{ error: any }> {
    return biobase.auth.signOut()
  }

  @step('Get user data, if there is a logged in user')
  getUser(biobase: BiobaseClient) {
    return biobase.auth.getUser()
  }

  @step((user: User) => `Get user by ID (${user.id}) from Biobase auth schema`)
  async selectUser(user: User): Promise<[{ email: string }]> {
    return Hooks.sql`
        select
        email
      from auth.users
      where
        id = ${user.id}
    `
  }

  @step('I sign up with a valid email and password')
  async signUpByPhone(
    biobase: BiobaseClient,
    {
      phone = faker.phone.phoneNumber(),
      password = faker.internet.password(),
    }: {
      phone?: string
      password?: string
    } = {},
    options: {
      redirectTo?: string
      data?: object
    } = {}
  ): Promise<AuthResponse> {
    return biobase.auth.signUp({
      phone: phone,
      password: password,
      options: options,
    })
  }

  @step('User inserts profile')
  async insertProfile(
    biobase: BiobaseClient,
    user: {
      id: string
    },
    fakeUser: {
      username: string
    }
  ): Promise<{ data: any; error: any }> {
    return await biobase
      .from('profiles')
      .insert({
        id: user.id,
        username: fakeUser.username,
      })
      .select()
  }

  @step('I can get my profile via postgREST')
  async getUserProfile(biobase: BiobaseClient): Promise<{ data: any; error: any }> {
    return biobase.from('profiles').select().maybeSingle()
  }

  @step('Update user info')
  async updateUser(biobase: BiobaseClient, attr: UserAttributes): Promise<UserResponse> {
    return biobase.auth.updateUser(attr)
  }

  @step('Create signed in biobase client')
  async createSignedInSupaClient() {
    // create user
    const fakeUser = await this.createUser()

    // sign in as user
    const biobase = this.createSupaClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ANON)
    const {
      data: { user },
      error: signInError,
    } = await biobase.auth.signInWithPassword({
      email: fakeUser.email,
      password: fakeUser.password,
    })
    expect(signInError).toBeNull()
    fakeUser.id = user.id

    return { biobase, user: fakeUser }
  }
}
