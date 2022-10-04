<script>
    import {isLetter} from "../helpers/isLetter";
    import createBoard from "../helpers/createBoard";
    import checkIfWordExists from "../helpers/checkIfWordExists";

    export let word;
    export let wordLength;
    let previousLength = wordLength;

    let words = createBoard(wordLength);
    
    let index = 0;
    let possition = 0;

    function onKeyDown(event)
    {
        if(isLetter(event.key))
        {
            words[index][possition] = event.key;
            possition++;
            if(possition == wordLength) {
                console.log(checkIfWordExists(words[index].join('')))
                possition = 0; index += 1}
            if(index > 4){console.log("end")} 
        }
    }

    $: { 
        if(wordLength != previousLength)
        {
            previousLength = wordLength;
            words = createBoard(wordLength);       
        }
    }


</script>

<div style="width: {wordLength*50}px;">
    {#each Array(wordLength) as _,i}
    <div class="row">
        {#each Array(wordLength) as _,j}
            <div class="block">{words[i][j]}</div>
        {/each}
    </div>
    {/each}
</div>
<svelte:window on:keydown|preventDefault={onKeyDown} />

<style>
    div{
        margin: auto;
    }

    .row{
        width: 100%;
        display: inline-flex;
        margin: 0;
    }

    .block{
        margin: 0;
        width: 50px;
        height: 50px;
        outline: 1px solid #e2e2e2;
        text-align: center;
        line-height: 50px;
    }
</style>