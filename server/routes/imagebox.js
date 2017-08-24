'use strict'

const leancloud    = require('../config')
const http         = require('http')
const https        = require('https')
const Stream       = require('stream').Transform
const HashTable    = require('../util').HashTable

const AV = leancloud.AV

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

const download = function (uri) {
    let promise = new AV.Promise()
    let filename = uri.match(/(\w+)(\.\w+)+(?!.*(\w+)(\.\w+)+)/g)

    if (!filename) {
        promise.reject(ERROR_CODE[1])
        return promise
    }

    filename = filename[0]

    let client = http

    if (/^https:\/\//.test(uri)) {
        client = https
    } else if (!/^http:\/\//.test(uri)) {
        promise.reject(ERROR_CODE[1])
        return promise
    }

    var readFile = function (response) {
        if (response.statusCode !== 200) {
            promise.reject(ERROR_CODE[1])
            return promise
        }

        let contentType = response.headers['content-type'].split('/')

        if (!contentType.length || contentType[0] !== 'image') {
            promise.reject(ERROR_CODE[2])
            return promise
        }

        if (['jpg', 'png', 'gif', 'jpeg', 'webp', 'svg'].indexOf(contentType[1]) === -1) {
            promise.reject(ERROR_CODE[3])
            return promise
        }

        if (response.headers['content-length'] > 10 * 1024 * 1024) {
            promise.reject(ERROR_CODE[4])
            return promise
        }

        let data = new Stream()

        response.on('data', function (chunk) {
            data.push(chunk)
        })

        response.on('error', function () {
            promise.reject(ERROR_CODE[5])
        })                                

        response.on('end', function () {
            promise.resolve(filename, data)
        })
    }

    let request = client.request(uri)
    request.end()
    request.setTimeout(10000, function () {
        promise.reject(ERROR_CODE[6])
    })
    request.on('response', readFile)

    return promise
}

const hashTable = new HashTable(1000)

module.exports.upload = function (req, res) {
    let type = req.query.type
    let uri

    switch (type) {
    case 'reverse' :
        uri = req.query.data.split('').reverse().join('')
        break
    case 'rev-64':
        uri = (new Buffer(req.query.data, 'base64').toString('ascii')).split('').reverse().join('')
        break
    case '64':
        uri = new Buffer(req.query.data, 'base64').toString('ascii')
        break
    default:
        uri = req.query.data.split('').reverse().join('')
    }
    if (hashTable.get(uri)) {
        return res.send({
            code: 200,
            data: {
                url: hashTable.get(uri)
            }
        })
    } else {
        let query = new AV.Query('_File')
        query
            .equalTo('name', uri)
            .first()
            .then(file => {
                if (file) {
                    hashTable.set(uri, file.get('url'))
                    return res.send({
                        code: 200,
                        data: {
                            url: file.get('url'),
                            id: file.id
                        }
                    })
                } else {
                    download(uri)
                    .then(function (filename, data) {
                        let file = new AV.File(uri, data.read())
                        return file.save()
                    })
                    .then(function(obj) {
                        hashTable.set(uri, obj.url())
                        return res.send({
                            code: 200,
                            data: {
                                url: obj.url(),
                                id: obj.id
                            }
                        }).end()
                    })
                    .catch(err => {
                        console.error(err)
                        return res.send(ERROR_CODE[1]).end()
                    })
                }
            })
            .catch(err => {
                console.error(err)
                res.send(ERROR_CODE[1])
            })
    }
}
