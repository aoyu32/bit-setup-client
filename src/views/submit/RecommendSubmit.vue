<template>
    <div class="recommend-submit">
        <div class="recommend-form">
            <SubmitForm ref="formRef" :isDeveloper="false">
            </SubmitForm>
        </div>
        <div class="submit-button">
            <div class="save">
                <button @click="handleSave">暂存</button>
            </div>
            <div class="submit">
                <button @click="handleSubmit">提交</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import SubmitForm from '../../components/submit/SubmitForm.vue'
import { useSubmitStore } from '../../stores/submit'
const submitStore = useSubmitStore()

const formRef = ref(null)

onMounted(async ()=>{
    //获取草稿
    const resp = await submitStore.fetchSubmitDraft('recommend')
    if(resp){
        formRef.value.setFormData(resp)
    }


})

// 暂存
const handleSave = async () => {
    // const formData = formRef.value.getFormData()
    // 验证表单
    if (formRef.value.isFormEmpty()) {
        return
    }

    console.log("推荐表单应用：", formRef.value.getFormData());

    const reqData = {
        ...formRef.value.getFormData(),
        isDraft: true
    }
    console.log("推应用请求表单数据：", reqData);

    await submitStore.fetchSubmitRecommend(reqData)

}

// 提交
const handleSubmit = async () => {
    // 验证表单
    if (!formRef.value.validateForm()) {
        return
    }
    console.log("推荐表单应用：", formRef.value.getFormData());
    const reqData = {
        ...formRef.value.getFormData(),
        isDraft: false
    }
    const resp = await submitStore.fetchSubmitRecommend(reqData)
    console.log("提交结果：",resp);
    
    if (resp) {
        formRef.value.resetForm()
    }


}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/submit/_recommend-submit.scss' as *;
</style>
