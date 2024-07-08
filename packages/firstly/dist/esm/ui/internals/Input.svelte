<script>import { createEventDispatcher, tick } from "svelte";
import { tw } from "../../utils/tailwind";
export let value = void 0;
const dispatch = createEventDispatcher();
export let focus = false;
const focusNow = (node) => {
  if (focus) {
    tick().then(() => {
      node.focus();
    });
  }
};
export let withDedounce = false;
let timer = null;
const debounce = (fn) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    fn();
  }, 444);
};
function dispatchInput(value2) {
  if ($$restProps.type === "date") {
    if (value2) {
      dispatch("input", { value: transformDate(value2) });
    }
  } else {
    dispatch("input", { value: value2 });
  }
}
let className = void 0;
export { className as class };
const handleInput = (e) => {
  const target = e.target;
  if ($$restProps.type === "number") {
    if (e.data === "." || e.data === ",") {
      e.preventDefault();
    } else {
      value = +target.value;
    }
  } else {
    value = target.value;
  }
  if (withDedounce) {
    return debounce(() => {
      dispatchInput(value);
    });
  } else {
    dispatchInput(value);
  }
};
const transformDate = (input) => {
  const rawDateSplited = input.split("-");
  if (rawDateSplited.length === 3) {
    const yearSplited = rawDateSplited[0].split("");
    if (yearSplited.length === 4 && yearSplited[0] === "0" && yearSplited[1] === "0" && yearSplited[2] !== "0") {
      return `20${yearSplited[2]}${yearSplited[3]}-${rawDateSplited[1]}-${rawDateSplited[2]}`;
    }
  }
  return input;
};
const handleKeyup = (event) => {
  if ($$restProps.type === "date") {
    value = transformDate(event.target.value);
  }
};
</script>

<input
  use:focusNow
  class={tw('w-full px-2', className)}
  on:input={handleInput}
  bind:value
  on:blur
  on:change
  on:click
  on:focus
  on:keydown
  on:keypress
  on:keyup={handleKeyup}
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:paste
  {...$$restProps}
/>

<style>
  input[type='number'] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
</style>
