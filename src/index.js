import app from './app';
import {STATUS_FORM} from './const';
import i18next from 'i18next';
import {LANGUAGES, ru} from './locales';
import './style.css';

const initalState = {
  feeds: [],
  rssUrls: [],
  posts: [],
  stateForm: {
    status: STATUS_FORM.VALID, // valid / invalid
    errors: [],
  },
};

const translateConfig = {
  lng: LANGUAGES.RU,
  debug: true,
  resources: {ru},
};

app(
  initalState,
  i18next.createInstance({translateConfig}),
);
