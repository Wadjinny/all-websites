import { LuArrowUpRight } from 'react-icons/lu'
import type { LinkItem } from '../types/bookmark'

interface Props {
  link: LinkItem
  index: number
  view: 'grid' | 'list'
}

export function LinkCard({ link, index, view }: Props) {
  const isGrid = view === 'grid'

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex text-fg no-underline bg-surface overflow-hidden transition-colors duration-150 hover:bg-surface-hover card-animate ${
        isGrid ? 'flex-col' : 'flex-row items-stretch border-b border-border'
      }`}
      style={{ '--i': index } as React.CSSProperties}
    >
      {/* Image */}
      <div className={`overflow-hidden ${isGrid ? 'flex-1 min-h-0' : 'w-40 shrink-0'}`}>
        <img
          src={link.image}
          alt=""
          className="w-full h-full object-cover block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] saturate-[0.85] group-hover:scale-[1.04] sepia-50"
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className={`flex flex-col gap-1.5 ${
        isGrid
          ? 'shrink-0 px-3.5 pt-3 pb-3.5 border-t border-border'
          : 'flex-1 min-w-0 px-5 py-4 justify-center border-l border-border'
      }`}>
        <span className="text-[9px] tracking-[0.16em] uppercase text-accent font-mono">
          {link.tag}
        </span>
        <h2 className={`font-display font-semibold leading-[1.2] tracking-[-0.01em] text-fg m-0 ${
          isGrid ? 'text-[clamp(14px,1.4vw,18px)]' : 'text-[clamp(16px,1.6vw,22px)]'
        }`}>
          {link.title}
        </h2>
        <p className={`text-fg-muted m-0 ${
          isGrid
            ? 'text-[11px] leading-[1.55] line-clamp-2'
            : 'text-[12px] leading-[1.6] max-w-[60ch]'
        }`}>
          {link.description}
        </p>
      </div>

      {/* Arrow */}
      <span className="absolute top-3 right-3.5 text-fg-muted opacity-0 -translate-x-[3px] translate-y-[3px] transition-[opacity,transform] duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
        <LuArrowUpRight size={15} />
      </span>
    </a>
  )
}
