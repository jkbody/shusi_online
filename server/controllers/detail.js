const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    const bookId = ctx.request.query.bookId
    //  每次请求，count +1
    // 加frist（）是因为返回的是一个数组 也可以斜插detail[0]
    await mysql('books').where('id', bookId).increment('count', 1)
    const deatil = await mysql('books').select('books.*', 'csessioninfo.user_info').where('id', bookId).join('csessioninfo', 'books.open_id', 'csessioninfo.open_id').first()
    const info = JSON.parse(deatil.user_info)
    ctx.state.data = {
        code: 0,
        // data: deatil[0]
        // 合并对象将原detail的user_info 覆盖
        data: Object.assign({}, deatil, {
            tags: deatil.tags.split(','),
            user_info: {
                name: info.nickName,
                image: info.avatarUrl
            }
        })
    }
}
