# forms

## JustValidate
Modern form validation library<br />Simple, powerful and lightweight (~5kb gzip). Written in Typescript, and has no dependencies (no JQuery!)

### Demo
https://paallaire.github.io/form/

## Accessibility In Forms

https://www.smashingmagazine.com/2023/02/guide-accessible-form-validation/
https://web.dev/learn/accessibility/forms?hl=fr

- Ajouts de label pour les champs
- Utiliser "aria-describedby" pour fournir davantage d'information
- Ajouter l'attribut "required" pour les champs nécessaire si le formulaire utilise la validation par défaut
- Ajouter l'attribut "aria-required="true" pour les champs nécessaire si le formulaire utilise une validation custom js (visuel ou autres)
- Ajouter l'attribut "aria-invalid="false|true" pour les champs obligatoire
- Ajouter l'attribut aria-describedby="id1 id2" pour donner l'imformation sur l'erreur
- Ajouter l'attribut aria-live="assertive" pour la validation "live" par champs
- Si validation par le bouton "submit" avec message "global" d'erreur, utiliser aria-live="assertive" ( voir le cas  https://www.smashingmagazine.com/2023/02/guide-accessible-form-validation/#in-long-forms)
- Ajouter un focus sur le premier champs en erreur







