import onChange from 'on-change';
import {initView} from './view';
import {validateUrl} from './utils/validateUrl';
import {STATUS_FORM} from './const';
import {getPosts} from './utils/axios';
import {xmlParser} from './utils/parser';
import {AxiosError} from 'axios';
import {uniqueId} from 'lodash';
import {checkerUpdate} from './utils/checkerUpdate';

const successHandler = (state, url, feed, posts) => {
  const input = document.getElementById('url-input');

  input.value = '';
  input.focus();
  state.rssUrls.push(url);
  state.feeds.push(feed);
  state.posts.push(...posts);
  state.stateForm.errors = [];
  state.stateForm.status = STATUS_FORM.VALID;
};

const failValidate = (state, errors) => {
  state.stateForm.errors.push(errors);
  state.stateForm.status = STATUS_FORM.INVALID;
};

const failLoad = (state, errors) => {
  state.stateForm.errors.push(errors);
  state.stateForm.status = STATUS_FORM.INVALID;
};

const handlerError = (name, message, state) => {
  switch (name) {
    case 'ValidationError':
      failValidate(state, message);
      break;
    case 'AxiosError':
      failLoad(state, message);
      break;
  }
};

const createHandlerSubmit = (state) => (e) => {
  e.preventDefault();
  state.stateForm.errors = [];

  const data = new FormData(e.target);
  const url = data.get('url').trim();

  validateUrl(url, state)
    .then(() => getPosts(url))
    .then(({data}) => {
      const {contents, status} = data;

      if (status.http_code !== 200) throw new AxiosError('is_not_rss'); 

      const {feed, posts} = xmlParser(contents);
      
      const feedId = uniqueId();
      feed.id = feedId;
      const uniquePosts =  posts.map((p) =>  ({id: uniqueId(), feedId, ...p}));

      successHandler(state, url, feed, uniquePosts);

      setTimeout(checkerUpdate, 5000, url, feedId, state);
    })
    .catch(({name, message}) => {
      handlerError(name, message, state);
    });
};

export default (initalState, i18) => {
  i18.init().then((translation) => {
    const form = document.querySelector('.rss-form');

    const {render} = initView(translation);
    const state = onChange(initalState, render);

    const handlerSubmit = createHandlerSubmit(state);
    form.addEventListener('submit', handlerSubmit);
  });
};
