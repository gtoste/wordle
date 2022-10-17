<script>
  // imports
  import sidebar from "./assets/sidebar.png";
  import Sidebar from "./components/Sidebar.svelte";
  import Main from "./components/Main.svelte";
  import { SvelteToast } from '@zerodevx/svelte-toast'

  //settings
  let display = false;
  let wordLength = 5;
  let contrast;

  const options = {
    duration: 1000,
    dismissable: false}
  let theme = false;

  //functions
  function show(){display = !display;}

</script>

<nav class="header">
  <img src={sidebar} alt="sidebar" on:click={show} />
  <h1>WORDLE</h1>
</nav>

<Sidebar {display} bind:value = {wordLength} bind:contrast={contrast}/>
<SvelteToast options = {options}/>
<div class="container"> 
  <Main  {wordLength} {contrast}/>
</div>

<style>
  :global(body) {
    background-color: white;		
    color: black;
		transition: background-color 0.3s
	}
	:global(body.dark-mode) {
		background-color: rgb(18, 18, 19);
		color: white;
	}

  :global(body.dark-mode) .header{
    border-bottom: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    font-size: 36px;
  } 

  :global(body.dark-mode) .header img{
    width: 36px;
    height: 36px;
    filter: invert(100);
    position: absolute;
    left: 10px;
    top: .67em;
  }

  :global(body.dark-mode) .header h1{
    color: rgb(255, 255, 255);
    font-size: 36px;
    font-weight: 700;
    text-align: center;
  }

  .container{
    width: 50%;
    margin: auto;
  }

  .header{
    border-bottom: 1px solid black;
    display: flex;
    justify-content: center;
    font-size: 36px;
  }

  .header img{
    width: 36px;
    height: 36px;
    position: absolute;
    left: 10px;
    top: .67em;
  }

  .header h1{
    color: black;
    font-size: 36px;
    font-weight: 700;
    text-align: center;
  }
</style>