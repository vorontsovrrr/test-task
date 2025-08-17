import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto, PostOutput, UpdatePostDto } from './models/post.dto'

interface ApiCreatePostResponse {
  ok: boolean
  slug: string
  url: string
  refreshed: boolean
  post: PostOutput
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('admin/test')
  adminTest(): { ok: boolean } {
    return { ok: true }
  }

  @Get()
  getPosts(@Query('all') all?: string): Promise<PostOutput[]> {
    if (all === 'true') return this.postsService.listPosts()
    return this.postsService.listPosts({ draft: false })
  }

  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number): Promise<PostOutput> {
    return this.postsService.getPost(id)
  }

  @Get('slug/:slug')
  getPostBySlug(@Param('slug') slug: string): Promise<PostOutput> {
    return this.postsService.getPostBySlug(slug)
  }

  @Post()
  async createPost(@Body() body: CreatePostDto): Promise<ApiCreatePostResponse> {
    const created = await this.postsService.createPost(body)
    return {
      ok: true,
      slug: created.slug,
      url: `/posts/${created.slug}/`,
      refreshed: false,
      post: created
    }
  }

  @Patch(':id')
  updatePost(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePostDto): Promise<PostOutput> {
    return this.postsService.updatePost(id, body)
  }

  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.postsService.deletePost(id)
  }
}


