Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        });
      }
    }
  },
  
  data: {
    selectedDate: "Friday, October 11, 2024",
    courts: [
      {
        id: 1,
        name: "Badminton Court 1",
        location: "SPORTS - Seafront",
        timeSlots: [
          { time: "13:00-14:00", isAvailable: true },
          { time: "14:00-15:00", isAvailable: true },
          { time: "15:00-16:00", isAvailable: true },
          { time: "16:00-17:00", isAvailable: true },
          { time: "17:00-18:00", isAvailable: true },
          { time: "18:00-19:00", isAvailable: true },
          { time: "19:00-20:00", isAvailable: true },
          { time: "20:00-21:00", isAvailable: true },
          { time: "21:00-22:00", isAvailable: false },
        ]
      },
      {
        id: 2,
        name: "Badminton Court 2",
        location: "SPORTS - Seafront",
        timeSlots: [
          { time: "13:00-14:00", isAvailable: true },
          { time: "14:00-15:00", isAvailable: true },
          { time: "15:00-16:00", isAvailable: true },
          { time: "16:00-17:00", isAvailable: true },
          { time: "17:00-18:00", isAvailable: true },
          { time: "18:00-19:00", isAvailable: true },
          { time: "19:00-20:00", isAvailable: true },
          { time: "20:00-21:00", isAvailable: true },
          { time: "21:00-22:00", isAvailable: false },
        ]
      },
      {
        id: 3,
        name: "Badminton Court 3",
        location: "SPORTS - Seafront",
        timeSlots: [
          { time: "13:00-14:00", isAvailable: true },
          { time: "14:00-15:00", isAvailable: true },
          { time: "15:00-16:00", isAvailable: true },
          { time: "16:00-17:00", isAvailable: true },
          { time: "17:00-18:00", isAvailable: true },
          { time: "18:00-19:00", isAvailable: true },
          { time: "19:00-20:00", isAvailable: true },
          { time: "20:00-21:00", isAvailable: true },
          { time: "21:00-22:00", isAvailable: false },
        ]
      },
      {
        id: 4,
        name: "Badminton Court 4",
        location: "SPORTS - Seafront",
        timeSlots: [
          { time: "13:00-14:00", isAvailable: true },
          { time: "14:00-15:00", isAvailable: true },
          { time: "15:00-16:00", isAvailable: true },
          { time: "16:00-17:00", isAvailable: true },
          { time: "17:00-18:00", isAvailable: true },
          { time: "18:00-19:00", isAvailable: true },
          { time: "19:00-20:00", isAvailable: true },
          { time: "20:00-21:00", isAvailable: true },
          { time: "21:00-22:00", isAvailable: false },
        ]
      },
      {
        id: 5,
        name: "Badminton Court 5",
        location: "SPORTS - Seafront",
        timeSlots: [
          { time: "13:00-14:00", isAvailable: true },
          { time: "14:00-15:00", isAvailable: true },
          { time: "15:00-16:00", isAvailable: true },
          { time: "16:00-17:00", isAvailable: true },
          { time: "17:00-18:00", isAvailable: true },
          { time: "18:00-19:00", isAvailable: true },
          { time: "19:00-20:00", isAvailable: true },
          { time: "20:00-21:00", isAvailable: true },
          { time: "21:00-22:00", isAvailable: false },
        ]
      },
      {
        id: 6,
        name: "Badminton Court 6 (singles only)",
        location: "SPORTS - LG1",
        timeSlots: [
          { time: "13:00-14:00", isAvailable: true },
          { time: "14:00-15:00", isAvailable: true },
          { time: "15:00-16:00", isAvailable: true },
          { time: "16:00-17:00", isAvailable: true },
          { time: "17:00-18:00", isAvailable: true },
          { time: "18:00-19:00", isAvailable: true },
          { time: "19:00-20:00", isAvailable: true },
          { time: "20:00-21:00", isAvailable: true },
          { time: "21:00-22:00", isAvailable: false },
        ]
      }
    ]
  },

  methods: {
    selectTimeSlot(e) {
      const selectedTime = e.currentTarget.dataset.time;
      wx.showToast({
        title: `Selected: ${selectedTime}`,
        icon: 'success',
        duration: 2000
      });
    }
  }
});

