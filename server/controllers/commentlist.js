const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    const {openId, bookId} = await ctx.request.query
    console.log(openId, bookId)
    const mysqlSelect = mysql('comments').select('comments.*', 'csessioninfo.user_info').join('csessioninfo', 'comments.open_id', 'csessioninfo.open_id')
    let data
    if (bookId !== undefined) {
        data = await mysqlSelect.where('comments.book_id', bookId)
    } else if ((openId !== undefined)) {
        data = await mysqlSelect.where('comments.open_id', openId).orderBy('id', 'desc')
        console.log(data)
        // data = await mysqlSelect.where('comments.open_id', openId)
    }
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
