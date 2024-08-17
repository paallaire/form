// @ts-ignore
import JustValidate from 'just-validate';

export default function formJustValidate() {
  const selectLanguage = document.querySelector('#localisation_language') as HTMLSelectElement | null;
  const form = document.querySelector('#localisation_form') as HTMLFormElement | null;

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
      .onSuccess(( event: Event ) => {
        console.log('event:', event)
        form.reset();
        validator.refresh();

        //event.currentTarget.submit();
      })
      .onFail(( fields: object ) => {
        console.log('fields:', fields)
      })

    validator.setCurrentLocale('en');

    selectLanguage?.addEventListener('change', (event: Event) => {
      const language = (event.target as HTMLSelectElement).value;
      validator.setCurrentLocale(language);
    });
  }
}
