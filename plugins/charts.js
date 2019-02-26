import Vue from 'vue'
import { Bar } from 'vue-chartjs'

Vue.component('bar-chart', {
  extends: Bar,
  props: ['data', 'options'],
  computed: {
    chartData: function() {
      return this.data;
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    chartData() {
      this.renderChart(this.chartData, this.options);
    }
  }
});