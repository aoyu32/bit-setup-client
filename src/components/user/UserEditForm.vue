<template>
    <div class="user-edit-form">
        <form action="">
            <div class="avatar form-item">
                <div class="img-wrapper" @click="triggerAvatarUpload">
                    <img :src="imgPreview" alt="">
                    <div class="upload">
                        <i class="iconfont icon-tupian"></i>
                        <span>点击上传</span>
                    </div>
                </div>
                <div class="avatar-label">
                    修改头像
                </div>
                <div class="avatar-upload">
                    <input type="file" accept="image/*" class="file-input" ref="fileUploadRef" @change="handleChange">
                </div>
            </div>
            <div class="nickname form-item">
                <div class="item-label">昵称</div>
                <ao-input />
            </div>
            <div class="bio form-item">
                <div class="item-label">简介</div>
                <ao-textarea />
            </div>
            <div class="gender form-item">
                <div class="item-label">性别</div>
                <div class="gender-radio">
                    <div class="radio-label">
                        请选择性别：
                    </div>
                    <ao-radio-group :options="radioOptions" />
                </div>
            </div>
            <div class="city form-item">
                <div class="item-label">城市</div>
                <ao-city-selector :items="{ province: true, city: true }" />
            </div>
            <div class="Career form-item">
                <div class="item-label">职业</div>
                <ao-input />
            </div>
        </form>
        <div class="submit-button">
            <button>提交修改</button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoInput from '@/components/common/AoInput.vue';
import AoRadioGroup from '@/components/common/AoRadioGroup.vue';
import AoTextarea from '@/components/common/AoTextarea.vue';
import AoCitySelector from '@/components/common/AoCitySelector.vue';
import { options } from 'marked';
const fileUploadRef = ref(null)
const imgPreview = ref("https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=TechExplorer")
const radioOptions = ref([
    {
        label: '男',
        value: 1
    },
    {
        label: '女',
        value: 0
    }
])
const triggerAvatarUpload = () => {
    fileUploadRef.value.click()
}


const handleChange = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
        imgPreview.value = URL.createObjectURL(file);
    }

}
</script>
<style scoped lang="scss">
@use '@/assets/styles/user/_user-edit-form.scss' as *;
</style>