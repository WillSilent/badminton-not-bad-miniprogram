Page({
  data: {
    videos: [], // 视频列表
    currentIndex: 0, // 当前播放的视频索引
    startY: 0, // 开始滑动的 Y 坐标
    endY: 0,   // 结束滑动的 Y 坐标
    slideThreshold: 50, // 设置滑动阈值，调整为60px或更高
    clickThreshold: 10, // 用于区分点击和滑动的最小阈值
    touchStartTime: 0,  // 记录手势开始时间
    isTouching: false,  // 记录是否在滑动过程中
    isFullScreen: false, // 是否全屏状态
  },

  onLoad: function() {
    // 模拟视频数据
    this.setData({
      videos: [
        {
          id: 1,
          url: 'https://badminton-1329604984.cos.ap-hongkong.myqcloud.com/v0200fg10000crl8sqfog65r5e5l5rn0.MP4', 
          likes: 1538,
          comments: 20,
          shares: 69,
          collects: 33700,
          userAvatar: 'https://example.com/user1.jpg', // 用户头像
          userName: 'Infinity Cat',
          location: '北京市 清华大学紫荆操场',
          title: '拉马努金—与神对话的印度天才'
        },
        {
          id: 2,
          url: 'https://www.w3schools.com/html/mov_bbb.mp4', // 第二个视频
          likes: 1000,
          comments: 50,
          shares: 30,
          collects: 2000,
          userAvatar: 'https://example.com/user2.jpg', // 用户头像
          userName: 'Sky King',
          location: '北京市 中央电视塔',
          title: '羽毛球技巧—高手进阶'
        }
      ],
      videoUrl: 'https://badminton-1329604984.cos.ap-hongkong.myqcloud.com/v0200fg10000crl8sqfog65r5e5l5rn0.MP4'
    });
  },

  // 手势开始
touchStart: function(e) {
  // 检查触摸目标是否有 data-ignore-touch 属性
  if (e.target.dataset.ignoreTouch) {
    this.setData({
      isTouching: false
    });
    return;
  }

  this.setData({
    startX: e.touches[0].pageX, // 记录手势开始时的X坐标
    startY: e.touches[0].pageY, // 记录手势开始时的Y坐标
    touchStartTime: Date.now(), // 记录手势开始时间
    isTouching: true            // 标记手势为进行中
  });
},

// 手势移动
touchMove: function(e) {
  // 实时记录手势移动过程中的结束位置
  this.setData({
    endX: e.touches[0].pageX,
    endY: e.touches[0].pageY
  });
},

// 手势结束
touchEnd: function(e) {
  // 检查触摸目标是否有 data-ignore-touch 属性，如果有则直接返回，不处理滑动
  if (e.target.dataset.ignoreTouch) {
    this.setData({ isTouching: false });
    return;
  }

  const deltaY = this.data.endY - this.data.startY; // 计算垂直滑动距离
  const deltaX = this.data.endX - this.data.startX; // 计算水平滑动距离
  const threshold = this.data.slideThreshold; // 滑动阈值
  const clickThreshold = this.data.clickThreshold; // 点击的最小滑动距离阈值
  const touchEndTime = Date.now(); // 获取手势结束时间
  const duration = touchEndTime - this.data.touchStartTime; // 计算手势持续时间

  // 1. 如果手势持续时间短，且滑动距离小，认为是点击事件
  if (duration < 200 && Math.abs(deltaY) < clickThreshold && Math.abs(deltaX) < clickThreshold) {
    this.setData({ isTouching: false });
    return; // 认为是点击，不处理滑动逻辑
  }

  // 2. 只有在垂直滑动距离大于阈值，并且垂直滑动大于水平滑动时，才切换视频
  if (Math.abs(deltaY) > threshold && Math.abs(deltaY) > Math.abs(deltaX)) {
    if (deltaY > 0) {
      this.prevVideo(); // 下滑，切换到上一个视频
    } else if (deltaY < 0) {
      this.nextVideo(); // 上滑，切换到下一个视频
    }
  }

  // 重置滑动状态
  this.setData({
    startY: 0,
    endY: 0,
    startX: 0,
    endX: 0,
    isTouching: false // 手势结束，重置状态
  });
},

  // 播放下一个视频
  nextVideo: function() {
    const nextIndex = this.data.currentIndex + 1;
    if (nextIndex < this.data.videos.length) {
      // 退出全屏状态
      const videoContext = wx.createVideoContext('videoPlayer');
      videoContext.exitFullScreen();

      this.setData({
        currentIndex: nextIndex,
        videoUrl: this.data.videos[nextIndex].url, // 更新当前视频 URL
      });
    } else {
      wx.showToast({
        title: '已经是最后一个视频了',
        icon: 'none'
      });
    }
  },

  // 播放上一个视频
  prevVideo: function() {
    const prevIndex = this.data.currentIndex - 1;
    if (prevIndex >= 0) {
      // 退出全屏状态
      const videoContext = wx.createVideoContext('videoPlayer');
      videoContext.exitFullScreen();

      this.setData({
        currentIndex: prevIndex,
        videoUrl: this.data.videos[prevIndex].url, // 更新当前视频 URL
      });
    } else {
      wx.showToast({
        title: '已经是第一个视频了',
        icon: 'none'
      });
    }
  },

  // 点赞功能
  onLike: function() {
    let currentVideo = this.data.videos[this.data.currentIndex];
    let isLiked = currentVideo.isLiked;

    // 切换点赞状态，并更新点赞数量
    currentVideo.isLiked = !isLiked;
    currentVideo.likes = isLiked ? currentVideo.likes - 1 : currentVideo.likes + 1;

    // 更新数据
    this.setData({
      videos: this.data.videos
    });
  },

  // 关注功能
  onFollow: function() {
    const isFollowed = !this.data.isFollowed;
    this.setData({
      isFollowed: isFollowed
    });
    this.data.videos[this.data.currentIndex].isFollowed = isFollowed;
  },

  // 评论功能
  onComment: function() {
    wx.showToast({
      title: '评论功能开发中',
      icon: 'none'
    });
  },

  // 收藏功能
  onCollect: function() {
    const isCollected = this.data.isCollected;
    const currentVideo = this.data.videos[this.data.currentIndex];
    currentVideo.collects = isCollected ? currentVideo.collects - 1 : currentVideo.collects + 1;
    this.setData({
      isCollected: !isCollected,
      videos: this.data.videos
    });
  },

  // 转发功能
  onShare: function() {
    wx.showToast({
      title: '已分享',
      icon: 'success'
    });
  },

  // 全屏播放功能
  onFullScreen: function () {
    const videoContext = wx.createVideoContext('videoPlayer');
    videoContext.requestFullScreen({ direction: 90 }); // 横屏全屏播放
  },

  // 监听全屏事件
  bindfullscreenchange(e) {
    const isFullScreen = e.detail.fullScreen;
    this.setData({
      isFullScreen: isFullScreen
    });

    if (!isFullScreen) {
      wx.showToast({
        title: '已退出全屏',
        icon: 'none'
      });
    }
  },

  // 退出全屏功能
  exitFullScreen: function() {
    const videoContext = wx.createVideoContext('videoPlayer');
    videoContext.exitFullScreen(); // 调用视频上下文退出全屏播放
    this.setData({
      isFullScreen: false // 

    });
  }
});
