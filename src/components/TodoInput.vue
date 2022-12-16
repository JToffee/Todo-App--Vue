<template>
  <form
    class="todoInput"
    :class="{ dark: darkMode, desktop: desktop }"
    @submit="createTodo"
  >
    <span class="radio" :class="{ darkRadio: darkMode }"></span>
    <input
      type="text"
      class="writeTodo"
      :class="{ darkInput: darkMode }"
      placeholder="Create new a todo"
      v-model="todo"
    />
  </form>
</template>
<script>
  import useSetView from "../composables/useSetView.js";

  const { desktopView, setView } = useSetView();
  export default {
    name: "TodoInput",

    data() {
      return {
        todo: "",
        desktop: desktopView,
      };
    },
    computed: {
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
      createTodo(e) {
        e.preventDefault();
        this.$store.dispatch("saveTodo", this.todo);
        this.todo = "";
      },
    },
    created() {
      setView();
      window.addEventListener("resize", setView);
    },
  };
</script>
<style scoped>
  .todoInput {
    position: relative;
    display: flex;
    margin: auto;
    width: 375px;
    padding: 18px 0;
    background: var(--lightGray);
    border-radius: 4px;
  }

  .radio {
    background: transparent;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 12px;
    border: 1px solid var(--lightGrayishBlue200);

    margin-left: 15px;
  }

  .writeTodo {
    text-indent: 1vw;
    background: transparent;
    border: none;
    flex-basis: 90%;
    color: var(--darkGrayishBlue700);
    font-size: 15px;
    font-family: "Rubik-Regular";
    margin-left: 10px;
  }
  .writeTodo::placeholder {
    color: var(--darkGrayishBlue400);
  }
  .writeTodo:focus {
    outline: none;
  }

  /* dark mode */

  .dark {
    background: var(--darkDesaturatedBlue);
  }
  .darkInput::placeholder {
    color: var(--darkGrayishBlue600);
  }
  .darkInput {
    color: var(--lightGrayishBlue300);
  }
  .darkRadio {
    background: transparent;
    border: 1px solid var(--darkGrayishBlue800);
  }

  /* desktop */

  .desktop {
    width: 700px;
  }
</style>
