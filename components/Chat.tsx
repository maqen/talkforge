"use client";

import { useChatMessagesQuery, useUserQuery } from "@/graphql/generated";
import { useUser } from "@/hooks/use-user";

export default function Chat({ withUserId }: { withUserId: string }) {
  const { user } = useUser();
  const { data: userData } = useUserQuery({
    variables: {
      id: withUserId,
    },
    skip: !withUserId,
  });
  const { data, loading } = useChatMessagesQuery({
    variables: {
      userIds: [withUserId, user!.id],
    },
    skip: !user,
  });

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
