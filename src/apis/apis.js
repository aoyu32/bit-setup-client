import message from "../utils/message";
import service from "./request";
import { fetchReq } from "../utils/fetch";
import { SSEClient } from "./sse-client";
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

export const detailApi = {
    getAppDetail(param) {
        return service.get(`/detail/info/${param}`)
    },
    getRelated(param) {
        return service.get(`/detail/related/${param}`)
    },
    getGuessLike() {
        return service.get('/detail/guess')
    }

}

export const searchApi = {
    getSearchTips(param) {
        return service.get('/search/tips', {
            params: {
                keyword: param
            }
        })
    },
    getSearchApp(pageNum, pageSize, query) {
        return service.post('/search/page', query, {
            params: {
                pageNum,
                pageSize
            }
        })
    }
}

export const captchaApi = {
    //获取验证图片  以及token
    reqGet(data) {
        return service({
            url: '/captcha/get',
            method: 'post',
            data
        })
    },
    //滑动或者点选验证
    reqCheck(data) {
        return service({
            url: '/captcha/check',
            method: 'post',
            data
        })
    }
}

export const userAuthApi = {

    register(param) {
        return service.post('/auth/register', param)
    },
    getCaptcha(param) {
        return service.get('/auth/code', {
            params: {
                email: param
            }
        })
    },
    login(param) {
        return service.post('/auth/login', param)
    }

}

export const userInfoApi = {
    getBaseInfo() {
        return service.get(`/user/base`, {
            withToken: true
        })
    }
}



// apis.js
export const aiApi = {

    newConversation() {
        return service.get(`/ai/conversation/new`, {
            withToken: true
        })
    },
    getAllConversation() {
        return service.get(`/ai/conversation/all`, {
            withToken: true
        })
    },
    getConversationTitle(param) {
        return service.get(`/ai/title/${param}`, {
            withToken: true
        })
    },
    getMessageByConversationId(param) {
        return service.get(`/ai/message/all/${param}`, {
            withToken: true
        })
    },
    deleteConversation(param) {
        return service.post(`/ai/conversation/delete/${param}`, null, {
            withToken: true
        })
    }

}