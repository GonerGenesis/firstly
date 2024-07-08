<script generics="T extends Record<any, any>">import { createEventDispatcher } from "svelte";
import { getRelationFieldInfo } from "remult/internals";
import { tw } from "..";
import Field from "./Field.svelte";
import FieldContainer from "./internals/FieldContainer.svelte";
import Loading from "./Loading.svelte";
export let mode = "edit";
export let cells;
export let store;
export let focusKey = null;
const getError = (errors, field) => {
  const fo = getRelationFieldInfo(field);
  const keyToUse = fo?.options?.field ?? field.key;
  if (errors && errors[keyToUse]) {
    return errors[keyToUse];
  }
  return void 0;
};
const shouldHide = (c, mode2) => {
  if (mode2 === "edit" && c.modeEdit === "hide") {
    return true;
  }
  if (mode2 === "view" && c.modeView === "hide") {
    return true;
  }
  return false;
};
const modeToUse = (c, mode2) => {
  if (mode2 === "edit" && c.modeEdit === "view") {
    return "view";
  }
  if (mode2 === "view" && c.modeView === "edit") {
    return "edit";
  }
  return mode2;
};
const dispatch = createEventDispatcher();
function dispatchChanged(_data) {
  dispatch("changed", _data);
}
$: dispatchChanged($store.item);
let size = ["", "w-1/2", "w-1/3", "w-1/4", "w-1/5", "w-1/6"];
function isToFocus(currentKey, focusKey2, i) {
  if (focusKey2 === null || focusKey2 === void 0) {
    if (i === 0) {
      return true;
    }
    return false;
  }
  return focusKey2 === currentKey;
}
</script>

{#each cells as cell, i}
  {@const focus = isToFocus(cell.field?.key, focusKey, i)}
  {#if shouldHide(cell, mode)}
    <!-- Do nothing -->
  {:else}
    <div class={cell.class}>
      {#if cell.kind === 'header'}
        <span>{cell.header}</span>
      {:else if cell.field && (!$store || $store.loading)}
        <!-- If the store is not ready mdiYeast, or in loading... -->
        <FieldContainer label={cell.field.caption} forId={cell.field.key}>
          <Loading
            class={tw(
              `mx-4 my-3 h-6`,
              size[parseInt((((i + 1) * Math.random() * size.length) % size.length).toString())],
            )}
          />
        </FieldContainer>
      {:else if cell.kind === 'slot'}
        <slot name="field" field={cell.field} {focus} />
      {:else if cell.field && $store.item}
        <Field
          mode={modeToUse(cell, mode)}
          {cell}
          cellsValues={$store.item}
          bind:value={$store.item[cell.field.key]}
          error={getError($store.errors, cell.field)}
          {focus}
          on:createRequest
        />
        <!-- disabled={isDisableFieldDynamic(cell)} -->
      {:else}
        FieldGroup : Case not handled
      {/if}
    </div>
  {/if}
{/each}
