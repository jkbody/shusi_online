const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    const bookId = ctx.request.query.bookId
    //  每次请求，count +1
    // 加frist（）是因为返回的是一个数组 也可以斜插detail[0]
    await mysql('books').where('id', bookId).increment('count', 1)
    const deatil = await mysql('books').select('books.*', 'cSessionInfo.user_info').where('id', bookId).join('cSessionInfo', 'books.open_id', 'cSessionInfo.open_id').first()
    const info = JSON.parse(deatil.user_info)
    ctx.state.data = {
        code: 0,
        // data: deatil[0]
        // 合并对象将原detail的user_info 覆盖
        data: Object.assign({}, deatil, {
            tags: deatil.tags.split(','), // 将字符按'，'分割成数组
            summary: deatil.summary.split('\n'), // 将字符按换行符‘/n’，分割成数组
            user_info: {
                name: info.nickName,
                image: info.avatarUrl
            }
        })
    }
}
