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
        <td style="border-top: 2px solid black;"><b>{{ calcSurplus }}</b></td>
        <td style="border-top: 2px solid black;">{{budget.amount - categoryTotal}}</td>
      </tr>
    </table>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'categories',
      'budget'
    ]),
    categoryTotal() {
      let count = 0;

      this.categories.forEach(cat => {
        count += parseFloat(cat.total)
      })

      return count
    },
    calcSurplus() {
      if (parseFloat(this.categoryTotal) > parseFloat(this.budget.amount)) {
        return 'Deficit'
      } else {
        return 'Surplus'
      }
    }
  },
  mounted() {
    this.$store.dispatch('fetchCategories');
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
