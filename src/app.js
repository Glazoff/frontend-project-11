import onChange from 'on-change'
import {initView} from './view';
import {validateUrl} from './utils/validateUrl'
import {STATUS_FORM} from './const'
import {getPosts} from './utils/axios';
import {xmlParser} from './utils/parser'

const successHandler = (state, url, feed, posts) => {
  const input = document.getElementById('url-input')

  input.value = ''
  input.focus()
  state.rssUrls.push(url)
  state.feeds.push(feed)
  state.posts.push(...posts)
  state.stateForm.errors = []
  state.stateForm.status = STATUS_FORM.VALID
}

const failHandler = (state, errors) => {
  state.stateForm.errors.push(errors)
  state.stateForm.status = STATUS_FORM.INVALID
}

const createHandlerSubmit = (state) => (e) => {
  e.preventDefault()
  state.stateForm.errors = []

  const data = new FormData(e.target)
  const url = data.get('url').trim()

  validateUrl(url, state)
    .then(() => getPosts(url))
    .then(({data}) => {
      const {feed, posts} = xmlParser(data.contents)
  
      successHandler(state, url, feed, posts)
    })
    // .catch(({message}) => failHandler(state, message))
}

export default (initalState, i18) => {
  i18.init().then((translation) => {
    const form = document.querySelector('.rss-form')

    // create State
    const {render} = initView(translation)
    const state = onChange(initalState, render);

    const handlerSubmit = createHandlerSubmit(state)
    form.addEventListener('submit', handlerSubmit)
  })
}
