<script>
	import App     from '../App.svelte';
    import Example from "$lib/components/example.svelte";
    import ChatCompletion from "$lib/components/chat-completion.svelte";


    let modelsVal = [ "gpt-4o", "gpt-4" ];
    let promptMsgA = `Who was Sheakespeare?
        Was he a noble man from the court?
        Use the following json format for your response:

        {{
            "agreement":        "<agrees/disagrees/neutral>",
            "alignment":         <percentage_score>
            "textual_analysis":  <text>
        }}


    `;



</script>


<h3>Welcome to SvelteKit</h3>

<p>we are in +page.svelte </p>


<App />


<Example />


<ChatCompletion
    promptMsg={promptMsgA}
    models={modelsVal}
/>
