<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">

        <span class="card-title">{{'Home_Bill_In_Currency' | localize}}</span>

        <p v-for="c of currencies" :key="c" class="currency-line">
          <span>{{getCurrency(c) | currency(c)}}</span>
        </p>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  }),
  computed: {
    base() {
        return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
    }
  },
  methods: {
    getCurrency(cur) {
        return Math.floor(this.base * this.rates[cur])
    }
  }
}
</script>