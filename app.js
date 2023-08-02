hmApp.setScreenKeep(true)

App({
  onCreate(options) {
    console.log('app on create invoke')
  },
  onDestroy(options) {
    console.log('app on destroy invoke')
  }
})
