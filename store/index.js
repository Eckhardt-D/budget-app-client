const url = 'http://localhost:1101/'

export const state = () => ({
  token: '',
  budget: {},
  expenses: [],
  isAuth: false,
  categories: []
})

export const getters = {
  totalExpenses: state => {
    return state.expenses.reduce((accumulator, value) => {
      return accumulator + value.amount
    }, 0)    
  },

  categoryTotal: state => {
    return state.categories.reduce((accumulator, value) => {
      return accumulator + value.amount
    }, 0)
  },

  categoryNames: state => {
    return state.categories.map(item => item.name);
  },

  difference: state => {
    return state.budget.amount - this.getters.totalExpenses
  }
}

export const mutations = {
  SET_TOKEN: (state, payload) => {
    state.token = payload
  },
  SET_EXPENSES: (state, payload) => {
    state.expenses = payload
  },
  SET_CATEGORIES: (state, payload) => {
    state.categories = payload
  },
  SET_BUDGET: (state, payload) => {
    state.budget = payload
  },
  CHANGE_STATUS: (state, payload) => {
    state.isAuth = payload
  }
}

export const actions = {
  authenticate({commit}, {username, password}) {
    this.$axios.$post(url, { username, password })
    .then(result => {
      let token = result.token

      if(!token) return

      localStorage.setItem('budgetToken', JSON.stringify(token))

      commit('SET_TOKEN', token)

      this.$router.push('/')
    })
    .catch(e => console.error(e))
  },

  createExpense(_, payload) {
    this.$axios.$post(`${url}expenses`, payload)
    .then(() => this.$router.push('/expenses'))
    .catch(err => console.log(err))
  },

  createBudget({commit}, payload) {
    this.$axios.$post(`${url}budgets`, payload)
    .then(result => commit('SET_BUDGET', result))
    .catch(e => console.error(e))
  },

  fetchExpenses({commit, state}) {
    this.$axios.$get(`${url}expenses`)
    .then(result => commit('SET_EXPENSES', result))
    .catch(e => console.error(e))
  },

  fetchCategories({commit}) {
    this.$axios.$get(`${url}categories`)
    .then(result => commit('SET_CATEGORIES', result))
    .catch(e => console.error(e))
  },

  fetchBudget({commit}) {
    this.$axios.$get(`${url}budgets`)
    .then(result => {
      if(result[0]) {
        commit('SET_BUDGET', result[0])
      } else {
        commit('SET_BUDGET', {from: null, to: null, amount: 0})
      }
    })
    .catch(err => console.error(err))
  },

  editExpense(ctx, payload) {
    this.$axios.$put(`${url}expenses/${payload._id}`, payload)
    .then(() => this.$router.go('/expenses'))
    .catch(e => console.error(e))
  },

  deleteExpense(_, payload) {
    this.$axios.$delete(`${url}expenses/${payload}`)
    .then(() => this.$router.go('/expenses'))
    .catch(e => console.error(e))
  }
}