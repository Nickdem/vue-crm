<template>
  <div>
    <div class="page-title">
      <h3>{{'Planning_title' | localize}}</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>
      <Loader v-if="loading" />
      <p v-else-if="!categories.length" class="center">Категорий пока нет. <router-link to="/categories">Добавить...</router-link></p>
    <section v-else>
      <div v-for="c of categories" :key="c.id">
        <p>
          <strong>{{c.title}}:</strong>
          {{c.spend | currency}} {{'Planning_Of' | localize}} {{c.limit | currency}}
        </p>
        <div class="progress" v-tooltip="c.tooltip">
          <div
              class="determinate"
              :class="[c.color]"
              :style="{width: c.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currencyFilter'
import localizeFilter from '@/filters/localizeFilter'

export default {
  name: 'planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  metaInfo() {
    return {title: localizeFilter('Planning_title')}
  },
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.map(ctgr => {
      const spend = records.filter(r => r.categoryId === ctgr.id)
                            .filter(r => r.type === 'outcome')
                            .reduce((total, record) => {
                                return total += +record.amount
                            }, 0)
      const percent = 100 * spend / ctgr.limit
      const progressPercent = percent > 100 ? 100 : percent
      const color = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'
      const tooltipValue = ctgr.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`
      return {
        ...ctgr, spend, progressPercent, color, tooltip
      }
    })
    this.loading = false
  }
}
</script>