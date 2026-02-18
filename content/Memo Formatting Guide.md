---
publish: false
---
# Memo Formatting Guide

## Frontmatter Template

```yaml
---
publish: true
date: 2026-02-17
title: "Your Title Here"
summary: "One or two sentences for the feed preview."
---
```

## Fields

| Field | Required | Description |
|-------|----------|-------------|
| `publish` | Yes | Set to `true` to publish, `false` or omit to keep private |
| `date` | Yes | `YYYY-MM-DD` format, controls sort order on the feed |
| `title` | Yes | Displayed on the feed and memo page |
| `summary` | No | 1-2 lines shown on the feed. If omitted, uses first sentence |

## Publishing

1. Add frontmatter above to your note
2. Run `publish.bat` from `SynologyDrive/Projects/yosya_public`
3. Site updates in ~40 seconds at y0sya.github.io/yosya_public
