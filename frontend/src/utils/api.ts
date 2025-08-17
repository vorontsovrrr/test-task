const API_BASE_URL: string = process.env.GATSBY_API_BASE_URL || 'http://localhost:4000'

export interface ApiCreateResponse {
  ok: boolean
  slug: string
  url: string
  refreshed: boolean
}

export interface CreatePostInput {
  title: string
  slug?: string
  date?: string
  author?: string
  content: string
  isDraft?: boolean
}

export async function createPost(input: CreatePostInput): Promise<ApiCreateResponse> {
  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.message || 'Failed to create post')
  return data as ApiCreateResponse
}

export interface PostListItem {
  id: number
  slug: string
  title: string
  author?: string
  date?: string
  content: string
  draft: boolean
}

export async function listPosts(): Promise<PostListItem[]> {
  const res = await fetch(`${API_BASE_URL}/posts`)
  const data = await res.json()
  if (!res.ok) throw new Error(data?.message || 'Failed to load posts')
  return data as PostListItem[]
}

export async function getPostBySlug(slug: string): Promise<PostListItem> {
  const res = await fetch(`${API_BASE_URL}/posts/slug/${encodeURIComponent(slug)}`)
  const data = await res.json()
  if (!res.ok) throw new Error(data?.message || 'Failed to load post')
  return data as PostListItem
}


