<template>
  <span>
    <icon name="sync" v-if="!loading" scale="1" />
    <icon name="sync" spin v-else scale="1" />
  </span>
</template>
<script>
export default {
  name: 'loading',
  props: [
    'loading'
  ]
}
</script>
