<script>import { tw } from "../../utils/tailwind";
export let label = "label";
export let forId;
export let required = false;
export let error = "";
export let classes = {};
</script>

<div class="form-control w-full">
  <label for={forId} class={tw(`label flex gap-1 px-2 pb-1`, classes.label)}>
    <span class="label-text text-base-content/60 pl-2 text-xs">
      {label}{required ? ' *' : ''}
    </span>
    {#if error}
      <!-- TODO hover popup if too long? -->
      <span class="label-text-alt text-error truncate">{error}</span>
    {/if}
  </label>
  <div class={tw('grid h-12 w-full', classes.slot)}>
    <slot />
  </div>
</div>
