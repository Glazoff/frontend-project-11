import {STATUS_FORM} from './const'

function renderTextDanger(errors, i18) {
  const textDanger = document.querySelector('.text-danger')

  if (!errors.length) {
    textDanger.textContent = ''
    return
  }

  errors.forEach(err => {
    switch(err) {
      case 'url_invalid':
        textDanger.textContent = i18('errors.url_invalid')
        break
      case 'url_same':
        textDanger.textContent = i18('errors.url_same')
        break
    }
  });
}

function getTitleNode(text) {
  const wrapper = document.createElement('div')
  wrapper.classList.add('card-body')
  const title = document.createElement('h2')
  title.classList.add(["card-title", "h4"])
  title.textContent = text
  wrapper.appendChild(title)
  return wrapper
}

function renderInput(status) {
  const formControl = document.querySelector('.form-control')

  if (status === STATUS_FORM.INVALID) {
    formControl.classList.add('is-invalid')
    return
  }

  formControl.classList.remove('is-invalid')
}

function renderPosts(posts, i18) {
  const container = document.querySelector('.posts')
  console.log("renderPosts", posts)
  container.innerHTML = ''

  if (posts.length) {
    const nodeTitle = getTitleNode(i18('posts'))
    const list = document.createElement('ul')
    list.classList.add('list-group', 'border-0' ,'rounded-0')

    posts.forEach(({title, link}) => {
      const itemList = document.createElement('li')
      itemList.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')
      const linkPost = document.createElement('a')
      linkPost.classList.add('fw-bold')
      linkPost.setAttribute('href', link)
      linkPost.textContent = title

      const button = document.createElement('button')
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm')
      button.textContent = i18('show')
      itemList.appendChild(linkPost)
      itemList.appendChild(button)

      list.appendChild(itemList)
    })

    container.appendChild(nodeTitle)
    container.appendChild(list)
  }
} 

function renderFeeds(feeds) {
  console.log("renderFeeds", feeds)

}

const initView = (i18) => {
  function render(path, value) {
    switch(path) {
      case 'stateForm.errors':
        renderTextDanger(value, i18)
        break;
      case 'stateForm.status':
        renderInput(value)
        break;
      case 'posts':
        renderPosts(value, i18)
        break;
      case 'feeds':
        renderFeeds(value)
        break;
    }
  }
  
  return {render}
}

export {initView}
