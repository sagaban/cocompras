<template>
  <div>
    <div v-for="grocery in groceries" :key="grocery.id">
      {{ grocery.name }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  fetch() {
    return this.$store.dispatch('getGroceries');
  },
  computed: mapState(['groceries'])
};
</script>

<style lang="scss" scoped></style>
