<template>
  <div class="counter">
    <span class="counter__amount">{{ amount }}</span>
    <div class="counter__buttons-group">
      <v-btn icon @click="add"
        ><v-icon dark>mdi-plus-circle-outline</v-icon></v-btn
      >
      <v-btn icon @click="subtract"
        ><v-icon dark>mdi-minus-circle-outline</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroceryAmountCounter',
  props: {
    amount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    add() {
      this.$emit('change', 1);
    },
    subtract() {
      this.$emit('change', -1);
    }
  }
};
</script>

<style lang="scss" scoped>
.counter {
  display: flex;
  align-items: center;
  &__amount {
    font-size: 2rem;
    margin-right: 1rem;
  }
  &__buttons-group {
    display: flex;
    flex-direction: column;
  }
}
</style>
