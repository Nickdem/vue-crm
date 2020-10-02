<template>
    <div>
        <div class="page-title">
            <h3>{{'Category_title' | localize}}</h3>
        </div>
        <section>
            <Loader v-if="loading" />
            <div class="row" v-else>
                <CategoryCreate @created="addNewCategory" />
                <CategoryEdit v-if="categories.length" :categories="categories" :key="categories.length + updateCounter" @updated="updateCategories" />
                <p v-else class="cented">Категорий пока нет</p>
            </div>
        </section>
    </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
import localizeFilter from '@/filters/localizeFilter'

export default {
    name: 'categories',
    data: () => ({
        categories: [],
        loading: true,
        updateCounter: 0
    }),
    metaInfo() {
        return {title: localizeFilter('Category_title')}
    },
    async mounted() {
        this.categories = await this.$store.dispatch('fetchCategories')
        this.loading = false
    },
    components: {
        CategoryCreate, CategoryEdit
    },
    methods: {
        addNewCategory(category) {
            this.categories.push(category)
        },
        updateCategories(category) {
            const idx = this.categories.findIndex(c => c.id === category.id)
            this.categories[idx].title = category.title
            this.categories[idx].limit = category.limit
            this.updateCounter++
        }
    }
}
</script>