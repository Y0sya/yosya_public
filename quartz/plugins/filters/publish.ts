import { QuartzFilterPlugin } from "../types"

export const PublishFilter: QuartzFilterPlugin = () => ({
  name: "PublishFilter",
  shouldPublish(_ctx, [_tree, vfile]) {
    // Always allow index page through (it's the homepage)
    const slug = vfile.data?.slug
    if (slug === "index") {
      return true
    }

    // Only publish files with explicit publish: true in frontmatter
    return vfile.data?.frontmatter?.publish === true || vfile.data?.frontmatter?.publish === "true"
  },
})
