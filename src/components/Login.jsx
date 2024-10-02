import React from "react";
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

const Login = () => {
  return (
    <Card className="max-w-md mx-auto mt-10 p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Login</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="p-2"
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="p-2"
          />
        </div>
      </CardContent>
      <CardFooter className="mt-2">
        <Button className="w-full bg-blue-500 text-white p-2 hover:bg-blue-600">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
