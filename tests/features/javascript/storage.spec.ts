import { params, suite, test } from '@testdeck/jest'
import { faker } from '@faker-js/faker'
import { Severity } from 'allure-js-commons'

import { createClient, Session, SupabaseClient, User, UserAttributes } from '@supabase/supabase-js'
import { Bucket } from '@supabase/storage-js'

import { FEATURE } from '../templates/enums'
import { description, feature, log, severity, step } from '../../.jest/jest-custom-reporter'
import { Hooks } from './hooks'
import fetch from 'cross-fetch'

@suite('storage')
class Storage extends Hooks {
  static buckets: Pick<Bucket, 'name'>[] = [] as any
  static async after() {
    const biobase = createClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ADMIN)
    const requests = []
    for (const bucket of this.buckets) {
      requests.push(
        new Promise((resolve) =>
          (async () => {
            await biobase.storage.emptyBucket(bucket.name)
            await biobase.storage.deleteBucket(bucket.name)
            resolve(null)
          })()
        )
      )
    }
    await Promise.all(requests)
    await Hooks.after()
  }

  @feature(FEATURE.STORAGE)
  @severity(Severity.BLOCKER)
  @description('When you create public bucket then it has to be available')
  @params({ public: true })
  @params({ public: false })
  async 'create bucket'(params: { public: boolean }) {
    const biobase = createClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ADMIN)
    const bucketName = faker.unique(faker.random.word)
    const { data: bucket, error } = await biobase.storage.createBucket(bucketName, {
      public: params.public,
    })
    expect(error).toBeNull()
    expect(bucket).toBeDefined()
    expect(bucket.name).toBe(bucketName)
    Storage.buckets.push(bucket)

    const { data: gotBucket, error: error2 } = await biobase.storage.getBucket(bucketName)
    expect(error2).toBeNull()
    expect(gotBucket).toBeDefined()
    expect(gotBucket.name).toBe(bucketName)
    expect(gotBucket.public).toBe(params.public)
  }

  @feature(FEATURE.STORAGE)
  @severity(Severity.BLOCKER)
  @description('There has to be default RLS policy to not allow users to create bucket')
  @params({ public: true })
  @params({ public: false })
  async 'user cannot create bucket because of RLS'(params: { public: boolean }) {
    const { biobase } = await this.createSignedInSupaClient()
    const bucketName = faker.unique(faker.random.word)

    const { data: bucket, error } = await biobase.storage.createBucket(bucketName, {
      public: params.public,
    })
    expect(error).not.toBeNull()
    expect(error.message).toContain('row-level security')
    expect(error.message).toContain('"buckets"')
  }

  @feature(FEATURE.STORAGE)
  @severity(Severity.BLOCKER)
  @description('list buckets should return all buckets')
  @test
  async 'list buckets as admin'() {
    const biobase = createClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ADMIN)

    const bucket1 = await this.createBucket()
    const bucket2 = await this.createBucket()

    const { data: buckets, error } = await biobase.storage.listBuckets()
    expect(buckets.length).toBeGreaterThanOrEqual(2)
    expect(buckets.map((b) => b.name)).toEqual(expect.arrayContaining([bucket1.name, bucket2.name]))
  }

  @feature(FEATURE.STORAGE)
  @severity(Severity.BLOCKER)
  @description('get bucket should return bucket info')
  @test
  async 'get bucket'() {
    const biobase = createClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ADMIN)
    const bucket = await this.createBucket()

    const { data: gotBucket, error } = await biobase.storage.getBucket(bucket.id)
    expect(error).toBeNull()
    expect(gotBucket).toEqual(bucket)
  }

  @feature(FEATURE.STORAGE)
  @severity(Severity.BLOCKER)
  @description('update bucket should change bucket both public->private and back')
  @params({ public: true })
  @params({ public: false })
  async 'update bucket'(params: { public: boolean }) {
    const biobase = createClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ADMIN)
    const bucket = await this.createBucket(params.public)

    const {
      data: { message },
      error,
    } = await biobase.storage.updateBucket(bucket.id, {
      public: !params.public,
    })
    expect(error).toBeNull()
    expect(message).toBe('Successfully updated')

    bucket.public = !params.public
    const { data: gotBucket } = await biobase.storage.getBucket(bucket.id)
    expect(gotBucket).toEqual(bucket)
  }

  @feature(FEATURE.STORAGE)
  @severity(Severity.BLOCKER)
  @description('get bucket should return bucket info')
  @test
  async 'delete bucket'() {
    const biobase = createClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ADMIN)
    const bucket = await this.createBucket()

    const {
      data: { message },
      error,
    } = await biobase.storage.deleteBucket(bucket.id)
    expect(error).toBeNull()
    expect(message).toBe('Successfully deleted')

    const { data: buckets } = await biobase.storage.listBuckets()
    expect(
      buckets.map((b) => {
        return { name: b.name, id: b.id }
      })
    ).not.toContain({ name: bucket.name, id: bucket.id })

    Storage.buckets = Storage.buckets.filter((b) => b.name != bucket.name)
  }

  @feature(FEATURE.STORAGE)
  @severity(Severity.BLOCKER)
  @description('upload to bucket')
  @test
  async 'upload to bucket'() {
    const biobase = createClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ADMIN)
    const bucket = await this.createBucket()

    const file = {
      path: faker.random.word() + '.txt',
      data: faker.lorem.paragraph(),
    }
    const {
      data: { path },
      error,
    } = await biobase.storage.from(bucket.name).upload(file.path, file.data)
    expect(error).toBeNull()
    expect(path).toEqual(file.path)
  }

  @feature(FEATURE.STORAGE)
  @severity(Severity.BLOCKER)
  @description('list files in bucket')
  @test
  async 'list files'() {
    const biobase = createClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ADMIN)
    const bucket = await this.createBucket()

    const files: { path: string; data: string }[] = []
    const requests: Promise<void>[] = []
    for (let i = 0; i < 3; i++) {
      requests.push(
        new Promise((resolve) => {
          const dir = faker.random.word()
          const file = {
            path: dir + '/' + faker.random.word() + '.txt',
            data: faker.lorem.sentence(),
          }
          files.push(file)
          const p1 = biobase.storage.from(bucket.name).upload(file.path, file.data)
          const file2 = {
            path: dir + '/' + faker.random.word() + '.txt',
            data: faker.lorem.sentence(),
          }
          files.push(file2)
          const p2 = biobase.storage.from(bucket.name).upload(file2.path, file2.data)
          Promise.all([p1, p2]).finally(() => resolve())
        })
      )
    }
    await Promise.all(requests)

    const { data: dirs, error: error1 } = await biobase.storage.from(bucket.name).list()
    expect(error1).toBeNull()
    expect(dirs.map((d) => d.name)).toEqual(
      expect.arrayContaining([...new Set(files.map((f) => f.path.split('/')[0]))])
    )

    const dir = files[0].path.split('/')[0]
    const { data: filesInDir, error: error2 } = await biobase.storage.from(bucket.name).list(dir)
    expect(error2).toBeNull()
    expect(filesInDir.map((d) => d.name)).toEqual(
      expect.arrayContaining(
        files.filter((f) => f.path.split('/')[0] === dir).map((f) => f.path.split('/')[1])
      )
    )
  }

  @feature(FEATURE.STORAGE)
  @severity(Severity.BLOCKER)
  @description('download file')
  @test
  async 'download file from bucket'() {
    const biobase = createClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ADMIN)
    const bucket = await this.createBucket()

    const file = {
      path: faker.random.word() + '/' + faker.random.word() + '.txt',
      data: faker.lorem.paragraph(),
    }
    await biobase.storage.from(bucket.name).upload(file.path, file.data)

    const { data, error } = await biobase.storage.from(bucket.name).download(file.path)
    expect(error).toBeNull()
    expect(await data.text()).toEqual(file.data)
  }

  @feature(FEATURE.STORAGE)
  @severity(Severity.BLOCKER)
  @description('move file')
  @test
  async '[skip-local] move file in bucket'() {
    const biobase = createClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ADMIN)
    const bucket = await this.createBucket()

    const file = {
      path: faker.random.word() + '/' + faker.random.word() + '.txt',
      newPath: faker.random.word() + '/' + faker.random.word() + '.txt',
      data: faker.lorem.paragraph(),
    }
    await biobase.storage.from(bucket.name).upload(file.path, file.data)

    const { error } = await biobase.storage.from(bucket.name).move(file.path, file.newPath)
    expect(error).toBeNull()
    const { data: filesRoot } = await biobase.storage.from(bucket.name).list()
    expect(filesRoot.map((f) => f.name)).not.toContain(file.path.split('/')[0])
    const { data: files } = await biobase.storage
      .from(bucket.name)
      .list(file.newPath.split('/')[0])
    expect(files.map((f) => f.name)).toEqual(expect.arrayContaining([file.newPath.split('/')[1]]))
  }

  @feature(FEATURE.STORAGE)
  @severity(Severity.BLOCKER)
  @description('copy file')
  @test
  async '[skip-local] copy file in bucket'() {
    const biobase = createClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ADMIN)
    const bucket = await this.createBucket()

    const file = {
      path: faker.random.word() + '/' + faker.random.word() + '.txt',
      newPath: faker.random.word() + '/' + faker.random.word() + '.txt',
      data: faker.lorem.paragraph(),
    }
    await biobase.storage.from(bucket.name).upload(file.path, file.data)

    const { error } = await biobase.storage.from(bucket.name).copy(file.path, file.newPath)
    expect(error).toBeNull()

    const { data: filesRoot } = await biobase.storage.from(bucket.name).list()
    expect(filesRoot.map((f) => f.name)).toEqual(
      expect.arrayContaining([file.path.split('/')[0], file.newPath.split('/')[0]])
    )
    const { data: filesNew } = await biobase.storage
      .from(bucket.name)
      .list(file.newPath.split('/')[0])
    expect(filesNew.map((f) => f.name)).toEqual(
      expect.arrayContaining([file.newPath.split('/')[1]])
    )
    const { data: files } = await biobase.storage.from(bucket.name).list(file.path.split('/')[0])
    expect(files.map((f) => f.name)).toEqual(expect.arrayContaining([file.path.split('/')[1]]))
  }

  @feature(FEATURE.STORAGE)
  @severity(Severity.BLOCKER)
  @description('get public link to file in the public bucket')
  @test
  async 'get public link to file'() {
    const biobase = createClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ADMIN)
    const bucket = await this.createBucket()

    const file = {
      path: faker.random.word() + '/' + faker.random.word() + '.txt',
      data: faker.lorem.paragraph(),
    }
    await biobase.storage.from(bucket.name).upload(file.path, file.data)

    const {
      data: { publicUrl },
    } = biobase.storage.from(bucket.name).getPublicUrl(file.path)
    expect(publicUrl).toBeDefined()
    expect(publicUrl.length).toBeGreaterThan(1)
    expect(publicUrl).toMatch(new RegExp(`^http[s]?://.*storage.*/${bucket.name}/.*`))

    const resp = await fetch(publicUrl)
    expect(resp.status).toEqual(200)
    expect(await resp.text()).toEqual(file.data)
  }

  @feature(FEATURE.STORAGE)
  @severity(Severity.BLOCKER)
  @description('get public link to file in the private bucket')
  @test
  async 'get public link to private file'() {
    const biobase = createClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ADMIN)
    const bucket = await this.createBucket(false)

    const file = {
      path: faker.random.word() + '/' + faker.random.word() + '.txt',
      data: faker.lorem.paragraph(),
    }
    await biobase.storage.from(bucket.name).upload(file.path, file.data)

    const {
      data: { publicUrl },
    } = biobase.storage.from(bucket.name).getPublicUrl(file.path)
    expect(publicUrl).toBeDefined()
    expect(publicUrl.length).toBeGreaterThan(1)
    expect(publicUrl).toMatch(new RegExp(`^http[s]?://.*storage.*/${bucket.name}/.*`))

    const resp = await fetch(publicUrl)
    expect(resp.status).toEqual(400) // todo 400 should be 404 too I guess
    const error = await resp.json()
    expect(error.statusCode).toBe('404') // todo should be a number?
  }

  @feature(FEATURE.STORAGE)
  @severity(Severity.BLOCKER)
  @description('get signed link to file in the bucket')
  @params({ public: true })
  @params({ public: false })
  async 'get signed link to file'(params: { public: boolean }) {
    const biobase = createClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ADMIN)
    const bucket = await this.createBucket(params.public)

    const file = {
      path: faker.random.word() + '/' + faker.random.word() + '.txt',
      data: faker.lorem.paragraph(),
    }
    await biobase.storage.from(bucket.name).upload(file.path, file.data)

    const {
      data: { signedUrl },
      error,
    } = await biobase.storage.from(bucket.name).createSignedUrl(file.path, 10000)
    expect(error).toBeNull()
    expect(signedUrl).toBeDefined()
    expect(signedUrl.length).toBeGreaterThan(1)
    expect(signedUrl).toMatch(new RegExp(`^http[s]?://.*storage.*/${bucket.name}/.*`))

    const resp = await fetch(signedUrl)
    expect(resp.status).toEqual(200)
    expect(await resp.text()).toEqual(file.data)
  }

  @feature(FEATURE.STORAGE)
  @severity(Severity.BLOCKER)
  @description('update file check if it will change')
  @test
  async 'update file'() {
    const biobase = createClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ADMIN)
    const bucket = await this.createBucket()

    const file = {
      path: faker.random.word() + '/' + faker.random.word() + '/' + faker.random.word() + '.txt',
      data: faker.lorem.paragraph(),
    }
    await biobase.storage.from(bucket.name).upload(file.path, file.data)

    const {
      data: { publicUrl },
    } = biobase.storage.from(bucket.name).getPublicUrl(file.path)
    expect(publicUrl).toBeDefined()
    expect(publicUrl.length).toBeGreaterThan(1)
    expect(publicUrl).toMatch(new RegExp(`^http[s]?://.*storage.*/${bucket.name}/.*`))

    const newFile = {
      path: file.path,
      data: faker.lorem.paragraph(10),
    }
    await biobase.storage.from(bucket.name).update(newFile.path, newFile.data)

    const resp = await fetch(publicUrl)
    expect(resp.status).toEqual(200)
    expect(await resp.text()).toEqual(newFile.data)
  }

  @step('create bucket')
  async createBucket(pub = true) {
    const biobase = createClient(process.env.BIOBASE_URL, process.env.BIOBASE_KEY_ADMIN)
    const bucketName = faker.unique(faker.random.word)

    const { data: bucket, error } = await biobase.storage.createBucket(bucketName, {
      public: pub,
    })
    expect(error).toBeNull()
    expect(bucket).toBeDefined()
    expect(bucket.name).toBe(bucketName)
    Storage.buckets.push(bucket)

    const { data: buckets } = await biobase.storage.listBuckets()
    return buckets.find((b) => b.name === bucketName)
  }
}
