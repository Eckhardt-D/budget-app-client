<template>
  <b-container>
    <b-row class="mx-auto">
      <b-form class="w-100 mt-4" @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="exampleInputGroup10"
        label="Username"
        label-for="exampleInput5"
      >
        <b-form-input
          id="exampleInput5"
          type="text"
          v-model="form.username"
          required
          placeholder="Enter username" />
      </b-form-group>

      <b-form-group id="exampleInputGroup31" label="Password:" label-for="exampleInput37">
        <b-form-input
          id="exampleInput37"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter password" />
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
          username: '',
          password: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()

        if(this.form.email != '' && this.form.password != '') {
          this.$store.dispatch('authenticate', {
            username: this.form.username,
            password: this.form.password
          })
          this.onReset(new Event('click'))
        } else {
          alert('please fill in all the fields');
        }
      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.username = ''
        this.form.password = ''
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
