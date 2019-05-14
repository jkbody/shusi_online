const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {idArr, openId} = await ctx.request.body
    try {
        for (let i = 0; i < idArr.length; i++) { // 必须用同步，foreach 不支持for可以写await
            await mysql('orders').where({'id': idArr[i], 'open_id': openId, 'pay': 0}).update({
                pay: 1
            })
        }
        ctx.state = await {
            data: {
                code: 0,
                data: {
                    msg: 'submit orders success'
                }
            }
        }
    } catch (e) {
        ctx.state.data = {
            code: -1,
            data: {
                msg: '提交失败' + e.sqlMessage
            }
        }
    }
}
