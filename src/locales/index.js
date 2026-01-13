import i18next from 'i18next';
import ru from './ru'

const LANGUAGES = {
  RU: 'ru'
}

const i18 = i18next.createInstance({
  lng: LANGUAGES.RU,
  debug: true,
  resources: {ru}
})

export {i18, LANGUAGES}
