import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";

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
  onPushNotificationReceived: () => void,
) => {
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  useEffect(() => {
  });
};
