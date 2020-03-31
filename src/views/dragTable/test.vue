<template>
  <div id="test">
    <div>
      <span
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
        molestiae recusandae provident officiis laboriosam. Autem neque, dolores
        beatae quam omnis nulla minus ipsum laborum aperiam corporis rerum
        temporibus, quaerat voluptatem!</span
      >
      <h1>
        <span>ger</span>
      </h1>
    </div>
  </div>
</template>
<script>
export default {
  name: 'test',
  data() {
    return {
      name: 'xxk'
    }
  },
  methods: {
    say() {
      console.log('hh', this.name, 'jflfe')
      console.log('789')
    }
  }
}
</script>
<style lang="scss" scoped>
#test {
  .bb,
  .cc {
    font-size: 26px;
    font-weight: bold;
  }
}
</style>
