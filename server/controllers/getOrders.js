const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {pay, openId} = await ctx.request.query
    try {
        const data = await mysql('orders').where({'open_id': openId, 'pay': pay})
        // let arr
        const orders = await data.map(v => {
            const obj = JSON.parse(v.goods_list) // 字符串转换为数组
            return Object.assign({}, v, { // 对象合并，向前覆盖
                goods_list: obj
            })
        })
        ctx.state = await {
            data: {
                code: 0,
                data: {
                    data: orders
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
