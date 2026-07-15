import { LuArrowUpRight, LuX } from 'react-icons/lu'
import type { LinkItem } from '../types/bookmark'

interface Props {
  link: LinkItem | null
  onClose: () => void
}

export function DetailPanel({ link, onClose }: Props) {
  if (!link) {
    return (
      <aside className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-card bg-white p-[22px] text-center shadow-card">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-ctrl bg-indigo-soft text-lg font-bold text-indigo">
          i
        </div>
        <p className="m-0 text-[14px] font-bold text-g900">Inspect a link</p>
        <p className="m-0 mt-1 max-w-[28ch] text-[13px] text-g500">
          Select an item from the list to see its details here.
        </p>
      </aside>
    )
  }

  let hostname = link.url
  try {
    hostname = new URL(link.url).hostname.replace(/^www\./, '')
  } catch {
    /* keep raw url */
  }

  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card">
      <div className="flex items-center justify-between gap-3 border-b border-g100 px-5 py-4">
        <h2 className="m-0 text-[14px] font-bold text-g900">Details</h2>
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-ctrl bg-white text-g500 shadow-card transition-[box-shadow,color] duration-150 hover:text-g900 hover:shadow-hover"
          title="Close"
          aria-label="Close details"
        >
          <LuX size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-[22px]">
        {link.image ? (
          <img
            src={link.image}
            alt=""
            className="mb-5 aspect-[16/10] w-full rounded-ctrl object-cover"
          />
        ) : (
          <div className="mb-5 flex aspect-[16/10] w-full items-center justify-center rounded-ctrl bg-indigo-soft text-3xl font-bold text-indigo">
            {link.title.slice(0, 1).toUpperCase()}
          </div>
        )}

        <div className="mb-3 flex flex-wrap items-center gap-2">
          {link.tag && (
            <span className="inline-flex rounded-pill bg-indigo-soft px-3 py-1 text-[11px] font-bold text-indigo">
              {link.tag}
            </span>
          )}
          {link.featured ? (
            <span className="inline-flex rounded-pill bg-indigo-soft px-3 py-1 text-[11px] font-bold text-indigo">
              Featured
            </span>
          ) : (
            <span className="inline-flex rounded-pill bg-g100 px-3 py-1 text-[11px] font-bold text-g500">
              Standard
            </span>
          )}
        </div>

        <h3 className="m-0 text-[20px] font-[750] tracking-[-0.4px] text-g900">
          {link.title}
        </h3>

        {link.description && (
          <p className="m-0 mt-2 text-[13.5px] leading-[1.6] text-g500">
            {link.description}
          </p>
        )}

        <dl className="mt-6 space-y-0">
          <div className="flex items-start justify-between gap-4 border-t border-g100 py-3">
            <dt className="shrink-0 text-[12.5px] font-medium text-g400">Site</dt>
            <dd className="m-0 truncate text-right text-[13px] font-semibold text-g900">
              {hostname}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-4 border-t border-g100 py-3">
            <dt className="shrink-0 text-[12.5px] font-medium text-g400">URL</dt>
            <dd className="m-0 break-all text-right text-[13px] font-medium text-g700">
              {link.url}
            </dd>
          </div>
        </dl>
      </div>

      <div className="border-t border-g100 p-4">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-pill bg-indigo px-5 py-3 text-[13px] font-semibold text-white shadow-pop transition-colors duration-150 hover:bg-indigo-hover"
        >
          Open link
          <LuArrowUpRight size={16} />
        </a>
      </div>
    </aside>
  )
}
