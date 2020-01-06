<template>
  <div>
    <h1>{{childmessage}}</h1>
    <child propsparent='parentpropscontent' @parentclick = "dosomething"></child>
  </div>
</template>
<script>
import Vue from 'vue'
Vue.component('child', {
  props: ['propsparent'],
  template: `<div>
  <h2>{{childmessage1}}</h2>
  <button @click = "buttondeal">click</button>
  </div>`,
  methods: {
    buttondeal () {
      console.log('dsdfs')
      this.$emit('parentclick')
    }
  },
  data: function () {
    return {
      childmessage1: this.propsparent
    }
  }
})
export default {
  methods: {
    dosomething () {
      console.log('11111')
      this.childmessage = 'dfdsfd'
    }
  },
  data: function () {
    return {
      message: 'parent',
      childmessage: this.propsparent
    }
  }
}
</script>
