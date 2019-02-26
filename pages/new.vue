<template>
  <b-container>
    <expense-form :editData="null" mode="create"/>
  </b-container>
</template>

<script>
import {mapState} from 'vuex'
import ExpenseForm from '@/components/ExpenseForm'

export default {
  components: {
    ExpenseForm
  }
}
</script>

<style>

</style>
