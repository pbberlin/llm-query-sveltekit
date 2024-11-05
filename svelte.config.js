// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const adaptStatic = {
	pages:  'build',
	assets: 'build',
	fallback: undefined,
	precompress: false,
	strict: true
};



/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// https://svelte.dev/docs/kit/adapters 
		// https://svelte.dev/docs/kit/adapter-static
		adapter: adapter(adaptStatic),
	}
};

export default config;
