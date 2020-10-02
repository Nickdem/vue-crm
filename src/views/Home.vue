<template>
  <div>
    <div class="page-title">
      <h3>{{'Home_title' | localize}}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill :rates="currency.rates" />
      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'
import localizeFilter from '@/filters/localizeFilter'

export default {
  name: 'Home',
  data: () => ({
    loading: true,
    currency: null
  }),
  metaInfo() {
    return {title: localizeFilter('Home_title')}
  },
  methods: {
    refresh() {
      this.loading = true
      this.currency = {
        base: 'EUR',
        date: '2020-09-26',
        rates: {
          EUR: 1,
          RUB: 90.90,
          USD: 78.15
        }
      }
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  },
  mounted() {
    this.currency = {
      base: 'EUR',
      date: '2020-09-25',
      rates: {
        EUR: 1,
        RUB: 90.90,
        USD: 78.15
      }
    }
    setTimeout(() => {
      this.loading = false
    }, 1500)
  },
  components: {
    HomeBill, HomeCurrency
  }
}
</script>
