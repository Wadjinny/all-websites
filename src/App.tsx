import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BsGrid, BsList } from 'react-icons/bs'
import { LuSun, LuMoon } from 'react-icons/lu'
import type { LinkItem } from './types/bookmark'
import { LinkCard } from './components/BookmarkCard'
import { pb } from './lib/pocketbase'

type View = 'grid' | 'list'
type Theme = 'dark' | 'light'

function App() {
  const [view, setView] = useState<View>('grid')
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) ?? 'dark'
  )

  const { data: links = [], isLoading, isError } = useQuery<LinkItem[]>({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const records = await pb.collection('bookmarks').getFullList()
      records.sort((a, b) => {
        const aOrder = a.order || null
        const bOrder = b.order || null
        if (aOrder === null && bOrder === null) return 0
        if (aOrder === null) return 1
        if (bOrder === null) return -1
        return aOrder - bOrder
      })
      return records.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        url: r.url,
        image: r.image ? pb.files.getURL(r, r.image) : '',
        tag: r.tag,
        featured: r.featured,
      }))
    },
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const btnBase = 'flex items-center justify-center w-[30px] h-[26px] border-0 rounded-[3px] cursor-pointer transition-colors duration-150'

  return (
    <div className="max-w-[1440px] mx-auto px-6 flex flex-col h-svh overflow-hidden">

      <header className="pt-5 shrink-0">
        <div className="flex items-center gap-4 mb-4">
          <p className="text-[10px] font-normal tracking-[0.18em] uppercase text-fg-muted">
            Selected Bookmarks ✅
          </p>
          <h1 className="font-display text-[clamp(32px,4vw,52px)] font-bold tracking-[-0.02em] leading-none text-fg">
            Links
          </h1>
          <p className="text-[11px] text-fg-dim tracking-[0.08em]">
            {links.length} items
          </p>

          {/* View toggle */}
          <div className="ml-auto flex items-center gap-0.5 border border-border rounded p-0.5">
            <button
              className={`${btnBase} ${view === 'grid' ? 'bg-surface-hover text-fg' : 'bg-transparent text-fg-muted hover:text-fg'}`}
              onClick={() => setView('grid')}
              title="Grid view"
            >
              <BsGrid size={14} />
            </button>
            <button
              className={`${btnBase} ${view === 'list' ? 'bg-surface-hover text-fg' : 'bg-transparent text-fg-muted hover:text-fg'}`}
              onClick={() => setView('list')}
              title="List view"
            >
              <BsList size={16} />
            </button>
          </div>

          {/* Theme toggle */}
          <button
            className="flex items-center justify-center w-[30px] h-[30px] bg-transparent border border-border rounded cursor-pointer text-fg-muted transition-colors duration-150 hover:bg-surface-hover hover:text-fg"
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <LuSun size={15} /> : <LuMoon size={15} />}
          </button>
        </div>

        <div className="w-full h-px bg-border" />
      </header>

      <main className={
        view === 'grid'
          ? 'flex-1 min-h-0 mt-px grid grid-cols-2 lg:grid-cols-3 xl:grid-row-4 [grid-auto-rows:1fr] gap-px bg-border border border-border overflow-hidden'
          : 'flex-1 min-h-0 mt-px flex flex-col overflow-y-auto border border-border border-t-0'
      }>
        {isLoading && (
          <p className="col-span-full p-8 text-sm text-fg-muted">Loading…</p>
        )}
        {isError && (
          <p className="col-span-full p-8 text-sm text-fg-muted">Failed to load bookmarks.</p>
        )}
        {!isLoading && !isError && links.map((link, i) => (
          <LinkCard key={link.id} link={link} index={i} view={view} />
        ))}
      </main>

      <footer className="py-3 shrink-0 flex items-center gap-3 text-[10px] font-light tracking-[0.1em] text-fg-dim">
        <span>Updated continuously</span>
        <span className="text-fg-muted">·</span>
        <span>{new Date().getFullYear()}</span>
      </footer>

    </div>
  )
}

export default App
