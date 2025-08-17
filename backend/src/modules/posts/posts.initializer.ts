import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { PostEntity } from './models/post.entity'

/**
 * Seeds the database with sample posts when empty.
 */
@Injectable()
export class PostsInitializer implements OnModuleInit {
  private readonly logger = new Logger(PostsInitializer.name)

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: EntityRepository<PostEntity>
  ) {}

  async onModuleInit(): Promise<void> {
    const count: number = await this.postRepository.count()
    if (count > 0) return
    await this.createSamplePosts()
    this.logger.log('Seeded sample posts')
  }

  private async createSamplePosts(): Promise<void> {
    const samples: Array<Partial<PostEntity>> = [
      {
        slug: 'hello-world',
        title: 'Hello World',
        author: 'Admin',
        date: new Date(),
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        draft: false
      },
      {
        slug: 'lorem-ipsum',
        title: 'Lorem Ipsum',
        author: 'Admin',
        date: new Date(),
        content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        draft: false
      }
    ]
    const em = this.postRepository.getEntityManager()
    for (const s of samples) {
      em.persist(this.postRepository.create(s))
    }
    await em.flush()
  }
}


