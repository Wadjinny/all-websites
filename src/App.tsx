import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { LinkItem } from './types/bookmark'
import { LinkCard } from './components/BookmarkCard'
import { DetailPanel } from './components/DetailPanel'
import { pb } from './lib/pocketbase'

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

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

  const selected = links.find((l) => l.id === selectedId) ?? null

  useEffect(() => {
    if (!selectedId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedId])

  return (
    <div className="mx-auto flex min-h-svh max-w-[1120px] flex-col px-5 py-6 sm:px-7 sm:py-8">
      <header className="mb-6 flex items-center gap-3.5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-ctrl bg-indigo text-base font-extrabold text-white"
          aria-hidden
        >
          L
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-[750] tracking-[-0.6px] text-g900">
            Links
          </h1>
          <p className="mt-0.5 text-[13.5px] text-g500">
            Selected bookmarks · {links.length} items
          </p>
        </div>
      </header>

      <div className="grid flex-1 gap-4 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <main className="overflow-hidden rounded-card bg-white shadow-card">
          {isLoading && (
            <p className="p-8 text-[13px] text-g500">Loading…</p>
          )}
          {isError && (
            <p className="p-8 text-[13px] text-g500">
              Failed to load bookmarks.
            </p>
          )}
          {!isLoading &&
            !isError &&
            links.map((link, i) => (
              <LinkCard
                key={link.id}
                link={link}
                index={i}
                selected={link.id === selectedId}
                onSelect={(item) =>
                  setSelectedId((id) => (id === item.id ? null : item.id))
                }
              />
            ))}
        </main>

        {/* Desktop side panel */}
        <div className="sticky top-6 hidden max-h-[calc(100svh-3rem)] lg:block">
          <DetailPanel
            link={selected}
            onClose={() => setSelectedId(null)}
          />
        </div>
      </div>

      {/* Mobile detail sheet */}
      {selected && (
        <div className="lg:hidden">
          <button
            type="button"
            className="fixed inset-0 z-30 bg-g900/20"
            aria-label="Close details overlay"
            onClick={() => setSelectedId(null)}
          />
          <div className="fixed inset-x-4 bottom-4 z-40 max-h-[75svh] overflow-hidden">
            <DetailPanel
              link={selected}
              onClose={() => setSelectedId(null)}
            />
          </div>
        </div>
      )}

      <footer className="mt-6 flex items-center gap-2 text-[12px] font-medium text-g400">
        <span>Updated continuously</span>
        <span>·</span>
        <span>{new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}

export default App
