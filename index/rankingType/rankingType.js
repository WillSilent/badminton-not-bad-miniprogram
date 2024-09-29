Page({
  data: {},

  goToLevelPage(e) {
    const type = e.currentTarget.dataset.type;  
    console.log("点击的比赛类型: ", type);  // 调试日志，确保点击后类型正确
    wx.navigateTo({
      url: `/index/level/level?type=${type}`,  // 跳转到等级页面
    });
  }
});

