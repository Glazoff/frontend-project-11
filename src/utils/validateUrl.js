import { string } from 'yup'

export const validateUrl = (url, state) => {
  const schema = string()
    .required()
    .url('url_invalid')
    .notOneOf(state.rssUrls, 'url_same')

  return schema.validate(url)
}
