import {STATUS_FORM} from './const';

function getTitleNode(text) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('card-body');

  const title = document.createElement('h2');
  title.classList.add(['card-title', 'h4']);
  title.textContent = text;

  wrapper.appendChild(title);
  return wrapper;
}

function renderTemplateModal({link = '', description = '', title = ''}, translation) {
  return `<div class="modal-dialog" role="document">
    <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-break">${description}</div>
          <div class="modal-footer">
            <a class="btn btn-primary full-article" href="${link}" role="button" target="_blank" rel="noopener noreferrer">
              ${translation('readAll')}
            </a>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${translation('close')}</button>
          </div>
        </div>
      </div>`;
}

function renderModal(modalInfo, translation, closeModal) {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade', 'show');
  modal.style = 'display: block;';
  modal.id = 'modal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'modal');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('role', 'dialog');

  const backdrop = document.createElement('div');
  backdrop.classList.add('modal-backdrop', 'fade', 'show');

  modal.innerHTML = renderTemplateModal(modalInfo, translation);
  const closeButtons = modal.querySelectorAll('.close, .btn-secondary');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', function() {

      closeModal();
      modal.remove();
      backdrop.remove();
    });
  });

  document.body.prepend(modal);
  document.body.appendChild(backdrop);
}

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

function renderInput(status) {
  const formControl = document.querySelector('.form-control');

  if (status === STATUS_FORM.INVALID) {
    formControl.classList.add('is-invalid');
    return;
  }

  formControl.classList.remove('is-invalid');
}

function renderPosts(posts, translation, openModal) {
  const container = document.querySelector('.posts');
  container.innerHTML = '';

  if (posts.length) {
    const nodeTitle = getTitleNode(translation('posts'));
    const list = document.createElement('ul');
    list.classList.add('list-group', 'border-0', 'rounded-0');

    posts.forEach((post) => {
      const {title, link, isViewed} = post;
      const itemList = document.createElement('li');
      itemList.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

      const linkPost = document.createElement('a');

      isViewed ? 
        linkPost.classList.add('fw-normal', 'link-secondary')
        : linkPost.classList.add('fw-bold');

      linkPost.setAttribute('href', link);
      linkPost.setAttribute('target', '_blank');

      linkPost.textContent = title;

      const button = document.createElement('button');
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.textContent = translation('show');

      button.addEventListener('click', () => {
        openModal(post);
      });

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

const initView = (translation, callbacks) => {
  function render(path, value) {
    const {openModal, closeModal} = callbacks;

    switch(path) {
      case 'stateForm.errors':
        renderTextDanger(value, translation);
        break;
      case 'stateForm.status':
        renderInput(value);
        break;
      case 'posts':
        renderPosts(value, translation, openModal);
        break;
      case 'feeds':
        renderFeeds(value, translation);
        break;
      case 'currentModal':
        value && renderModal(value, translation, closeModal);
        break;
    }
  }
  
  return {render};
};

export {initView};
