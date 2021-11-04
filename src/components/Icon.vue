<template>
  <span class="icon">
    <component
      v-if="name && name.length"
      :fill="color || 'black'"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      :is="require(`../assets/icons/${name}.svg`)"
    />
  </span>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: String,
    size: Number,
    color: String,
  },
  computed: {
    mainStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
      };
    },
  }
};
</script>

<style scoped>
.icon {
  display: flex;
  align-items: center;
}
</style>
