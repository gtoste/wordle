<script>
    import {isLetter} from "../helpers/isLetter";
    import {createBoard} from "../helpers/createBoard";
    import checkIfWordExists from "../helpers/checkIfWordExists";
    // @ts-ignore
    import { dialogs } from "svelte-dialogs";
    import Keyboard from "./Keyboard.svelte";
    import {toast} from '@zerodevx/svelte-toast';
    import {compareWords, getRandomWord, onWordLengthChange} from "../helpers/engine";
    import Dialog from "./Dialog.svelte";
    import { onMount } from 'svelte';


    export let wordLength;
    export let contrast;

    let word = "";

    onMount(async () => {
      word = await getRandomWord(wordLength);
	});

    var correct = "#138513";
    var close = "#e09909";
   
    $: {
        contrast = contrast;
        if(contrast == 0)
        {
            correct = "#4d874d";
            close = "#f0d297";
        }
        else if(contrast == 2)
        {
            correct = "#00ff00";
            close = "#ffa900";
        }else{
            correct = "#138513";
            close = "#e09909";
        }
    
    }

    let previousLength = wordLength;

    //keyboard colors
    let greens = []
    let oranges = []
    let grays = []
    let can_roll = true;

    let words = createBoard(wordLength)
    let colors = Array(wordLength).fill(0).map(() => Array(wordLength).fill(-1))
    console.log(colors)
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
                if(exists)
                {
                    const result = compareWords(word, words[index])
                    for(let i = 0; i < result.length; i++)
                    {
                        let letter = words[index][i];
                        if(result[i] === 1)
                        {
                            colors[index][i] = 1;
                            if (!greens.includes(letter)) greens = [...greens, letter]
                        }else if (result[i] === 0)
                        {
                            colors[index][i] = 0;
                            if (!oranges.includes(letter) && !greens.includes(letter)) oranges = [...oranges, letter]
                        }else{
                            if (!grays.includes(letter)) grays = [...grays, letter]
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
    let hints;

    async function hint()
    {
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word).then(res => res.json()).then(data =>{
            try{
                hints.innerText = data[0].meanings[0].definitions[0].definition;
            }catch
            {
                hints.innerText = data.message;
            }
            
        });
        can_roll = false;
    }

    function reset(){
        onWordLengthChange(wordLength).then(response => {word = response})
        words = createBoard(wordLength);
        colors = Array(wordLength).fill(-1).map(() => Array(wordLength))
        index = 0;
        possition = 0;
        oranges = []
        greens = []
        grays = []
        hints.innerText = ""
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

<button on:click={hint}>HINT</button>
<div bind:this={hints}>

</div>
<div style="width: {wordLength*50}px;">
    {#each Array(wordLength) as _,i}
    <div class="row">
        {#each Array(wordLength) as _,j}
            <div class="block"
            style:background={colors[i][j] === -1 ? "" : colors[i][j] === 1 ? correct : close}
            >{words[i][j]}</div>
        {/each}
    </div>
    {/each}
</div>

<Keyboard bind:value={button} bind:greens = {greens} bind:oranges = {oranges} bind:grays = {grays}/>
<svelte:window on:keydown|preventDefault={onKeyDown} />

<style>
    button{
        padding: 10px;
    }

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

    :global(body.dark-mode) .block{
        margin: 0;
        width: 50px;
        height: 50px;
        outline: 1px solid #e2e2e2;
        text-align: center;
        line-height: 50px;
    }

    .block{
        margin: 0;
        width: 50px;
        height: 50px;
        outline: 1px solid black;
        text-align: center;
        line-height: 50px;
    }
</style>