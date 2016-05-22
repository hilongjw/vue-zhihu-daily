<style>
    .list-container{
    }
    .more-btn {
        font-size: 1.5rem;
        padding: 1rem 0;
        width: 100%;
        border: 0;
        color: #fff;
        background-color: #252e39;
        border: none;
        margin: 10px 0;
        border-radius: .5rem;
        outline: none;
        cursor: pointer;
    }
    .more-btn:hover {
        background-color: #455569;
    }
</style>

<template>
    <div class="list-container">
        <cov-articles :articles="value.articles" :date="value.date" v-for="(key, value) of days"></cov-articles>
    </div>
    <button class="more-btn" @click="dataPointerCalc(true)">更多</button>
</template>

<script>
import covArticles from './articles.vue'
import { setAticles, setDatePointer } from '../../vuex/index/action'

export default {
    vuex: {
        getters: {
            datePointer: state => state.datePointer,
            days: state => state.days
        },
        actions: {
            setAticles,
            setDatePointer
        }
    },
    components: {
        covArticles
    },
    created () {
        this.dataPointerCalc()
    },
    methods: {
        dataPointerCalc (plus) {
            if (!this.datePointer.value) {
                this.setDatePointer(new Date())
                this.fetchList()
            } else {
                if (plus) {
                    let nextDay = new Date(this.datePointer.format)
                    this.setDatePointer(new Date(nextDay - 86400000))
                    this.fetchList()
                }
            }
        },
        fetchList () {
            this.$http.get(this.$Api('http://news.at.zhihu.com/api/4/news/before/' + this.datePointer.value))
                .then(response => {
                    const data = response.data
                    let arr = []
                    for (let article of data.stories) {
                        arr.push({
                            type: 'news',
                            title: article.title,
                            img: article.images[0],
                            id: article.id
                        })
                    }
                    this.setAticles(this.datePointer.format, arr)
                })
        }
    }
}
</script>
