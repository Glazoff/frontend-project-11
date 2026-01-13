import {STATUS_FORM} from './const'

function renderTextDanger(errors) {
  const textDanger = document.querySelector('.text-danger')
  console.log(errors)
  if (errors.length) {
    textDanger.textContent = errors.join(', ')
    return
  }

  textDanger.textContent = ''
}

function renderInput(value) {
  const formControl = document.querySelector('.form-control')

  if (value === STATUS_FORM.INVALID) {
    formControl.classList.add('is-invalid')
    return
  }

  formControl.classList.remove('is-invalid')
}

function render(path, value) {
  switch(path) {
    case 'stateForm.errors':
      renderTextDanger(value)
      break;
    case 'stateForm.status':
      renderInput(value)
      break;
  }
}

export {render}
