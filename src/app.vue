<template>
  <div id="app">
    <!-- <div id="cover"> -->
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
    <!-- </div> -->
  </div>
</template>

<script>
import Header from "./todo/header.vue";
import Footer from "./todo/footer.jsx";
import Todo from "./todo/todo.vue";
export default {
  data() {
    return {
      msg: "Hello vue!",
    };
  },
  components: {
    Header,
    Footer,
    Todo,
  },
};
</script>
<style>
#cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #999;
  opacity: 0.5;
  z-index: -1;
}
</style>
<style lang="stylus" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  #cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #999;
    opacity: 0.5;
    z-index: -1;
  }
}
</style>

