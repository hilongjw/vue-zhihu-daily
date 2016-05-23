export default class CovLocalDB {
    constructor (name) {
        this.LS = null
        this.name = name
        this.checkLS()
        this.init(name)
    }

    checkLS () {
        if (window && window.localStorage) {
            this.LS = window.localStorage
        } else {
            console.log('localStorage is there?')
        }
    }

    init (name) {
        if (this.LS) {
            if (this.LS[name] && this.LS[name].length < 45959) {
                this.data = JSON.parse(this.LS[name])
            } else {
                this.data = {}
            }
        }
    }

    set (uri, data) {
        this.data[uri] = data
        if (this.LS) {
            this.LS[this.name] = JSON.stringify(this.data)
        }
    }

    get (uri) {
        if (this.data[uri]) {
            return this.data[uri]
        }
        return false
    }
}

export const WAIT_IMG = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDY2MDRDMEQyMEYwMTFFNkI1QTU5MzQ0NzJBQjAwMjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDY2MDRDMEUyMEYwMTFFNkI1QTU5MzQ0NzJBQjAwMjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NjYwNEMwQjIwRjAxMUU2QjVBNTkzNDQ3MkFCMDAyNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NjYwNEMwQzIwRjAxMUU2QjVBNTkzNDQ3MkFCMDAyNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pin/KgwAAAAPSURBVHjaYv7//z9AgAEABgoDAVaShiAAAAAASUVORK5CYII='
