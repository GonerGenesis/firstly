<script generics="T extends Record<any, any>">import { createEventDispatcher } from "svelte";
import {} from "remult";
import {} from "../";
import { suffixWithS } from "../formats/strings";
import {
  displayWithDefaultAndSuffix,
  getEntityDisplayValue,
  getFieldMetaType,
  getFirstInterestingField
} from "../helper.js";
import { tw } from "../utils/tailwind";
import Clipboardable from "./Clipboardable.svelte";
import Icon from "./Icon.svelte";
import FieldContainer from "./internals/FieldContainer.svelte";
import Input from "./internals/Input.svelte";
import MultiSelectMelt from "./internals/select/MultiSelectMelt.svelte";
import SelectMelt from "./internals/select/SelectMelt.svelte";
import SelectRadio from "./internals/select/SelectRadio.svelte";
import Textarea from "./internals/Textarea.svelte";
export let cell;
export let value = void 0;
export let cellsValues = {};
export let withDedounce = false;
export let error = "";
export let mode = "edit";
export let focus = false;
export let clearable = void 0;
export let disabled = false;
const dispatch = createEventDispatcher();
function dispatchSelected(_data) {
  value = _data;
  dispatch("selected", _data);
}
$: metaType = getFieldMetaType(cell.field);
const isViewMode = (_mode, _field) => {
  return _mode === "view" || _field?.dbReadOnly || _field?.options.allowApiUpdate === false;
};
const common = (_field, isLight = false) => {
  let toRet = {
    id: _field?.key ?? "SOMETHING_AT_LEAST",
    disabled: _field?.dbReadOnly || _field?.options.allowApiUpdate === false || disabled,
    placeholder: _field?.options?.placeholder ?? void 0
  };
  if (isLight) {
    return toRet;
  }
  return {
    ...toRet,
    step: _field?.options?.step ?? void 0,
    name: _field?.key
    // required: _field?.allowNull === false,
  };
};
const toInput = (_metadata, _value) => {
  try {
    return _metadata?.valueConverter.toInput(_value, metaType.subKind);
  } catch (error2) {
    console.error(`error toInput w field '${_metadata?.key}'`, error2);
  }
};
const fromInput = (_metadata, _value) => {
  try {
    if (metaType.subKind === "number" && _value === 0) {
      return 0;
    }
    const val = _metadata?.valueConverter.fromInput(_value, metaType.subKind);
    return val;
  } catch (error2) {
    console.error(`error fromInput w field '${_metadata.key}'`, error2);
  }
};
const getId = () => {
  return value?.id || value;
};
const getLoadOptions = async (cellsValues2, str) => {
  if (metaType.kind !== "relation") {
    return { items: [], totalCount: 0 };
  }
  const metaTypeObj = { ...metaType };
  let findToUse = {};
  if (metaTypeObj.repoTarget.metadata.options.searchableFind) {
    findToUse = metaTypeObj.repoTarget.metadata.options.searchableFind(str);
  } else {
    if (str) {
      const field = getFirstInterestingField(metaTypeObj.repoTarget);
      findToUse = { where: { [field.key]: { $contains: str } } };
    }
  }
  const foEdit = cell.field?.options.findOptionsForEdit;
  const narrowFindEditWhere = typeof foEdit === "function" ? foEdit(cellsValues2).where ?? {} : typeof foEdit === "object" ? foEdit.where ?? {} : {};
  const foCrud = cell.field?.options.findOptions;
  const narrowFindCrudWhere = typeof foCrud === "function" ? foCrud().where ?? {} : typeof foCrud === "object" ? foCrud.where ?? {} : {};
  findToUse = {
    include: { ...findToUse.include ?? {} },
    where: { $and: [findToUse.where, narrowFindEditWhere, narrowFindCrudWhere] }
  };
  let limit = cell.field?.options.findOptionsLimit ?? 24;
  const arr = [];
  arr.push(
    ...await metaTypeObj.repoTarget.find({
      ...findToUse,
      limit
    })
  );
  let totalCount = arr.length;
  if (totalCount === limit) {
    totalCount = await metaTypeObj.repoTarget.count(findToUse.where);
  }
  if (!cell.field?.options.multiSelect) {
    if (str === "" && getId() && !arr.find((r) => String(r.id) === String(getId()))) {
      arr.unshift(await metaTypeObj.repoTarget.findId(getId()));
    }
  }
  return { items: arr.map((r) => getEntityDisplayValue(metaTypeObj.repoTarget, r)), totalCount };
};
const getMultiValues = (value2) => {
  return (value2 ?? []).map((c) => c.id) || value2;
};
const calcSuffix = (value2) => {
  if (cell.field?.options.suffixEdit) {
    if (cell.field?.options.suffixEditWithS) {
      return suffixWithS(value2, cell.field?.options.suffixEdit);
    } else {
      return cell.field?.options.suffixEdit;
    }
  }
  if (cell.field?.options.suffix) {
    if (cell.field?.options.suffixWithS) {
      return suffixWithS(value2, cell.field?.options.suffix);
    } else {
      return cell.field?.options.suffix;
    }
  }
  return "";
};
</script>

<FieldContainer
  forId={cell.field?.key ?? ''}
  label={cell?.header ?? cell.field?.caption ?? cell.field?.key}
  required={!cell.field?.allowNull && mode === 'edit' && metaType.subKind !== 'checkbox'}
  {error}
  classes={{ slot: metaType.subKind === 'textarea' ? 'h-32 items-start' : '' }}
>
  {@const clearableComputed =
    cell.clearable || clearable || (mode === 'filtre' && clearable === undefined)}
  {#if isViewMode(mode, cell.field)}
    <span class="input-bordered flex items-center pl-2 pr-4">
      {#if cell.field?.inputType === 'checkbox'}
        <input
          type="checkbox"
          {...common(cell.field)}
          class="checkbox ml-2"
          disabled
          checked={value}
        />
      {:else if metaType.kind === 'relation'}
        {@const item = getEntityDisplayValue(metaType.repoTarget, value)}
        <div class={tw('flex items-center gap-4', 'h-12', 'pl-2')}>
          {#if item && item?.icon}
            <Icon {...item.icon} />
          {/if}
          <span>{cell?.header ?? item?.caption ?? '-'}</span>
        </div>
      {:else if metaType.kind === 'enum'}
        {@const v = displayWithDefaultAndSuffix(cell.field, value)}
        <div class="ml-2 flex h-12 items-center gap-4">
          {#if value?.icon}
            <Icon {...value.icon} />
          {/if}
          <Clipboardable value={v}>{v}</Clipboardable>
        </div>
      {:else}
        {@const v = displayWithDefaultAndSuffix(cell.field, value)}
        <div
          class="ml-2 flex h-12 w-full items-center {metaType.subKind === 'number'
            ? 'justify-end'
            : ''}"
        >
          <Clipboardable value={v}>{v}</Clipboardable>
        </div>
      {/if}
    </span>
  {:else if metaType.kind === 'relation'}
    {#if metaType.field.options.multiSelect}
      <MultiSelectMelt
        {...common(cell.field, true)}
        clearable={clearableComputed}
        loadOptions={async (str) => await getLoadOptions(cellsValues, str)}
        values={value}
        on:selected={(e) => dispatchSelected(e.detail)}
      />
    {:else}
      <!-- {items} -->
      <SelectMelt
        {focus}
        {...common(cell.field, true)}
        clearable={clearableComputed}
        loadOptions={async (str) => await getLoadOptions(cellsValues, str)}
        value={value?.id || value}
        on:selected={(e) => dispatchSelected(e.detail)}
        on:issue={(e) => {
          error = e.detail
        }}
        createOptionWhenNoResult={cell.field?.options.createOptionWhenNoResult}
        on:createRequest
      />
    {/if}
  {:else if metaType.kind === 'enum'}
    {#if metaType.field.options.multiSelect || metaType.subKind === 'multi'}
      <MultiSelectMelt
        {...common(cell.field, true)}
        clearable={clearableComputed}
        items={metaType.values}
        values={getMultiValues(value)}
        on:selected={(e) => {
          dispatchSelected(e.detail)
        }}
      />
    {:else if metaType.values.length <= (cell.field?.options.styleRadioUntil ?? 3) && !clearableComputed}
      <SelectRadio
        {...common(cell.field, true)}
        items={metaType.values}
        value={value?.id || value}
        on:selected={(e) => dispatchSelected(e.detail)}
      />
    {:else}
      <SelectMelt
        {focus}
        {...common(cell.field, true)}
        clearable={clearableComputed}
        items={metaType.values}
        value={value?.id || value}
        on:selected={(e) => dispatchSelected(e.detail)}
        on:issue={(e) => {
          error = e.detail
        }}
      />
    {/if}
  {:else if metaType.subKind === 'checkbox'}
    <div class="grid content-center items-center pl-4">
      <input
        type="checkbox"
        {...{ ...common(cell.field), required: undefined }}
        class="checkbox"
        bind:checked={value}
      />
    </div>
  {:else if metaType.subKind === 'text' || metaType.subKind === 'email' || metaType.subKind === 'password' || metaType.subKind === 'dateOnly' || metaType.subKind === 'number'}
    <div class="input input-bordered inline-flex w-full items-center pl-2">
      <Input
        {focus}
        {...common(cell.field)}
        autocomplete="off"
        class={tw(
          `join-item placeholder:text-base-content/30 w-full bg-transparent`,
          metaType.subKind === 'number' && 'text-end',
        )}
        type={metaType.subKind.replaceAll('dateOnly', 'date')}
        value={toInput(cell.field, value)}
        {withDedounce}
        on:input={(e) => {
          // @ts-ignore
          value = fromInput(cell.field, e.detail.value)
          dispatchSelected(value)
        }}
        {...$$restProps}
      />
      {calcSuffix(value)}
    </div>
  {:else if metaType.subKind === 'textarea'}
    <Textarea
      {focus}
      {...common(cell.field)}
      value={toInput(cell.field, value)}
      on:input={(e) => {
        // @ts-ignore
        value = fromInput(cell.field, e.detail.value)
      }}
    />
  {:else}
    <!-- This shoud NEVER be displayed -->
    <span class="text-error flex items-center pl-2"
      >Type "{cell.field?.inputType}" not managed!</span
    >
  {/if}
</FieldContainer>
