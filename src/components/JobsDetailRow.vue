<template>
  <div>
      details row
  </div>
</template>

<script>
export default {
props: {
  rowData: {
    type: Object,
    required: true
  },
  rowIndex: {
    type: Number
  },
  options: {
    type: Object,
  }
}
}
</script>

<style>

</style>