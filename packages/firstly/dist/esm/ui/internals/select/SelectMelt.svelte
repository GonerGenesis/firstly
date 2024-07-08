<script>import { createCombobox, createSync } from "@melt-ui/svelte";
import { createEventDispatcher, onMount, tick } from "svelte";
import { fly } from "svelte/transition";
import {
  Button,
  LibIcon_Check,
  LibIcon_Cross,
  LibIcon_Search,
  tw
} from "../../../";
import Icon from "../../Icon.svelte";
export let id;
export let disabled = false;
export let placeholder = "";
export let items = [];
let totalCount = void 0;
export let focus = false;
const focusNow = (node) => {
  if (focus) {
    tick().then(() => {
      node.focus();
    });
  }
};
export let loadOptions = void 0;
export let value = void 0;
export let clearable = false;
export let createOptionWhenNoResult = false;
export let default_select_if_one_item = false;
const dispatch = createEventDispatcher();
function dispatchSelectedValue(_data) {
  dispatch("selected", _data);
}
function dispatchIssue(msg) {
  dispatch("issue", msg);
}
function dispatchCreateRequest(e, input2) {
  e.preventDefault();
  dispatch("createRequest", input2);
}
let lastSearch = void 0;
const localLoadOptions = async (str) => {
  if (str === lastSearch) {
    return;
  }
  lastSearch = str;
  if (loadOptions) {
    const lo = await loadOptions(str);
    items = lo.items;
    totalCount = lo.totalCount;
    filteredItems = items;
  }
};
onMount(async () => {
  localLoadOptions("");
  sync.selected(getDefaultValue(value));
});
const getDefaultValue = (_selectedValue) => {
  if (!items) {
    return;
  }
  const found = items.find((c) => String(c?.id) === String(_selectedValue));
  if (found) {
    return toOption(found);
  } else {
    if (value !== null && value !== void 0 && items.length > 0) {
      dispatchIssue("VALUE_NOT_IN_ITEMS");
    }
  }
};
const toOption = (item) => ({
  value: item,
  label: item.caption
  // icon: item.icon,
  // disabled: item.disabled,
});
const {
  elements: { menu, input, option },
  states: { open, inputValue, touchedInput, selected: localSelected }
  // helpers: { isSelected },
} = createCombobox({
  forceVisible: true,
  disabled,
  ids: { label: id }
});
const clearSelection = () => {
  sync.selected(void 0);
};
let debounceTimer;
const debounce = (callback) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(
    callback,
    // debounce only if we have a load option
    loadOptions ? 444 : 0
  );
};
const sync = createSync({ selected: localSelected });
$: items && sync.selected(getDefaultValue(value), (v) => {
  if (v?.value?.id !== value) {
    dispatchSelectedValue(v?.value);
  }
  value = v?.value?.id;
});
$: if (!$open) {
  $inputValue = $localSelected?.label ?? "";
}
$: filteredItems = items;
$: {
  if (items.length === 1 && default_select_if_one_item) {
    sync.selected(toOption(items[0]));
  }
}
const calcFilteredItems = (touched, str, value2) => {
  if (touched) {
    debounce(async () => {
      const normalizedInput = str.toLowerCase();
      updateFilteredItems(normalizedInput);
    });
  } else {
    updateFilteredItems("");
  }
};
const updateFilteredItems = async (normalizedInput) => {
  if (loadOptions) {
    await localLoadOptions(normalizedInput);
  } else {
    filteredItems = items.filter((item) => {
      return item.caption?.toLowerCase().includes(normalizedInput);
    });
  }
};
$: calcFilteredItems($touchedInput, $inputValue, value);
</script>

<div class="input input-bordered flex min-w-0 items-center {disabled && 'opacity-40'}">
  <div class="relative">
    {#if $localSelected?.value?.icon?.data}
      <Icon
        data={$localSelected.value.icon.data}
        class={tw(['relative', $localSelected.value.icon.class])}
        style={$localSelected.value.icon.style}
        size={$localSelected.value.icon.size}
      ></Icon>
    {:else}
      <Icon data={LibIcon_Search} class="relative"></Icon>
    {/if}
  </div>
  <!-- {id} -->
  <input
    {...$input}
    use:$input.action
    class="-ml-8 -mr-5 h-full min-w-0 flex-grow bg-transparent px-10"
    {placeholder}
    use:focusNow
  />
  <div class="pointer-events-none relative right-0 flex gap-2">
    {#if clearable && $localSelected}
      <button on:click={clearSelection} class="pointer-events-auto">
        <Icon data={LibIcon_Cross}></Icon>
      </button>
    {/if}
    <!-- {#if $open}
      <Icon data={LibIcon_ChevronUp}></Icon>
    {:else}
      <Icon data={LibIcon_ChevronDown}></Icon>
    {/if} -->
  </div>
</div>

{#if $open}
  <ul
    class="border-base-content/20 z-50 flex max-h-[300px] flex-col overflow-hidden rounded-lg border"
    {...$menu}
    use:$menu.action
    transition:fly={{ duration: 150, y: -5 }}
  >
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div class="bg-base-100 flex max-h-full flex-col gap-0 overflow-y-auto py-2" tabindex="0">
      {#each filteredItems as item, index (index)}
        <li
          {...$option(toOption(item))}
          use:$option.action
          class="data-[highlighted]:bg-primary data-[highlighted]:text-primary-content relative flex cursor-pointer scroll-my-2 items-center
          rounded-md
          px-1
          py-2
					data-[disabled]:opacity-50"
        >
          {#if $localSelected?.value?.id === item.id}
            <Icon data={LibIcon_Check} class="w-6"></Icon>
          {:else}
            <!-- just to book the place -->
            <span class="w-6"></span>
          {/if}
          {#if item.icon?.data}
            <Icon
              data={item.icon.data}
              class={tw(['flex-shrink-0', item.icon.class])}
              style={item.icon.style}
              size={item.icon.size}
            ></Icon>
          {/if}
          <div class="pl-2">
            <span class="font-medium">{item.caption}</span>
          </div>
        </li>
      {:else}
        {#if createOptionWhenNoResult}
          <div class="p-4">
            <Button
              class="w-full"
              on:click={(e) => {
                dispatchCreateRequest(e, $inputValue)
              }}>Créer "{$inputValue}"</Button
            >
          </div>
        {:else}
          <li class="relative cursor-pointer rounded-md py-1 pl-8 pr-4">Aucun résultat</li>
        {/if}
      {/each}
    </div>
    {#if totalCount}
      <div class="bg-base-300 z-50 text-center text-xs">
        {#if items.length < totalCount}
          ({items.length} / {totalCount})
        {:else}
          <!-- yes, items.length can be bigger if the selected item is not in the limit -->
          ({items.length})
        {/if}
      </div>
    {/if}
  </ul>
{/if}
