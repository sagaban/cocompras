<template>
  <v-list-item-group>
    <grocery-item
      v-for="grocery in groceries"
      :key="grocery.id"
      :grocery="grocery"
    />
  </v-list-item-group>
</template>

<script lang="ts">
import Vue from 'vue';
import GroceryItem from '~/components/GroceryItem';

export default Vue.extend({
  name: 'GroceryList',
  components: {
    GroceryItem
  },
  props: {
    groceries: {
      type: Array,
      default: () => []
    }
  }
});
</script>

<style lang="scss" scoped></style>
