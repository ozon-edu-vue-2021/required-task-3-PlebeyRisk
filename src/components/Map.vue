<template>
  <div class="map">
    <h3>Карта офиса</h3>

    <div v-if="!isLoading" class="map-root">
      <MapSVG ref="svg" />

      <TableSVG
        v-show="false"
        ref="table"
        v-click-outside="tableClickOutsideHandler"
      />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import MapSVG from "@/assets/images/map.svg";
import TableSVG from "@/assets/images/workPlace.svg";
import * as d3 from "d3";
import ClickOutside from "vue-click-outside";

export default {
  components: {
    MapSVG,
    TableSVG,
  },
  directives: {
    ClickOutside,
  },
  props: {
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
  data() {
    return {
      isLoading: false,
      svg: null,
      g: null,
      tableSVG: null,
    };
  },
  computed: {
    peopleByTableMap() {
      return this.people.reduce(
        (map, people) =>
          map[people.tableId] ? map : { ...map, [people.tableId]: people },
        {}
      );
    },
  },
  mounted() {
    this.svg = d3.select(this.$refs.svg);
    this.g = this.svg.select("g");
    this.tableSVG = d3.select(this.$refs.table);

    if (this.g) {
      this.drawTables();
    } else {
      console.log("ERROR");
    }
  },
  methods: {
    tableClickOutsideHandler(e) {
      if (
        Array.from(e?.target?.classList || []).includes("wrapper-table") ||
        !e?.target?.closest(".map")
      )
        return;
      this.$emit("tableClickOutside", e);
    },
    tableClickHandler(person) {
      this.$emit("tableClick", person);
    },
    drawTables() {
      const svgTablesGroup = this.g.append("g").classed("groupPlaces", true);

      this.tables.map((table) => {
        const svgTable = svgTablesGroup
          .append("g")
          .attr("transform", `translate(${table.x}, ${table.y}) scale(0.5)`)
          .attr("id", table._id)
          .classed("employer-place", true)
          .on("click", () =>
            this.tableClickHandler(this.peopleByTableMap[table._id] || null)
          );

        svgTable
          .append("g")
          .attr("transform", `rotate(${table.rotate || 0})`)
          .attr("group_id", table.group_id)
          .html(this.tableSVG.html())
          .attr(
            "fill",
            this.legend.find((it) => it.group_id === table.group_id)?.color ??
              "transparent"
          );
      });
    },
  },
};
</script>

<style scoped>
.map {
  height: 100%;
  width: 100%;
  padding: 24px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.map-root {
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

h3 {
  margin-top: 0px;
}

::v-deep svg {
  height: 100%;
  width: 100%;
}

::v-deep .table {
  cursor: pointer;
}
</style>
