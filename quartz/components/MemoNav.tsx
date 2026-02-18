import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { byDateAndAlphabetical } from "./PageList"

const MemoNav: QuartzComponent = ({ allFiles, fileData, cfg }: QuartzComponentProps) => {
  const sorted = allFiles
    .filter((f) => f.frontmatter?.publish === true)
    .sort(byDateAndAlphabetical(cfg))

  const idx = sorted.findIndex((f) => f.slug === fileData.slug)
  if (idx === -1) return null

  // byDateAndAlphabetical sorts newest first, so prev = idx-1 (newer), next = idx+1 (older)
  const newer = idx > 0 ? sorted[idx - 1] : null
  const older = idx < sorted.length - 1 ? sorted[idx + 1] : null

  return (
    <div class="memo-nav">
      {newer ? (
        <a href={resolveRelative(fileData.slug!, newer.slug!)} class="internal">←</a>
      ) : (
        <span class="memo-nav-disabled">←</span>
      )}
      {older ? (
        <a href={resolveRelative(fileData.slug!, older.slug!)} class="internal">→</a>
      ) : (
        <span class="memo-nav-disabled">→</span>
      )}
    </div>
  )
}

MemoNav.css = `
.memo-nav {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
}

.memo-nav a {
  color: #000;
  text-decoration: none;
}

.memo-nav a:hover {
  color: #ff5722;
}

.memo-nav-disabled {
  color: #ccc;
  cursor: default;
}
`

export default (() => MemoNav) satisfies QuartzComponentConstructor
