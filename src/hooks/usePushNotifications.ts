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

  if (Device.isDevice) {
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
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });
    } catch (error) {
      console.log("error on getExpoPushTokenAsync", error);
    }

    console.log("Expo Push Token:", token);
  } else {
    console.log("Must use physical device for Push Notifications");
  }

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

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          onPushNotificationReceived(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener(
          (response: Notifications.NotificationResponse) => {
            console.log("Notification response received:", response);
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
