# Creating a svelte component to query ChatGPT


## What we want

* Basic svelte

* Svelte version 5

* New dollar syntax
    ```javascript
        let count =  $state(0)
    ```

* Export compiled components,
  so we can use them inside any HTML context

* [Docs](https://svelte.dev/docs/svelte/getting-started)

* [Tutorial](https://svelte.dev/tutorial/svelte/state)

* **Failure**:  
  We can only export an entire SSR application in dozens of chunks



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
#  download and install adapter static
npm i -D @sveltejs/adapter-static

# https://svelte.dev/docs/kit/adapter-static
#  change ./svelte.config.js accordingly

```


## Setup to export component

* All steps below **dont work** for Svelte Version 5

* `vite.config.ts` only works with `sveltekit()` - not with `svelte()`

* See repository `llm-query-svelte` for a solution


```bash
npm install svelte @sveltejs/vite-plugin-svelte vite
```

* extending vite.config.ts

* `svelte(),`  break the config

```typescript
import { defineConfig } from 'vite';
import { sveltekit }    from '@sveltejs/kit/vite';
import { svelte }       from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		// sveltekit(),
		svelte(),
    //  Î this breaks
    //      npm run dev
    //      npm run  build
    //      npx vite
    //      npx vite build
	],
	build: {
        outDir: 'dist' // output dir for compiled files
    }
});

```

```bash
# dev server
npx vite

# build
npx vite build
```
