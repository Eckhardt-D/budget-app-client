<template>
  <main>
    <bar-chart :options="options" :data="chartData"></bar-chart>
    <b-container>
    <b-row class="mt-1">
      <b-col class="text-center">
        <b-button class="w-100" @click="$router.push('/expenses')" variant="success">View expenses</b-button>
      </b-col>
      <b-col class="text-center">
         <b-button class="w-100" @click="$router.push('/new')" variant="success">Create expense</b-button>
      </b-col>
    </b-row>
    <b-row class="mt-1">

      <b-col class="text-center">
        <b-button class="w-100" @click="$router.push('/categories')" variant="success">View categories</b-button>
      </b-col>
      <b-col class="text-center">
         <b-button class="w-100" @click="$router.push('/budget')" variant="success">Create Budget</b-button>
      </b-col>
    </b-row>
    </b-container>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  }),
  computed: {
    ...mapState([
      'budget',
      'expenses'
    ]),
    totalExpense() {
      let count = 0

      if(this.expenses.length) {

        this.expenses.forEach(exp => {
          count += parseFloat(exp.amount)
        })

        return count
      } else {
        return 0
      }
    },
    chartData() {
      return {
        labels: ['Budget', 'Expenses'],
        datasets: [
          {
            label: 'Amount in N$',
            backgroundColor: '#333333',
            data: [this.budget.amount, this.totalExpense]
          }
        ]
      }
    }
  },
  mounted() {
    this.$store.dispatch('fetchBudget')
    this.$store.dispatch('fetchExpenses')
  }
}
</script>

<style>

</style>
