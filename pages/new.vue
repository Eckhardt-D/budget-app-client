<template>
  <b-container>
    <b-row class="mx-auto">
      <b-form class="w-100 mt-4" @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="exampleInputGroup1"
        label="Expense Name"
        label-for="exampleInput1"
      >
        <b-form-input
          id="exampleInput1"
          type="text"
          v-model="form.name"
          required
          placeholder="Enter expense" />
      </b-form-group>

       <b-form-group id="exampleInputGroup3" label="Category:" label-for="exampleInput3">
        <b-form-select id="exampleInput3" :options="categoryNames" required v-model="form.category" />
      </b-form-group>

      <b-form-group id="exampleInputGroup3" label="Amount:" label-for="exampleInput3">
        <b-form-input
          id="exampleInput2"
          type="number"
          v-model="form.amount"
          required
          placeholder="Enter amount" />
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    </b-row>
  </b-container>
</template>

<script>
import {mapState} from 'vuex'

export default {
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
        'categories'
      ]),
      categoryNames() {
        let arr = []
        if(this.categories.length > 1) {
          this.categories.forEach(cat => arr.push(cat.name));
        }
        return arr
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        const date = Date.now()
        this.form.date = date
        if(this.form.name != '' && this.form.category != '' && this.form.amount != '') {
          this.$store.dispatch('createExpense', this.form)
        } else {
          alert('please fill in all the fields');
        }
      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.name = ''
        this.form.category = ''
        this.form.amount = ''
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
    mounted() {
      this.$store.dispatch('fetchCategories');
    }
  }
</script>

<style>

</style>
