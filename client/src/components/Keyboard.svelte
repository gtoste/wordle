<script>
  export let value;

  const click = num => () => value = num;
</script>

<div class="base">
    <div class="line1">
        <span on:click={click("Q")}>Q</span>
        <span on:click={click("W")}>W</span>
        <span on:click={click("E")}>E</span>
        <span on:click={click("R")}>R</span>
        <span on:click={click("T")}>T</span>
        <span on:click={click("Y")}>Y</span>
        <span on:click={click("U")}>U</span>
        <span on:click={click("I")}>I</span>
        <span on:click={click("O")}>O</span>
        <span on:click={click("P")}>P</span>
    </div>
    <div class="line2">
        <span on:click={click("A")}>A</span>
        <span on:click={click("S")}>S</span>
        <span on:click={click("D")}>D</span>
        <span on:click={click("F")}>F</span>
        <span on:click={click("G")}>G</span>
        <span on:click={click("H")}>H</span>
        <span on:click={click("J")}>J</span>
        <span on:click={click("K")}>K</span>
        <span on:click={click("L")}>L</span>
    </div>
    <div class="line3">
        <span on:click={click("Ę")}>Ę</span>
        <span on:click={click("Ó")}>Ó</span>
        <span on:click={click("Ą")}>Ą</span>
        <span on:click={click("Ś")}>Ś</span>
        <span on:click={click("Ł")}>Ł</span>
        <span on:click={click("Ż")}>Ż</span>
        <span on:click={click("Ź")}>Ź</span>
        <span on:click={click("Ć")}>Ć</span>
        <span on:click={click("Ń")}>Ń</span>
    </div>
    <div class="line4">
        <span on:click={click("Enter")}>Enter</span>
        <span on:click={click("Z")}>Z</span>
        <span on:click={click("X")}>X</span>
        <span on:click={click("C")}>C</span>
        <span on:click={click("V")}>V</span>
        <span on:click={click("B")}>B</span>
        <span on:click={click("N")}>N</span>
        <span on:click={click("M")}>M</span>
        <span on:click={click("Backspace")}><svg baseProfile="tiny" id="backspace" version="1.2" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M19.5,5h-10C8.234,5,6.666,5.807,5.93,6.837L3.32,10.49c-0.642,0.898-1.182,1.654-1.199,1.679  C2,12.344,1.999,12.661,2.124,12.833c0.023,0.033,0.555,0.777,1.188,1.664l2.619,3.667C6.666,19.193,8.233,20,9.5,20h10  c1.379,0,2.5-1.122,2.5-2.5v-10C22,6.122,20.879,5,19.5,5z M17.207,14.793c0.391,0.391,0.391,1.023,0,1.414  C17.012,16.402,16.756,16.5,16.5,16.5s-0.512-0.098-0.707-0.293L13.5,13.914l-2.293,2.293C11.012,16.402,10.756,16.5,10.5,16.5  s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l2.293-2.293l-2.293-2.293c-0.391-0.391-0.391-1.023,0-1.414  s1.023-0.391,1.414,0l2.293,2.293l2.293-2.293c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L14.914,12.5L17.207,14.793z"/></svg></span>
    </div>
</div>


<style>
span {
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
.base {
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  padding: 30px 15px;
  font: 28px arial;
}

div[class*='line'] {
  display: flex;
  justify-content:center;
}

div[class*='line'] + div[class*='line'] {
  margin-top: 15px;
}

.line1,
.line3 {
  padding: 0 15px;
}

.line2 {
  padding: 0 30px;
}

div[class*='line'] span {
  box-shadow: 0px 3px 3px rgba(0, 0, 0, .7);
  color: #e2e2e2;
  padding: 15px;
  background: #2F3336;
  border-radius: 12px;
  width: 25px;
  text-align: center;
  margin-right: 10px;
}

div[class*='line'] span:hover {
  /*   box-shadow: 0px 2px 10px #040404;*/
  
  background: #2e2e2e;
  cursor: pointer
}

div[class*='line'] span:active {
  transform: scale(.9);
}

.line4 span:first-of-type {
  width: 100px;
  padding: 10px 15px;
}

.line4 span:last-of-type {
  width: 35px;
  padding: 10px 15px;
}


</style>

