import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { PostEntity } from './models/post.entity'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { PostsInitializer } from './posts.initializer'

@Module({
  imports: [MikroOrmModule.forFeature([PostEntity])],
  controllers: [PostsController],
  providers: [PostsService, PostsInitializer]
})
export class PostsModule {}


