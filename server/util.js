'use strict'

class HashTable {
    constructor (maxLength) {
        this.data =  {}
        this.maxLength = maxLength || 1000
    }

    set (key, val) {
        if (Object.keys(this.data).length > this.maxLength) {
            this.refresh()
        }
        this.data[key] = val
    }

    get (key) {
        if (this.data[key]) {
            return this.data[key]
        }
        return null
    }

    refresh () {
        let keys = Object.keys(this.data)
        let len = keys.length
        while (len) {
            len--
            delete this.data[keys[len]]
        }
    }
}

module.exports.HashTable = HashTable