import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/memoFeed.scss"
import { Date, getDate } from "./Date"

const MemoFeed: QuartzComponent = ({
  allFiles,
  fileData,
  cfg,
}: QuartzComponentProps) => {
  const pages = allFiles
    .filter((f) => f.frontmatter?.publish === true)
    .sort(byDateAndAlphabetical(cfg))

  return (
    <div class="memo-feed">
      {pages.map((page) => {
        const title = page.frontmatter?.title ?? "Untitled"
        const summary =
          (page.frontmatter?.summary as string) ?? page.description ?? ""
        const date = getDate(cfg, page)

        return (
          <article class="memo">
            <h2>
              <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                {title}
              </a>
            </h2>
            {date && (
              <div class="memo-date">
                <Date date={date} locale={cfg.locale} />
              </div>
            )}
            {summary && <div class="memo-summary">{summary}</div>}
          </article>
        )
      })}
    </div>
  )
}

MemoFeed.css = style
export default (() => MemoFeed) satisfies QuartzComponentConstructor
