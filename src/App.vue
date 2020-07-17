<template>
  <div id="app">
    <Test></Test>
  </div>
</template>

<script>
import Test from '@/components/Test.vue'

export default {
  name: 'App',
  components: {
    
    Test
  }
}
</script>

<style>

html, body, #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
  /* body默认8px的margin */
  margin: 0;

  width: 100%;
  height: 100%;
}
</style>
