<template>
    <div class="sign-calendar">
        <div class="calendar-header">
            <div class="calendar-label">
                <span>
                    <i class="iconfont icon-start-date"></i>
                    每日签到
                </span>
            </div>
            <!-- <div class="today">
                {{ today }}
            </div> -->
            <div class="switch-month">
                <div class="pre" @click="prevMonth">
                    <span><i class="iconfont icon-left"></i></span>
                </div>
                <div class="current-month-title">
                    {{ currentMonthTitle }}
                </div>
                <div class="next" @click="nextMonth">
                    <span><i class="iconfont icon-right"></i></span>
                </div>
            </div>
        </div>

        <div class="calendar-main">
            <div class="calendar-weekdays">
                <div class="weekdays" v-for="day in weekdays" :key="day">
                    {{ day }}
                </div>
            </div>
            <div class="calendar-days">
                <div class="day" v-for="(item, index) in calendarDays" :key="index" :class="{
                    'prev-month': item.isPrevMonth,
                    'next-month': item.isNextMonth,
                    'current-month': item.isCurrentMonth,
                    'today': item.isToday,
                    'signed': item.isSigned,
                    'can-sign': item.canSign
                }" @click="handleDayClick(item)">
                    <span class="day-number">{{ item.day }}</span>
                    <!-- <span v-if="item.isSigned" class="sign-mark">已签</span> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 使用响应式数据来控制当前显示的年月
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth()) // 0-11

// 签到记录 - 使用日期字符串作为key，值为true表示已签到
const signRecords = ref(new Map())

const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

// 初始化一些示例签到数据
const initializeSignData = () => {
    const today = new Date()
    const currentDateStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`

    // 示例：本月已签到的日期
    const exampleSignDates = [
        `${today.getFullYear()}-${today.getMonth()}-5`,
        `${today.getFullYear()}-${today.getMonth()}-8`,
        `${today.getFullYear()}-${today.getMonth()}-12`,
        `${today.getFullYear()}-${today.getMonth()}-15`,
    ]

    exampleSignDates.forEach(dateStr => {
        signRecords.value.set(dateStr, true)
    })
}

// 初始化数据
initializeSignData()

const today = computed(() => {
    const now = new Date()
    return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
})

// 检查指定日期是否已签到
const isDateSigned = (year, month, day) => {
    const dateStr = `${year}-${month}-${day}`
    return signRecords.value.has(dateStr)
}

// 获取当前月的签到天数
const currentMonthSignCount = computed(() => {
    const year = currentYear.value
    const month = currentMonth.value
    let count = 0

    // 获取当前月的天数
    const daysInMonth = getDaysInMonth(year, month)

    for (let day = 1; day <= daysInMonth; day++) {
        if (isDateSigned(year, month, day)) {
            count++
        }
    }

    return count
})

// 检查今天是否已签到
const todayIsSigned = computed(() => {
    const now = new Date()
    return isDateSigned(now.getFullYear(), now.getMonth(), now.getDate())
})

// 检查今天是否可以签到（只能签当天，且未签到）
const canSignToday = computed(() => {
    const now = new Date()
    const isCurrentMonthAndYear = currentYear.value === now.getFullYear() &&
        currentMonth.value === now.getMonth()
    return isCurrentMonthAndYear && !todayIsSigned.value
})



// 判断是否为闰年
const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// 获取指定年月的天数，正确处理闰年
const getDaysInMonth = (year, month) => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 1) { // 二月
        return isLeapYear(year) ? 29 : 28;
    }

    return daysInMonth[month];
}

const calendarDays = computed(() => {
    const year = currentYear.value;
    const month = currentMonth.value;

    // 获取当前月的天数
    const daysInMonth = getDaysInMonth(year, month);

    // 获取当前月1号是星期几 (0-6, 0是星期日)
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    // 获取上个月的信息
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

    // 获取今天的日期用于标记
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    const days = [];

    // 填充前面的空白（显示上个月的最后几天）
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const dayNum = daysInPrevMonth - i;
        const isToday = prevYear === todayYear && prevMonth === todayMonth && dayNum === todayDate;
        days.push({
            day: dayNum,
            isCurrentMonth: false,
            isPrevMonth: true,
            isNextMonth: false,
            isToday,
            isSigned: isDateSigned(prevYear, prevMonth, dayNum),
            canSign: false,
            year: prevYear,
            month: prevMonth
        });
    }

    // 填充当前月的日期
    for (let i = 1; i <= daysInMonth; i++) {
        const isToday = year === todayYear && month === todayMonth && i === todayDate;
        const isSigned = isDateSigned(year, month, i);
        days.push({
            day: i,
            isCurrentMonth: true,
            isPrevMonth: false,
            isNextMonth: false,
            isToday,
            isSigned,
            canSign: isToday && !isSigned,
            year,
            month
        });
    }

    // 填充后面的空白（显示下个月的前几天），确保总共42个格子（6行7列）
    const totalCells = 42;
    const remainingCells = totalCells - days.length;

    // 获取下个月的信息
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;

    for (let i = 1; i <= remainingCells; i++) {
        const isToday = nextYear === todayYear && nextMonth === todayMonth && i === todayDate;
        days.push({
            day: i,
            isCurrentMonth: false,
            isPrevMonth: false,
            isNextMonth: true,
            isToday,
            isSigned: isDateSigned(nextYear, nextMonth, i),
            canSign: false,
            year: nextYear,
            month: nextMonth
        });
    }

    return days;
});

// 处理签到
const handleSignIn = () => {
    if (!canSignToday.value) return

    const now = new Date()
    const dateStr = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`
    signRecords.value.set(dateStr, true)
}

// 月份切换函数
const prevMonth = () => {
    if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value--;
    } else {
        currentMonth.value--;
    }
}

const nextMonth = () => {
    if (currentMonth.value === 11) {
        currentMonth.value = 0;
        currentYear.value++;
    } else {
        currentMonth.value++;
    }
}

// 当前显示的年月标题
const currentMonthTitle = computed(() => {
    return `${currentYear.value}年${currentMonth.value + 1}月`;
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/signin/_sign-calendar.scss' as *;
</style>