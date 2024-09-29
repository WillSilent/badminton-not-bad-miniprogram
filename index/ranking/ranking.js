Page({
  data: {
    rankings: [
      // 更多数据...
    ]
  },

  onLoad(options) {
    const { type, level } = options;
    this.setData({
      type,
      level
    });
    this.loadRankings(type, level);
  },

  // 模拟从数据库或本地加载数据
  loadRankings(type, level) {
    const rankingsData = [
      { id: 'user1', score: 1200 },
      { id: 'user2', score: 1150 },
      { id: 'user3', score: 1100 }
      // 更多数据...
    ];

    // 按积分降序排序
    rankingsData.sort((a, b) => b.score - a.score);

    this.setData({
      rankings: rankingsData
    });
  }
});
