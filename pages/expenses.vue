<template>
  <b-container>
    <table width="100%" style="font-size: 0.9em" class="mt-4">
      <tr>
        <th>Date</th>
        <th>Name</th>
        <th>Category</th>
        <th>Amount</th>
      </tr>
      <tr v-for="(exp, i) in expenses" :key="exp._id">
        <td>
          {{ exp.created.substring(0, 10) }}
        </td>
        <td>
          <span>{{ exp.name }}</span>
        </td>
        <td>
          <span>{{ exp.category }}</span>
        </td>
        <td>
          <span>{{ exp.amount }}</span>
        </td>
        <b-button @click="sendToEdit(i)" class="mt-2 ml-2">edit</b-button>
      </tr>
    </table>
    <b-button @click="sendUpdate" v-if="editMode" class="mt-1" variant="success">Update</b-button>
    <b-row>
      <b-modal ok-only ok-title="close" v-model="editMode" class="mx-auto w-75" title="Edit Expense">
        <b-container>
          <ExpenseForm :editData="update" mode="edit"/>
        </b-container>
      </b-modal>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import ExpenseForm from '@/components/ExpenseForm'

export default {
  components: {
    ExpenseForm
  },
  data: () => ({
    editMode: false,
    currentIndex: -1,
    update: {
      name: '',
      category: '',
      amount: ''
    }
  }),
  computed: {
    ...mapState([
      'expenses',
      'categories'
    ])
  },
  methods: {
    sendToEdit(i) {
      this.editMode = !this.editMode
      this.currentIndex = i
      this.update = {...this.expenses[i]}
    },
    sendUpdate() {
      this.$store.dispatch('editExpense', this.update)
    }
  },
  mounted() {
    this.$store.dispatch('fetchExpenses');
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
