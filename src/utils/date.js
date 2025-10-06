/**
 * 日期处理工具函数
 * 提供各种日期格式化和处理功能
 */

/**
 * 日期格式化函数
 * @param {Date|string|number} date - 日期对象、日期字符串或时间戳
 * @param {string} format - 格式字符串，默认 'YYYY-MM-DD'
 * @returns {string} 格式化后的日期字符串
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  if (!date) return ''
  
  let dateObj
  try {
    // 处理不同类型的日期输入
    if (date instanceof Date) {
      dateObj = date
    } else if (typeof date === 'string') {
      // 处理各种日期字符串格式
      dateObj = new Date(date.replace(/-/g, '/')) // 解决iOS兼容性问题
    } else if (typeof date === 'number') {
      dateObj = new Date(date)
    } else {
      console.warn('不支持的日期格式:', date)
      return ''
    }
    
    // 检查日期是否有效
    if (isNaN(dateObj.getTime())) {
      console.warn('无效的日期:', date)
      return ''
    }
    
    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')
    const hours = String(dateObj.getHours()).padStart(2, '0')
    const minutes = String(dateObj.getMinutes()).padStart(2, '0')
    const seconds = String(dateObj.getSeconds()).padStart(2, '0')
    const milliseconds = String(dateObj.getMilliseconds()).padStart(3, '0')
    
    // 替换格式字符串中的占位符
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds)
      .replace('SSS', milliseconds)
      .replace('YY', String(year).slice(-2))
      .replace('M', String(Number(month))) // 不带前导零的月份
      .replace('D', String(Number(day)))   // 不带前导零的日期
      .replace('H', String(Number(hours))) // 不带前导零的小时
      .replace('m', String(Number(minutes))) // 不带前导零的分钟
      .replace('s', String(Number(seconds))) // 不带前导零的秒数
  } catch (error) {
    console.error('日期格式化错误:', error)
    return ''
  }
}

/**
 * 常用格式的快捷方法
 */

// 只显示年月日 (2024-01-15)
export const formatDateOnly = (date) => formatDate(date, 'YYYY-MM-DD')

// 中文日期格式 (2024年01月15日)
export const formatChineseDate = (date) => formatDate(date, 'YYYY年MM月DD日')

// 完整日期时间 (2024-01-15 14:30:25)
export const formatDateTime = (date) => formatDate(date, 'YYYY-MM-DD HH:mm:ss')

// 简短日期时间 (2024-01-15 14:30)
export const formatShortDateTime = (date) => formatDate(date, 'YYYY-MM-DD HH:mm')

// 时间部分 (14:30:25)
export const formatTime = (date) => formatDate(date, 'HH:mm:ss')

// 简短时间 (14:30)
export const formatShortTime = (date) => formatDate(date, 'HH:mm')

/**
 * 相对时间函数
 * @param {Date|string|number} date - 日期
 * @returns {string} 相对时间描述
 */
export const formatRelativeTime = (date) => {
  if (!date) return ''
  
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return ''
  
  const now = new Date()
  const diffInMs = now - dateObj
  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  
  if (diffInSeconds < 60) {
    return '刚刚'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}分钟前`
  } else if (diffInHours < 24) {
    return `${diffInHours}小时前`
  } else if (diffInDays === 1) {
    return '昨天'
  } else if (diffInDays === 2) {
    return '前天'
  } else if (diffInDays < 7) {
    return `${diffInDays}天前`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `${weeks}周前`
  } else {
    return formatDateOnly(date)
  }
}

/**
 * 获取星期几
 * @param {Date|string|number} date - 日期
 * @param {boolean} withWeek - 是否包含"星期"前缀
 * @returns {string} 星期几
 */
export const getDayOfWeek = (date, withWeek = true) => {
  if (!date) return ''
  
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return ''
  
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']
  const dayIndex = dateObj.getDay()
  
  return withWeek ? `星期${weekDays[dayIndex]}` : weekDays[dayIndex]
}

/**
 * 日期计算函数
 */

// 增加天数
export const addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

// 增加月数
export const addMonths = (date, months) => {
  const result = new Date(date)
  result.setMonth(result.getMonth() + months)
  return result
}

// 增加年数
export const addYears = (date, years) => {
  const result = new Date(date)
  result.setFullYear(result.getFullYear() + years)
  return result
}

/**
 * 日期比较函数
 */

// 判断两个日期是否是同一天
export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

// 判断日期是否在今天
export const isToday = (date) => {
  return isSameDay(date, new Date())
}

// 判断日期是否在昨天
export const isYesterday = (date) => {
  const yesterday = addDays(new Date(), -1)
  return isSameDay(date, yesterday)
}

/**
 * 获取日期范围
 */

// 获取当天的开始时间 (00:00:00)
export const getStartOfDay = (date) => {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  return result
}

// 获取当天的结束时间 (23:59:59)
export const getEndOfDay = (date) => {
  const result = new Date(date)
  result.setHours(23, 59, 59, 999)
  return result
}

// 获取月份的第一天
export const getStartOfMonth = (date) => {
  const result = new Date(date)
  result.setDate(1)
  result.setHours(0, 0, 0, 0)
  return result
}

// 获取月份的最后一天
export const getEndOfMonth = (date) => {
  const result = new Date(date)
  result.setMonth(result.getMonth() + 1, 0)
  result.setHours(23, 59, 59, 999)
  return result
}

/**
 * 年龄计算
 * @param {Date|string} birthDate - 出生日期
 * @returns {number} 年龄
 */
export const calculateAge = (birthDate) => {
  if (!birthDate) return 0
  
  const birth = new Date(birthDate)
  const today = new Date()
  
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

/**
 * 默认导出
 */
export default {
  formatDate,
  formatDateOnly,
  formatChineseDate,
  formatDateTime,
  formatShortDateTime,
  formatTime,
  formatShortTime,
  formatRelativeTime,
  getDayOfWeek,
  addDays,
  addMonths,
  addYears,
  isSameDay,
  isToday,
  isYesterday,
  getStartOfDay,
  getEndOfDay,
  getStartOfMonth,
  getEndOfMonth,
  calculateAge
}