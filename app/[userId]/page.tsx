"use client";

import Chat from "@/components/Chat";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserQuery } from "@/graphql/generated";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

type ChatPageProps = {
  params: {
    userId: string;
  };
};

const UserDocument = gql`
  query User($id: String!) {
    usersSingle(where: { id: { eq: $id } }) {
      username
    }
  }
`;

export default function ChatPage() {
  const { userId } = useParams();
  const { data: userData, loading } = useQuery(UserDocument, {
    variables: {
      id: userId as string,
    },
    skip: !userId,
  });

  if (loading) {
    return (
      <div className="p-8">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Chat with @{userData?.usersSingle?.username}
      </h1>
      <Chat withUserId={userId as string} />
    </div>
  );
}
