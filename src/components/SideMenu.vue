<template>
  <div class="menu">
    <div class="toolbar">
      <div class="toolbar__header">
        <h3 v-show="!isUserOpenned">Информация</h3>

        <div v-show="isUserOpenned" class="action">
          <div class="arrow" @click="closeProfile"></div>
        </div>
        <h3 v-show="isUserOpenned">Профиль</h3>
      </div>
      <div class="toolbar__actions"></div>
    </div>
    <div class="content">
      <div v-show="!isUserOpenned" class="legend">
        <div class="legend__data">
          <div v-if="legend.length > 0" class="legend__items">
            <draggable v-model="legend" group="legend">
              <LegendItem
                v-for="(item, index) in legend"
                :key="index"
                :color="item.color"
                :text="item.text"
                :counter="item.counter"
                class="legend__item"
              />
            </draggable>
          </div>
          <span v-else class="legend--empty"> Список пуст </span>
        </div>
        <div class="legend__chart">
          <Doughnut ref="chart" />
        </div>
      </div>
      <div v-show="isUserOpenned" class="profile">
        <div v-if="!person" class="profile__empty">Место пустое</div>

        <PersonCard :person="person" :legend="legendItem" />
      </div>
    </div>
  </div>
</template>

<script>
import LegendItem from "./SideMenu/LegendItem.vue";
import PersonCard from "./SideMenu/PersonCard.vue";
import draggable from "vuedraggable";
import { Doughnut } from "vue-chartjs";

export default {
  props: {
    isUserOpenned: {
      type: Boolean,
      default: false,
    },
    person: {
      type: Object,
      default: null,
    },
    tables: {
      type: Array,
      default: () => [],
    },
    people: {
      type: Array,
      default: () => [],
    },
    legend: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    LegendItem,
    PersonCard,
    draggable,
    Doughnut,
  },
  computed: {
    legendItem() {
      if (!this.person) return null;

      const table = this.tables.find(
        (table) => table._id === this.person.tableId
      );

      if (!table) return null;

      const legendItem = this.legend.find(
        (li) => li.group_id === table.group_id
      );

      return legendItem || null;
    },
  },
  mounted() {
    this.makeChart();
  },
  methods: {
    closeProfile() {
      this.$emit("click:close");
    },
    makeChart() {
      const chartData = {
        labels: this.legend.map((legendItem) => legendItem.text),
        datasets: [
          {
            label: "Легенда",
            backgroundColor: this.legend.map((legendItem) => legendItem.color),
            data: this.legend.map((legendItem) => legendItem.counter),
          },
        ],
      };
      const options = {
        legend: {
          display: false,
        },
      };
      this.$refs.chart.renderChart(chartData, options);
    },
  },
};
</script>

<style scoped>
.menu {
  border-left: 1px solid #ccd8e4;
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar .toolbar__actions button {
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  padding: 2px 6px;
}

.toolbar__header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.toolbar__header .action {
  cursor: pointer;
  margin-right: 14px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toolbar__header .action .arrow {
  width: 10px;
  height: 10px;
  border-top: 2px solid blue;
  border-right: 2px solid blue;
  transform: rotate(-135deg);
}

h3 {
  margin: 0;
}

.content {
  flex: 1;
}

.content .legend {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.content .legend .legend__data {
  display: flex;
  height: 100%;
}

.content .legend .legend__items {
  flex: 1;
  width: 100%;
}

.content .legend .legend__items .legend__item:not(:first-child) {
  margin-top: 16px;
}

.content .legend .legend__items .legend__item {
  cursor: pointer;
}

.content .legend .legend__items .legend__item.sortable-chosen {
  opacity: 25%;
}

.content .legend .legend--empty {
  align-self: center;
  width: 100%;
  text-align: center;
}

.profile {
  padding-top: 20px;
}
</style>
