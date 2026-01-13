import {string} from 'yup'

export const validateUrl = (url, state) => {
  const schema = string().required().url().notOneOf(state.feeds);

  return schema.validate(url)
}