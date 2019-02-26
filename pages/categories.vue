<template>
  <b-container>
    <table class="mt-4" width="100%">
      <tr>
        <th>Name</th>
        <th>Total Amount</th>
      </tr>
      <tr v-for="category in categories" :key="category._id">
        <td>{{ category.name }}</td>
        <td>{{ category.total }}</td>
      </tr>
    </table>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'categories'
    ])
  },
  mounted() {
    this.$store.dispatch('fetchCategories');
  }
}
</script>

<style scoped>
tr th, tr td {
  border: 1px solid black;
  padding: 10px 5px;
}
</style>
