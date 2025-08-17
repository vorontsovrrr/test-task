import React from 'react'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

export interface SiteLayoutProps {
  title?: string
  description?: string
  canonicalUrl?: string
  children: React.ReactNode
}

export function SiteLayout({ title, description, canonicalUrl, children }: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Helmet>
        {title ? <title>{title}</title> : null}
        {description ? <meta name="description" content={description} /> : null}
        <meta property="og:type" content="website" />
        {title ? <meta property="og:title" content={title} /> : null}
        {description ? <meta property="og:description" content={description} /> : null}
        <meta name="twitter:card" content="summary_large_image" />
        {title ? <meta name="twitter:title" content={title} /> : null}
        {description ? <meta name="twitter:description" content={description} /> : null}
        {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      </Helmet>
      <div id="toast-root" className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center"></div>
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <input id="menu" type="checkbox" className="peer hidden" />
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="font-semibold tracking-tight text-slate-900">
            Dev Journal
          </Link>
          <label htmlFor="menu" className="-mr-1 cursor-pointer p-2 sm:hidden" aria-label="Toggle menu">
            <svg viewBox="0 0 24 24" className="h-6 w-6"><path fill="currentColor" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </label>
          <div className="hidden items-center gap-6 text-sm sm:flex">
            <Link to="/" activeClassName="text-brand" className="hover:text-brand">Home</Link>
            <Link to="/about" activeClassName="text-brand" className="hover:text-brand">About</Link>
            <Link to="/admin" activeClassName="text-brand" className="hover:text-brand">Admin</Link>
          </div>
        </nav>
        <div className="peer-checked:block sm:hidden">
          <div className="mx-auto max-w-5xl px-4 pb-4 text-sm">
            <div className="flex flex-col gap-2">
              <Link to="/" className="rounded px-3 py-2 hover:bg-slate-50">Home</Link>
              <Link to="/about" className="rounded px-3 py-2 hover:bg-slate-50">About</Link>
              <Link to="/admin" className="rounded px-3 py-2 hover:bg-slate-50">Admin</Link>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
      <footer className="border-t">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 text-sm text-slate-500">
          <span>© {new Date().getFullYear()} Dev Journal</span>
          <span className="hidden sm:block">Built with Gatsby, MDX, Redux, and Tailwind</span>
        </div>
      </footer>
    </div>
  )
}


