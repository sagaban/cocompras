<template>
  <v-list-item>
    <v-list-item-avatar size="96" :tile="true">
      <v-img :src="grocery.image"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-text="grocery.name"></v-list-item-title>
    </v-list-item-content>
    <grocery-item-counter :amount="grocery.amount" @change="amountChange" />
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
    }
  },
  methods: {
    amountChange(value) {
      this.grocery.amount += value;
    }
  }
};
</script>

<style lang="scss" scoped></style>
