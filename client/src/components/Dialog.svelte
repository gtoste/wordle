<script>
    import { DialogContent, getClose, getOptions } from "svelte-dialogs";
  
    const close = getClose();
    const {titleId} = getOptions();
    export let text = "";
    export let reset;
  </script>
  
  <DialogContent>
    <h1 id={titleId} slot="header">Wordle</h1>
    <svelte:fragment slot="body">
      <p>{text}</p>
    </svelte:fragment>
    <svelte:fragment slot="footer">
      <button on:click={() => { reset(); close('!');  }}>close me</button>
    </svelte:fragment>
  </DialogContent>