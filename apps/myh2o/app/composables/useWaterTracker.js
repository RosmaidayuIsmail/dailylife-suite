export const useWaterTracker = () => {
  const username = useState('username', () => '')
  const weight = useState('weight', () => null)
  const height = useState('height', () => null)
  const activityLevel = useState('activityLevel', () => '')

  const currentIntake = useState('intake', () => 0)
  const dailyGoal = useState('goal', () => 2000)
  const waterLog = useState('log', () => [])
  const streak = useState('streak', () => 0)

  const lastResetDate = useState(
    'lastResetDate',
    () => ''
  )

  const addRewardPoints = (
    amount
  ) => {
  
    rewardPoints.value += amount
  
    saveData()
  }

  const getProfileKey = () => {
    const currentUser =
      localStorage.getItem(
        'currentUser'
      )
  
    if (!currentUser)
      return null
  
    return `hydration-profile-${currentUser}`
  }

  const rewardPoints = useState(
    'rewardPoints',
    () => 0
  )
  
  const rewardedDates = useState(
    'rewardedDates',
    () => []
  )

  const achievements = useState(
    'achievements',
    () => []
  )

  const smartReminder = useState(
    'smartReminder',
    () => true
  )
  
  const weatherAlert = useState(
    'weatherAlert',
    () => true
  )
  
  const quietHours = useState(
    'quietHours',
    () => false
  )

  const theme = useState(
    'theme',
    () => 'light'
  )

  const popupMessage = useState(
    'popupMessage',
    () => ''
  )
  
  const showPopup = useState(
    'showPopup',
    () => false
  )

  const popupTitle = useState(
    'popupTitle',
    () => ''
  )
  
  const popupIcon = useState(
    'popupIcon',
    () => ''
  )

  const saveData = () => {
    const profile = {
      username: username.value,
      weight: weight.value,
      height: height.value,
      activityLevel: activityLevel.value,
      dailyGoal: dailyGoal.value,
      currentIntake: currentIntake.value,
      waterLog: waterLog.value,
      streak: streak.value,
      lastResetDate: lastResetDate.value,
    
      rewardPoints: rewardPoints.value,
      rewardedDates: rewardedDates.value,
      achievements: achievements.value,

      smartReminder: smartReminder.value,
      weatherAlert: weatherAlert.value,
      quietHours: quietHours.value,
      theme: theme.value
    }

    const key = getProfileKey()

    if (!key)
      return

    localStorage.setItem(
      key,
      JSON.stringify(profile)
    )
  }

  const loadData = () => {
    const key = getProfileKey()

    if (!key)
      return

    const saved =
      localStorage.getItem(key)

    if (!saved) {
      currentIntake.value = 0
      waterLog.value = []

      streak.value = 0
      
      rewardPoints.value = 0
      rewardedDates.value = []
      achievements.value = []
      
      return
    }

    const profile = JSON.parse(saved)

    username.value =
      profile.username || ''

    weight.value =
      profile.weight || null

    height.value =
      profile.height || null

    activityLevel.value =
      profile.activityLevel || ''

    dailyGoal.value =
      profile.dailyGoal || 2000

    currentIntake.value =
      profile.currentIntake || 0

    waterLog.value =
      profile.waterLog || []

    streak.value =
      profile.streak ?? 0

    rewardPoints.value =
      profile.rewardPoints || 0
    
    rewardedDates.value =
      profile.rewardedDates || []

    achievements.value =
      profile.achievements || []

    smartReminder.value =
      profile.smartReminder ?? true
    
    weatherAlert.value =
      profile.weatherAlert ?? true
    
    quietHours.value =
      profile.quietHours ?? false
    
    theme.value =
      profile.theme || 'light'

    lastResetDate.value =
      profile.lastResetDate || ''

    checkDailyReset()

    applyTheme()
  }

  const checkDailyReset = () => {

    const now = new Date()
  
    const today =
      `${now.getFullYear()}-${
        String(now.getMonth() + 1).padStart(2, '0')
      }-${
        String(now.getDate()).padStart(2, '0')
      }`
  
    if (
      lastResetDate.value &&
      lastResetDate.value !== today
    ) {
  
      currentIntake.value = 0
  
    }
  
    lastResetDate.value = today
  
    saveData()
  }

  const calculateGoal = () => {
    const safeWeight =
      weight.value || 60

    let base =
      safeWeight * 33

    if (activityLevel.value === 'Moderate')
      base += 400

    if (activityLevel.value === 'High')
      base += 800

    dailyGoal.value =
      Math.round(base / 50) * 50

    saveData()
  }

  const applyTheme = () => {

    if (theme.value === 'dark') {
      document.documentElement.classList.add(
        'dark'
      )
    }
    else {
      document.documentElement.classList.remove(
        'dark'
      )
    }
  
    saveData()
  }

  const checkDailyReward = () => {
    const now = new Date()

    const today =
      `${now.getFullYear()}-${
        String(now.getMonth() + 1).padStart(2, '0')
      }-${
        String(now.getDate()).padStart(2, '0')
      }`
  
    if (
      currentIntake.value >= dailyGoal.value &&
      !rewardedDates.value.includes(today)
    ) {
      triggerPopup(
        'Goal Achieved',
        'Daily hydration goal reached',
        'heroicons:trophy-solid'
      )
      rewardPoints.value += 2

      streak.value++

      setTimeout(() => {

        triggerPopup(
          'Reward Earned',
          '+2 points added',
          'heroicons:star-solid'
        )
      
      }, 1500)
  
      rewardedDates.value.push(today)

      checkAchievements()
  
      saveData()
    }
  }

  const checkAchievements = () => {

    const totalGoals =
      rewardedDates.value.length
  
    const totalWater =
      waterLog.value.reduce(
        (sum, log) =>
          sum + Number(log.amount),
        0
      )
  
    const unlock = (id) => {
      if (
        !achievements.value.includes(id)
      ) {
        achievements.value.push(id)
      }
    }
  
    if (totalGoals >= 1) {
      unlock('first-goal')
    }
  
    if (totalGoals >= 10) {
      unlock('ten-goals')
    }
  
    if (rewardPoints.value >= 100) {
      unlock('hundred-points')
    }
  
    if (totalGoals >= 7) {
      unlock('seven-day-streak')
    }
  
    if (totalGoals >= 30) {
      unlock('thirty-day-streak')
    }
  
    if (totalWater >= 10000) {
      unlock('ten-liters')
    }
  
    saveData()
  }

  const triggerPopup = (
    title,
    message,
    icon
  ) => {
  
    popupTitle.value = title
  
    popupMessage.value = message
  
    popupIcon.value = icon
  
    showPopup.value = true
  
    setTimeout(() => {
      showPopup.value = false
    }, 2500)
  }

  const addWater = (amount) => {

    const beforeGoal =
      currentIntake.value < dailyGoal.value
  
    currentIntake.value += amount
  
    const afterGoal =
      currentIntake.value >= dailyGoal.value
  
    if (beforeGoal && afterGoal) {
  
      triggerPopup(
        'Goal Achieved',
        `Congratulations! You reached ${dailyGoal.value}ml today!`,
        'heroicons:trophy-solid'
      )
  
    } else {
  
      triggerPopup(
        'Water Added',
        `${amount}ml added successfully`,
        'heroicons:beaker-solid'
      )
  
    }
  
    const now = new Date()
  
    const date =
      `${now.getFullYear()}-${
        String(now.getMonth() + 1).padStart(2, '0')
      }-${
        String(now.getDate()).padStart(2, '0')
      }`
  
    waterLog.value.unshift({
      amount,
      time: now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      timestamp: Date.now(),
      date
    })
  
    checkDailyReward()
  
    saveData()
  }

  // const logoutUser = () => {
  //   username.value = ''
  //   weight.value = null
  //   height.value = null
  //   activityLevel.value = ''

  //   currentIntake.value = 0
  //   dailyGoal.value = 2000
  //   waterLog.value = []
  //   streak.value = 7

  //   rewardPoints.value = 0
  //   rewardedDates.value = []

  //   smartReminder.value = true
  //   weatherAlert.value = true
  //   quietHours.value = false

  //   localStorage.removeItem(
  //     'hydration-profile'
  //   )
  // }

  const logoutUser = () => {
    localStorage.removeItem(
      'loggedIn'
    )
  
    localStorage.removeItem(
      'currentUser'
    )
  }

  return {
    username,
    weight,
    height,
    activityLevel,
    currentIntake,
    dailyGoal,
    waterLog,
    streak,
  
    lastResetDate,
    checkDailyReset,
  
    rewardPoints,
    rewardedDates,
    achievements,
  
    theme,
    applyTheme,
  
    smartReminder,
    weatherAlert,
    quietHours,
  
    popupMessage,
    popupTitle,
    popupIcon,
    showPopup,

    addRewardPoints,
  
    calculateGoal,
    addWater,
    loadData,
    saveData,
    logoutUser
  }
}