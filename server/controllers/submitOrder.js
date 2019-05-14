const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {data, pay, totalPrice, openId} = await ctx.request.body
    const orderData = {
        open_id: openId,
        goods_list: JSON.stringify(data),
        pay: pay,
        total_price: totalPrice
    }
    try {
        await mysql('orders').insert(orderData)
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
