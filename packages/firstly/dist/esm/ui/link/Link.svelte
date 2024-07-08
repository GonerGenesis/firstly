<script>export let href;
export let target = void 0;
export let kind = "info";
const daisy = { info: "link-info", ghost: "" };
let className = void 0;
export { className as class };
</script>

<a
  class={`${daisy[kind]} link no-underline hover:underline ${className ?? ''}`}
  {href}
  rel="noopener"
  {target}
  {...$$restProps}
>
  <slot />
</a>

<style>
  a[target='_blank']::after {
    display: inline-block;
    content: '⇱';
    position: relative;
    top: -3px;
    margin-left: 3px;
    transform: rotate(90deg);
  }
</style>
