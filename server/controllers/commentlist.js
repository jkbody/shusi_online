const {mysql} = require('../qcloud')
// orderBy 按books.id排序 desc  倒序
// limit 数量
// offset 起点  每页10个 页数*10 就是下次请求的获取的个数
// module.exports = async (ctx) => {
//     // const {bookId} = ctx.request.query.bookId
//     // console.log(bookId)
//     // const books = await mysql('comments').select('comments.*', 'csessioninfo.user_info').join('csessioninfo', 'comments.open_id', 'csessioninfo.open_id').where('comments.id', book_id)
//     // ctx.state.data = {
//     //     books: books.map(v => { // 映射处理数组，展开数组遍历每一项
//     //         const info = JSON.parse(v.user_info) // 将user_info转换成对象
//     //         // 合并数组将原来数组里面的user_info 替换成只有一个nickName的对象
//     //         return Object.assign({}, v, {
//     //             user_info: {
//     //                 nickName: info.nickName
//     //             }
//     //         })
//     //     })
//     // }
// }
