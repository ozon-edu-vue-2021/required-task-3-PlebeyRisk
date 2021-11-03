<template>
  <div class="person">
    <div class="person__photo">
      <img :src="data.picture" alt="photo" />
    </div>
    <div class="person__info">
      <div class="data-name">
        <b>{{ data.name }} ({{ data.age }})</b>
      </div>

      <div
        v-if="legend"
        class="person__info-legend"
        :style="{ color: legendColor }"
      >
        {{ legend.text }}
      </div>

      <div class="person__info-email">Почта: {{ data.email }}</div>
      <div class="person__info-registration-date">
        Дата регистрации: {{ formatedDate }}
      </div>
      <div class="person__info-about">О себе: {{ data.about }}</div>
    </div>
  </div>
</template>

<script>
import { format, parseISO } from "date-fns";

export default {
  props: {
    person: {
      type: Object,
      default: () => ({}),
    },
    legend: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    data() {
      return this.person || {};
    },
    legendColor() {
      return this.legend?.color || "#000";
    },
    formatedDate() {
      if (!this.data?.registered) return "";
      return format(parseISO(this.data.registered), "dd/MM/yyyy");
    },
  },
};
</script>

<style scoped>
.person {
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-gap: 8px;
}

.person__photo img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.person__info {
  display: grid;
  grid-gap: 8px;
}

.person__info-name {
  margin-bottom: 10px;
}
</style>
