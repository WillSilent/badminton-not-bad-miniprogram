Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/index/home/home",
      iconPath: "/image/icon_home.png",
      selectedIconPath: "/image/icon_home_HL.png",
      text: "首页"
    }, 
    {
      pagePath: "/index/findpartner/findpartner",
      iconPath: "/image/icon_findpartner.png",
      selectedIconPath: "/image/icon_findpartner_HL.png",
      text: "找队友"
    },
    {
        pagePath: "/index/rankingType/rankingType",
        iconPath: "/image/icon_ranking.png",
        selectedIconPath: "/image/icon_ranking_HL.png",
        text: "排名"
      },
    {
        pagePath: "/index/cooperation/cooperation",
        iconPath: "/image/icon_cooperation.png",
        selectedIconPath: "/image/icon_cooperation_HL.png",
        text: "场地合作"
      },
    {
        pagePath: "/index/profile/profile",
        iconPath: "/image/icon_profile.png",
        selectedIconPath: "/image/icon_profile_HL.png",
        text: "个人主页"
      },]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})