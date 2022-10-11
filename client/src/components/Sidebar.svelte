<script>
    export let display = false;
    export let value;


    function toggle() {
	window.document.body.classList.toggle('dark-mode')
}
</script>

<div class:hidden={!display}>
    <h3>Settings</h3>
    <label for="words_length">Words' Length: </label>
    <select bind:value={value} name="words_length">
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
      </select>
    <br/>
      <label for="theme">Lightmode</label>
      <button on:click={toggle}>Change theme</button>
</div>

<style>

    :global(body.dark-mode) div {
        background-color: rgb(18, 18, 19);
        position: absolute;
        left: 0;
        padding: 1em;
        width: 300px;
        transition: width 1s;
        border-right: 1px solid white;
        border-bottom: 1px solid white;
        flex: 1 1 auto;
        z-index: 1;
        }

    .hidden{
        display: none;
    }

    div{
        background-color: white;
        position: absolute;
        left: 0;
        padding: 1em;
        width: 300px;
        transition: width 1s;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        flex: 1 1 auto;
        z-index: 1;
    }
</style>