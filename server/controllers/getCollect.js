const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {isbn, openId} = await ctx.request.query
    const collect = await mysql('collects').where({'open_id': openId, 'isbn': isbn})
    console.log('collect', collect)
    let data
    try {
        if (isbn && openId && openId !== undefined && isbn !== undefined) {
            const thisData = new Promise(async (resolve, reject) => {
                if (collect.length) {
                    let flag = collect[0].flag === 0 ? 1 : 0
                    if (!flag) { // 已经收藏再次点击收藏 收藏数减1
                        await mysql('books').where({'isbn': isbn}).decrement('collect', 1)
                    } else {
                        await mysql('books').where({'isbn': isbn}).increment('collect', 1)
                    }
                    await mysql('collects').update({'flag': flag}).where({'isbn': isbn})
                    data = {
                        code: 0,
                        data: {
                            msg: '点击收藏',
                            flag: flag
                        }
                    }
                    resolve(data)
                } else {
                    await mysql('books').where({'isbn': isbn}).increment('collect', 1)
                    await mysql('collects').insert({ isbn: isbn, open_id: openId })
                    data = {
                        code: 0,
                        data: {
                            msg: '创建收藏',
                            flag: 1
                        }
                    }
                    reject(data)
                }
            }).then((data) => {
                return data
            }).catch((data) => {
                return data
            })
            ctx.state = await thisData
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '收藏失败' + e.sqlMessage
            }
        }
    }
}
