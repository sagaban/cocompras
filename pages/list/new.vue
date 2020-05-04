<template>
  <div>
    <h1>New List</h1>
    <v-form v-model="valid">
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>
      <grocery-list
        :groceries="groceriesArray"
        :avatar-size="48"
        only-checkbox
        @valueChanged="valueChanged"
      />
    </v-form>
    <v-btn
      :disabled="!valid"
      absolute
      dark
      fab
      bottom
      right
      color="green"
      @click="createList"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-snackbar
      v-model="showError"
      :timeout="3000"
      color="error"
      class="snackbar-error"
    >
      Set a name and select at least one grocery
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GroceryList from '~/components/GroceryList';

export default {
  name: 'NewList',
  components: {
    GroceryList
  },
  fetch() {
    return this.$store.dispatch('getGroceries');
  },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [v => !!v || 'Name is required'],
    selectedGroceries: {},
    showError: false
  }),
  computed: {
    ...mapState(['groceries']),
    groceriesArray() {
      return Object.keys(this.groceries).map(id => ({
        ...this.groceries[id],
        value: !!this.selectedGroceries[id]
      }));
    }
  },
  methods: {
    async createList() {
      const groceries = Object.keys(this.selectedGroceries).filter(
        key => this.selectedGroceries[key]
      );
      if (!groceries.length) {
        this.showError = true;
      } else {
        await this.$store.dispatch('createUserList', {
          name: this.name,
          groceries
        });
        this.$router.push({ name: 'list' });
      }
    },
    valueChanged(groceryId) {
      if (this.selectedGroceries[groceryId]) {
        this.$set(this.selectedGroceries, groceryId, undefined);
      } else {
        this.$set(this.selectedGroceries, groceryId, true);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.snackbar-error {
  text-align: center;
}
</style>
