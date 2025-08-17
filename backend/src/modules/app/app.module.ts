import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { SqliteDriver } from '@mikro-orm/sqlite'
import { PostsModule } from '../posts/posts.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot({
      driver: SqliteDriver,
      dbName: process.env.DATABASE_NAME || 'app.db',
      entities: ['dist/**/*.entity.js'],
      entitiesTs: ['src/**/*.entity.ts'],
      allowGlobalContext: true,
      debug: false
    }),
    PostsModule
  ]
})
export class AppModule {}


