Page({
  data: {
    type: ''
  },

  onLoad(options) {
    this.setData({
      type: options.type  // 获取传递过来的比赛类型
    });
    console.log("传递的比赛类型: ", this.data.type);  // 确认比赛类型是否正确传递
  },

  // 点击等级后跳转到排名页面
  goToRankingPage(e) {
    const level = e.currentTarget.dataset.level;
    const type = this.data.type;
    wx.navigateTo({
      url: `/index/ranking/ranking?type=${type}&level=${level}`,  // 跳转到排名页面
    });
  }
});

