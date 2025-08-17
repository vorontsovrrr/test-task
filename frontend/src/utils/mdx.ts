import type { PostFormState } from '../state/slices/post-form-slice'

function sanitizeFrontmatterValue(value: string): string {
  if (!value) return ''
  // Wrap values containing ':' or leading/trailing spaces in quotes
  const needsQuotes = /[:\n]/.test(value) || /^\s|\s$/.test(value)
  const escaped = value.replace(/"/g, '\\"')
  return needsQuotes ? `"${escaped}"` : escaped
}

export function buildMdxFromForm(form: PostFormState): string {
  const frontmatter = [
    '---',
    `title: ${sanitizeFrontmatterValue(form.title || 'Untitled')}`,
    `date: ${sanitizeFrontmatterValue(form.date || new Date().toISOString().slice(0,10))}`,
    `author: ${sanitizeFrontmatterValue(form.author || 'Author')}`,
    `description: ${sanitizeFrontmatterValue(form.content.slice(0, 140))}`,
    `draft: ${form.isDraft ? 'true' : 'false'}`,
    '---',
    ''
  ].join('\n')

  return `${frontmatter}${form.content || ''}\n`
}


