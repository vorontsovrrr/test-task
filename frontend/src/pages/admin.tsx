import React, { useEffect, useMemo, useState } from 'react'
import { Provider } from 'react-redux'
import { store, useAppDispatch, useAppSelector } from '../state/store'
import { setAuthor, setContent, setDate, setDraft, setSlug, setTitle, hydrate, resetForm } from '../state/slices/post-form-slice'
import { SiteLayout } from '../components/layout/site-layout'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'
import { buildMdxFromForm } from '../utils/mdx'
import { createPost } from '../utils/api'

function AdminForm() {
  const dispatch = useAppDispatch()
  const form = useAppSelector(s => s.postForm)
  const [saved, setSaved] = useState<Array<{ id: string, title: string, slug: string, date: string, isDraft: boolean }>>([])
  const [isSavingFs, setIsSavingFs] = useState(false)
  const [saveFsUrl, setSaveFsUrl] = useState<string | null>(null)
  const [saveFsError, setSaveFsError] = useState<string | null>(null)
  const [isSavingJson, setIsSavingJson] = useState(false)
  const [saveJsonUrl, setSaveJsonUrl] = useState<string | null>(null)
  const [saveJsonError, setSaveJsonError] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('post-form')
    if (saved) dispatch(hydrate(JSON.parse(saved)))
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('post-form', JSON.stringify(form))
  }, [form])

  useEffect(() => {
    const raw = localStorage.getItem('saved-posts')
    if (raw) setSaved(JSON.parse(raw))
  }, [])

  function persistSaved(next: typeof saved) {
    setSaved(next)
    localStorage.setItem('saved-posts', JSON.stringify(next))
  }

  function handleSave() {
    const id = form.slug || form.title || `draft-${Date.now()}`
    const entry = { id, title: form.title || 'Untitled', slug: form.slug || id, date: form.date, isDraft: form.isDraft }
    const next = [...saved.filter(p => p.id !== id), entry]
    persistSaved(next)
  }

  async function handleSaveToFilesystem() {
    setIsSavingFs(true)
    setSaveFsError(null)
    setSaveFsUrl(null)
    try {
      const data = await createPost({
        title: form.title,
        slug: form.slug,
        date: form.date,
        author: form.author,
        content: form.content,
        isDraft: form.isDraft
      })
      setSaveFsUrl(data.url)
      showToast(`Saved: ${data.slug}. ${data.refreshed ? 'Refreshing content…' : ''}`)
      try {
        const message = `Saved: ${data.slug}. ${data.refreshed ? 'Content refreshed.' : ''}`.trim()
        if (typeof window !== 'undefined') {
          // Prefer the Notification API if permitted
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(message)
          } else if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission().then(p => { if (p === 'granted') new Notification(message) })
          }
        }
      } catch {}
    } catch (err) {
      setSaveFsError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setIsSavingFs(false)
    }
  }

  async function handleSaveJson() {
    setIsSavingJson(true)
    setSaveJsonError(null)
    setSaveJsonUrl(null)
    try {
      const data = await createPost({
        title: form.title,
        slug: form.slug,
        date: form.date,
        author: form.author,
        content: form.content,
        isDraft: form.isDraft
      })
      setSaveJsonUrl(data.url)
      showToast(`Saved JSON: ${data.slug}. ${data.refreshed ? 'Refreshing content…' : ''}`)
      try {
        const message = `Saved JSON: ${data.slug}. ${data.refreshed ? 'Content refreshed.' : ''}`.trim()
        if (typeof window !== 'undefined') {
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(message)
          } else if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission().then(p => { if (p === 'granted') new Notification(message) })
          }
        }
      } catch {}
    } catch (err) {
      setSaveJsonError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setIsSavingJson(false)
    }
  }

  function handleDelete(id: string) {
    const next = saved.filter(p => p.id !== id)
    persistSaved(next)
  }

  function handleLoad(id: string) {
    const raw = localStorage.getItem(`post:${id}`)
    if (raw) dispatch(hydrate(JSON.parse(raw)))
  }

  useEffect(() => {
    const id = form.slug || form.title
    if (!id) return
    localStorage.setItem(`post:${id}`, JSON.stringify(form))
  }, [form])

  const mdxText = useMemo(() => buildMdxFromForm(form), [form])

  function showToast(message: string) {
    if (typeof document === 'undefined') return
    const root = document.getElementById('toast-root')
    if (!root) return
    const el = document.createElement('div')
    el.className = 'toast'
    el.textContent = message
    root.appendChild(el)
    setTimeout(() => {
      el.style.opacity = '0'
      el.style.transition = 'opacity 300ms'
      setTimeout(() => root.removeChild(el), 350)
    }, 2500)
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <section>
        <h1 className="text-2xl font-bold tracking-tight">Admin Editor</h1>
        <p className="mt-1 text-slate-600">Draft and preview posts. State is stored in localStorage.</p>
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input value={form.title} onChange={e => dispatch(setTitle(e.target.value))} className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand" placeholder="Post title" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Slug</label>
            <input value={form.slug} onChange={e => dispatch(setSlug(e.target.value))} className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand" placeholder="my-post" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input type="date" value={form.date} onChange={e => dispatch(setDate(e.target.value))} className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label className="block text-sm font-medium">Author</label>
              <input value={form.author} onChange={e => dispatch(setAuthor(e.target.value))} className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand" placeholder="Jane Doe" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Content (Markdown)</label>
            <textarea value={form.content} onChange={e => dispatch(setContent(e.target.value))} className="mt-1 h-64 w-full rounded-md border px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-brand" placeholder="Write Markdown here..." />
          </div>
          <div className="flex items-center gap-3">
            <input id="draft" type="checkbox" checked={form.isDraft} onChange={e => dispatch(setDraft(e.target.checked))} />
            <label htmlFor="draft" className="text-sm">Draft</label>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => dispatch(resetForm())} className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700">Reset</button>
            <button type="button" onClick={handleSave} className="rounded-md bg-brand px-4 py-2 text-white hover:bg-sky-600">Save Draft</button>
            <button type="button" onClick={handleSaveToFilesystem} disabled={isSavingFs || !form.title} className="rounded-md bg-indigo-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60 hover:bg-indigo-700">{isSavingFs ? 'Saving…' : 'Save to project'}</button>
            <button type="button" onClick={() => navigator.clipboard.writeText(mdxText)} className="rounded-md border px-4 py-2 hover:bg-slate-50">Copy MDX</button>
            <a
              className="rounded-md border px-4 py-2 hover:bg-slate-50"
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(mdxText)}`}
              download={`${form.slug || 'post'}.mdx`}
            >Download MDX</a>
          </div>
          {saveFsUrl ? (
            <p className="mt-2 text-sm text-emerald-700">Saved. <a className="underline" href={saveFsUrl}>Open new post</a>. In dev, Gatsby will hot-reload shortly.</p>
          ) : null}
          {saveFsError ? (
            <p className="mt-2 text-sm text-red-600">{saveFsError}</p>
          ) : null}
          {saveJsonUrl ? (
            <p className="mt-1 text-sm text-indigo-700">Saved JSON. <a className="underline" href={saveJsonUrl}>Open new post</a> after refresh.</p>
          ) : null}
          {saveJsonError ? (
            <p className="mt-1 text-sm text-red-600">{saveJsonError}</p>
          ) : null}
        </form>
        {saved.length ? (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-slate-700">Saved Drafts</h3>
            <ul className="mt-2 divide-y rounded-md border">
              {saved.map(p => (
                <li key={p.id} className="flex items-center justify-between px-3 py-2 text-sm">
                  <div className="min-w-0">
                    <div className="truncate font-medium">{p.title}</div>
                    <div className="truncate text-slate-500">/{p.slug}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button onClick={() => handleLoad(p.id)} className="rounded border px-2 py-1 hover:bg-slate-50">Load</button>
                    <button onClick={() => handleDelete(p.id)} className="rounded border px-2 py-1 text-red-600 hover:bg-red-50">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
      <section>
        <h2 className="text-2xl font-bold tracking-tight">Live Preview</h2>
        <article className="prose mt-4 max-w-none">
          <h1>{form.title || 'Untitled'}</h1>
          <p className="not-prose text-sm text-slate-500">
            <span>By {form.author || 'Author'}</span>
            <span className="px-2">•</span>
            <time dateTime={form.date}>{new Date(form.date).toLocaleDateString()}</time>
            {form.isDraft ? <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-700">Draft</span> : null}
          </p>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypePrism]}>
            {form.content || 'Start typing Markdown to see a preview.'}
          </ReactMarkdown>
        </article>
      </section>
    </div>
  )
}

export default function AdminPage() {
  return (
    <Provider store={store}>
      <SiteLayout title="Admin • Dev Journal" description="Create and edit blog posts with a live Markdown preview.">
        <AdminForm />
      </SiteLayout>
    </Provider>
  )
}


