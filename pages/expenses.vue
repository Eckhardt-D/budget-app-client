<template>
  <b-container>
    <table class="mt-4" width="100%">
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
          <input v-model="update.name" v-if="editMode && currentIndex === i" type="text">
          <span v-else>{{ exp.name }}</span>
        </td>
        <td>
          <select v-model="update.category" v-if="editMode && currentIndex === i" type="text">
            <option v-for="item in categories" :key="item._id">{{ item.name }}</option>
          </select>
          <span v-else>{{ exp.category }}</span>
        </td>
        <td>
          <input v-model="update.amount" v-if="editMode && currentIndex === i" type="text">
          <span v-else>{{ exp.amount }}</span>
        </td>
        <button @click="sendToEdit(i)" class="mt-2 ml-2">edit</button>
      </tr>
    </table>
    <b-button @click="sendUpdate" v-if="editMode" class="mt-1" variant="success">Update</b-button>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
