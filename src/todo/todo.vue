<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来要做什么"
      @keyup.enter="addTodo"
    />
    <Item :todo="todo" v-for="todo in filteredTodos" :key="todo.id" @del="deleteTodo" />
    <Tabs :filter="filter" :todos="todos" @toggle="toggleFilter" @clearAll="clearAllCompleted" />
  </section>
</template>

<script>
import Item from "./item.vue";
import Tabs from "./tabs.vue";
// import { constants } from "crypto";

let id = 0;

export default {
  data() {
    return {
      todos: [],
      filter: "all",
    };
  },
  computed: {
    filteredTodos() {
      if (this.filter === "all") {
        return this.todos;
      }
      const completed = this.filter === "completed";
      return this.todos.filter((todos) => completed === todos.completed);
    },
  },
  components: {
    Item,
    Tabs,
  },
  methods: {
    addTodo(e) {
      //即时不传参，也会默认传参e的
      //需要内容处理，去除前后的空格
      //同时清空原有内容
      if (e.target.value.trim() != "") {
        this.todos.unshift({
          id: id++,
          content: e.target.value.trim(),
          completed: false,
        });
      }
      e.target.value = "";
    },
    toggleFilter(state) {
      this.filter = state;
    },
    deleteTodo(id) {
      this.todos.splice(
        this.todos.findIndex((todo) => todo.id === id),
        1
      );
      console.log(this.todos);
    },
    clearAllCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed);
    },
  },
};
</script>

<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: none;
  outline: none;
  color: inherit;
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 36px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>


