<style src="../../assets/zhi.css"></style>
<style>
    .news-content {
        width: 80rem;
        margin-left: auto;
        margin-right: auto;
        box-shadow: 0 0 .625rem .08rem rgba(0,0,0,.05);
    }
    .news-content p > img {
        width: 100%;
    }
    .news-cover {
        height: 25rem;
        background-size: cover;
        position: relative;
    }
    .news-title {
        font-size: 3rem;
        color: #fff;
        position: absolute;
        bottom: 4rem;
        width: 75rem;
        left: 2.5rem;
    }
    .news-cover-source {
        color: #E2E2E2;
        bottom: .5rem;
        right: 2.5rem;
        position: absolute;
        font-size: 1.5rem;
    }
    p {
        font-size: 1.6rem;
        line-height: 2;
    }
    .main-wrap {
        max-width: 80rem;
    }
    @media all and (max-width: 768px) {
        .news-content {
            width: 100%;
        }
        .news-title {
            width: 100%;
            left: 0;
            padding: 1rem;
            box-sizing: border-box;
        }
    }
</style>
<template>
    <article class="news-item">
        <div class="news-content">
            <div v-if="hasCoverImage" class="news-cover" :style="{'background-image': 'url('+ coverImage +')'}">
                <p class="news-title">{{news.title}}</p>
                <span class="news-cover-source">{{news.image_source}}</span>
            </div>
            {{{news.body}}}
        </div>
    </article>
</template>

<script>
    import { WAIT_IMG } from '../../util'
    export default {
        data () {
            return {
                hasCoverImage: false,
                coverImage: WAIT_IMG,
                news: {}
            }
        },
        created () {
            this.fetchNews(this.$route.params.id)
        },
        methods: {
            newsContent (body) {
                const imgReg = /<img\s[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/g
                const srcReg = /htt(p|ps):\/\/.*?(png|jpg|jpeg|gif|webp|svg)/
                const imgs = body.match(imgReg)
                imgs.forEach(img => {
                    let imgSrc = img.match(srcReg)[0]
                    this.$covImg(this, imgSrc, cloudSrc => {
                        body = body.replace(imgSrc, cloudSrc)
                    })
                })

                return body
            },
            loadImg () {
                let imgs = this.$el.getElementsByTagName('img')
                for (let img of imgs) {
                    img.onerror = () => {
                        this.$covImg(this, img.src, cloudSrc => {
                            img.src = cloudSrc
                        })
                    }
                }
            },
            fetchNews (id) {
                this.$http.get(this.$Api(`http://news-at.zhihu.com/api/4/news/${id}`))
                    .then(response => {
                        this.news = response.data
                        if (this.news.images && this.news.images.length) {
                            this.$covImg(this, this.news.images[0], cloudSrc => {
                                this.coverImage = cloudSrc
                                this.hasCoverImage = true
                            })
                        }
                        this.$nextTick(this.loadImg)
                    })
                    .catch(console.log)
            }
        }
    }
</script>