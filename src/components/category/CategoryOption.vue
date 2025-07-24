<template>
    <div class="category-option">
        <div class="category-wrapper">
            <div class="father-category">
                <div class="category-lable">
                    <span> {{ fatherLable }} : </span>
                </div>
                <div class="category-item">
                    <ul>
                        <li v-for="(item, index) in categoryOptionData[0].options" :key="index">{{ item.name }}</li>
                    </ul>
                </div>
            </div>
            <div class="child-category">
                <div class="category-lable">
                </div>
                <div class="category-item">
                    <ul>
                        <li v-for="(item, index) in categoryOptionData[0].options[0].subOptions" :key="index">{{ item }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="option-wrapper" v-for="(item, index) in categoryOptionData.slice(1)" :key="index">
            <div class="option-lable">
                <span>{{ item.name }} : </span>
            </div>
            <div class="option-item">
                <ul>
                    <li v-for="(option, index) in item.options" :key="index">{{ typeof (option) === 'object' ? option.name
                        :option }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import categoryOptionData from '../../utils/category-options';

const fatherLable = ref("类别")
onMounted(() => {
    console.log("筛选选项数据", categoryOptionData);
    console.log("类别数据：", categoryOptionData[0].options);


})

</script>
<style lang="scss" scoped>
@use '@/assets/styles/category/_category-option.scss' as *;
</style>