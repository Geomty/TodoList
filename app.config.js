module.exports = {
  expo: {
    name: "To-do List",
    slug: "TodoList",
    scheme: "todolist",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#FF0000"
    },
    ios: {
      supportsTablet: true,
      userInterfaceStyle: "automatic"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.geomty.TodoList",
      userInterfaceStyle: "automatic",
      softwareKeyboardLayoutMode: "pan"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-font"
    ]
  }
}
