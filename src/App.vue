<script setup lang="ts"></script>

<template>
  <h1>Placeholder title</h1>
  <p>
    Placeholder paragraph
    <div class="button_blue">Button</div>
    <div class="button_pink">Button</div>
  </p>
</template>

<style scoped>
/* Implementation done by @xnorvey on Discord*/
.baba_button {
  border-image-slice: 8 8 8 8 fill;
  border-image-width: 10px 10px 10px 10px;
  border-image-outset: 0px 0px 0px 0px;
  border-image-repeat: round round;
  border-style: solid;
  image-rendering: crisp-edges;
  font-family: "Baba UI", sans-serif;
  color: white;
  padding: 4.5px;
  padding-left: 40px;
  padding-right: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  cursor: pointer;
}

.baba_button:disabled {
  border-image-source: url("../public/images/buttons/button_disabled.png");
}

.button_blue {
  border-image-source: url("../public/images/buttons/button_blue.png");
}

.button_blue:hover {
  border-image-source: url("../public/images/buttons/button_blue_hover.png");
}

.button_blue:active {
  border-image-source: url("../public/images/buttons/button_blue_press.png");
}

.button_pink {
  border-image-source: url("../public/images/buttons/button_pink.png");
}

.button_pink:hover {
  border-image-source: url("../public/images/buttons/button_pink_hover.png");
}

.button_pink:active {
  border-image-source: url("../public/images/buttons/button_pink_press.png");
}
</style>
