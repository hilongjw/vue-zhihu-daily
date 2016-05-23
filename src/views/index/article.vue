<style>
    .list-item {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        background-color: #fff;
        width: 18.5rem;
        padding: 14rem 1rem 1rem 1rem;
        margin: .5rem;
        text-align: left;
    }
    .item-preview {
        position: absolute;
        height: 14rem;
        width: 100%;
        top: 0;
        left: 0;
        background-size: cover;
    }
    .item-title {
        font-size: 1.6rem;
        height: 4rem;
        padding: .5rem;
        margin: 0;
        line-height: 1.6;
        overflow: hidden;
    }
    .item-description {
        text-align: left;
        font-size: 1rem;
        line-height: 1.6;
    }
    @media all and (max-width: 768px) {
        .list-item {
            width: 100%;
            padding: 1rem 6rem 1rem .5rem;
            box-sizing: border-box;
            margin: .5rem 0;
        }
        .item-preview {
            position: absolute;
            width: 6rem;
            right: .5rem;
            top: .5rem;
            left: inherit;
            height: 6rem;
        }
    }
</style>

<template>
    <article class="list-item" v-link="{'name': 'news', params: {id: data.id}}">
        <div class="item-preview" :style="{'background-image': 'url('+ cloudSrc +')'}"></div>
        <p class="item-title">{{data.title}}</p>
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
                cloudSrc: WAIT_IMG
            }
        },
        created () {
            this.$covImg(this, this.data.img, cloudSrc => {
                this.cloudSrc = cloudSrc
            })
        }
    }
</script>