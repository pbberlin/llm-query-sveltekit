<script lang="ts">

    import { onMount } from 'svelte';

    console.log("start - 1");

    export let promptMsg: string;
    export let models:    string[];
    // let prompt: string;
    // let models: string[];

    console.log("start - 2");

    let a =2

    const endPoint = `http://localhost:8001/chat-completion-json`;


    promptMsg = `Who was Sheakespeare?  
        Was he a noble man from the court?
        Answer in json format.
    `;
    models = [
        "gpt-4o",
        "gpt-4"
    ];

    type requestT = {
        // ident:  string;
        model:  string;
        prompt: string;
        role:   string;
    };

    let requests: requestT[] = [];
    
    models.forEach(mdl => {
        requests.push({
            model:  mdl,
            prompt: promptMsg,
            role:   "",
        });
    });


    type responseInnerT = {
        agreement:         string;
        alignment:         number;
        textual_analysis:  string;
    };
    type responseOuterT = {
        ident:         string;
        jsonResult:    responseInnerT;
        error:         string;
    };

    function dummyJsonRes() :responseInnerT{
        return {
            agreement: "no val",
            alignment: -1,
            textual_analysis: "no analysis",
        }
    }

    function dummyResp(id="id1") :responseOuterT {
        return  {
            ident: `${id}`,
            jsonResult: dummyJsonRes(),
            "error": "",
        }
    }





    let results :responseOuterT[] = [];

    results.push(dummyResp("id-22"))

    // fetch data for a single model
    async function fetchModelResult(request: requestT): Promise<responseOuterT>  {
        try {
            const response = await fetch( endPoint, {
                method:    'POST',
                headers: { 'Content-Type': 'application/json' },
                body:       JSON.stringify(request)
            });
            const rsp = await response.json();
            console.log(`result found for ${request.model}`);
            return {
                ident: `id-${request.model}`,
                jsonResult: rsp,
                error: "",
            };
        } catch (err) {
            console.log(err);
            return {
                ident: `id-${request.model}`,
                jsonResult: dummyJsonRes(),
                error: `error: ${err}`,
            };

        }
    }

    // Fetch results for each model
    onMount(async () => {
        console.log("mounted - fetch start");
        results = await Promise.all(requests.map(fetchModelResult));
        console.log("mounted - fetch stop");
    });

</script>

<div>
    results...
    {#each results as { ident, jsonResult, error }}
        <div>
            <h4>{ident}</h4>
            {#if error}
                <p>Error: {error}</p>
            {:else}
                <p>Agreement: {jsonResult.agreement}</p>
                <p>Alignment: {jsonResult.alignment}</p>
                <p>Textual Analysis: {jsonResult.textual_analysis}</p>
            {/if}
        </div>
    {/each}
</div>
