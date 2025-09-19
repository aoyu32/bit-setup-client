export const filterOptions = [
  {
    label: "评分",
    options: [
      { name: "不限", value: "", tooltip: "不限制评分" },
      { name: "低于2.0", value: "0.0-2.0", tooltip: "评分低于2.0" },
      { name: "2.0~3.0", value: "2.0-3.0", tooltip: "评分在2.0到3.0之间" },
      { name: "3.0~4.0", value: "3.0-4.0", tooltip: "评分在3.0到4.0之间" },
      { name: "4.0~5.0", value: "4.0-5.0", tooltip: "评分在4.0到5.0之间" },
      { name: "5.0~6.0", value: "5.0-6.0", tooltip: "评分在5.0到6.0之间" },
      { name: "6.0~7.0", value: "6.0-7.0", tooltip: "评分在6.0到7.0之间" },
      { name: "7.0~8.0", value: "7.0-8.0", tooltip: "评分在7.0到8.0之间" },
      { name: "8.0~9.0", value: "8.0-9.0", tooltip: "评分在8.0到9.0之间" },
      { name: "高于9.0", value: ">9.0", tooltip: "评分高于9.0" }
    ]
  },
  {
    label: "下载量级",
    options: [
      { name: "不限", value: "", tooltip: "不限制下载量" },
      { name: "极冷门", value: "0-1000", tooltip: "<1k 下载量" },
      { name: "冷门", value: "1000-10000", tooltip: "1k~10k 下载量" },
      { name: "潜力型", value: "10000-100000", tooltip: "10k~100k 下载量" },
      { name: "中流行", value: "100000-1000000", tooltip: "100k~1m 下载量" },
      { name: "热门", value: "1000000-10000000", tooltip: "1m~10m 下载量" },
      { name: "爆款", value: "10000000-100000000", tooltip: "10m~100m 下载量" },
      { name: "现象级", value: ">100000000", tooltip: "100m+ 下载量" }
    ]
  },
  {
    label: "支持的平台",
    options: [
      { name: "不限", value: "", tooltip: "不限制平台" },
      { name: "Android", value: "android", tooltip: "Android 系统" },
      { name: "iOS", value: "ios", tooltip: "苹果 iOS 系统" },
      { name: "鸿蒙OS", value: "harmonyos", tooltip: "华为鸿蒙系统" },
      { name: "Windows", value: "windows", tooltip: "微软 Windows 系统" },
      { name: "MacOS", value: "macos", tooltip: "苹果 macOS 系统" },
      { name: "Linux", value: "linux", tooltip: "Linux 系统" },
      { name: "跨平台", value: "cross", tooltip: "支持多个平台" },
      { name: "Web", value: "web", tooltip: "网页版应用" }
    ]
  },
  {
    label: "大小",
    options: [
      { name: "不限", value: "", tooltip: "不限制大小" },
      { name: "超微型", value: "0-1024", tooltip: "<1MB" },
      { name: "微型", value: "1024-10240", tooltip: "1-10MB" },
      { name: "轻量级", value: "10240-51200", tooltip: "10-50MB" },
      { name: "标准型", value: "51200-204800", tooltip: "50-200MB" },
      { name: "中大型", value: "204800-512000", tooltip: "200-500MB" },
      { name: "大型", value: "512000-1048576", tooltip: "500MB-1GB" },
      { name: "超大型", value: "1048576-5242880", tooltip: "1GB-5GB" },
      { name: "巨型", value: ">5242880", tooltip: "大于5GB" }
    ]
  },
  {
    label: "付费制度",
    options: [
      { name: "不限", value: "", tooltip: "不限制付费制度" },
      { name: "完全免费", value: "free", tooltip: "无任何收费项目，开发者通过广告/捐赠盈利" },
      { name: "试用转付费", value: "trial", tooltip: "限期/限次免费试用，需付费解锁完整版" },
      { name: "买断制", value: "one_time", tooltip: "一次性付费永久使用（可能含后续大版本付费）" },
      { name: "订阅制", value: "subscription", tooltip: "周期性付费（周/月/年），通常含持续更新和服务" },
      { name: "内购制", value: "in_app_purchase", tooltip: "基础功能免费，高级功能/虚拟商品需单独购买" },
      { name: "开源", value: "open_source", tooltip: "软件免费，用户自愿赞助开发者" }
    ]
  },
  {
    label: "内存占用",
    options: [
      { name: "不限", value: "", tooltip: "不限制内存占用" },
      { name: "极轻量级", value: "0-10240", tooltip: "小于10MB" },
      { name: "轻量级", value: "10240-51200", tooltip: "10-50MB" },
      { name: "标准级", value: "51200-102400", tooltip: "50-100MB" },
      { name: "中量级", value: "102400-307200", tooltip: "100-300MB" },
      { name: "重量级", value: "307200-512000", tooltip: "300-500MB" },
      { name: "超重量级", value: "512000-1048576", tooltip: "500MB-1GB" },
      { name: "内存杀手级", value: "1048576+", tooltip: "大于1GB" }
    ]
  },
  {
    label: "安装方式",
    options: [
      { name: "不限", value: "", tooltip: "不限制安装方式" },
      { name: "apk", value: "apk", tooltip: "安卓安装包" },
      { name: "exe", value: "exe", tooltip: "Windows 可执行文件" },
      { name: "msi", value: "msi", tooltip: "Windows 安装程序" },
      { name: "dmg", value: "dmg", tooltip: "MacOS 安装镜像" },
      { name: "pkg", value: "pkg", tooltip: "MacOS 安装包" },
      { name: "deb", value: "deb", tooltip: "Debian/Ubuntu 安装包" },
      { name: "AppImage", value: "AppImage", tooltip: "Linux 可执行镜像" },
      { name: "zip", value: "zip", tooltip: "压缩包，无需安装" }
    ]
  },
  {
    label: "其他",
    options: [
      { name: "不限", value: "", tooltip: "不限制其他属性" },
      { name: "个人开发", value: "is_personal_develop", tooltip: "由个人或小团队独立开发" },
      { name: "国产", value: "domestic", tooltip: "由国内团队开发" },
      { name: "国外", value: "foreign", tooltip: "由国外团队开发" },
      { name: "推荐", value: "is_recommend", tooltip: "站点推荐的软件" },
      { name: "必备", value: "must_have", tooltip: "常用必备软件" },
      { name: "热门", value: "popular", tooltip: "当前流行的软件" },
      { name: "免费下载", value: "free_download", tooltip: "无需积分或付费即可下载" },
      { name: "积分下载", value: "point_download", tooltip: "需要消耗积分才能下载" },
      { name: "已绿色", value: "is_cracked", tooltip: "免安装绿色版本" }
    ]
  }
];

export const searchFilterOptions = [
  {
    label: "结果排序",
    options: [
      { name: "综合排序", value: 0 },
      { name: "最多下载", value: 1 },
      { name: "最多评论", value: 2 },
      { name: "最多收藏", value: 3 },
      { name: "最新发布", value: 4 },
      { name: "最高评分", value: 5 }
    ]
  },
  {
    label: "存储占用",
    options: [
      { name: "不限", value: "" },
      { name: "< 1MB", value: "0-1024" },
      { name: "1~10MB", value: "1024-10240" },
      { name: "10~50MB", value: "10240-51200" },
      { name: "50~200MB", value: "51200-204800" },
      { name: "200~500MB", value: "204800-512000" },
      { name: "500~1GB", value: "512000-1048576" },
      { name: "1~5GB", value: "1048576-5242880" },
      { name: "5GB+", value: ">5242880" }
    ]
  },
  {
    label: "付费制度",
    options: [
      { name: "不限", value: "" },
      { name: "完全免费", value: "free" },
      { name: "试用转付费", value: "trial" },
      { name: "买断制", value: "one_time" },
      { name: "订阅制", value: "subscription" },
      { name: "内购制", value: "in_app_purchase" },
      { name: "开源", value: "open_source" }
    ]
  }

]