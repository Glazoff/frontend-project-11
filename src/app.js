import onChange from 'on-change';
import {initView} from './view';
import {validateUrl} from './utils/validateUrl';
import {STATUS_FORM} from './const';
import {getPosts} from './utils/axios';
import {xmlParser} from './utils/parser';
import {uniqueId} from 'lodash';
import {checkerUpdate} from './utils/checkerUpdate';

const successHandler = (state, url, feed, posts) => {
  const input = document.getElementById('url-input');

  // TODO вынести в view
  input.value = '';
  input.focus();
  state.rssUrls.push(url);
  state.feeds.push(feed);
  state.posts = [...posts, ...state.posts];
  state.stateForm.errors = [];
  state.stateForm.status = STATUS_FORM.VALID;
};

const setStateError = (state, errors) => {
  state.stateForm.errors.push(errors);
  state.stateForm.status = STATUS_FORM.INVALID;
};

const handlerError = (name, message, state) => {
  switch (name) {
    case 'ValidationError':
      setStateError(state, message);
      break;
    case 'AxiosError':
      setStateError(state, message);
      break;
    case 'ParseError': 
      setStateError(state, message);
  }
};

const createHandlerSubmit = (state) => (e) => {
  e.preventDefault();
  state.stateForm.errors = [];

  const data = new FormData(e.target);
  const url = data.get('url').trim();

  validateUrl(url, state)
    .then(() => {
      state.stateForm.status = STATUS_FORM.SENDING;
      return getPosts(url);
    })
    .then(({data}) => {
      const {feed, posts} = xmlParser(data.contents);
      
      const feedId = uniqueId();
      feed.id = feedId;
      const uniquePosts =  posts.map((p) =>  ({id: uniqueId(), isViewed: false, feedId, ...p}));

      successHandler(state, url, feed, uniquePosts);

      setTimeout(checkerUpdate, 5000, url, feedId, state);
    })
    .catch(({name, message}) => {
      handlerError(name, message, state);
    })
    .finally(() => state.stateForm.status = STATUS_FORM.FILLING);
};

const createHandlerOpenModal = () => {
  let state = null;

  const setState = (value) => {
    state = value;
  };

  const openModal = ({id}) => {
    if (state) {
      state.posts.forEach(post => {
        if (post.id === id) {
          post.isViewed = true;

          state.currentModal = post;
        }
      });
    }
  };

  const closeModal = () => {
    state.currentModal = null;
  };

  return {
    setState,
    openModal,
    closeModal,
  };
};

export default (initalState, i18) => {
  i18.init().then((translation) => {
    const form = document.querySelector('.rss-form');

    const {openModal, closeModal, setState} = createHandlerOpenModal();

    const {render} = initView(translation, {
      openModal,
      closeModal,
    });

    const state = onChange(initalState, render);
    setState(state);

    const handlerSubmit = createHandlerSubmit(state);
    form.addEventListener('submit', handlerSubmit);
  });
};
