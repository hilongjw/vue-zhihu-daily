<style>
    .card-list {
        position: relative;
        padding: 0;
        padding-top: 5rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #ECECEC;
    }
    @media all and (max-width: 768px) {
        .card-list {
            padding-top: 0rem;
        }
    }
</style>

<template>
    <section class="card-list">
        <cov-card :data="data" v-for="data in list"></cov-card>  
    </section>
</template>

<script>
    import covCard from './card.vue'
    export default {
        data () {
            return {
                list: []
            }
        },
        components: {
            covCard
        },
        created () {
            this.fetchList(this.$route.params.id)
        },
        methods: {
            fetchList (id) {
                this.$http.get(this.$Api(`http://news-at.zhihu.com/api/4/theme/${id}`))
                    .then(response => {
                        let list = []
                        for (let story of response.data.stories) {
                            list.push({
                                name: story.title,
                                img: story.images ? story.images[0] : '',
                                id: story.id
                            })
                        }
                        this.list = list
                    })
                    .catch(console.log)
            }
        }
    }
</script>