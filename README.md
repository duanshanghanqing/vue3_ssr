# Vue 3 Server Side Rendering

This is an expermental SSR setup with Vue 3.

Currently there's no HTML template support or automatic state serialization. Those should be handled manually by updating `server/utils/render.js`.

## Scripts

    You can run the following scripts with `yarn` or `npm` like `yarn install`

    npm i
    npm run dev

## CSS

All CSS will be extracted into a single file. Using [Tailwind CSS](https://github.com/tailwindcss/tailwindcss), you're not supposed to be writing a lot of CSS, so splitting stylesheets is not required. If you don't want to use [Tailwind CSS](https://github.com/tailwindcss/tailwindcss), you'll need to update webpack configs.
