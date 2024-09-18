Page({
  data: {
    videos: [], // 视频列表
    currentIndex: 0, // 当前播放的视频索引
    isLiked: false, // 点赞状态
    isFollowed: false, // 关注状态
    isCollected: false, // 收藏状态
  },

  onLoad: function() {
    // 模拟视频数据
    this.setData({
      videos: [
        {
          id: 1,
          url: 'https://www.w3schools.com/html/mov_bbb.mp4',
          likes: 1538,
          comments: 20,
          shares: 69,
          collects: 33700,
          userAvatar: 'https://example.com/user1.jpg', // 用户头像
          userName: 'Infinity Cat',
          location: '北京市 清华大学紫荆操场',
          title: '拉马努金—与神对话的印度天才'
        },
        // 更多视频...
      ]
    });
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
    videoContext.exitFullScreen(); // 退出全屏播放
  }
});
