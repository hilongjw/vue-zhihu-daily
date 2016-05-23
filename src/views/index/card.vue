<style>
    .card-item {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        background-color: #fff;
        width: 18.5rem;
        padding: 14rem 1rem 1rem 1rem;
        margin: .5rem;
        text-align: left;
        vertical-align: text-top;
        min-height: 21rem;
    }
    .card-preview {
        position: absolute;
        height: 14rem;
        width: 100%;
        top: 0;
        left: 0;
        background-size: cover;
    }
    .card-title {
        font-size: 1.6rem;
        padding: .5rem 0;
        margin: 0;
        line-height: 1.6;
    }
    .card-description {
        text-align: left;
        font-size: 1rem;
        line-height: 1.6;
    }
    .card-item.no-img {
        padding: 1rem;
    }
    .card-list .card-item.no-img {
        padding: 1rem;
    }
    .card-list .card-item.no-img .card-title{
        height: inherit;
    }
    .card-list .card-item.no-img .card-preview {
        display: none;
    }
    @media all and (max-width: 768px) {
        .card-item {
            width: 100%;
            margin: 1rem 0;
            min-height: inherit;
        }
        .card-list .card-item {
            width: 100%;
            padding: 1rem 1rem 1rem 9rem;
            height: 7rem;
            overflow: hidden;
        }
        .card-list .card-preview {
            left: 0;
            right: inherit;
            width: 7rem;
            height: 7rem;
        }
    }
</style>

<template>
    <article class="card-item" v-link="{'name': 'news', params: {id: data.id}}" :class="{'no-img': noImg}">
        <div class="card-preview" :style="{'background-image': 'url('+ cloudSrc +')'}"></div>
        <p class="card-title">{{data.name}}</p>
        <p class="card-description">{{data.description}}</p>
    </article>
</template>

<script>
    import { WAIT_IMG } from '../../util'
    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                noImg: true,
                cloudSrc: WAIT_IMG
            }
        },
        created () {
            if (this.data.img) {
                this.$covImg(this, this.data.img, cloudSrc => {
                    this.cloudSrc = cloudSrc
                    this.noImg = false
                })
            }
        }
    }
</script>