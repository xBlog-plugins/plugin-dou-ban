// 使用博客系统提供的接口
const router =xBlog.router
const database =xBlog.database
const tools =xBlog.tools

// 一些字段
const dbDouBan = "dou_ban"

// 获取所有赞助
router.registerRouter("GET","/:type",function(context){
    // 获取页数信息
    let id = parseInt(context.Query("page"))
    // id转换为数字
    if (isNaN(id)){
        id = 1
    }
    // 获取请求的类型
    let type = context.Param("type")
    // 返回的数据
    let response = {
        current: id,
        total: 0,
        contents: []
    }
    // 开始获取数据
    let db = database.newDb(dbDouBan)
    db.Paginate({ "filter" : { "item_type": type } },id,20,function (err,page,total,data){
        if (err==null){
            response.total = page
            data.forEach(function (item){
                response.contents.push({
                    name: item.name,
                    picture: item.image,
                    star: item.score,
                    pub: item.pub_info,
                    comment: item.comment,
                    status: item.status,
                    url: item.url
                })
            })
            router.response.ResponseOk(context,response)
        } else {
            router.response.ResponseServerError(context,"查询数据失败")
        }
    })
})

