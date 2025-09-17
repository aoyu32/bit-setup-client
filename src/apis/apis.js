import service from "./request";

export const appApi = {

    getHotList() {
        return service.get('/app/hot')
    },

    getRecommendList() {
        return service.get('/app/recommend')
    },

    getMustHaveList() {
        return service.get("/app/must")
    },

    getPageList(pageNum, pageSize) {
        return service.get("/app/page", {
            params: {
                pageNum: pageNum,
                pageSize: pageSize
            }
        })
    }

}


export const categoryApi = {
    getFather(param = 1) {
        return service.get(`/category/level/${param}`)
    },
    getChild(param) {
        return service.get('/category/sub', {
            params: {
                categoryId: param
            }
        })
    },
    getAppByFilter(param) {
        return service.post('/category/filter', param)
    }
}