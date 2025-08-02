const postData = [
    {
        user: {
            name: '科技探索者',
            avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=TechExplorer',
            level: '高级玩家',
            levelNum: 5,
            isVip: true
        },
        tag: {
            name: '话题',
            icon: 'icon-a-icon_huati'
        },
        title: '大家最近都在用什么VPN应用？求推荐稳定快速的！',
        content: '最近常用的VPN不太稳定了，想换一个。大家有什么推荐的吗？最好是免费或者价格合理的，主要用来查资料和学习用。',
        images: [
            'https://pic.code-nav.cn/post_cover/1759828016537657346/thumbnail/WIRSHD3Dh1h89WJk.png'
        ],
        stats: {
            likes: 24,
            comments: 15,
            views: 156,
            saves: 8
        },
        date: '2023-05-15 14:30'
    },
    {
        user: {
            name: 'App小能手',
            avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=AppMaster',
            level: '资深用户',
            levelNum: 7,
            isVip: false
        },
        tag: {
            name: '教程',
            icon: 'icon-student'
        },
        title: '手把手教你如何免费下载付费应用（合法途径）',
        content: '很多人不知道其实有很多合法途径可以免费获取付费应用，今天就来分享几个方法：1. 关注开发者限免活动；2. 使用应用商店的试用期；3. 参与beta测试计划；4. 使用积分兑换。详细步骤请看下文...',
        images: [
            'https://pic.code-nav.cn/post_cover/1601072287388278786/thumbnail/xZV0HLnjcmGPbKa1.jpeg',
            'https://pic.code-nav.cn/post_picture/1608440217629360130/g8GmQLP9HexkvrQR.webp'
        ],
        stats: {
            likes: 89,
            comments: 32,
            views: 542,
            saves: 45
        },
        date: '2023-05-14 09:15'
    },
    {
        user: {
            name: '新手小白',
            avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Newbie',
            level: '初级用户',
            levelNum: 1,
            isVip: false
        },
        tag: {
            name: '求助',
            icon: 'icon-bulb'
        },
        title: '下载的APK安装总是失败怎么办？',
        content: '从第三方网站下载了几个APK文件，但安装时总是提示"解析包时出现问题"，已经尝试了清除缓存、重启手机等方法都不行，求大神指点！',
        images: [],
        stats: {
            likes: 5,
            comments: 12,
            views: 87,
            saves: 3
        },
        date: '2023-05-13 18:42'
    },
    {
        user: {
            name: '数码达人',
            avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=DigitalPro',
            level: '专家',
            levelNum: 9,
            isVip: true
        },
        tag: {
            name: '话题',
            icon: 'icon-a-icon_huati'
        },
        title: '2023年最佳安卓应用排行榜 - 我的个人推荐清单',
        content: '经过一年的使用测试，我整理出了这些真正好用的安卓应用：1. 效率类：TickTick、Notion；2. 工具类：Solid Explorer、MX Player；3. 社交类：Telegram、Discord；4. 摄影类：Snapseed、Lightroom...',
        images: [
            'https://pic.code-nav.cn/post_picture/1608440217629360130/cqRSiVL5LE8D64UC.webp',
            'https://pic.code-nav.cn/post_cover/1759828016537657346/thumbnail/WIRSHD3Dh1h89WJk.png'
        ],
        stats: {
            likes: 156,
            comments: 42,
            views: 892,
            saves: 78
        },
        date: '2023-05-12 11:05'
    },
    {
        user: {
            name: '游戏爱好者',
            avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Gamer',
            level: '中级玩家',
            levelNum: 3,
            isVip: false
        },
        tag: {
            name: '教程',
            icon: 'icon-student'
        },
        title: '如何在非官方渠道安全下载游戏MOD？完整指南',
        content: '下载游戏MOD可以大大提升游戏体验，但也存在风险。以下是安全下载MOD的步骤：1. 只从信誉良好的网站下载；2. 检查文件评论和下载次数；3. 使用虚拟机或备用设备测试；4. 安装前扫描病毒...',
        images: [
            'https://pic.code-nav.cn/post_picture/1608440217629360130/g8GmQLP9HexkvrQR.webp'
        ],
        stats: {
            likes: 67,
            comments: 23,
            views: 345,
            saves: 34
        },
        date: '2023-05-11 16:20'
    },
    {
        user: {
            name: '隐私保护者',
            avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=PrivacyGuard',
            level: '高级用户',
            levelNum: 6,
            isVip: true
        },
        tag: {
            name: '求助',
            icon: 'icon-bulb'
        },
        title: '求推荐真正无广告、不收集数据的天气应用',
        content: '试了十几个天气应用，要么广告太多，要么偷偷收集数据。有没有真正干净、准确的天气应用推荐？最好是开源的。',
        images: [],
        stats: {
            likes: 32,
            comments: 28,
            views: 210,
            saves: 15
        },
        date: '2023-05-10 10:08'
    },
    {
        user: {
            name: '效率控',
            avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Efficiency',
            level: '资深用户',
            levelNum: 8,
            isVip: false
        },
        tag: {
            name: '话题',
            icon: 'icon-a-icon_huati'
        },
        title: '你们都用什么笔记应用？Notion、Evernote还是其他？',
        content: '最近在寻找一款适合多平台同步的笔记应用，试了Notion感觉功能强大但有点复杂，Evernote免费版限制太多。大家有什么推荐吗？主要需求：1. 良好的Markdown支持；2. 图片插入方便；3. 快速搜索...',
        images: [
            'https://pic.code-nav.cn/post_cover/1601072287388278786/thumbnail/xZV0HLnjcmGPbKa1.jpeg',
            'https://pic.code-nav.cn/post_picture/1608440217629360130/cqRSiVL5LE8D64UC.webp',
            'https://pic.code-nav.cn/post_cover/1759828016537657346/thumbnail/WIRSHD3Dh1h89WJk.png'
        ],
        stats: {
            likes: 78,
            comments: 56,
            views: 432,
            saves: 39
        },
        date: '2023-05-09 13:45'
    },
    {
        user: {
            name: '摄影新手',
            avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=PhotoNewbie',
            level: '初级用户',
            levelNum: 2,
            isVip: false
        },
        tag: {
            name: '求助',
            icon: 'icon-bulb'
        },
        title: '手机修图软件哪个好？求推荐简单易用的',
        content: '刚入门手机摄影，想找一款简单易用的修图软件，功能不需要太复杂，但希望能有基本的调色、裁剪和滤镜功能。免费的最好，少量付费也可以接受。',
        images: [],
        stats: {
            likes: 18,
            comments: 24,
            views: 156,
            saves: 9
        },
        date: '2023-05-08 17:30'
    },
    {
        user: {
            name: '科技探索者',
            avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=TechExplorer',
            level: '高级玩家',
            levelNum: 5,
            isVip: true
        },
        tag: {
            name: '话题',
            icon: 'icon-a-icon_huati'
        },
        title: '大家最近都在用什么VPN应用？求推荐稳定快速的！',
        content: '最近常用的VPN不太稳定了，想换一个。大家有什么推荐的吗？最好是免费或者价格合理的，主要用来查资料和学习用。',
        images: [
            'https://pic.code-nav.cn/post_cover/1759828016537657346/thumbnail/WIRSHD3Dh1h89WJk.png'
        ],
        stats: {
            likes: 24,
            comments: 15,
            views: 156,
            saves: 8
        },
        date: '2023-05-15 14:30'
    },
    {
        user: {
            name: 'App小能手',
            avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=AppMaster',
            level: '资深用户',
            levelNum: 7,
            isVip: false
        },
        tag: {
            name: '文章',
            icon: 'icon-zidian'
        },
        title: '手把手教你如何免费下载付费应用（合法途径）',
        content: '很多人不知道其实有很多合法途径可以免费获取付费应用，今天就来分享几个方法：1. 关注开发者限免活动；2. 使用应用商店的试用期；3. 参与beta测试计划；4. 使用积分兑换。详细步骤请看下文...',
        images: [
            'https://pic.code-nav.cn/post_cover/1601072287388278786/thumbnail/xZV0HLnjcmGPbKa1.jpeg',
            'https://pic.code-nav.cn/post_picture/1608440217629360130/g8GmQLP9HexkvrQR.webp'
        ],
        stats: {
            likes: 89,
            comments: 32,
            views: 542,
            saves: 45
        },
        date: '2023-05-14 09:15'
    },
    {
        user: {
            name: '新手小白',
            avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Newbie',
            level: '初级用户',
            levelNum: 1,
            isVip: false
        },
        tag: {
            name: '求助',
            icon: 'icon-bulb'
        },
        title: '下载的APK安装总是失败怎么办？',
        content: '从第三方网站下载了几个APK文件，但安装时总是提示"解析包时出现问题"，已经尝试了清除缓存、重启手机等方法都不行，求大神指点！',
        images: [],
        stats: {
            likes: 5,
            comments: 12,
            views: 87,
            saves: 3
        },
        date: '2023-05-13 18:42'
    },
    {
        user: {
            name: '数码达人',
            avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=DigitalPro',
            level: '专家',
            levelNum: 9,
            isVip: true
        },
        tag: {
            name: '话题',
            icon: 'icon-a-icon_huati'
        },
        title: '2023年最佳安卓应用排行榜 - 我的个人推荐清单',
        content: '经过一年的使用测试，我整理出了这些真正好用的安卓应用：1. 效率类：TickTick、Notion；2. 工具类：Solid Explorer、MX Player；3. 社交类：Telegram、Discord；4. 摄影类：Snapseed、Lightroom...',
        images: [
            'https://pic.code-nav.cn/post_picture/1608440217629360130/cqRSiVL5LE8D64UC.webp',
            'https://pic.code-nav.cn/post_cover/1759828016537657346/thumbnail/WIRSHD3Dh1h89WJk.png'
        ],
        stats: {
            likes: 156,
            comments: 42,
            views: 892,
            saves: 78
        },
        date: '2023-05-12 11:05'
    },
    {
        user: {
            name: '游戏爱好者',
            avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Gamer',
            level: '中级玩家',
            levelNum: 3,
            isVip: false
        },
        tag: {
            name: '教程',
            icon: 'icon-student'
        },
        title: '如何在非官方渠道安全下载游戏MOD？完整指南',
        content: '下载游戏MOD可以大大提升游戏体验，但也存在风险。以下是安全下载MOD的步骤：1. 只从信誉良好的网站下载；2. 检查文件评论和下载次数；3. 使用虚拟机或备用设备测试；4. 安装前扫描病毒...',
        images: [
            'https://pic.code-nav.cn/post_picture/1608440217629360130/g8GmQLP9HexkvrQR.webp'
        ],
        stats: {
            likes: 67,
            comments: 23,
            views: 345,
            saves: 34
        },
        date: '2023-05-11 16:20'
    },
    {
        user: {
            name: '隐私保护者',
            avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=PrivacyGuard',
            level: '高级用户',
            levelNum: 6,
            isVip: true
        },
        tag: {
            name: '求助',
            icon: 'icon-bulb'
        },
        title: '求推荐真正无广告、不收集数据的天气应用',
        content: '试了十几个天气应用，要么广告太多，要么偷偷收集数据。有没有真正干净、准确的天气应用推荐？最好是开源的。',
        images: [],
        stats: {
            likes: 32,
            comments: 28,
            views: 210,
            saves: 15
        },
        date: '2023-05-10 10:08'
    },
    {
        user: {
            name: '效率控',
            avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Efficiency',
            level: '资深用户',
            levelNum: 8,
            isVip: false
        },
        tag: {
            name: '话题',
            icon: 'icon-a-icon_huati'
        },
        title: '你们都用什么笔记应用？Notion、Evernote还是其他？',
        content: '最近在寻找一款适合多平台同步的笔记应用，试了Notion感觉功能强大但有点复杂，Evernote免费版限制太多。大家有什么推荐吗？主要需求：1. 良好的Markdown支持；2. 图片插入方便；3. 快速搜索...',
        images: [
            'https://pic.code-nav.cn/post_cover/1601072287388278786/thumbnail/xZV0HLnjcmGPbKa1.jpeg',
            'https://pic.code-nav.cn/post_picture/1608440217629360130/cqRSiVL5LE8D64UC.webp',
            'https://pic.code-nav.cn/post_cover/1759828016537657346/thumbnail/WIRSHD3Dh1h89WJk.png'
        ],
        stats: {
            likes: 78,
            comments: 56,
            views: 432,
            saves: 39
        },
        date: '2023-05-09 13:45'
    },
    {
        user: {
            name: '摄影新手',
            avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=PhotoNewbie',
            level: '初级用户',
            levelNum: 2,
            isVip: false
        },
        tag: {
            name: '求助',
            icon: 'icon-bulb'
        },
        title: '手机修图软件哪个好？求推荐简单易用的',
        content: '刚入门手机摄影，想找一款简单易用的修图软件，功能不需要太复杂，但希望能有基本的调色、裁剪和滤镜功能。免费的最好，少量付费也可以接受。',
        images: [],
        stats: {
            likes: 18,
            comments: 24,
            views: 156,
            saves: 9
        },
        date: '2023-05-08 17:30'
    }
];

export default postData;