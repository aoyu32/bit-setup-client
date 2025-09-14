const appListData = [
    {
        img: 'http://localhost:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL2JpdC1zZXR1cC1hcHAvYXBwLWljb25zL2VkZ2UucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9T083OEhCSEhLMFNOQ1Y0TUpIWUolMkYyMDI1MDkxMyUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTA5MTNUMDcyNTI5WiZYLUFtei1FeHBpcmVzPTQzMjAwJlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lKUFR6YzRTRUpJU0Vzd1UwNURWalJOU2toWlNpSXNJbVY0Y0NJNk1UYzFOemM1TVRFM01Td2ljR0Z5Wlc1MElqb2liV2x1YVc5aFpHMXBiaUo5Lmo1Ry0zSlBDcE91U1ZKV0lWSU5zWHJFbkE3WUV3WkM5UEE4cFZJNEp6YVlNOFE0VEVZTVRJRG5QU3VaSzF3bHREbUN1OWt1eWgxeGRnelFjX1lWVDFnJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9ZGI3MzhlMDBhZGU5NGFjMTcyNmI3ODU1ODMzMjEzYWJhNzgwOGI2NGQ2NDYxZjA1NjQ4N2Q4ZGZlNzZiNWMwMg',
        name: 'Chrome',
        category: '浏览器',
        downloads: 4520,
        bio: '谷歌开发的快速、安全且免费的网络浏览器',
        rating: 4.5
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/36273_48_1730881145.png',
        name: 'Gmail',
        category: '邮件',
        downloads: 3200,
        bio: '谷歌提供的免费电子邮件服务，拥有强大的垃圾邮件过滤功能',
        rating: 4.0
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/36739_48_1744118863.png',
        name: 'Google Drive',
        category: '云存储',
        downloads: 2800,
        bio: '谷歌的云存储服务，可安全存储文件并在任何设备上访问',
        rating: 4.0
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/22095_48_1637131201.png',
        name: 'Google Maps',
        category: '导航',
        downloads: 5100,
        bio: '提供精确导航、实时路况和地点搜索的地图服务',
        rating: 4.5
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/2_48_1482283025.png',
        name: 'Google Translate',
        category: '工具',
        downloads: 1800,
        bio: '支持100多种语言的即时翻译工具',
        rating: 3.5
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/26684_48_1693217067.png',
        name: 'Google Photos',
        category: '相册',
        downloads: 3900,
        bio: '智能照片存储和管理服务，自动整理和备份您的回忆',
        rating: 4.5
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/23895_48_1664160470.ico',
        name: 'Dropbox',
        category: '云存储',
        downloads: 2100,
        bio: '简单可靠的文件同步和共享云存储服务',
        rating: 4.0
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/23459_48_1675046756.png',
        name: 'Evernote',
        category: '办公',
        downloads: 1500,
        bio: '多功能笔记应用，帮助您记录想法、任务和灵感',
        rating: 3.5
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/35020_48_1703750933.png',
        name: 'VS Code',
        category: '开发',
        downloads: 6800,
        bio: '轻量级但功能强大的源代码编辑器，支持多种编程语言',
        rating: 5.0
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/34454_48_1699945390.png',
        name: 'Microsoft Office',
        category: '办公',
        downloads: 4200,
        bio: '包含Word、Excel、PowerPoint等办公软件的完整生产力套件',
        rating: 4.5
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/23761_48_1637209184.png',
        name: '微信',
        category: '社交',
        downloads: 8900,
        bio: '跨平台即时通讯应用，支持端到端加密',
        rating: 4.5
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/26218_48_1579089719.png',
        name: 'Telegram',
        category: '社交',
        downloads: 5700,
        bio: '注重安全和速度的即时通讯应用，支持大群组和频道',
        rating: 4.0
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/36571_48_1737462668.png',
        name: 'LastPass',
        category: '工具',
        downloads: 2300,
        bio: '密码管理器，安全存储您的所有密码并自动填充',
        rating: 3.5
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/22554_48_1591253397.png',
        name: 'TeamViewer',
        category: '工具',
        downloads: 3100,
        bio: '远程控制和桌面共享软件，支持跨平台连接',
        rating: 4.0
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/36739_48_1744118863.png',
        name: 'Google Calendar',
        category: '效率',
        downloads: 2600,
        bio: '智能日历应用，帮助您安排日程并与他人协调时间',
        rating: 4.0
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/36661_48_1742199896.png',
        name: 'Chrome',
        category: '浏览器',
        downloads: 4520,
        bio: '谷歌开发的快速、安全且免费的网络浏览器',
        rating: 4.5
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/36273_48_1730881145.png',
        name: 'Gmail',
        category: '邮件',
        downloads: 3200,
        bio: '谷歌提供的免费电子邮件服务，拥有强大的垃圾邮件过滤功能',
        rating: 4.0
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/36739_48_1744118863.png',
        name: 'Google Drive',
        category: '云存储',
        downloads: 2800,
        bio: '谷歌的云存储服务，可安全存储文件并在任何设备上访问',
        rating: 4.0
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/22095_48_1637131201.png',
        name: 'Google Maps',
        category: '导航',
        downloads: 5100,
        bio: '提供精确导航、实时路况和地点搜索的地图服务',
        rating: 4.5
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/2_48_1482283025.png',
        name: 'Google Translate',
        category: '工具',
        downloads: 1800,
        bio: '支持100多种语言的即时翻译工具',
        rating: 3.5
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/26684_48_1693217067.png',
        name: 'Google Photos',
        category: '相册',
        downloads: 3900,
        bio: '智能照片存储和管理服务，自动整理和备份您的回忆',
        rating: 4.5
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/23895_48_1664160470.ico',
        name: 'Dropbox',
        category: '云存储',
        downloads: 2100,
        bio: '简单可靠的文件同步和共享云存储服务',
        rating: 4.0
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/23459_48_1675046756.png',
        name: 'Evernote',
        category: '办公',
        downloads: 1500,
        bio: '多功能笔记应用，帮助您记录想法、任务和灵感',
        rating: 3.5
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/35020_48_1703750933.png',
        name: 'VS Code',
        category: '开发',
        downloads: 6800,
        bio: '轻量级但功能强大的源代码编辑器，支持多种编程语言',
        rating: 5.0
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/34454_48_1699945390.png',
        name: 'Microsoft Office',
        category: '办公',
        downloads: 4200,
        bio: '包含Word、Excel、PowerPoint等办公软件的完整生产力套件',
        rating: 4.5
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/23761_48_1637209184.png',
        name: 'WhatsApp',
        category: '社交',
        downloads: 8900,
        bio: '跨平台即时通讯应用，支持端到端加密',
        rating: 4.5
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/26218_48_1579089719.png',
        name: 'Telegram',
        category: '社交',
        downloads: 5700,
        bio: '注重安全和速度的即时通讯应用，支持大群组和频道',
        rating: 4.0
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/36571_48_1737462668.png',
        name: 'LastPass',
        category: '工具',
        downloads: 2300,
        bio: '密码管理器，安全存储您的所有密码并自动填充',
        rating: 3.5
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/22554_48_1591253397.png',
        name: 'TeamViewer',
        category: '工具',
        downloads: 3100,
        bio: '远程控制和桌面共享软件，支持跨平台连接',
        rating: 4.0
    },
    {
        img: 'https://pc3.gtimg.com/softmgr/logo/48/36739_48_1744118863.png',
        name: 'Google Calendar',
        category: '效率',
        downloads: 2600,
        bio: '智能日历应用，帮助您安排日程并与他人协调时间',
        rating: 4.0
    }
]

export default appListData