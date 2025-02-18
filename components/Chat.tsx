"use client";

import {
  MessageFragment,
  useChatMessagesQuery,
  useSendMessageMutation,
} from "@/graphql/generated";
import { useUser } from "@/hooks/use-user";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

export default function Chat({ withUserId }: { withUserId: string }) {
  const [message, setMessage] = useState("");
  const { user } = useUser();
  const { data, loading, refetch } = useChatMessagesQuery({
    variables: {
      userIds: [withUserId, user!.id],
    },
    skip: !user,
    pollInterval: 3000,
  });
  const [sendMessage, { loading: sending }] = useSendMessageMutation();

  const handleSendMessage = async () => {
    if (message.length > 0) {
      await sendMessage({
        variables: {
          content: message,
          senderId: user!.id,
          recipientId: withUserId,
        },
      });
      setMessage("");
      refetch();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-2 flex flex-col h-full">
      <div className="space-y-2 flex-1 overflow-y-auto">
        {data?.messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
      </div>
      <div className="flex gap-2">
        <form onSubmit={handleSendMessage}>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" disabled={message.length === 0 || sending}>
            {sending ? "Sending..." : "Send"}
          </Button>
        </form>
      </div>
    </div>
  );
}

const ChatMessage = ({ message }: { message: MessageFragment }) => (
  <Card>
    <CardHeader>
      <CardTitle>{message.sender?.username}</CardTitle>
    </CardHeader>
    <CardContent>{message.content}</CardContent>
    <CardFooter>
      <span className="text-sm text-gray-500">
        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
      </span>
    </CardFooter>
  </Card>
);
