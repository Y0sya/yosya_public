import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"

const SiteHeader: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const root = pathToRoot(fileData.slug!)
  return (
    <div class="site-header">
      <a href={root}>joseph's notes</a>
    </div>
  )
}

SiteHeader.css = `
.site-header {
  font-size: 0.9rem;
  margin-bottom: 2rem;
  color: #666;
}

.site-header a {
  color: #666;
  text-decoration: none;
}

.site-header a:hover {
  color: #ff5722;
}
`

export default (() => SiteHeader) satisfies QuartzComponentConstructor
