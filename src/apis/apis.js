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
    }



}
