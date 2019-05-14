const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    // data={book_id, comment, openid, location, phone}
    // const data = ctx.request.body
    // const {book_id, comment, open_id, location, phone} = ctx.request.body
    const data = await ctx.request.body
    try {
        await mysql('orders').insert(data)
        ctx.state.data = {
            code: 0,
            data: {
                msg: 'success'
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
