const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    const {bookId} = ctx.request.query
    const data = await mysql('comments').select('comments.*', 'csessioninfo.user_info').join('csessioninfo', 'comments.open_id', 'csessioninfo.open_id').where('comments.book_id', bookId)
    console.log(data)
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
}
