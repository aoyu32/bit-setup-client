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
    },

    getSearchHistory() {
        return service.get('/search/history', {
            withToken: true
        })
    },
    deleteHistoryItem(sid) {
        return service.post('/search/delete', {
            sid: sid
        }, {
            withToken: true
        })
    },
    saveSearchHistory(keyword) {
        return service.post('/search/save/history', {
            keyword
        }, {
            withToken: true
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
    },
    loginRecord(param) {
        return service.get(`/auth/login/info`, {
            params: {
                uid: param
            },
            withToken: true
        })
    },
    reset(param) {
        return service.post('/auth/reset', param)
    },
    updateEmail(param) {
        return service.post('/auth/email/update', param, {
            withToken: true
        })
    },
    updatePassword(param) {
        return service.post('/auth/pwd/update', param, {
            withToken: true
        })
    },
    deleteAccount(param) {
        return service.post('/auth/account/delete', param, {
            withToken: true
        })
    }

}

export const userInfoApi = {
    getBaseInfo() {
        return service.get(`/user/base`, {
            withToken: true
        })
    },
    updateUserInfo(param) {
        return service.post("/user/update", param, {
            withToken: true
        })
    },
    uploadAvatar(file, uid) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('uid', uid);
        return service.post("/user/upload/avatar", formData, {
            headers: {
                'Content-Type': 'multipart-format-data'
            },
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

export const communityApi = {

    uploadImg(file, uid) {
        const formData = new FormData();
        formData.append('multipartFile', file);  // 参数名必须与后端一致
        formData.append('uid', uid);             // 第二个参数

        return service.post("/post/upload/img", formData, {
            headers: {
                'Content-Type': 'multipart-format-data'
            },
            withToken: true  // 如果需要认证
        })
    },
    savePost(param) {
        return service.post("/post/save", param, {
            withToken: true
        })
    },
    getPostList(param) {
        return service.get(`/post/list/${param}`)
    },
    getPostDetail(param) {
        return service.get(`/post/detail/${param}`)

    },
    getHotPost() {
        return service.get("/post/hot")
    },
    getRecommend() {
        return service.get("/post/recommend")
    }

}

export const submitApi = {
    /**
     * 上传截图
     * @param {File} file 上传的图片文件
     * @param {String|Number} uid 用户ID
     */
    uploadImg(file) {
        const formData = new FormData();
        formData.append('file', file);
        return service.post("/submit/upload/img", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withToken: true
        });
    },

    /**
     * 提交推荐应用
     * @param {Object} data 推荐应用提交表单
     */
    submitRecommend(data) {
        return service.post("/submit/recommend", data, {
            withToken: true
        });
    },

    /**
     * 提交个人开发应用
     * @param {Object} data 个人开发应用提交表单
     */
    submitDevelop(data) {
        return service.post("/submit/develop", data, {
            withToken: true
        });
    },

    /**
     * 获取暂存的投稿表单
     * @param {String} type 投稿类型（recommend 或 dev）
     */
    getSubmitDraft(type) {
        return service.get("/submit/draft", {
            params: { type },
            withToken: true
        });
    },

    /**
     * 上传投稿应用文件（应用安装包等）
     * @param {File} file 上传文件
     * @param {String|Number} uid 用户ID
     */
    uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        return service.post("/submit/file", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withToken: true
        });
    }
};
