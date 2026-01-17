import {STATUS_FORM} from './const';

function renderTextDanger(errors, translation) {
  const textDanger = document.querySelector('.text-danger');

  if (!errors.length) {
    textDanger.textContent = '';
    return;
  }

  errors.forEach(err => {
    textDanger.textContent = translation(`errors.${err}`);
  });
}

function getTitleNode(text) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('card-body');

  const title = document.createElement('h2');
  title.classList.add(['card-title', 'h4']);
  title.textContent = text;

  wrapper.appendChild(title);
  return wrapper;
}

function renderInput(status) {
  const formControl = document.querySelector('.form-control');

  if (status === STATUS_FORM.INVALID) {
    formControl.classList.add('is-invalid');
    return;
  }

  formControl.classList.remove('is-invalid');
}

function renderPosts(posts, translation) {
  const container = document.querySelector('.posts');
  container.innerHTML = '';

  if (posts.length) {
    const nodeTitle = getTitleNode(translation('posts'));
    const list = document.createElement('ul');
    list.classList.add('list-group', 'border-0', 'rounded-0');

    posts.forEach(({title, link}) => {
      const itemList = document.createElement('li');
      itemList.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

      const linkPost = document.createElement('a');
      linkPost.classList.add('fw-bold');
      linkPost.setAttribute('href', link);
      linkPost.textContent = title;

      const button = document.createElement('button');
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.textContent = translation('show');

      itemList.append(linkPost, button);
      list.appendChild(itemList);
    });

    container.append(nodeTitle, list);
  }
} 

function renderFeeds(feeds, translation) {
  const container = document.querySelector('.feeds');
  container.innerHTML = '';

  if (feeds.length) {
    const nodeTitle = getTitleNode(translation('feeds'));
    const list = document.createElement('ul');
    list.classList.add('list-group', 'border-0', 'rounded-0');

    feeds.forEach(({title, description}) => {
      const itemList = document.createElement('li');
      itemList.classList.add('list-group-item', 'border-0', 'rounded-0');

      const titleFeed = document.createElement('h3');
      titleFeed.classList.add('h6', 'm-0');
      titleFeed.textContent = title;

      const descFeed = document.createElement('p');
      descFeed.classList.add('m-0', 'small', 'text-black-50');
      descFeed.textContent = description;

      itemList.append(titleFeed, descFeed);

      list.appendChild(itemList);
    });

    container.append(nodeTitle, list);
  }
}

const initView = (translation) => {
  function render(path, value) {
    switch(path) {
      case 'stateForm.errors':
        renderTextDanger(value, translation);
        break;
      case 'stateForm.status':
        renderInput(value);
        break;
      case 'posts':
        renderPosts(value, translation);
        break;
      case 'feeds':
        renderFeeds(value, translation);
        break;
    }
  }
  
  return {render};
};

export {initView};
