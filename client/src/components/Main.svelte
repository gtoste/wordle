<script>
    import {isLetter} from "../helpers/isLetter";
    import {createBoard} from "../helpers/createBoard";
    import checkIfWordExists from "../helpers/checkIfWordExists";
    import Keyboard from "./Keyboard.svelte";

    export let word;
    export let wordLength;
    let previousLength = wordLength;

    let words = createBoard(wordLength);
    
    let index = 0;
    let possition = 0;

    async function onKeyDown(event)
    {
        if(isLetter(event.key) && possition < wordLength)
        {
            words[index][possition] = event.key;
            possition++;
        }else if(event.key === 'Backspace'){
            possition = possition > 0 ? possition - 1 : 0;
            words[index][possition] = "";
        }else if(event.key === 'Enter')
        {
            if(possition == wordLength) 
            {
                const exists = await checkIfWordExists(words[index].join(''))
                if(exists)
                {
                    possition = 0; index += 1
                }else{
                    console.log("NOT A WORD")
                }
            }else{
                console.log("NOT ENOUGH LENTH")
            }
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

<Keyboard />
<svelte:window on:keydown|preventDefault={onKeyDown} />

<style>
    div{
        margin: auto;
        padding: 0;
    }

    .row{
        width: 100%;
        display: inline-flex;
        margin: 0;
        padding: 0;
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