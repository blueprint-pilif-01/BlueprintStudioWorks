import trackerConfig from "@config/site-tracker.json"

export type TrackerTodo = {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "todo" | "in-progress" | "done"
  tags?: string[]
}

type TrackerSite = {
  name: string
  slug: string
  codes: string[]
  todos?: TrackerTodo[]
}

const trackerSites = trackerConfig.sites as TrackerSite[]

export type SiteIdentifier = TrackerSite["name"]

type SiteMetadata = {
  slug: string
  path: string
  todos: TrackerTodo[]
}

export const SITE_METADATA = trackerSites.reduce<Record<SiteIdentifier, SiteMetadata>>((map, site) => {
  map[site.name as SiteIdentifier] = {
    slug: site.slug,
    path: `client-sites/${site.slug}/index.html`,
    todos: site.todos ?? [],
  }
  return map
}, {} as Record<SiteIdentifier, SiteMetadata>)

export const SITE_PATHS = Object.keys(SITE_METADATA).reduce<Record<SiteIdentifier, string>>((paths, key) => {
  paths[key as SiteIdentifier] = SITE_METADATA[key as SiteIdentifier].path
  return paths
}, {} as Record<SiteIdentifier, string>)

export const ACCESS_CODES = trackerSites.reduce<Record<string, { site: SiteIdentifier }>>((codes, site) => {
  site.codes.forEach((code) => {
    codes[code.trim().toLowerCase()] = { site: site.name as SiteIdentifier }
  })
  return codes
}, {})

export const TRACKER_STORAGE_KEYS = {
  accessLog: "bsw-tracker-access",
  activeSite: "bsw-tracker-active-site",
  todoState: "bsw-tracker-todos",
  feedbackDrafts: "bsw-tracker-feedback-drafts",
} as const
