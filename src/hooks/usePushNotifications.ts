import { useAuth } from "@/context/AuthContext";
import ProfileFetcher from "@/fetcher/ProfileFetcher";
import * as Notifications from "expo-notifications";
import { useEffect, useMemo, useRef } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const usePushNotifications = (
  onPushNotificationReceived: (
    notification: Notifications.Notification,
  ) => void,
) => {
  const notificationListener = useRef<Notifications.EventSubscription>(null);
  const responseListener = useRef<Notifications.EventSubscription>(null);
  const { token: authToken } = useAuth();
  const profileFetcher = useMemo(
    () => new ProfileFetcher(authToken),
    [authToken],
  );

  useEffect(() => {
    const setupNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== Notifications.PermissionStatus.GRANTED) {
        console.log("Push notification permission not granted");
        return;
      }

      const expoPushToken = await Notifications.getExpoPushTokenAsync();

      if (authToken) {
        try {
          await profileFetcher.savePushToken(expoPushToken.data);
          console.log("Push token saved successfully");
        } catch (error) {
          console.error("Error saving push token:", error);
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
  }, [authToken, onPushNotificationReceived, profileFetcher]);
};
