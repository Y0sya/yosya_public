import { QuartzComponent, QuartzComponentConstructor } from "./types"

const SiteHeader: QuartzComponent = () => {
  return (
    <div class="site-header">
      <a href="/">joseph's notes</a>
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
