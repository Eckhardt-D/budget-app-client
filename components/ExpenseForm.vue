<template>
  <b-form class="w-100 mt-4" @submit="onSubmit" @reset="onReset" v-if="show">

    <b-form-group
      id="expense_name_group"
      label="Expense Name"
      label-for="expense_name">
      <b-form-input
        id="expense_name"
        type="text"
        v-model="form.name"
        required
        placeholder="Enter expense" />
    </b-form-group>

    <b-form-group 
      id="expense_category_group" 
      label="Category:" 
      label-for="expense_category">
      <b-form-select 
        id="expense_category" 
        :options="categoryNames" 
        required 
        v-model="form.category" />
    </b-form-group>

    <b-form-group 
      id="expense_amount_group"  
      label="Amount:" 
      label-for="expense_amount">
      <b-form-input
        id="expense_amount"
        type="number"
        v-model="form.amount"
        required
        placeholder="Enter amount" />
    </b-form-group>

    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="info">Reset</b-button>
    <b-button @click="deleteExpense" variant="danger" class="float-right" v-if="mode === 'edit'">Delete</b-button>
  </b-form>
</template>

<script>
import {mapState} from 'vuex'

export default {
  props: ['mode', 'editData'],
  data() {
    return {
      form: {
        name: '',
        category: '',
        amount: null,
        date: ''
      },
      show: true
    }
  },
  computed: {
    ...mapState([
      'categories',
      'categoryNames'
    ])
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()

      if(this.form.name == '' || this.form.category == '' || this.form.amount == '') {
        return alert('please fill in all fields')
      }

      if(this.mode === 'edit') {
        this.$store.dispatch('editExpense', this.form)
      } else {
        const date = Date.now()
        this.form.date = date
        this.$store.dispatch('createExpense', this.form)
      }
      
    },
    onReset(evt) {
      evt.preventDefault()
      this.form.name = ''
      this.form.category = ''
      this.form.amount = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    deleteExpense() {
      confirm('Are you sure?') ? this.$store.dispatch('deleteExpense', this.form._id) : false
    }
  },
  mounted() {
    this.$store.dispatch('fetchCategories');
  },
  watch: {
    editData() {
      this.form = this.editData
    }
  }
}
</script>

<style>

</style>