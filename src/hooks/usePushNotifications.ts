import { useAuth } from "@/context/AuthContext";
import ProfileFetcher from "@/fetcher/ProfileFetcher";
import * as Notifications from "expo-notifications";
import * as Device from 'expo-device';
import { useEffect, useMemo, useRef } from "react";
import { Platform } from "react-native";
import Constants from 'expo-constants';
import ProfileService from "@/services/ProfileService";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (!Device.isDevice) {
    console.log("Tem que ser um dispositivo físico para receber notificações push");
    return null;
  }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }

    console.log('projectId peido 2.0:', Constants.expoConfig?.extra?.eas?.projectId);

    try{
      token = await Notifications.getDevicePushTokenAsync();
    } catch (error) {
      console.log("error on getExpoPushTokenAsync", error);
    }

    console.log("Expo Push Token:", token);


  return token?.data;
}

export const usePushNotifications = (
  onPushNotificationReceived: (
    notification: Notifications.Notification,
  ) => void,
) => {
  const notificationListener = useRef<Notifications.EventSubscription>(null);
  const responseListener = useRef<Notifications.EventSubscription>(null);
  const { token: authToken } = useAuth();

  useEffect(() => {
    const setupNotifications = async () => {
      const expoPushToken = await registerForPushNotificationsAsync();
      console.log("Expo push token:", expoPushToken);

      if (expoPushToken && authToken) {
        try {

          console.log("expoPushToken:", expoPushToken);
          await new ProfileService(authToken).savePushToken(expoPushToken);
          console.log("Push token saved successfully:", expoPushToken);
        } catch (error) {
          console.error("Error registering for push notifications:", error);
        }
      }

      // Listener para quando a notificação chega (app em foreground)
      notificationListener.current =
        Notifications.addNotificationReceivedListener(async (notification) => {
          console.log("Notification received in foreground:", notification);

          // Chamar callback customizado
          onPushNotificationReceived(notification);

          // Mostrar a notificação local mesmo estando no app (foreground)
          await Notifications.scheduleNotificationAsync({
            content: {
              title: notification.request.content.title || "Nova notificação",
              body: notification.request.content.body || "",
              data: notification.request.content.data || {},
              sound: true,
            },
            trigger: null, // Exibir imediatamente
          });
        });

      // Listener para quando o usuário clica na notificação
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener(
          (response: Notifications.NotificationResponse) => {
            console.log("Notification clicked:", response);
            // Aqui você pode navegar para uma tela específica baseado nos dados
            const data = response.notification.request.content.data;
            console.log("Notification data:", data);
          },
        );
    };

    setupNotifications();

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }

      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, [authToken, onPushNotificationReceived]);
};
