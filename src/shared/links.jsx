export function ExternalLink({ href, children }) {
  // Web pages open in a new tab; mail links open the visitor's mail app.
  const isEmail = href.startsWith('mailto:')
  return (
    <a href={href} target={isEmail ? undefined : '_blank'} rel="noreferrer">
      {children}
    </a>
  )
}

export function displayUrl(url) {
  // Drops http:// or https://, then www. if it's there.
  return url.replace(/^https?:\/\/(www\.)?/, '')
}
