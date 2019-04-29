const {mysql} = require('../qcloud')
// orderBy 按books.id排序 desc  倒序
// limit 数量
// offset 起点  每页10个 页数*10 就是下次请求的获取的个数
module.exports = async (ctx) => {
    const {page} = ctx.request.query
    console.log(page)
    const size = 10
    const books = await mysql('books').select('books.*', 'csessioninfo.user_info').join('csessioninfo', 'books.open_id', 'csessioninfo.open_id').orderBy('books.id', 'desc').limit(size).offset(Number(page) * size)
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
}
