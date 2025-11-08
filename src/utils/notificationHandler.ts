import { useWebSocket } from "@/hooks/useWebSocket";

interface NotificationHandlerProps {
  filialId: number;
  children: React.ReactNode;
}

const NotificationHandler = ({
  filialId,
  children,
}: NotificationHandlerProps) => {
  const { notifications } = useWebSocket(filialId);
};
