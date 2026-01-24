import { xmlParser } from './parser'
import { getPosts } from './axios'
import { uniqueId } from 'lodash'

function filterNewPost(lateList, notFilterList) {
  const links = new Set(lateList.map(item => item.link))

  return notFilterList.filter(item => !links.has(item.link))
}

export function checkerUpdate(url, feedId, state) {
  getPosts(url)
    .then(({ data }) => {
      const { contents } = data

      const { posts: notFilteredPost } = xmlParser(contents)
      const latePosts = state.posts.filter(p => p.feedId === feedId)

      const newPosts = filterNewPost(latePosts, notFilteredPost)

      const uniquePosts = newPosts.map(p => ({ id: uniqueId(), feedId, ...p }))

      state.posts.push(...uniquePosts)

      setTimeout(checkerUpdate, 5000, url, feedId, state)
    })
}
