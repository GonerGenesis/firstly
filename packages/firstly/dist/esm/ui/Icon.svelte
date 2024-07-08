<script>import { BROWSER } from "esm-env";
import "./LibIcon";
import { LibIcon_Empty } from "./LibIcon";
export let data = "";
export let size = "1.5rem";
export let caption = void 0;
const rmvWarning = caption;
export let ssr = false;
let className = "";
export { className as class };
export let style = "";
let width = size;
let height = size;
let viewBox = "0 0 24 24";
let svg = "";
let path = "";
$: if (typeof data === "string") {
  if (data.toLowerCase().includes("<svg")) {
    svg = data.replace(/width="[^"]*"/, `width="${width}"`).replace(/height="[^"]*"/, `height="${height}"`);
  } else {
    path = data;
  }
} else {
  path = data;
}
const getInfoProps = (props, i = 0) => {
  if (Array.isArray(props)) {
    return props[i] ?? "";
  }
  return props ?? "";
};
</script>

{#if BROWSER || ssr}
  {#if svg || $$slots.default}
    <span
      class={getInfoProps(className)}
      style={getInfoProps(style)}
      style:width
      style:height
      role={'img'}
      on:click
    >
      <slot>
        {@html svg ?? ''}
      </slot>
    </span>
  {:else}
    <svg
      {width}
      {height}
      {viewBox}
      class={getInfoProps(className)}
      style={getInfoProps(style)}
      role={'img'}
      on:click
    >
      {#each Array.isArray(path) ? path : [path] as d, i}
        <path
          {d}
          fill="currentColor"
          class={getInfoProps(className, i)}
          style={getInfoProps(style, i)}
        />
      {/each}
    </svg>
  {/if}
{:else}
  <svg
    {width}
    {height}
    {viewBox}
    class={getInfoProps(className)}
    style={getInfoProps(style)}
    role={'img'}
    on:click
  >
    <path
      d={LibIcon_Empty}
      fill="currentColor"
      class={getInfoProps(className)}
      style={getInfoProps(style)}
    />
  </svg>
{/if}
