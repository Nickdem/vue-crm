<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{'Home_Exchange_Rates' | localize}}</span>
        </div>

        <table>
          <thead>
          <tr>
            <th>{{'Home_Currency' | localize}}</th>
            <th>{{'Home_Rate' | localize}}</th>
            <th>{{'Home_Date' | localize}}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="c of currencies" :key="c">
            <td>{{c}}</td>
            <td>{{rates[c].toFixed(2)}}</td>
            <td>{{date | date('date')}}</td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  })
}
</script>