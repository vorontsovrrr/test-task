import { Injectable } from '@nestjs/common'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { PostEntity } from './models/post.entity'
import { CreatePostDto, PostOutput, UpdatePostDto } from './models/post.dto'
import { FilterQuery } from '@mikro-orm/core'

function slugify(input: string): string {
  return (input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: EntityRepository<PostEntity>
  ) {}

  async createPost(input: CreatePostDto): Promise<PostOutput> {
    const finalSlug: string = slugify(input.slug || input.title)
    const entity = this.postRepository.create({
      slug: finalSlug,
      title: input.title,
      author: input.author,
      date: input.date ? new Date(input.date) : undefined,
      content: input.content,
      draft: Boolean(input.isDraft)
    })
    await this.postRepository.getEntityManager().persistAndFlush(entity)
    return this.mapToOutput(entity)
  }

  async updatePost(id: number, input: UpdatePostDto): Promise<PostOutput> {
    const entity = await this.postRepository.findOneOrFail({ id })
    if (input.title !== undefined) entity.title = input.title
    if (input.slug !== undefined) entity.slug = slugify(input.slug)
    if (input.author !== undefined) entity.author = input.author
    if (input.date !== undefined) entity.date = input.date ? new Date(input.date) : undefined
    if (input.content !== undefined) entity.content = input.content
    if (input.isDraft !== undefined) entity.draft = Boolean(input.isDraft)
    await this.postRepository.getEntityManager().flush()
    return this.mapToOutput(entity)
  }

  async listPosts(conditions: FilterQuery<PostEntity> = {}): Promise<PostOutput[]> {
    const entities = await this.postRepository.find(conditions, { orderBy: { id: 'DESC' } })
    return entities.map(e => this.mapToOutput(e))
  }

  async getPost(id: number): Promise<PostOutput> {
    const entity = await this.postRepository.findOneOrFail({ id })
    return this.mapToOutput(entity)
  }

  async deletePost(id: number): Promise<void> {
    const entity = await this.postRepository.findOneOrFail({ id })
    await this.postRepository.getEntityManager().removeAndFlush(entity)
  }

  async getPostBySlug(slug: string): Promise<PostOutput> {
    const entity = await this.postRepository.findOneOrFail({ slug })
    return this.mapToOutput(entity)
  }

  private mapToOutput(entity: PostEntity): PostOutput {
    return {
      id: entity.id,
      slug: entity.slug,
      title: entity.title,
      author: entity.author,
      date: entity.date ? entity.date.toISOString().slice(0, 10) : undefined,
      content: entity.content,
      draft: entity.draft
    }
  }
}


