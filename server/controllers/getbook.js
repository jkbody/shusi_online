const {mysql} = require('../qcloud')
// orderBy 按books.id排序 desc  倒序
// limit 数量
// offset 起点  每页10个 页数*10 就是下次请求的获取的个数
module.exports = async (ctx) => {
    const {page, openId} = ctx.request.query
    const size = 10
    const allBooks = mysql('books').select('books.*', 'csessioninfo.user_info').join('csessioninfo', 'books.open_id', 'csessioninfo.open_id').orderBy('books.id', 'desc').limit(size).offset(Number(page) * size)
    let books
    if (openId === undefined) { // 通过首页获取到的books list
        books = await allBooks
    } else { // 通过评论获取到的books list
        books = await allBooks.where('books.open_id', openId)
    }
    try {
        ctx.state.data = {
            books: books.map(v => { // 映射处理数组，展开数组遍历每一项
                const info = JSON.parse(v.user_info) // 将user_info转换成对象
                // 合并数组将原来数组里面的user_info 替换成只有一个nickName的对象
                return Object.assign({}, v, {
                    user_info: {
                        nickName: info.nickName
                    }
                })
            })
        }
    } catch (e) {
        ctx.state.data = {
            code: -1,
            msg: '请求失败' + e.sqlMessage
        }
    }
}
