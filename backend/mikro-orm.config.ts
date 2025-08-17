import { defineConfig } from '@mikro-orm/sqlite'

export default defineConfig({
  dbName: process.env.DATABASE_NAME || 'app.db',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts']
})


