import './styles/main.pcss';

// import formJustValidate from './JustValidate';
// import validation from './validation';

import { FormValidation } from './FormValidation';

const rules = [
  {
    id: 'input-email',
    required: true,
    email: true,
    messageErrors: {
      en: {
        required: 'You need to enter an e-mail address.',
        typeMismatch: 'Entered value needs to be an e-mail address.'
      },
      fr: {
        required: 'Vous devez entrer une adresse e-mail',
        typeMismatch: 'La valeur entrée doit être une adresse e-mail.'
      }
    }
  }
];



document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed 123');


  const form = document.getElementsByTagName('form')[0];
  const FormTest = new FormValidation(
    form,
    rules, {
    onSubmitSuccess: () => {
      console.log('Form is valid! Callback is executed.');
      // Logique à exécuter lorsque le formulaire est validé avec succès
    }
  })

})
