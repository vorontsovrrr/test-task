import React from 'react'
import { Link } from 'gatsby'

export interface PostCardProps {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
}

export function PostCard({ slug, title, excerpt, author, date }: PostCardProps) {
  return (
    <article className="group rounded-xl border bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="line-clamp-2 text-lg font-semibold tracking-tight">
        <Link to={slug} className="hover:text-brand">
          {title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-slate-600">{excerpt}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span className="truncate">By {author}</span>
        <time className="shrink-0" dateTime={date}>{new Date(date).toLocaleDateString()}</time>
      </div>
    </article>
  )
}


