Page({
  data: {
    currentTab: 'match',  // 当前的tab

    // 约比赛数据
    categories: ['男单', '女单', '男双', '女双', '混双'],
    formats: ['11分三局两胜', '21分一局一胜', '31分一局一胜', '21分三局两胜'],
    selectedCategory: '',
    selectedFormat: '',
    id1: 'ID1',
    id2: 'ID2',
    scores: {
      round1: { id1: 0, id2: 0 },
      round2: { id1: 0, id2: 0 },
      round3: { id1: 0, id2: 0 }
    },

    // 注册数据
    registerTypes: ['单打', '双打', '混双'],
    selectedRegisterType: '',
    username1: '',
    username2: '',
    teamName: '',

    // 月度排名数据
    levels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],  // 修改为数值1-9
    selectedCategoryFilter: '',
    selectedLevelFilter: '',
    filteredTable: [], // 存储筛选后显示的表格数据
    userID: 'ID1',
    rankTables: {
      '男单': {
        '1': [{ id: 'ID1', points: 1500, rank: 1 }, { id: 'ID2', points: 1400, rank: 2 }],
        '2': [{ id: 'ID3', points: 1300, rank: 1 }, { id: 'ID4', points: 1200, rank: 2 }]
      },
      '女单': {
        '1': [{ id: 'ID5', points: 1400, rank: 1 }, { id: 'ID6', points: 1300, rank: 2 }],
        '2': [{ id: 'ID7', points: 1300, rank: 1 }, { id: 'ID8', points: 1200, rank: 2 }]
      },
      '男双': {
        '1': [{ id: 'ID9', points: 1400, rank: 1 }, { id: 'ID10', points: 1300, rank: 2 }],
        '2': [{ id: 'ID11', points: 1200, rank: 1 }, { id: 'ID12', points: 1100, rank: 2 }]
      }
    }
  },

  // 切换Tab
  switchTab(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.tab
    });
  },

  // 选择比赛类型
  onCategoryChange(e) {
    this.setData({
      selectedCategory: this.data.categories[e.detail.value]
    });
  },

  // 选择比赛形式
  onFormatChange(e) {
    this.setData({
      selectedFormat: this.data.formats[e.detail.value]
    });
  },

  // 确认比赛
  confirmMatch() {
    wx.showToast({
      title: '比赛确认发送',
      icon: 'success'
    });
  },

  // 跳转注册页面
  goToRegister() {
    this.setData({
      currentTab: 'register'
    });
  },

  // 注册单打ID
  onSingleIDChange(e) {
    this.setData({
      singleID: e.detail.value
    });
  },

  registerSingle() {
    wx.showToast({
      title: '单打ID注册成功',
      icon: 'success'
    });
  },

  // 注册双打或混双ID
  onUsername1Change(e) {
    this.setData({
      username1: e.detail.value
    });
  },

  onUsername2Change(e) {
    this.setData({
      username2: e.detail.value
    });
  },

  onTeamNameChange(e) {
    this.setData({
      teamName: e.detail.value
    });
  },

  registerTeam() {
    wx.showToast({
      title: '双打/混双ID注册成功',
      icon: 'success'
    });
  },

  // 注册类型选择
  onRegisterTypeChange(e) {
    this.setData({
      selectedRegisterType: this.data.registerTypes[e.detail.value]
    });
  },

  // 处理ID输入变化
  onID1Change(e) {
    this.setData({
      id1: e.detail.value
    });
  },

  onID2Change(e) {
    this.setData({
      id2: e.detail.value
    });
  },

  // 处理比分变化
  onScoreChange(e) {
    const round = `round${e.currentTarget.dataset.round}`;
    const player = e.currentTarget.dataset.player;
    this.setData({
      [`scores.${round}.${player}`]: e.detail.value
    });
  },

  // 月度排名筛选种类变化
  onCategoryFilterChange(e) {
    const selectedCategoryFilter = this.data.categories[e.detail.value];
    this.setData({ selectedCategoryFilter }, this.updateFilteredTable);
  },

  // 月度排名筛选等级变化
  onLevelFilterChange(e) {
    const selectedLevelFilter = this.data.levels[e.detail.value];
    this.setData({ selectedLevelFilter }, this.updateFilteredTable);
  },

  // 更新表格
  updateFilteredTable() {
    const { selectedCategoryFilter, selectedLevelFilter, rankTables } = this.data;
    if (selectedCategoryFilter && selectedLevelFilter) {
      const filteredTable = rankTables[selectedCategoryFilter][selectedLevelFilter] || [];
      this.setData({ filteredTable });
    }
  }
});
