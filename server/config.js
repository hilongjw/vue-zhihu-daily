const AV = require('leanengine')

const config = {
    appId: 'Myg6wSTVY6xWcg845dkF4rpe-gzGzoHsz',
    appKey: 'hOD58ye6VmgYn36q8MUwzRBP',
    masterKey: 'Dj1jOtxsp2XuUQp2m8cDWx1X'
}

AV.initialize(config.appId, config.appKey, config.masterKey)
AV.Cloud.useMasterKey()

exports.AV = AV