const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {isbn, openId} = ctx.request.query
    console.log(isbn, openId)
    const res = await mysql('collects').where({'isbn': isbn, 'open_id': openId})
    try {
        if (res.length) {
            ctx.state = {
                code: 0,
                data: {
                    flag: res[0].flag,
                    msg: '收藏过，状态是' + res[0].flag
                }
            }
        } else {
            ctx.state = {
                code: 0,
                data: {
                    flag: 0,
                    msg: '没有收藏过'
                }
            }
        }
    } catch (e) {
        ctx.state = {
            code: 0,
            data: {
                flag: 0,
                msg: '没有收藏过'
            }
        }
    }
}
