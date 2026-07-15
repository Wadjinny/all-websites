import type { LinkItem } from '../types/bookmark'

interface Props {
  link: LinkItem
  index: number
  selected: boolean
  onSelect: (link: LinkItem) => void
}

export function LinkCard({ link, index, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(link)}
      className={`card-animate group flex w-full items-center gap-3.5 border-b border-g100 px-5 py-3.5 text-left transition-colors duration-150 last:border-b-0 ${
        selected ? 'bg-indigo-soft' : 'hover:bg-g100/60'
      }`}
      style={{ '--i': index } as React.CSSProperties}
      aria-pressed={selected}
    >
      {link.image ? (
        <img
          src={link.image}
          alt=""
          className="h-11 w-11 shrink-0 rounded-ctrl object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-ctrl bg-indigo-soft text-sm font-bold text-indigo">
          {link.title.slice(0, 1).toUpperCase()}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="m-0 truncate text-[14px] font-bold text-g900">
            {link.title}
          </h2>
          {link.tag && (
            <span
              className={`hidden shrink-0 rounded-pill px-2.5 py-0.5 text-[11px] font-bold sm:inline-flex ${
                selected
                  ? 'bg-white text-indigo'
                  : 'bg-indigo-soft text-indigo'
              }`}
            >
              {link.tag}
            </span>
          )}
        </div>
        {link.description && (
          <p className="m-0 mt-0.5 truncate text-[13px] text-g500">
            {link.description}
          </p>
        )}
      </div>
    </button>
  )
}
