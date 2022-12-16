<template>
  <div v-if="!desktop" class="bar-1" :class="{ dark: darkMode }">
    <p>{{ this.count }} items left</p>
    <button @click.prevent="clearCompleted" class="btn clear">Clear Completed</button>
  </div>
  <div v-if="!desktop" class="bar-2" :class="{ dark: darkMode }">
    <button @click.prevent="showAll" class="btn all">All</button>
    <button @click.prevent="showActive" class="btn">Active</button>
    <button @click.prevent="showCompleted" class="btn">Completed</button>
  </div>
  <div v-if="desktop" class="bottom-bar" :class="{ dark: darkMode }">
    <p>{{ this.count }} items left</p>
    <div class="btn-group">
      <button @click.prevent="showAll" class="btn all">All</button>
      <button @click.prevent="showActive" class="btn">Active</button>
      <button @click.prevent="showCompleted" class="btn">Completed</button>
    </div>
    <button @click.prevent="clearCompleted" class="btn clear">Clear Completed</button>
  </div>
</template>
<script>
  import useSetView from "../composables/useSetView.js";

  const { desktopView, setView } = useSetView();

  export default {
    name: "BottomBar",
    // props: { desktopView: Boolean },
    data() {
      return {
        desktop: desktopView,
      };
    },
    computed: {
      count() {
        return this.$store.getters.getCount;
      },
      darkMode() {
        const viewMode = this.$store.getters.getViewMode;

        if (viewMode === "dark") {
          return true;
        } else {
          return false;
        }
      },
    },
    methods: {
      clearCompleted() {
        this.$store.dispatch("clearCompleted");
      },
      showAll() {
        this.$store.state.filter = "all";

        // this.$store.getters.getTodos("all");
      },
      showActive() {
        this.$store.state.filter = "active";
        // this.$store.getters.getTodos("active");
      },
      showCompleted() {
        this.$store.state.filter = "completed";
        // this.$store.getters.getTodos("completed");
      },
    },
    created() {
      setView();
      window.addEventListener("resize", setView);
    },
    updated() {
      this.count = this.$store.getters.getCount;
    },
  };
</script>
<style scoped>
  .bar-1 {
    position: relative;
    display: flex;
    flex: 1;
    width: 375px;
    justify-content: space-evenly;
    align-items: center;
    margin: auto;
    margin-top: 0;
    height: 30px;
    padding: 13px 0;
    background: red;
    background: var(--lightGray);
    border-radius: 0 0 3px 3px;
  }
  .bar-2 {
    position: relative;
    display: flex;
    width: 375px;
    margin: auto;
    margin-top: 20px;
    height: 30px;
    overflow: hidden;
    padding: 13px 0;
    background: var(--lightGray);
    justify-content: flex-start;
  }
  .btn {
    background: transparent;
    border: none;
    width: fit-content;
    color: var(--darkGrayishBlue400);
    font-family: "Rubik-Semibold";
  }
  .btn:hover {
    color: var(--lightGrayishBlueHover);
  }
  .btn:active {
    color: var(--primaryBlue);
  }
  .bar-2 .btn {
    margin-right: 10px;
  }
  .all {
    margin-left: 25%;
  }
  .bottom-bar {
    position: relative;
    display: flex;
    flex: 1;
    width: 700px;
    justify-content: space-around;
    align-items: center;
    margin: auto;
    margin-top: 0;
    height: 30px;
    overflow: hidden;
    padding: 13px 0;
    background: var(--lightGray);
    border-radius: 0 0 5px 5px;
  }
  .bottom-bar .all {
    margin-left: auto;
  }

  p {
    font-size: 12px;
    color: var(--darkGrayishBlue400);
  }
  .clear {
    color: var(--darkGrayishBlue400);
    font-family: "Rubik-Regular";
    font-size: 12px;
  }
  .dark {
    background: var(--darkDesaturatedBlue);
  }
</style>
