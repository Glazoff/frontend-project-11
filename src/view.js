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

function renderInput(value) {
  const formControl = document.querySelector('.form-control')

  if (value === STATUS_FORM.INVALID) {
    formControl.classList.add('is-invalid')
    return
  }

  formControl.classList.remove('is-invalid')
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
    }
  }
  
  return {render}
}

export {initView}
