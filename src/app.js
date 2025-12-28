import {string} from 'yup'
import onChange from 'on-change'
import {STATUS_FORM} from './const'

const validateUrl = (url, state) => {
  const schema = string().required().url().notOneOf(state.feeds);

  return schema.validate(url)
}

export default () => {
  const form = document.querySelector('.rss-form')
  const input = document.getElementById('url-input')
  const state = {
    feeds: [],
    stateForm: {
      status: STATUS_FORM.VALID, // valid / invalid / isSame
    }
  }

  const watchedObject = onChange(state, function (path, value) {
    console.log('this:', this);
    console.log('path:', path);
    console.log('value:', value);
  });


  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = new FormData(e.target)
    const url = data.get('url')

    validateUrl(url, watchedObject)
      .then(() => {
        watchedObject.feeds.push(url)
        input.value = ''
        input.focus()
      })
      .catch((err) => console.log(err))
  })
}
