const {mysql} = require('../qcloud')
const size = 9 // 设置选择排名的个数
module.exports = async (ctx) => {
    const topbooks = await mysql('books').select('*').orderBy('books.count', 'desc').limit(size)
    ctx.state.data = {
        code: 0,
        data: topbooks
    }
}
