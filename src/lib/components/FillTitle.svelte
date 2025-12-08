<script>
  export let text = "Title";
  export let textColor = "#0232B8";
  export let fillColor = "#DBDBDB";
  export let delay = 0.7;
</script>

<style>
  .wrapper {
    position: relative;
    display: inline-block;
    width: max-content;
    overflow: hidden;
  }

  .text {
    position: relative;
    z-index: 2;
    white-space: nowrap;
    padding: 0.2em 0.4em;
  }

  .fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform-origin: left;
    transform: scaleX(0);
    background-color: var(--fill);
    animation: expand 1.5s ease-out forwards;
    animation-delay: var(--delay);
    z-index: 1;
  }

  @keyframes expand {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
</style>

<div class="wrapper">
  <span
    class="fill"
    style="--fill: {fillColor}; --delay: {delay}s"
  ></span>

  <span class="text" style="color: {textColor};">
    {text}
  </span>
</div>
