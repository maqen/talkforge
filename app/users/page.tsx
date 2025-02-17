"use client";

import { useUsersQuery } from "@/graphql/generated";
import { Loader2 } from "lucide-react";

export default function Users() {
  const { data, loading } = useUsersQuery();

  if (loading)
    return (
      <div className="mx-auto py-16">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  return (
    <div>
      {data?.users.map((user) => (
        <div key={user.id}>{user.username}</div>
      ))}
    </div>
  );
}
