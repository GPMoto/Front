import { useEffect, useRef, useState } from "react";
import * as ws from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

export interface ExpoPushMessage {
  to: string;
  title: string;
  body: string;
  data: Record<string, any>;
}

export const useWebSocket = (filialId: number) => {
  const socketRef = useRef<ws.Socket<DefaultEventsMap, DefaultEventsMap>>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<ExpoPushMessage[]>([]);

  useEffect(() => {
    const socket = ws.io(process.env.EXPO_PUBLIC_WEB_SOCKET_URL!, {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.emit("entrar_filial", filialId, (resposta: any) => {
      console.log(resposta);
    });

    socket.on("notificacao", (notificacao: ExpoPushMessage) => {
      setNotifications((notifications) => [notificacao, ...notifications]);

      if (Notification && Notification.permission === "granted") {
        new Notification(notificacao.title, {
          body: notificacao.body,
          icon: "/icon.png",
        });
      }
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("sair_filial", filialId);
        socketRef.current.disconnect();
      }
    };
  }, [filialId]);

  const sendMessage = (event: any, data: any[]) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit(event, data);
    }
  };

  return {
    isConnected,
    notifications,
    sendMessage,
    clearNotifications: () => setNotifications([]),
  };
};
