<script>
	import App     from '../App.svelte';
    import Example from "$lib/components/example.svelte";
    import ChatCompletion from "$lib/components/chat-completion.svelte";


    let modelsVal = [ "gpt-4o", "gpt-4" ];
</script>


<h3>Welcome to SvelteKit</h3>

<p>we are in +page.svelte </p>


<App />


<Example />


<ChatCompletion 
    promptMsg="Something weird. But answer in json format."
    models={modelsVal}
/>
