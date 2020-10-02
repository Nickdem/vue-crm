<template>
  <div>
    <div class="page-title">
      <h3>{{'Record_title' | localize}}</h3>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить...</router-link></p>
    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option v-for="c of categories" :key="c.id" :value="c.id">{{c.title}}</option>
        </select>
        <label>{{'Record_Select_Category' | localize}}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          >
          <span>{{'Record_Income' | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          >
          <span>{{'Record_Outcome' | localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">{{'History_Amount' | localize}}</label>
        <span class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.minValue">Минимальное значение {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="desc"
          :class="{invalid: $v.desc.$dirty && !$v.desc.required}"
        >
        <label for="description">{{'Record_Desc' | localize}}</label>
        <span class="helper-text invalid" v-if="$v.desc.$dirty && !$v.desc.required">Введите описание</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Record_Send' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'
import localizeFilter from '@/filters/localizeFilter'

export default {
  name: 'record',
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'outcome',
    amount: 1,
    desc: ''
  }),
  metaInfo() {
    return {title: localizeFilter('Record_title')}
  },
  validations: {
    desc: {required},
    amount: {minValue: minValue(1)}
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            desc: this.desc,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount 
          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 1
          this.desc = ''
        } catch (e) {}         
      } else {
        this.$message(`Недостаточно срудств на счёте (${this.amount - this.info.bill})`)
      }
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select, {})
      M.updateTextFields() 
    }, 0)
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>