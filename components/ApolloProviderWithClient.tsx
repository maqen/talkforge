"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export default function ApolloProviderWithClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
