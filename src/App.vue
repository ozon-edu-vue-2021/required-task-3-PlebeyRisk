<template>
  <div id="app">
    <div class="office">
      <Map
        :person="person"
        :tables="tables"
        :people="people"
        :legend="legend"
        @tableClick="(e) => (person = e)"
        @tableClickOutside="resetPerson"
      />
      <SideMenu
        :isUserOpenned="!!person"
        :person="person"
        :tables="tables"
        :people="people"
        :legend="legend"
        @click:close="resetPerson"
      />
    </div>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import SideMenu from "./components/SideMenu.vue";
import tables from "@/assets/data/tables.json";
import legend from "@/assets/data/legend.json";
import people from "@/assets/data/people.json";

export default {
  name: "App",
  components: {
    Map,
    SideMenu,
  },
  data() {
    return {
      person: null,
      tables: [],
      people: [],
      legend: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadPeople() {
      this.people = people;
    },
    loadTables() {
      this.tables = tables;
    },
    loadLegend() {
      this.legend = legend;
    },
    loadData() {
      this.loadPeople();
      this.loadTables();
      this.loadLegend();
    },
    resetPerson() {
      this.person = null;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
  padding: 24px;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

* {
  box-sizing: border-box;
}

h3 {
  margin-top: 0px;
}

.office {
  display: grid;
  grid-template-columns: 1fr 320px;
  border-radius: 6px;
  border: 1px solid #ccd8e4;
  height: 100%;
  background: white;
  max-width: 1500px;
  margin: 0 auto;
}
</style>
