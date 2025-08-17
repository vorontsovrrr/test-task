import React from 'react'
import { Link } from 'gatsby'
import { SiteLayout } from '../components/layout/site-layout'

export default function NotFoundPage() {
  return (
    <SiteLayout title="404 • Page not found" description="The page you’re looking for doesn’t exist.">
      <div className="mx-auto max-w-xl text-center">
        <div className="relative overflow-hidden rounded-2xl border bg-white p-8 shadow-sm ring-1 ring-black/5">
          <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-sky-100" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-indigo-100" />
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">Error 404</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Page not found</h1>
          <p className="mt-2 text-slate-600">The page you’re looking for may have been moved, deleted, or never existed. Check the URL or head back home.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/" className="w-full rounded-md bg-slate-900 px-4 py-2 text-center text-white hover:bg-slate-700 sm:w-auto">Go to homepage</Link>
            <Link to="/admin" className="w-full rounded-md border px-4 py-2 text-center hover:bg-slate-50 sm:w-auto">Create a post</Link>
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-500">Tip: Posts live under /posts/{'{slug}'}. Use the Admin to create one.</p>
      </div>
    </SiteLayout>
  )
}


