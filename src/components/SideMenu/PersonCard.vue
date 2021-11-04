<template>
  <div class="person" :style="cssVars">
    <div class="person__photo">
      <img :src="data.picture" alt="photo" />
      <MyButton
        class="button"
        iconName="home"
        color="white"
        bgColor="#666666"
        :iconSize="35"
      />
    </div>
    <div class="person__info">
      <div class="person__info-name">
        {{ data.name }}
      </div>

      <div v-if="legend" class="person__info-legend">
        {{ legend.text }}
      </div>
    </div>
    <div class="person__actions">
      <MyButton iconName="email" />
      <MyButton iconName="link" width="auto">К3</MyButton>
    </div>
  </div>
</template>

<script>
import { format, parseISO } from "date-fns";
import MyButton from "../MyButton.vue";
import { COLORS } from "../../constants/consts";
import { DEFAULT_VALUES } from "../../constants/consts";

export default {
  name: "PersonCard",
  components: {
    MyButton,
  },
  props: {
    person: {
      type: Object,
      default: DEFAULT_VALUES.OBJECT,
    },
    legend: {
      type: Object,
      default: DEFAULT_VALUES.OBJECT,
    },
  },
  computed: {
    data() {
      return this.person || {};
    },
    formatedDate() {
      if (!this.data?.registered) return "";
      return format(parseISO(this.data.registered), "dd/MM/yyyy");
    },
    cssVars() {
      return Object.entries(COLORS).reduce(
        (map, [key, value]) => ({
          ...map,
          [`--${key}`]: value,
        }),
        {}
      );
    },
  },
};
</script>

<style scoped>
.person {
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 150px;
  padding-left: 170px;
  padding-bottom: 5px;
}

.person__photo {
  grid-row-start: 1;
  grid-row-end: 2;
}

.person__photo .button {
  position: absolute;
  bottom: 5px;
  left: 5px;
}

.person__photo {
  height: 150px;
  width: 150px;
  position: absolute;
  top: 0;
  left: 0;
}

.person__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.person__info {
  flex: 1 0;
  z-index: 2;
}

.person__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
}

.person__info-legend {
  font-size: 16px;
  color: #969696;
}

.person__info-name {
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
