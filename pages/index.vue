<template>
  <main>
    <b-container class="mt-3">
      <bar-chart class="mb-5" :options="options" :data="chartData"></bar-chart>
        <b-alert :variant="budgetVariant" show>
          {{ budgetModalText }}
        </b-alert>
      <b-row class="mt-5">
        <b-col class="text-center">
          <b-button class="w-100" @click="$router.push('/expenses')" variant="success">View expenses</b-button>
        </b-col>
        <b-col class="text-center">
          <b-button class="w-100" @click="$router.push('/new')" variant="success">Create expense</b-button>
        </b-col>
      </b-row>
      <b-row class="my-1 mb-3">
        <b-col class="text-center">
          <b-button class="w-100" @click="$router.push('/categories')" variant="success">View categories</b-button>
        </b-col>
        <b-col class="text-center">
          <b-button class="w-100" @click="$router.push('/budget')" variant="success">Create budget</b-button>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

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
    ...mapGetters([
      'difference',
      'totalExpenses'
    ]),
    budgetVariant() {
      if(this.difference < 0) {
        return "warning"
      } else {
        return "success"
      }
    },
    budgetModalText() {
      if(this.difference < 0) {
        return `You are N$${-this.difference} over your budget!`
      } else {
        return `You still have N$${this.difference} in your budget!`
      }
    },
    chartData() {
      return {
        labels: ['Budget', 'Expenses'],
        datasets: [
          {
            label: 'N$',
            backgroundColor: ['#3333aa', '#aa5544'],
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
