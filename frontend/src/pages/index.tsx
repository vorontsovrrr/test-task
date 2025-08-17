import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { SiteLayout } from '../components/layout/site-layout'
import { PostCard } from '../components/post/post-card'
import { listPosts, PostListItem } from '../utils/api'

export default function IndexPage() {
  const [posts, setPosts] = useState<Array<{ id: string, excerpt: string, fields: { slug: string }, frontmatter: { title: string, date?: string, author?: string } }>>([])
  useEffect(() => {
    let cancelled = false
    listPosts()
      .then((items: PostListItem[]) => {
        if (cancelled) return
        const mapped = items.map(p => ({
          id: String(p.id),
          excerpt: p.content.slice(0, 140),
          fields: { slug: `/posts/${p.slug}/` },
          frontmatter: { title: p.title, date: p.date, author: p.author }
        }))
        setPosts(mapped)
      })
      .catch(() => setPosts([]))
    return () => { cancelled = true }
  }, [])
  return (
    <SiteLayout title="Dev Journal" description="Fast, modern blog CMS demo built with Gatsby, MDX, Redux Toolkit, and Tailwind CSS." canonicalUrl={undefined}>
      <section className="mb-10">
        <div className="rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50 p-6 ring-1 ring-black/5">
          <h1 className="text-3xl font-bold tracking-tight">Dev Journal</h1>
          <p className="mt-2 max-w-2xl text-slate-600">Fast, modern blog CMS demo built with Gatsby, MDX, Redux Toolkit, and Tailwind CSS. Explore posts, read content with beautiful typography, and preview Markdown live in the admin.</p>
        </div>
      </section>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard
            key={post.id}
            slug={post.fields.slug}
            title={post.frontmatter.title}
            excerpt={post.excerpt}
            author={post.frontmatter.author}
            date={post.frontmatter.date}
          />
        ))}
      </div>
      <div className="mt-10 text-sm">
        <Link className="text-brand hover:underline" to="/about">About the author →</Link>
      </div>
    </SiteLayout>
  )
}



