<script lang="ts">

    import { onMount } from 'svelte';

    export let promptMsg: string;
    export let models:    string[];

    const endPoint = `http://localhost:8001/chat-completion-json`;


    if (false){
        promptMsg = `Who was Sheakespeare?
            Was he a noble man from the court?
            Use the following json format for your response:

            {{
                "agreement":        "<agrees/disagrees/neutral>",
                "alignment":         <percentage_score>
                "textual_analysis":  <text>
            }}


        `;
        models = [
            "gpt-4o",
            "gpt-4"
        ];
    }

    type requestT = {
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

    function dummyRespInner() :responseInnerT{
        return {
            agreement: "no val",
            alignment: -1,
            textual_analysis: "no analysis",
        }
    }

    function dummyRespOuter(id="id1") :responseOuterT {
        return  {
            ident: `${id}`,
            jsonResult: dummyRespInner(),
            "error": "",
        }
    }



    let results :responseOuterT[] = [];
    results.push(dummyRespOuter("id-22"))


    // fetch data for a single model
    async function fetchModelResult(rq: requestT): Promise<responseOuterT>  {
        try {
            const rspStr = await fetch( endPoint, {
                method:    'POST',
                headers: { 'Content-Type': 'application/json' },
                body:       JSON.stringify(rq)
            });
            console.log(`\tresult found for ${rq.model}`);
            const rsp :responseOuterT = await rspStr.json();
            // console.log(rsp);
            return rsp;
        } catch (err) {
            console.log(err);
            return {
                ident: `id-${rq.model}`,
                jsonResult: dummyRespInner(),
                error: `error: ${err}`,
            };

        }
    }

    // fetch results for each prepared request in parallel
    onMount(async () => {
        console.log("mounted - fetch start");
        results = await Promise.all( requests.map(fetchModelResult) );
        console.log("mounted - fetch stop");
    });

</script>

<div>
    results...
    <!-- <pre>
        {JSON.stringify(results, null , "  ")}
    </pre> -->
    {#each results as res}
        <div>
            <h4>{res.ident}</h4>
            {#if res.error}
                <p>Error: {res.error}</p>
            {:else}
                <p>Agreement:        {res.ident}                      </p>
                <p>Agreement:        {res.jsonResult.agreement}       </p>
                <p>Alignment:        {res.jsonResult.alignment}       </p>
                <p>Textual Analysis: {res.jsonResult.textual_analysis}</p>
            {/if}
        </div>
    {/each}
</div>
