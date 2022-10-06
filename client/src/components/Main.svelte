<script>
    import {isLetter} from "../helpers/isLetter";
    import {createBoard} from "../helpers/createBoard";
    import checkIfWordExists from "../helpers/checkIfWordExists";
    import Keyboard from "./Keyboard.svelte";
    import {toast} from '@zerodevx/svelte-toast';
    import {compareWords} from "../helpers/engine";

    export let word;
    export let wordLength;
    let previousLength = wordLength;
    let data = {
        words : createBoard(wordLength),
        colors : createBoard(wordLength)
    }
    let refresh = false;

    let button = "";
    let index = 0;
    let possition = 0;

    async function onKeyDown(event)
    {
        await enterKey(event.key);
    }

    async function enterKey(key){
        if(isLetter(key) && possition < wordLength)
        {
            data.words[index][possition] = key.toUpperCase();
            possition++;
        }else if(key === 'Backspace'){
            possition = possition > 0 ? possition - 1 : 0;
            data.words[index][possition] = "";
        }else if(key === 'Enter')
        {
            if(possition == wordLength) 
            {
                const exists = await checkIfWordExists(data.words[index].join(''))
                if(exists)
                {
                    const result = compareWords(word, data.words[index])
                    result.forEach((letter, j) => {
                        if(letter === 1)
                        {
                            data.colors[index][j] = "#138513";
                        }else if (letter === 0)
                        {
                            data.colors[index][j] = "#e09909";
                        }
                    });
                    possition = 0; index += 1
                }else{
                    toast.push("NOT A WORD")
                }
            }else{
                toast.push("TO SHORT")
            }
        }
    }

    $: { 
        if(wordLength != previousLength)
        {
            previousLength = wordLength;
            data.words = createBoard(wordLength);       
        }
    }

    $: {enterKey(button); button = ""};

    $: {data = data; console.log(data.colors)}
</script>

<div style="width: {wordLength*50}px;">
    {#each Array(wordLength) as _,i}
    <div class="row">
        {#each Array(wordLength) as _,j}
            <div class="block">{data.words[i][j]}</div>
        {/each}
    </div>
    {/each}
</div>

<Keyboard bind:value={button}/>
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