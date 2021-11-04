<template>
  <button class="my-button" :style="mainStyle">
    <slot></slot>
    <Icon
      v-if="showIcon"
      class="my-button__icon"
      :name="iconName"
      :color="color"
      :size="iconSizeValue"
      :class="{ ml: !!$scopedSlots.default }"
    />
  </button>
</template>

<script>
import Icon from "./Icon.vue";
import { COLORS } from "../constants/consts";

export default {
  name: "MyButton",
  components: {
    Icon,
  },
  props: {
    bgColor: {
      type: String,
      default: COLORS.PRIMARY_LIGHTEN,
    },
    color: {
      type: String,
      default: COLORS.PRIMARY,
    },
    iconName: String,
    size: {
      type: Number,
      default: 40,
    },
    width: String,
    height: String,
    iconSize: Number,
  },
  computed: {
    mainStyle() {
      const width = !Number.isNaN(+this.width) ? `${this.width}px` : this.width;
      const height = !Number.isNaN(+this.height)
        ? `${this.height}px`
        : this.height;
      const padding = width === "auto" ? "0 10px" : undefined;
      return {
        color: this.color,
        backgroundColor: this.bgColor,
        width: width || `${this.size}px`,
        height: height || `${this.size}px`,
        padding,
      };
    },
    showIcon() {
      return this.iconName?.length;
    },
    iconSizeValue() {
      return this.iconSize || this.size - 10;
    },
  },
};
</script>

<style scoped>
.my-button {
  border: none;
  border-radius: 9px;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 900;
}

.my-button__icon.ml {
  margin-left: 20px;
}
</style>
