<template>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>{{'History_Amount' | localize}}</th>
                <th>{{'History_Date' | localize}}</th>
                <th>{{'History_Category' | localize}}</th>
                <th>{{'History_Type' | localize}}</th>
                <th>{{'History_Open' | localize}}</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(r, idx) of records" :key="r.id">
                <td>{{idx + 1}}</td>
                <td>{{r.amount | currency('RUB')}}</td>
                <td>{{r.date | date('datetime')}}</td>
                <td>{{r.categoryName}}</td>
                <td>
                <span class="white-text badge" :class="[r.typeClass]">{{r.typeText === 'Доход' ? 'Record_Income' : 'Record_Outcome' | localize}}</span>
                </td>
                <td>
                <button class="btn-small btn" @click="$router.push(`/detail/${r.id}`)">
                    <i class="material-icons">open_in_new</i>
                </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        records: {
            required: true,
            type: Array
        }
    }
}
</script>