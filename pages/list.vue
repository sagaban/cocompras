<template>
  <div>
    <grocery-list :groceries="groceries" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GroceryList from '~/components/GroceryList';
export default {
  components: {
    GroceryList
  },
  fetch() {
    return this.$store.dispatch('getGroceries');
  },
  computed: mapState(['groceries'])
};
</script>

<style lang="scss" scoped></style>
