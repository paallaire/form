interface IValidationRule {
  id: string;
  required?: boolean;
  email?: boolean;
  messageErrors: {
    en: {
      required: string;
      typeMismatch?: string;
    };
  };
}

export class FormValidation {
  elForm: HTMLFormElement;
  elButtonSubmit: HTMLButtonElement;
  elFormMessage: HTMLDivElement;
  onSubmit: boolean;
  validationRules: IValidationRule[];
  onSubmitSuccess?: () => void;

  constructor(
    elForm: HTMLFormElement,
    validationRules: IValidationRule[],
    { onSubmitSuccess }: { onSubmitSuccess?: () => void } = {}
  ) {
    this.elForm = elForm;
    this.elButtonSubmit = this.elForm.querySelector('button[type="submit"]') as HTMLButtonElement;
    this.elFormMessage = this.elForm.querySelector('.form-message') as HTMLDivElement;
    this.onSubmit = false;
    this.validationRules = validationRules;
    this.onSubmitSuccess = onSubmitSuccess;

    this.init();
  }

  /**
   * Initializes the form validation.
   * It calls initializeValidation and addEvents methods.
   */
  init() {
    this.initializeValidation();
    this.elForm.addEventListener('submit', (event) => this.handleFormSubmit(event));
  }

  /**
   * Initializes validation for each input based on the provided rules.
   * It iterates over the rules and adds an event listener to the input element to call the inputValidation method on change.
   */
  initializeValidation() {
    this.validationRules.forEach((rule: any) => {
      const input = document.getElementById(rule.id) as HTMLInputElement;

      if (!input) {
        console.log('Element id not found:', rule.id);
        return;
      }

      input.addEventListener('change', () => this.inputValidation(input, rule));
    });
  }

  /**
   * Handles the change event of an input.
   * @param input - The input element being validated.
   * @param divError - The element where error messages will be displayed.
   * @param messageErrors - The error messages for the input.
   * @param containerControls - The container element for styling based on validation state.
   *
   * It calls showError or clearError based on the input's validity state.
   */
  inputValidation(input: HTMLInputElement, rule: any) {
    const divError = input.nextElementSibling as HTMLElement;
    const containerControls = input.closest('.control-input') as HTMLElement;

    if (!divError?.classList.contains('input-message-error')) {
      console.log('Element error:', rule);
      return;
    }

    if (input.validity.valid) {
      this.clearError(divError, containerControls);
    } else {
      this.showError(input, divError, rule.messageErrors, containerControls);
    }
  }

  /**
   * Validates all inputs according to the validation rules.
   * @returns true if any of the inputs have an error, false otherwise.
   */
  inputsValidationAll(): boolean {
    let hasError = false;

    this.validationRules.forEach((rule: any) => {
      const input = document.getElementById(rule.id) as HTMLInputElement;
      if (!input) return;

      const divError = input.nextElementSibling as HTMLElement;
      const containerControls = input.closest('.control-input') as HTMLElement;

      if (!input.validity.valid) {
        hasError = true;
        this.showError(input, divError, rule.messageErrors, containerControls);
        input.focus();
      }
    });

    return hasError;
  }

  /**
   * Clears the error message and styling from an input field.
   * @param divError - The element displaying the error message.
   * @param containerControls - The container element for styling.
   */
  clearError(divError: HTMLElement, containerControls: HTMLElement) {
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
  showError(input: HTMLInputElement, divError: HTMLElement, messageErrors: any, containerControls: HTMLElement) {
    if (input.validity.valueMissing) {
      divError.textContent = messageErrors.en.required;
    } else if (input.validity.typeMismatch) {
      divError.textContent = messageErrors.en.typeMismatch;
    }

    containerControls.classList.add('is-invalid');
  }

  /**
   * Handles form submission by validating all inputs.
   * @param event - The submit event of the form.
   * @param validationRules - The validation rules for the form inputs.
   */
  handleFormSubmit(event: Event) {
    event.preventDefault();
    let hasError = false;
    let formData = new FormData(this.elForm);

    this.elFormMessage.setAttribute('hidden', 'hidden');

    hasError = this.inputsValidationAll();

    if (!hasError && !this.onSubmit) {
      this.onSubmit = true;
      this.elButtonSubmit.setAttribute('disabled', 'disabled');

      if (this.onSubmitSuccess) {
        this.onSubmitSuccess();
      }

      fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData,
      })  
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          this.elForm.reset();
          this.onSubmit = false;
          this.elButtonSubmit.removeAttribute('disabled');
          this.elFormMessage.textContent = 'Merci'; // TODO: gérer le message
          this.elFormMessage.removeAttribute('hidden');
        })
        .catch(error => {
          console.error('Error:', error);
          this.onSubmit = false;
          this.elButtonSubmit.removeAttribute('disabled');
          this.elFormMessage.textContent = 'Erreur'; // TODO: gérer le message
          this.elFormMessage.removeAttribute('hidden');
        });

    }
  }
}
