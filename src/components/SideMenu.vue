<template>
  <div class="menu">
    <div class="toolbar">
      <div class="toolbar__header">
        <h3>Информация</h3>
      </div>
      <div class="toolbar__actions">
        <Icon
          v-show="isUserOpenned"
          class="action"
          name="close"
          :size="45"
          @click.native="closeProfile"
        />
      </div>
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
                :counter="tablesCountByGroup[item.group_id]"
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
import Icon from "./Icon.vue";
import LegendItem from "./SideMenu/LegendItem.vue";
import PersonCard from "./SideMenu/PersonCard.vue";
import draggable from "vuedraggable";
import { Doughnut } from "vue-chartjs";
import { DEFAULT_VALUES } from "../constants/consts";

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
      default: DEFAULT_VALUES.ARRAY,
    },
    people: {
      type: Array,
      default: DEFAULT_VALUES.ARRAY,
    },
    legend: {
      type: Array,
      default: DEFAULT_VALUES.ARRAY,
    },
  },
  components: {
    LegendItem,
    PersonCard,
    draggable,
    Doughnut,
    Icon,
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
    tablesCountByGroup() {
      return this.tables.reduce(
        (map, table) => ({
          ...map,
          [table.group_id]: (+map[table.group_id] || 0) + 1,
        }),
        {}
      );
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
            data: this.legend.map(
              (legendItem) => this.tablesCountByGroup[legendItem.group_id]
            ),
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
  padding: 35px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.toolbar .toolbar__actions button {
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  padding: 2px 6px;
}

.toolbar__header {
  flex: 1 0;
  display: flex;
  align-items: center;
  font-size: 20px;
}

.toolbar__actions .action {
  cursor: pointer;
  width: 35px;
  height: 35px;
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

.content .legend .legend__chart {
  max-width: 300px;
  margin-right: auto;
  margin-left: auto;
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
  padding-top: 40px;
}
</style>
