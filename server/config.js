const AV = require('leanengine')

const config = {
    appId: 'dpeFsmm4JIVgnmQP0tizLCcO-gzGzoHsz',
    appKey: '2ph8iVVCL1TtNjKNCUG8TtKn'
}

AV.initialize(config.appId, config.appKey)
AV.Cloud.useMasterKey()

exports.AV = AV