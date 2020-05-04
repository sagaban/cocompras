<template>
  <v-list-item>
    <v-list-item-avatar :size="avatarSize" :tile="true">
      <v-img :src="grocery.image"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-text="grocery.name"></v-list-item-title>
    </v-list-item-content>
    <v-checkbox
      v-if="onlyCheckbox"
      :value="!!grocery.value"
      @change="valueChanged(grocery.id)"
    />
    <grocery-item-counter
      v-else
      :amount="grocery.amount"
      @change="valueChanged({ groceryId: grocery.id, diff: $event })"
    />
  </v-list-item>
</template>

<script>
import GroceryItemCounter from '~/components/GroceryItemCounter';
export default {
  name: 'GroceryItem',
  components: {
    GroceryItemCounter
  },
  props: {
    grocery: {
      type: Object,
      required: true
    },
    avatarSize: {
      type: Number,
      required: true
    },
    onlyCheckbox: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    valueChanged(value) {
      this.$emit('valueChanged', value);
    }
  }
};
</script>

<style lang="scss" scoped></style>
