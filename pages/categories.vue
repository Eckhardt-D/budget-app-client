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
      <tr>
        <td><b>Total</b></td>
        <td>{{ categoryTotal }}</td>
      </tr>
      <tr>
        <td><b>Budget</b></td>
        <td>{{ budget.amount }}</td>
      </tr>
      <tr>
        <td style="border-top: 2px solid black;"><b>{{ difference > 0 ? 'Surplus' : 'Deficit' }}</b></td>
        <td style="border-top: 2px solid black;">{{budget.amount - categoryTotal}}</td>
      </tr>
    </table>
  </b-container>
</template>

<script>
import { mapState, mapGetters} from 'vuex'

export default {
  computed: {
    ...mapState([
      'categories',
      'budget'
    ]),
    ...mapGetters([
      'categoryTotal',
      'difference'
    ])
  },
  mounted() {
    this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchBudget')
  }
}
</script>

<style scoped>
tr th, tr td {
  border: 1px solid black;
  padding: 10px 5px;
}
</style>
