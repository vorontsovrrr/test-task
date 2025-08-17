import React, { useEffect, useState } from 'react'
import { PageProps } from 'gatsby'
import { SiteLayout } from '../../components/layout/site-layout'
import { Helmet } from 'react-helmet'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'
import { getPostBySlug, PostListItem } from '../../utils/api'

interface Params {
  slug: string
}

export default function PostBySlugPage({ params }: PageProps<unknown, unknown, unknown, Params>) {
  const [post, setPost] = useState<PostListItem | null>(null)
  const [error, setError] = useState<string | null>(null)
  const slug = params?.slug
  useEffect(() => {
    if (!slug) return
    let cancelled = false
    getPostBySlug(slug)
      .then(p => { if (!cancelled) setPost(p) })
      .catch(err => { if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load') })
    return () => { cancelled = true }
  }, [slug])

  const title = post ? `${post.title} • Dev Journal` : 'Loading…'
  const description = post ? post.content.slice(0, 140) : undefined
  const url = post ? `/posts/${post.slug}/` : undefined

  return (
    <SiteLayout title={title} description={description} canonicalUrl={url}>
      <Helmet>
        <meta property="og:type" content="article" />
        {url ? <meta property="og:url" content={url} /> : null}
      </Helmet>
      {!post && !error ? <p>Loading…</p> : null}
      {error ? <p className="text-red-600">{error}</p> : null}
      {post ? (
        <article className="prose max-w-none">
          <header className="not-prose mb-6">
            <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
            <div className="mt-2 text-sm text-slate-500">
              <span>By {post.author}</span>
              <span className="px-2">•</span>
              <time dateTime={post.date}>{post.date ? new Date(post.date).toLocaleDateString() : ''}</time>
            </div>
          </header>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypePrism]}>
            {post.content}
          </ReactMarkdown>
        </article>
      ) : null}
    </SiteLayout>
  )
}


