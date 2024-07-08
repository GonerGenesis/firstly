<script>import { createEventDispatcher, onMount } from "svelte";
import { scrollbar } from "../../theme";
export let name = null;
export let id = "";
export let rows = 6;
export let placeholder = "";
export let focus = false;
export let value = "";
export let readonly = false;
export const error = false;
export let align = `left`;
const _tmp = align;
const dispatch = createEventDispatcher();
let reference;
const focusNow = (node) => {
  if (focus) {
    node.focus();
  }
};
onMount(() => {
  if (!reference) {
    return;
  }
  if (!focus) {
    return;
  }
  reference.focus();
});
function dispatchInput(value2) {
  dispatch("input", { value: value2 });
}
</script>

{#if readonly}
  <span class="flex min-h-8 max-w-full items-center px-3 py-1 text-sm md:min-h-[2.5rem]">
    <div class="overflow-hidden">
      {@html value ?? '-'}
    </div>
  </span>
{:else}
  <textarea
    use:focusNow
    {...$$restProps}
    class="textarea textarea-bordered
			shadow-neutral-focus md:rounded-xls flex h-max min-h-8
			w-full items-center rounded-lg bg-transparent text-xs
			shadow-sm md:text-sm lg:min-h-[2.5rem]
			{scrollbar.thin}"
    id={id || name || 'default-textarea-id'}
    {name}
    {placeholder}
    autocomplete="off"
    bind:this={reference}
    bind:value
    {rows}
    on:input={(e) => {
      // @ts-ignore
      dispatchInput(e.target.value)
    }}
  />
{/if}
