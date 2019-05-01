const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    const {bookId} = ctx.request.query
    console.log(bookId)
    const data = await mysql('comments').select('comments.*', 'csessioninfo.user_info').join('csessioninfo', 'comments.open_id', 'csessioninfo.open_id').where('comments.book_id', bookId)
    console.log(data)
    try {
        const comments = data.map(value => {
            const info = JSON.parse(value.user_info)
            return Object.assign({}, value, {
                user_info: {
                    name: info.nickName,
                    image: info.avatarUrl
                }
            })
        })
        ctx.state.data = {
            code: 0,
            data: comments
        }
    } catch (e) {
        ctx.state.data = {
            code: -1,
            msg: '请求失败' + e.sqlMessage
        }
    }
}
