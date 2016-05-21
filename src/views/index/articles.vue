<style>
    .zhi-list {
        position: relative;
        padding: 0;
        padding-top: 5rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #ECECEC;
    }
    .list-date {
        position: absolute;
        font-size: 2rem;
        text-align: center;
        top: 2rem;
        left: 1rem;
        color: #b2bac2;
        font-weight: 500;
    }
</style>

<template>
    <section class="zhi-list">
        <div class="list-date">{{date}}</div>
        <cov-article v-for="data in articles" :data="data"></cov-article>  
    </section>
</template>

<script>
    import covArticle from './article.vue'
    export default {
        props: {
            'articles': {
                type: Array,
                required: true
            },
            date: {
                type: String,
                default () {
                    return ''
                }
            }
        },
        components: {
            covArticle
        }
    }
</script>