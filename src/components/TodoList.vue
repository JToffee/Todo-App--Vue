<template>
  <div class="todoList" :class="{ desktop: desktop }">
    <ul :class="{ dark: darkMode }">
      <li
        v-for="(todo, index) in todos"
        :key="index"
        :class="{ darkListItem: darkMode, desktop: desktop }"
        :todoindex="index"
      >
        <label class="check-label">
          <button id="toggleCompleteBtn" @click.prevent="toggleComplete(todo.id)">
            <input type="checkbox" class="checkbox" :checked="todo.checked" />
            <span class="check-custom" :class="{ darkCheck: darkMode }"> </span>
          </button>
        </label>

        <textarea
          :class="{ completed: todo.checked, darkTextArea: darkMode }"
          v-model="todo.todoValue"
          contenteditable="false"
        ></textarea>

        <button @click.prevent="deleteTodo(todo.id)" id="deleteBtn">
          <img src="../assets/images/cross.svg" alt="" />
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
  import useSetView from "../composables/useSetView.js";

  const { desktopView, setView } = useSetView();
  export default {
    name: "TodoList",
    data() {
      return {
        desktop: desktopView,
      };
    },
    computed: {
      filter() {
        return this.$store.state.filter;
      },
      darkMode() {
        const viewMode = this.$store.getters.getViewMode;

        if (viewMode === "dark") {
          return true;
        } else {
          return false;
        }
      },

      todos() {
        let todos;

        if (this.filter === "all") todos = this.$store.getters.getAllTodos;
        if (this.filter === "completed") todos = this.$store.getters.getCompletedTodos;
        if (this.filter === "active") todos = this.$store.getters.getActiveTodos;

        return todos;
      },
    },
    created() {
      setView();
      window.addEventListener("resize", setView);
    },

    methods: {
      //delete todo
      deleteTodo(id) {
        this.$store.dispatch("deleteTodo", id);
      },
      //toggle complete
      toggleComplete(id) {
        this.$store.dispatch("toggleComplete", id);
      },
    },
    updated() {},
  };
</script>
<style scoped>
  .todoList {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    margin-bottom: 0;
    width: 375px;

    overflow: hidden;
  }
  ul {
    /* margin-left: -10px; */
    padding-left: 5px;
    background: var(--lightGray);
    border-radius: 5px 5px 0 0;
    margin-bottom: 0;
    overflow: hidden;
  }
  li {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    width: 375px;
    list-style-type: none;
    text-align: left;
    padding: 0 0 5px 0;
    text-indent: 10px;

    border-bottom: 1px solid var(--lightGrayishBlue200);
  }

  li .check-label {
    position: relative;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-top: -10px;
  }
  .check-label input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .check-custom {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    border-radius: 12px;
    background-color: transparent;
  }
  .check-custom:hover {
    border: 1px solid hsl(280, 87%, 65%);
  }
  .check-label input:hover ~ .check-custom {
    border: 1px solid linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
  }
  .check-label input:checked ~ .check-custom {
    background: linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
  }
  .check-label .check-custom:after {
    left: 9px;
    top: 5px;
    width: 3px;
    height: 7px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .check-custom:after {
    content: "";
    position: absolute;
    display: none;
  }
  .check-label input:checked ~ .check-custom:after {
    display: block;
  }
  li textarea {
    flex-basis: 80%;
    margin-left: 30px;
    opacity: 0.98;
    vertical-align: middle;
    color: var(--darkGrayishBlue500);
    font-size: 15px;
    font-family: "Rubik-Semibold";
    outline: none;
    resize: none;
    border: none;
    background: transparent;
    margin-top: 15px;
    padding-right: 5px;
    height: auto;
  }
  ::-webkit-scrollbar {
    width: 0.15em;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
  .completed {
    text-decoration: line-through;
  }
  li button {
    padding: 0;
    border: none;

    background: transparent;
    margin-right: 0;
  }
  li button img {
    width: 15px;
    height: 15px;
  }

  /* dark mode */
  .dark {
    background: var(--darkDesaturatedBlue);
  }
  .darkListItem {
    border-bottom: 1px solid var(--darkGrayishBlue800);
  }
  .darkTextArea {
    color: var(--lightGrayishBlue300);
  }
  .darkCheck {
    background: transparent;
    border: 1px solid var(--darkGrayishBlue800);
  }
  /* .dark li:hover {
      background: var(--lightGrayishBlueHover);
    } */
  .desktop {
    width: 700px;
  }
  form button {
    width: fit-content;
    background: transparent;
    padding: 0;
  }
  .check-label button {
    position: relative;
    top: -14px;
    padding: 0vw;
  }
</style>
