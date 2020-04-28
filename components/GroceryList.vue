<template>
  <v-list-item-group>
    <grocery-item
      v-for="grocery in groceries"
      :key="grocery.id"
      :grocery="grocery"
      :only-checkbox="onlyCheckbox"
      :avatar-size="avatarSize"
      @valueChanged="$emit('valueChanged', $event)"
    />
  </v-list-item-group>
</template>

<script>
import GroceryItem from '~/components/GroceryItem';

export default {
  name: 'GroceryList',
  components: {
    GroceryItem
  },
  props: {
    groceries: {
      type: Array,
      default: () => []
    },
    avatarSize: {
      type: Number,
      default: 96
    },
    onlyCheckbox: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped></style>
