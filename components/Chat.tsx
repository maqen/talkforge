"use client";

import { useChatMessagesQuery } from "@/graphql/generated";
import { useUser } from "@/hooks/use-user";

export default function Chat({ withUserId }: { withUserId: string }) {
  const { user } = useUser();
  const { data, loading } = useChatMessagesQuery({
    variables: {
      userIds: [withUserId, user!.id],
    },
    skip: !user,
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {data?.messages.map((message) => (
        <div key={message.id}>
          <p>{message.content}</p>
          <p>{message.createdAt}</p>
        </div>
      ))}
    </div>
  );
}
