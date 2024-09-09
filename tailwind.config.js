/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "validation.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')({
      className: 'wysiwyg',
    }),
  ],
};
