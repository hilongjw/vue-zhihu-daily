'use strict'

const AV           = require('../config').AV
const http         = require('http')
const https        = require('https')
const fs           = require('fs')
const Stream       = require('stream').Transform
const request      = require('request')
const HashTable    = require('../util').HashTable

const hashTable = new HashTable(1000)
const ERROR_CODE = {
    1: {
        code: 1,
        message: 'Invailed Url'
    },
    2: {
        code: 2,
        message: 'Invailed Image'
    },
    3: {
        code: 3,
        message: 'Invailed extension'
    },
    4: {
        code: 4,
        message: 'Image too large'
    },
    5: {
        code: 5,
        message: 'read file error'
    },
    6: {
        code: 6,
        message: 'Timeout'
    }
}

const readAPI = function (uri) {
    let promise = new AV.Promise()

    let client = http
    

    if (/^https:\/\//.test(uri)) {
        client = https
    } else if (!/^http:\/\//.test(uri)){
        promise.reject(ERROR_CODE[1])
        return promise
    }

    request({
            url: uri,
            json: true
        }, (err, response, data) => {
            if (!err && response.statusCode === 200) {
                promise.resolve(data)
            } else {
                promise.reject(ERROR_CODE[6])
            }
    })

    return promise
}

module.exports.requestApi = function(req, res) {
    let uri = req.query.uri
    if (hashTable.get(uri)) {
        res.send(hashTable.get(uri))
    } else {
       readAPI(uri)
            .then(data => {
                hashTable.set(uri, data)
                res.send(data).end()
            })
            .catch(err => { res.send(ERROR_CODE[1]) }) 
    }
    
        
}