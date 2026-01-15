import app from './app'
import {STATUS_FORM} from './const'
import {i18} from './locales'
import './style.css'

const initalState = {
  feeds: [],
  rssUrls: [],
  posts: [],
  stateForm: {
    status: STATUS_FORM.VALID, // valid / invalid
    errors: [],
  }
}

i18.init()
  .then((translation) => app(initalState, translation))
