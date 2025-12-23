export default {
  expo: {
    name: "WAYC",
    slug: "WAYC",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: false,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#4e948f"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.quindim.WAYC"
    },
    android: {
      versionCode: 2,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#4e948f"
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.quindim.WAYC",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
        }
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-font",
      [
        "expo-image-picker",
        {
          photosPermission: "O app acessa suas fotos para criar postagens.",
          cameraPermission: "O app acessa a câmera para permitir a captura de fotos."

        }
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "O app utiliza sua localização para exibir e registrar postagens no mapa."
        }
      ]
    ],
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      eas: {
        projectId: "2198b9dd-c9a2-4356-9904-33828d4e9ea3"
      }
    }
  }
};