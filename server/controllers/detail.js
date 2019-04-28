const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    const bookId = ctx.request.query.bookId
    await mysql('books').where('id', bookId).increment('count', 1)
    const deatil = await mysql('books').where('id', bookId)
    ctx.state.data = {
        code: 0,
        data: deatil
    }
}
