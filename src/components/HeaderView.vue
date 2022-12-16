<template>
  <div class="header" :class="{ desktop: desktop }">
    <h2>TODO</h2>
    <button @click="setViewMode"><img :src="iconUrl" alt="icon" /></button>
  </div>
</template>
<script>
  // src="../assets/images/moon.svg"
  // ../assets/images/bg-desktop-dark.jpg
  import useSetView from "../composables/useSetView.js";

  const { desktopView, setView } = useSetView();

  export default {
    name: "HeaderView",

    data() {
      return {
        desktop: desktopView,
        icon: require("../assets/images/moon.svg"),
      };
    },
    computed: {
      iconUrl() {
        // return this.setIconUrl();
        // const baseUrl = "../assets/images/";

        if (this.darkMode) {
          return require("../assets/images/sun.svg");
        } else {
          return require("../assets/images/moon.svg");
        }
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
      setIconUrl() {},
      setViewMode() {
        this.$store.dispatch("setViewMode");
        console.log("mode");
      },
    },
    created() {
      setView();
      window.addEventListener("resize", setView);
    },
  };
</script>
<style scoped>
  .header {
    position: relative;
    display: flex;
    margin: auto;
    margin-top: 1vw;
    width: 375px;
    overflow: hidden;
    justify-content: space-between;
  }
  h2 {
    color: var(--lightGray);
    font-family: "Rubik-SemiBold";
    letter-spacing: 1vw;
    font-size: 3rem;
  }
  button {
    padding: 0;
    background: transparent;
    border: none;
    margin-right: 5px;
  }
  button img {
    width: 30px;
    height: 30px;
    padding: 0;
  }

  .desktop {
    width: 700px;
  }
</style>
