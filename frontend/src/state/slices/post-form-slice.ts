import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PostFormState {
  title: string
  slug: string
  date: string
  author: string
  content: string
  isDraft: boolean
}

const initialState: PostFormState = {
  title: '',
  slug: '',
  date: new Date().toISOString().slice(0, 10),
  author: 'Jane Doe',
  content: '',
  isDraft: false
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const slice = createSlice({
  name: 'postForm',
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
      if (!state.slug) state.slug = slugify(action.payload)
    },
    setSlug(state, action: PayloadAction<string>) {
      state.slug = slugify(action.payload)
    },
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload
    },
    setAuthor(state, action: PayloadAction<string>) {
      state.author = action.payload
    },
    setContent(state, action: PayloadAction<string>) {
      state.content = action.payload
    },
    setDraft(state, action: PayloadAction<boolean>) {
      state.isDraft = action.payload
    },
    resetForm() {
      return initialState
    },
    hydrate(state, action: PayloadAction<Partial<PostFormState>>) {
      return { ...state, ...action.payload }
    }
  }
})

export const { setTitle, setSlug, setDate, setAuthor, setContent, setDraft, resetForm, hydrate } = slice.actions
export default slice.reducer


