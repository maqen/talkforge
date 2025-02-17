"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { gql, useMutation } from "@apollo/client";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export default function LoginForm() {
  const { replace } = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: setUser, loading: loadingUser } = useUser();
  const [loginMutation, { loading }] = useMutation(gql`
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        id
      }
    }
  `);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, errors } = await loginMutation({
        variables: { username, password },
      });
      if (errors) {
        throw new Error("Invalid username or password");
      }
      setUser(data?.login);
      replace("/");
    } catch (error) {
      toast.error("Invalid username or password");
    }
  };

  if (loadingUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-4 w-4" />
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your username and password to access your account.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
