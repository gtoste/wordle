<script>
  // imports
  import sidebar from "./assets/sidebar.png";
  import Sidebar from "./components/Sidebar.svelte";
  import Main from "./components/Main.svelte";
	import { onMount } from 'svelte';
  import { SvelteToast } from '@zerodevx/svelte-toast'

  //settings
  let display = false;
  let wordLength = 5;
  let word = "";
  const options = {
    duration: 1000,
    dismissable: false}
  //functions
  function show(){display = !display;}

  async function getRandomWord(wordLength)
    {
        let url = "http://localhost:8000/api/word/" + wordLength;
        const res = await fetch(url);
        const word = await res.json();
        if(res.ok)
        {
            return word.name;
        }else{
            throw new Error(word);
        }
    }

    async function onWordLengthChange(len)
    {
      const getWord = async()=>{
        let word = await getRandomWord(len);
        return word;
      }

      return await getWord();
    }

    onMount(async () => {
      word = await getRandomWord(wordLength);
	  });


  $: 
  {
    wordLength = wordLength;
    onWordLengthChange(wordLength).then(response => {word = response})
  }
</script>

<nav class="header">
  <img src={sidebar} alt="sidebar" on:click={show} />
  <h1>WORDLE</h1>
</nav>

<Sidebar {display} bind:value = {wordLength}/>
{word}
<SvelteToast options = {options}/>
<div class="container"> 
  <Main {word} {wordLength}/>
</div>

<style>
  .container{
    width: 50%;
    margin: auto;
  }

  .header{
    border-bottom: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    font-size: 36px;
  }

  .header img{
    width: 36px;
    height: 36px;
    filter: invert(100);
    position: absolute;
    left: 10px;
    top: .67em;
  }

  .header h1{
    color: rgb(255, 255, 255);
    font-size: 36px;
    font-weight: 700;
    text-align: center;
  }
</style>