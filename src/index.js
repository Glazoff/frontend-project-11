import app from './app'
import {STATUS_FORM} from './const'
import './style.css'

const initalState = {
  feeds: [],
  stateForm: {
    status: STATUS_FORM.VALID, // valid / invalid / isSame
    errors: [],
  }
}

app(initalState);
