<script>import { createEventDispatcher } from "svelte";
import Icon from "../../../ui/Icon.svelte";
export let id;
export let disabled = false;
export let placeholder = "";
export let items = [];
export let value = void 0;
const dispatch = createEventDispatcher();
function dispatchSelected(_data) {
  dispatch("selected", _data);
}
</script>

<div {id} class="input input-bordered flex w-fit min-w-0 items-center">
  <div class="-mx-2 flex gap-2" title={placeholder}>
    {#each items as item}
      <button
        {disabled}
        on:click={() => {
          value = item.id
          dispatchSelected(items.find((i) => i.id === item.id))
        }}
        type="button"
        class="min-w-0 cursor-pointer rounded-md px-1.5 py-1 {value === item.id
          ? 'bg-primary text-primary-content'
          : ''}"
      >
        <div class="flex gap-2">
          {#if item.icon}
            <Icon {...item.icon} />
          {/if}
          {item.caption}
        </div>
      </button>
    {/each}
  </div>
</div>
