const xmlParser = (source) => {
  const xml = new DOMParser().parseFromString(source, 'application/xml')

  const parseError = xml.querySelector('parsererror')
  if (parseError) {
    const error = new Error('is_not_rss')
    error.name = 'ParseError'
    throw error
  }

  const feed = {
    title: xml.querySelector('channel > title').textContent,
    description: xml.querySelector('channel > description').textContent,
  }

  const nodeList = xml.querySelectorAll('channel > item')
  const posts = [...nodeList].map((node) => {
    return {
      title: node.querySelector('title').textContent,
      link: node.querySelector('link').textContent,
      description: node.querySelector('description').textContent,
    }
  })

  return { feed, posts }
}

export { xmlParser }
