// @ts-ignore
import JustValidate from 'just-validate';

export default function formJustValidate() {
  const selectLanguage = document.querySelector('#localisation_language') as HTMLSelectElement | null;
  const form = document.querySelector('#just_validate_form') as HTMLFormElement | null;

  const dictionary = [
    {
      key: 'Name is required',
      dict: {
        fr: 'Le nom est requis',
      },
    },
    {
      key: 'Name is too short',
      dict: {
        fr: 'Le nom est trop court',
      },
    },
    {
      key: 'Name is too long',
      dict: {
        fr: 'Le nom est trop long',
      },
    },
    {
      key: 'Email is required',
      dict: {
        fr: "L'e-mail est requis",
      },
    },
    {
      key: 'Email is invalid',
      dict: {
        fr: 'Le courriel est invalide',
      },
    },
  ];

  if (form) {
    const validator = new JustValidate(form, undefined, dictionary);

    // init
    validator
      .addField('#localisation_form_name', [
        {
          rule: 'required',
          errorMessage: 'Name is required',
        },
        {
          rule: 'minLength',
          value: 3,
          errorMessage: 'Name is too short',
        },
        {
          rule: 'maxLength',
          value: 15,
          errorMessage: 'Name is too long',
        },
      ])
      .addField('#localisation_form_email', [
        {
          rule: 'required',
          errorMessage: 'Email is required',
        },
        {
          rule: 'email',
          errorMessage: 'Email is invalid',
        },
      ])
      .addRequiredGroup(
        '#output_format_checkbox_group',
        'You must select one option'
      )
      .onSuccess((event: Event) => {
        console.log('event:', event)
        form.reset();
        validator.refresh();
        event.currentTarget?.submit();
      })
      .onFail((fields: object) => {
        console.log('onFail:', fields)
      })
      .onValidate(({
        isValid,
        isSubmitted,
        fields,
        groups,
      }: {
        isValid: boolean;
        isSubmitted: boolean;
        fields: object;
        groups: any;
      }) => {
        console.log('onValidate:', isValid, isSubmitted, fields, groups)

        const arrayFields = Object.entries(fields).map(([key, value]) => ({
          elem: key,
          ...value
        }));

        arrayFields.forEach((field: any) => {
          console.log('field:', field)
          document.querySelector(`#${field.elem.id}`)?.setAttribute('aria-invalid', field.isValid ? 'false' : 'true');
          document.querySelector(`#${field.elem.id} + .just-validate-error-label`)?.setAttribute('id', `${field.elem.id}_ error`);
        })
      })

    const arrayFields = Object.entries(validator.fields).map(([key, value]) => ({
      elem: key,
      ...value as object, // add type assertion
    }));

    console.log('arrayFields:', arrayFields)

    arrayFields.forEach((field: any) => {
      document.querySelector(`#${field.elem.id}`)?.setAttribute('aria-describedby', `${field.elem.id}_ error` );
    })
    validator.setCurrentLocale('en');

    selectLanguage?.addEventListener('change', (event: Event) => {
      const language = (event.target as HTMLSelectElement).value;
      validator.setCurrentLocale(language);
    });
  }
}

