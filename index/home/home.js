// home.js
Page({
  data: {
    videos: [], // 视频列表
    currentIndex: 0, // 当前播放的视频索引
    videoUrl: '', // 当前视频的 URL
    startY: 0, // 开始触摸的 Y 坐标
    endY: 0, // 结束触摸的 Y 坐标
    startX: 0, // 开始触摸的 X 坐标
    endX: 0, // 结束触摸的 X 坐标
    slideThreshold: 50, // 滑动阈值
    clickThreshold: 10, // 用于区分点击和滑动的最小阈值
    touchStartTime: 0, // 触摸开始时间
    isTouching: false, // 是否在触摸中
    isFullScreen: false, // 是否全屏状态
    isFollowed: false, // 是否已关注
    isCollected: false, // 是否已收藏
    isCommentModalVisible: false, // 评论弹窗是否显示
    commentInputValue: '', // 评论输入框的内容
    comments: [], // 评论列表
    replyToCommentId: null, // 要回复的评论ID
  },

  onLoad: function () {
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
          title: '拉马努金—与神对话的印度天才',
          isLiked: false, // 是否已点赞
          isCollected: false, // 是否已收藏
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
          title: '羽毛球技巧—高手进阶',
          isLiked: false,
          isCollected: false,
        },
      ],
      videoUrl:
        'https://badminton-1329604984.cos.ap-hongkong.myqcloud.com/v0200fg10000crl8sqfog65r5e5l5rn0.MP4',
      comments: [], // 初始化评论列表
    });
  },

  // 阻止默认的触摸移动事件
  preventDefault: function (e) {
    return false;
  },

  // 辅助函数，判断触摸事件是否发生在控件上
  isTouchOnControl: function (e) {
    let dataset = e.target.dataset || {};
    return dataset.control === 'true';
  },

  // 手势开始
  touchStart: function (e) {
    if (this.isTouchOnControl(e)) {
      this.setData({
        isTouching: false,
      });
      return;
    }

    this.setData({
      startX: e.touches[0].pageX,
      startY: e.touches[0].pageY,
      touchStartTime: Date.now(),
      isTouching: true,
    });
  },

  // 手势移动
  touchMove: function (e) {
    if (!this.data.isTouching) return;

    if (this.isTouchOnControl(e)) {
      this.setData({
        isTouching: false,
      });
      return;
    }

    this.setData({
      endX: e.touches[0].pageX,
      endY: e.touches[0].pageY,
    });
  },

  // 手势结束
  touchEnd: function (e) {
    if (!this.data.isTouching) return;

    if (this.isTouchOnControl(e)) {
      this.setData({
        isTouching: false,
      });
      return;
    }

    // 如果在 touchMove 中未更新 endY，则在 touchEnd 中获取
    if (this.data.endY === 0) {
      this.setData({
        endY: e.changedTouches[0].pageY,
        endX: e.changedTouches[0].pageX,
      });
    }

    const deltaY = this.data.endY - this.data.startY;
    const deltaX = this.data.endX - this.data.startX;
    const threshold = this.data.slideThreshold;
    const clickThreshold = this.data.clickThreshold;
    const touchEndTime = Date.now();
    const duration = touchEndTime - this.data.touchStartTime;

    // 判断是否为点击事件
    if (
      duration < 300 &&
      Math.abs(deltaY) < clickThreshold &&
      Math.abs(deltaX) < clickThreshold
    ) {
      this.setData({ isTouching: false });
      return;
    }

    // 检查滑动手势
    if (
      Math.abs(deltaY) > threshold &&
      Math.abs(deltaY) > Math.abs(deltaX)
    ) {
      if (deltaY < 0) {
        // 手指上滑，播放下一个视频
        this.nextVideo();
      } else if (deltaY > 0) {
        // 手指下滑，播放上一个视频
        this.prevVideo();
      }
    }

    // 重置触摸数据
    this.setData({
      startY: 0,
      endY: 0,
      startX: 0,
      endX: 0,
      isTouching: false,
    });
  },

  // 播放下一个视频
  nextVideo: function () {
    const nextIndex = this.data.currentIndex + 1;
    if (nextIndex < this.data.videos.length) {
      const videoContext = wx.createVideoContext('videoPlayer');
      videoContext.stop();
      this.setData({
        currentIndex: nextIndex,
        videoUrl: this.data.videos[nextIndex].url,
        isFollowed: false,
        comments: [], // 切换视频时清空评论列表或加载新评论
        isCommentModalVisible: false, // 切换视频时关闭评论区
      });
    } else {
      wx.showToast({
        title: '已经是最后一个视频了',
        icon: 'none',
      });
    }
  },

  // 播放上一个视频
  prevVideo: function () {
    const prevIndex = this.data.currentIndex - 1;
    if (prevIndex >= 0) {
      const videoContext = wx.createVideoContext('videoPlayer');
      videoContext.stop();
      this.setData({
        currentIndex: prevIndex,
        videoUrl: this.data.videos[prevIndex].url,
        isFollowed: false,
        comments: [], // 切换视频时清空评论列表或加载新评论
        isCommentModalVisible: false, // 切换视频时关闭评论区
      });
    } else {
      wx.showToast({
        title: '已经是第一个视频了',
        icon: 'none',
      });
    }
  },

  // 点赞功能
  onLike: function () {
    let currentIndex = this.data.currentIndex;
    let currentVideo = this.data.videos[currentIndex];
    let isLiked = currentVideo.isLiked || false;

    // 切换点赞状态，并更新点赞数量
    currentVideo.isLiked = !isLiked;
    currentVideo.likes = isLiked
      ? currentVideo.likes - 1
      : currentVideo.likes + 1;

    // 更新数据，精确更新需要改变的字段
    let updateData = {};
    updateData['videos[' + currentIndex + '].isLiked'] = currentVideo.isLiked;
    updateData['videos[' + currentIndex + '].likes'] = currentVideo.likes;

    this.setData(updateData);
  },

  // 关注功能
  onFollow: function () {
    const isFollowed = !this.data.isFollowed;
    this.setData({
      isFollowed: isFollowed,
    });
  },

  // 打开评论弹窗
  onComment: function () {
    this.setData({
      isCommentModalVisible: true,
      commentInputValue: '',
      replyToCommentId: null,
    });
  },

  // 关闭评论弹窗
  closeCommentModal: function () {
    this.setData({
      isCommentModalVisible: false,
      commentInputValue: '',
      replyToCommentId: null,
    });
  },

  // 输入评论内容
  onCommentInput: function (e) {
    this.setData({
      commentInputValue: e.detail.value,
    });
  },

  // 发送评论
  sendComment: function () {
    console.log('发送评论方法被调用');
    let content = this.data.commentInputValue.trim();
    if (content.length === 0) {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none',
      });
      return;
    }
    if (content.length > 100) {
      wx.showToast({
        title: '评论内容不能超过100字',
        icon: 'none',
      });
      return;
    }
    console.log(newComment);
    let newComment = {
      id: Date.now(),
      content: content,
      author: '当前用户',
      timestamp: new Date().toLocaleString(),
      replies: [],
    };
    console.log('当前评论:', this.data.comments);

    // 判断是评论还是回复
    if (this.data.replyToCommentId) {
      // 回复评论
      let comments = this.data.comments;
      this.addReply(comments, this.data.replyToCommentId, newComment);
      this.setData({
        comments: comments,
      });
    } else {
      // 添加新评论
      this.setData({
        comments: [newComment, ...this.data.comments],
      });
    }

    // 清空输入框
    this.setData({
      commentInputValue: '',
      replyToCommentId: null,
    });
  },

  // 递归查找并添加回复
  addReply: function (comments, commentId, reply) {
    for (let comment of comments) {
      if (comment.id === commentId) {
        comment.replies = comment.replies || [];
        comment.replies.push(reply);
        return true;
      } else if (comment.replies && comment.replies.length > 0) {
        let found = this.addReply(comment.replies, commentId, reply);
        if (found) return true;
      }
    }
    return false;
  },

  // 回复评论
  replyComment: function (e) {
    let commentId = e.currentTarget.dataset.commentId;
    this.setData({
      replyToCommentId: commentId,
      commentInputValue: '',
    });
  },

  // 收藏功能
  onCollect: function () {
    let currentIndex = this.data.currentIndex;
    let currentVideo = this.data.videos[currentIndex];
    let isCollected = currentVideo.isCollected || false;

    // 切换收藏状态，并更新收藏数量
    currentVideo.isCollected = !isCollected;
    currentVideo.collects = isCollected
      ? currentVideo.collects - 1
      : currentVideo.collects + 1;

    // 更新数据，精确更新需要改变的字段
    let updateData = {};
    updateData['videos[' + currentIndex + '].isCollected'] =
      currentVideo.isCollected;
    updateData['videos[' + currentIndex + '].collects'] = currentVideo.collects;

    this.setData(updateData);
  },

  // 转发功能
  onShare: function () {
    wx.showToast({
      title: '已分享',
      icon: 'success',
    });
  },

  // 自定义全屏播放功能
  onFullScreen: function () {
    const videoContext = wx.createVideoContext('videoPlayer');
    videoContext.requestFullScreen({ direction: 90 }); // 横屏全屏播放
    this.setData({
      isFullScreen: true,
    });
  },

  // 监听全屏变化事件
  onFullScreenChange: function (e) {
    const isFullScreen = e.detail.fullScreen;
    this.setData({
      isFullScreen: isFullScreen,
    });
  },

  // 退出全屏功能
  exitFullScreen: function () {
    const videoContext = wx.createVideoContext('videoPlayer');
    videoContext.exitFullScreen();
    this.setData({
      isFullScreen: false,
    });
  },
});
