<script>export let value;
export { extraClass as class };
let extraClass = "";
function clip(_value) {
  if (_value) {
    navigator.clipboard.writeText(_value);
  }
}
</script>

<span
  role="button"
  tabindex="0"
  on:keyup={() => {}}
  on:click={() => clip(value)}
  class={`${value ? 'cursor-copy' : ''} ${extraClass}`}
>
  <slot />
</span>
