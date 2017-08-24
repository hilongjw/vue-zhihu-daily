const AV = require('leanengine')

const config = {
    appId: 'iNKea3geGtJ1XIk7jmNKCw5O-gzGzoHsz',
    appKey: 'JnHcoPkcnmyQNhHyzNyY0pUR'
}

AV.initialize(config.appId, config.appKey)
AV.Cloud.useMasterKey()

exports.AV = AV
