<template>
  <div class="main" :class="{ dark: darkMode }">
    <img :src="imageUrl" alt="pic" class="background-pic" />
    <header-view />
    <todo-input />
    <todo-list />
    <bottom-bar />
  </div>
</template>

<script>
  // import j from "./assets/fonts/"s
  import HeaderView from "./components/HeaderView.vue";
  import TodoInput from "./components/TodoInput.vue";
  import TodoList from "./components/TodoList.vue";
  import BottomBar from "./components/BottomBar.vue";
  import { colors } from "./util/colors.js";
  import useSetView from "./composables/useSetView.js";

  const { desktopView, setView } = useSetView();

  export default {
    name: "App",
    components: {
      HeaderView,
      TodoInput,
      TodoList,
      BottomBar,
    },
    data() {
      return {
        desktopView: desktopView,

        colors: colors,
      };
    },
    computed: {
      imageUrl() {
        return this.setImageUrl();
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
      setImageUrl() {
        const baseUrl = "./assets/images/";
        //Set Image Url Conditionally

        //mobile + darkmode
        if (!this.desktopView && this.darkMode)
          return require(baseUrl + "BG-MOBILE-DARK.jpg");

        //mobile + lightmode
        if (!this.desktopView) return require(baseUrl + "BG-MOBILE-LIGHT.jpg");

        //desktop + darkmode
        if (this.darkMode && this.desktopView)
          return require(baseUrl + "bg-desktop-dark.jpg");

        //desktop + lightmode
        if (!this.darkMode && this.desktopView)
          return require(baseUrl + "bg-desktop-light.jpg");
      },
    },
    created() {
      setView();
      window.addEventListener("resize", setView);

      this.$store.dispatch("initViewMode");
    },
  };
</script>

<style>
  body {
    padding: 0;
    margin: 0;
    overflow: hidden;
    overflow-y: scroll;
    /* font-family: Verdana, Geneva, Tahoma, sans-serif; */
  }
  #app {
    font-family: "Rubik-Regular";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: 19px;
  }
  @font-face {
    font-family: "Rubik-Regular";
    src: local("Rubik-Regular"),
      url("./assets/fonts/Rubik-Regular.ttf") format("truetype");
  }

  @font-face {
    font-family: "Rubik-SemiBold";
    src: local("Rubik-SemiBold"),
      url("./assets/fonts/Rubik-SemiBold.ttf") format("truetype");
  }

  @font-face {
    font-family: "Rubik-Bold";
    src: local("Rubik-Bold"), url("./assets/fonts/Rubik-Bold.ttf") format("truetype");
  }
  /* @font-face {
  font-family: "rubik semibold";
  src: url("./assets/fonts/Rubik-SemiBold.ttf");
} */
  .main {
    width: 100vw;
    min-height: 100vh;
    background: var(--lightGrayishBlue100);
  }
  .dark {
    background: var(--darkBlue);
  }
  .background-pic {
    width: 100vw;
    position: absolute;
    left: 0;
    z-index: 0;
    top: 0;
  }
  .checkbox {
    background: transparent;
    border: 1px solid var(--lightGrayishBlue200);
    width: 16px;
    height: 16px;
    border-radius: 60%;
  }

  .checked {
    background: var(--checkBackground);
  }
  /* dark mode */

  .darkRadio {
    outline: 1px solid var(--darkGrayishBlue700);
  }
  .desktop {
    width: 700px;
  }
</style>
