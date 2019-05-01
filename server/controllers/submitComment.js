const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    // data={book_id, comment, openid, location, phone}
    // const data = ctx.request.body
    const {book_id, comment, open_id, location, phone} = ctx.request.body
    try {
        // await mysql('comments').insert(data)
        await mysql('comments').insert({book_id, comment, open_id, location, phone})
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
                msg: '评论失败' + e.sqlMessage
            }
        }
    }
}
