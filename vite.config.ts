import { defineConfig } from 'vite';
import { sveltekit }    from '@sveltejs/kit/vite';
import { svelte }       from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		sveltekit(),
		// svelte(),
		//  Î this breaks
		//      npm run dev
		//      npm run  build
		//      npx vite
		//      npx vite build
	],
	// build: {
    //     outDir: 'dist' // output dir for compiled files
    // }
});
