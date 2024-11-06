<script>
	let { message = "Here is component 'Example.svelte'" } = $props();
</script>

<p>
    {message}
    <br>

    Imported from $lib/components/example.svelte

</p>

