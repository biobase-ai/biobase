const { DatabaseService } = require('../lib/services/DatabaseService')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') })

class DatabaseManager {
  private db: any

  constructor() {
    this.db = DatabaseService.getInstance()
  }

  async applyMigration(migrationPath: string): Promise<void> {
    try {
      const sql = fs.readFileSync(migrationPath, 'utf8')
      console.log(`Applying migration: ${path.basename(migrationPath)}`)
      await this.db.executeRawQuery(sql)
      console.log('Migration applied successfully')
    } catch (error) {
      console.error(`Error applying migration ${path.basename(migrationPath)}:`, error)
      throw error
    }
  }

  async applyAllMigrations(migrationsDir: string): Promise<void> {
    const migrationFiles: string[] = fs
      .readdirSync(migrationsDir)
      .filter((file: string) => file.endsWith('.sql'))
      .sort()

    for (const file of migrationFiles) {
      await this.applyMigration(path.join(migrationsDir, file))
    }
  }

  async applySeed(seedPath: string): Promise<void> {
    try {
      const sql = fs.readFileSync(seedPath, 'utf8')
      console.log('Applying seed data...')
      await this.db.executeRawQuery(sql)
      console.log('Seed data applied successfully')
    } catch (error) {
      console.error('Error applying seed data:', error)
      throw error
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const { data, error } = await this.db.checkHealth()
      if (error) throw error
      console.log('Database health check:', data ? 'OK' : 'Failed')
      return !!data
    } catch (error) {
      console.error('Error checking database health:', error)
      throw error
    }
  }
}

async function main(): Promise<void> {
  const manager = new DatabaseManager()
  const command = process.argv[2]
  const arg = process.argv[3]

  try {
    switch (command) {
      case 'migrate':
        if (arg) {
          await manager.applyMigration(arg)
        } else {
          await manager.applyAllMigrations(path.resolve(__dirname, '../supabase/migrations'))
        }
        break
      case 'seed':
        await manager.applySeed(arg || path.resolve(__dirname, '../supabase/seed.sql'))
        break
      case 'health':
        await manager.checkHealth()
        break
      default:
        console.log('Available commands: migrate [path], seed [path], health')
    }
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}
