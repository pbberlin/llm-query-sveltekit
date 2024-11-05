# Creating a svelte component to query ChatGPT


## What we want

* Basic svelte

* Svelte version 5

* Only components

* New dollar syntax  
    ```javascript  
        let count =  $state(0)
    ```

* [Docs](https://svelte.dev/docs/svelte/getting-started) 

* [Tutorial](https://svelte.dev/tutorial/svelte/state)

* Export the compiled components, 
  so we can use them inside any HTML context

## Setup

```bash

npx sv svelte-query-chatGPT

# minimal
# typescript
# -- no tools
# npm

cd svelte-query-chatGPT

# start server
npm run dev
# start the server and open the app in a new browser tab
npm run dev -- --open 

# production version of your app:
npm run build

# preview the production build with 
npm run preview


# deploy your app
#  using adapter static

# adapter static
npm i -D @sveltejs/adapter-static

# https://svelte.dev/docs/kit/adapter-static
#  change ./svelte.config.js accordingly

```


