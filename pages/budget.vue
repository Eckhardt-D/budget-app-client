<template>
  <b-container>
    <b-row class="mx-auto">
      <b-alert class="mt-3" variant="danger" show>
        Warning, resetting your budget period will effect all pages
      </b-alert>
      <b-form class="w-100 mt-2" @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="budgetStarting"
        label="Budget Start Date"
        label-for="budget1"
      >
        <b-form-input
          id="budget1"
          type="date"
          v-model="form.from"
          required
          placeholder="Enter your budget starting date" />
      </b-form-group>

      <b-form-group
        id="budgetEndDate"
        label="Budget End Date"
        label-for="budget2"
      >
        <b-form-input
          id="budget2"
          type="date"
          v-model="form.to"
          required
          placeholder="Enter your budget ending date" />
      </b-form-group>

      <b-form-group id="budgetAmount" label="Amount:" label-for="budgetAmount">
        <b-form-input
          id="exampleInput2"
          type="number"
          v-model="form.amount"
          required
          placeholder="Enter budget amount" />
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
          from: '',
          to: '',
          amount: null
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        if(this.form.from != '' && this.form.to != '') {
          let newStart = new Date(this.form.from).toISOString()
          let newEnd = new Date(this.form.to).toISOString()

          this.form.from = newStart
          this.form.to = newEnd

          this.$store.dispatch('createBudget', this.form)
        } else {
          alert('please fill in all the fields');
        }
      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.from = ''
        this.form.to = ''
        this.form.amount = ''
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<style>

</style>
