export default function validation() {
  const form = document.getElementsByTagName('form')[0];
  const validationRules = getValidationRules();

  initializeValidation(validationRules);

  form.addEventListener('submit', (event) => handleFormSubmit(event, validationRules));
}

/**
 * Returns the validation rules used to validate form inputs.
 */
function getValidationRules() {
  return [
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
}

/**
 * Initializes validation for each input based on the provided rules.
 * @param validationRules - An array of validation rule objects.
 */
function initializeValidation(validationRules: any[]) {
  validationRules.forEach((rule) => {
    const input = document.getElementById(rule.id) as HTMLInputElement;
    if (!input) return;

    const divError = input.nextElementSibling as HTMLElement;
    const containerControls = input.closest('.control-input') as HTMLElement;

    if (divError?.classList.contains('input-message-error')) {
      console.log('Element error:', rule);
    }

    input.addEventListener('change', () =>
      handleInputChange(input, divError, rule.messageErrors, containerControls)
    );
  });
}

/**
 * Handles the change event of an input.
 * @param input - The input element being validated.
 * @param divError - The element where error messages will be displayed.
 * @param messageErrors - The error messages for the input.
 * @param containerControls - The container element for styling based on validation state.
 */
function handleInputChange(
  input: HTMLInputElement,
  divError: HTMLElement,
  messageErrors: any,
  containerControls: HTMLElement
) {
  if (input.validity.valid) {
    clearError(divError, containerControls);
  } else {
    showError(input, divError, messageErrors, containerControls);
  }
}

/**
 * Clears the error message and styling from an input field.
 * @param divError - The element displaying the error message.
 * @param containerControls - The container element for styling.
 */
function clearError(divError: HTMLElement, containerControls: HTMLElement) {
  divError.textContent = '';
  containerControls.classList.remove('is-invalid');
}

/**
 * Shows an error message based on the input's validity state.
 * @param field - The input field being validated.
 * @param divError - The element displaying the error message.
 * @param messageErrors - The error messages for the input.
 * @param containerControls - The container element for styling.
 */
function showError(
  field: HTMLInputElement,
  divError: HTMLElement,
  messageErrors: any,
  containerControls: HTMLElement
) {
  if (field.validity.valueMissing) {
    divError.textContent = messageErrors.en.required;
  } else if (field.validity.typeMismatch) {
    divError.textContent = messageErrors.en.typeMismatch;
  }

  containerControls.classList.add('is-invalid');
}

/**
 * Handles form submission by validating all inputs.
 * @param event - The submit event of the form.
 * @param validationRules - The validation rules for the form inputs.
 */
function handleFormSubmit(event: Event, validationRules: any[]) {
  event.preventDefault();
  let hasError = false;

  validationRules.forEach((rule) => {
    const input = document.getElementById(rule.id) as HTMLInputElement;
    if (!input) return;

    const divError = input.nextElementSibling as HTMLElement;
    const containerControls = input.closest('.control-input') as HTMLElement;

    if (!input.validity.valid) {
      hasError = true;
      showError(input, divError, rule.messageErrors, containerControls);
    }
  });

  if (!hasError) {
    (event.target as HTMLFormElement).submit();
  }
}
