<template>
    <div class="container">
        <nav class="cov-nav">
            <div class="nav-tab" @click="navRoute($event, 'index')">首页</div>
            <div class="nav-tab" @click="navRoute($event, 'themes')">主题日报</div>
            <div class="nav-tab" @click="navRoute($event, 'about')">关于</div>
            <div class="nav-rail">
                <span class="nav-moving" :style="covNav.moving"></span>
            </div>
        </nav>
        <router-view></router-view>
        <progress :percent.sync="Progress.percent" :options="Progress.options"> </progress>
    </div>
</template>

<script>
import progress from 'vue-progressbar/vue-progressbar.vue'
import store from '../vuex/index/store'

export default {
    store: store,
    data () {
        return {
            Progress: {
                percent: 0,
                options: {
                    show: true,
                    canSuccess: true,
                    color: 'rgb(1, 223, 255)',
                    failedColor: 'red',
                    height: '2px'
                }
            },
            covNav: {
                navMap: {},
                currentX: 0,
                moving: {
                    width: '8px',
                    transform: 'translateX(0px)'
                }
            }
        }
    },
    components: {
        progress
    },
    created () {
        this.$progress.setHolder(this.vueProgress)
    },
    ready () {
        this.initNav()
    },
    methods: {
        navRoute (e, name) {
            this.touchNav(e, () => {
                this.$route.router.go({name: name})
            })
        },
        initNav () {
            let x = document.getElementsByClassName('nav-tab')[0].clientWidth * 0.5
            this.covNav.moving = {
                width: '8px',
                transform: `translateX(${x}px)`
            }
        },
        moving (w, x) {
            this.covNav.currentX = x
            this.covNav.moving = {
                width: w + 'px',
                transform: `translateX(${x - w}px)`
            }
        },
        touchNav (e, after) {
            let parent = e.target.parentNode || e.path[1]
            let count = 1
            for (let node of parent.getElementsByClassName('nav-tab')) {
                if (node === e.target) {
                    break
                }
                count++
            }
            let x = e.target.clientWidth * (count - 0.5)
            this.moving(e.target.clientWidth * 0.8 + x * 0.05, x + e.target.clientWidth * 0.5 + x * 0.05)
            this.$nextTick(() => {
                setTimeout(() => {
                    this.covNav.moving = {
                        width: '8px',
                        transform: `translateX(${x}px)`
                    }
                    after()
                }, 100)
            })
        }
    }
}
</script>

<style>
    html {
        font-size: 62.5%;
        font-family: Hiragino Sans GB,Helvetica,Arial,STHeiti,WenQuanYi Micro Hei,sans-serif;
    }
    * {
        padding: 0;
        margin: 0;
    }
    body {
        background-color: #F5F5F5;
    }
    .container {
        max-width: 80rem;
        margin-left: auto;
        margin-right: auto;
        padding-top: 7rem;
    }
    .cov-nav {
        position: fixed;
        height: 6rem;
        width: 100%;
        background-color: #252e39;
        top: 0;
        left: 0;
        z-index: 2;
        font-size: 1.5rem;
        color: #fff;
    }
    .nav-tab {
        display: inline-block;
        height: 6rem;
        line-height: 6rem;
        text-align: center;
        min-width: 8rem;
        cursor: pointer;
    }
    .nav-rail {
        position: absolute;
        height: 4px;
        width: 100%;
        bottom: 1rem;
        background-color: #182128;
    }
    .nav-moving {
        position: absolute;
        background-color: #4CFFFE;
        height: 8px;
        width: 1rem;
        border-radius: 4px;
        transition-property: transform, width;
        transition-duration: .3s;
        transition-timing-function: ease-out;
        margin-top: -1px;
    }
</style>
