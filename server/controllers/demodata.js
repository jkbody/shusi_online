module.exports = async (ctx) => {
    const bookId = ctx.request.query.bookId
    ctx.state.data = {
        msg: 'hello 小程序后台',
        data: bookId
    }
    console.log(bookId)
}
