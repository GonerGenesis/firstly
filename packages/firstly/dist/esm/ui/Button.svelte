<script>import { createTooltip } from "@melt-ui/svelte";
import { fade, fly } from "svelte/transition";
import { remult } from "remult";
import { KitBaseEnum, tw } from "../";
export let isLoading = false;
let className = void 0;
export { className as class };
export let permission = void 0;
let permissionDisabled = false;
$: disabled = $$restProps.disabled || permissionDisabled || isLoading;
let triggerAnnimation = false;
$: isLoading && setTimeout(() => {
  if (isLoading) {
    triggerAnnimation = true;
  }
}, 200);
let updates = (param) => {
  if (param && param.permission) {
    permissionDisabled = !remult.isAllowed(
      Array.isArray(param.permission) ? param.permission.map((c) => c.id) : param.permission.id
    );
    if (permissionDisabled) {
      disabledWhy = `Vous n'avez pas la permission: ${Array.isArray(param.permission) ? param.permission.map((c) => `"${c.caption}"`).join(" ou ") : `"${param.permission.caption}"`}`;
    } else {
      disabledWhy = "";
    }
  } else {
    permissionDisabled = false;
    disabledWhy = "";
  }
};
let disabledWhy = "";
const isAllowed = (node, param) => {
  updates(param);
  return {
    update(param2) {
      updates(param2);
    },
    destroy() {
    }
  };
};
const {
  elements: { trigger, content, arrow },
  states: { open }
} = createTooltip({
  positioning: {
    placement: "top"
  },
  openDelay: 0,
  closeDelay: 0,
  closeOnPointerDown: false,
  forceVisible: true,
  escapeBehavior: "close",
  group: true
});
</script>

<button
  {...$trigger}
  use:trigger
  use:isAllowed={{ permission }}
  on:click
  {...$$restProps}
  class={tw(['btn text-white', disabled ? '' : 'btn-primary', className])}
  {disabled}
>
  <!-- btn-outline -->
  <slot />
  {#if triggerAnnimation && isLoading}
    <div in:fly={{ x: -20 }}>
      <span class="loading loading-spinner"></span>
    </div>
  {/if}
</button>

{#if $open && (disabledWhy || $$slots.tooltip)}
  <div
    {...$content}
    use:content
    transition:fade={{ duration: 100 }}
    class="bg-base-300 z-30 rounded-lg ring-1 ring-black"
  >
    <div {...$arrow} use:arrow />
    <div class="px-4 py-1">
      {#if $$slots.tooltip}
        <slot name="tooltip" />
      {:else}
        {disabledWhy}
      {/if}
    </div>
  </div>
{/if}

<style>
  .btn[disabled] {
    pointer-events: all;
    cursor: not-allowed;
  }
</style>
