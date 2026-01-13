import onChange from 'on-change'
import {render} from './view';
import {validateUrl} from './utils/validateUrl'
import {STATUS_FORM} from './const'

const successHandle = (state, url) => {
  const input = document.getElementById('url-input')

  input.value = ''
  input.focus()
  state.feeds.push(url)
  state.stateForm.errors = []
  state.stateForm.status = STATUS_FORM.VALID
}

const failHandle = (state, errors) => {
  state.stateForm.errors.push(...errors)
  state.stateForm.status = STATUS_FORM.INVALID
}

const createHandlerSubmit = (state) => (e) => {
  e.preventDefault()
  const data = new FormData(e.target)
  const url = data.get('url').trim()

  validateUrl(url, state)
    .then(() => successHandle(state, url))
    .catch(({errors}) => failHandle(state, errors))
}

export default (initalState) => {
  const form = document.querySelector('.rss-form')

  // create State
  const state = onChange(initalState, render);

  const handlerSubmit = createHandlerSubmit(state)
  form.addEventListener('submit', handlerSubmit)
}
