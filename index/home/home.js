Page({
  data: {
    videos: [], // 视频列表
    currentIndex: 0, // 当前播放的视频索引
    startY: 0, // 开始滑动的 Y 坐标
    endY: 0,   // 结束滑动的 Y 坐标
    isLiked: false, // 点赞状态
    isFollowed: false, // 关注状态
    isCollected: false, // 收藏状态
    isFullScreen: false // 是否全屏状态
  },

  onLoad: function() {
    console.log('加载视频数据');
    // 模拟视频数据, 添加多个视频
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
        // 更多视频...
      ],
      videoUrl: 'https://badminton-1329604984.cos.ap-hongkong.myqcloud.com/v0200fg10000crl8sqfog65r5e5l5rn0.MP4'
  });
  console.log(this.data.videos); // 检查视频列表是否加载
},
// 手势开始
touchStart: function(e) {
  this.setData({
    startY: e.touches[0].pageY // 获取开始的 Y 坐标
  });
},

// 手势移动
touchMove: function(e) {
  this.setData({
    endY: e.touches[0].pageY // 获取结束的 Y 坐标
  });
},

// 手势结束
touchEnd: function() {
  const deltaY = this.data.endY - this.data.startY; // 滑动的距离

  if (deltaY > 50) {
    // 下滑操作，播放上一个视频
    this.prevVideo();
  } else if (deltaY < -50) {
    // 上滑操作，播放下一个视频
    this.nextVideo();
  }
},

// 播放下一个视频
nextVideo: function() {
  const nextIndex = this.data.currentIndex + 1;
  if (nextIndex < this.data.videos.length) {
    this.setData({
      currentIndex: nextIndex,
      videoUrl: this.data.videos[nextIndex].url // 更新当前视频 URL
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
    this.setData({
      currentIndex: prevIndex,
      videoUrl: this.data.videos[prevIndex].url // 更新当前视频 URL
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
    const isLiked = this.data.isLiked;
    const currentVideo = this.data.videos[this.data.currentIndex];
    currentVideo.likes = isLiked ? currentVideo.likes - 1 : currentVideo.likes + 1;
    this.setData({
      isLiked: !isLiked,
      videos: this.data.videos
    });
  },

  // 关注功能
  onFollow: function() {
    this.setData({
      isFollowed: !this.data.isFollowed
    });
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

  // 视频播放结束切换下一个视频
  onVideoEnded: function() {
    const nextIndex = this.data.currentIndex + 1;
    if (nextIndex < this.data.videos.length) {
      this.setData({
        currentIndex: nextIndex
      });
    } else {
      wx.showToast({
        title: '没有更多视频了',
        icon: 'none'
      });
    }
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
      isFullScreen: false // 退出全屏时将状态改为 false
    });
  }
});
