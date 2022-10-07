<script>
    import {isLetter} from "../helpers/isLetter";
    import {createBoard} from "../helpers/createBoard";
    import checkIfWordExists from "../helpers/checkIfWordExists";
    import { dialogs } from "svelte-dialogs";
    import Keyboard from "./Keyboard.svelte";
    import {toast} from '@zerodevx/svelte-toast';
    import {compareWords, getRandomWord, onWordLengthChange} from "../helpers/engine";
    import Dialog from "./Dialog.svelte";
    import { onMount } from 'svelte';

    export let wordLength;

    let word = "";

    onMount(async () => {
      word = await getRandomWord(wordLength);
	});

    const correct = "#138513";
    const close = "#e09909"

    let previousLength = wordLength;

    let words = createBoard(wordLength)
    let colors = createBoard(wordLength)

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
            words[index][possition] = key.toUpperCase();
            possition++;
        }else if(key === 'Backspace'){
            possition = possition > 0 ? possition - 1 : 0;
            words[index][possition] = "";
        }else if(key === 'Enter')
        {
            if(possition == wordLength) 
            {
                const exists = await checkIfWordExists(words[index].join(''))
                // const exists = true;
                if(exists)
                {
                    const result = compareWords(word, words[index])
                    for(let i = 0; i < result.length; i++)
                    {
                        if(result[i] === 1)
                        {
                            colors[index][i] = correct;
                        }else if (result[i] === 0)
                        {
                            colors[index][i] = close;
                        }
                    }
                    
                    if (word.toUpperCase() === words[index].join("").toUpperCase())
                    {
                        dialogs.modal(Dialog, {text: `You won in ${index + 1} attemps`, reset : reset})
                    }

                    possition = 0; index += 1
                }else{
                    toast.push("NOT A WORD")
                }
            }else{
                toast.push("TO SHORT")
            }
        }
    }

    function reset(){
        onWordLengthChange(wordLength).then(response => {word = response})
        words = createBoard(wordLength);
        colors = createBoard(wordLength);
        index = 0;
        possition = 0;
    }

    $: { 
        if(wordLength != previousLength)
        {
            previousLength = wordLength;
           
            reset()
        }
    }

    $: {enterKey(button); button = ""};
</script>


{word}
<div style="width: {wordLength*50}px;">
    {#each Array(wordLength) as _,i}
    <div class="row">
        {#each Array(wordLength) as _,j}
            <div class="block"
            style:background={colors[i][j]}
            >{words[i][j]}</div>
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