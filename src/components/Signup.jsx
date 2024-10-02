import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Signup = () => {
  return (
    <Card className="max-w-md mx-auto shadow-lg mt-10 p-4">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Signup</CardTitle>
        <CardDescription className="text-center">
          Create your account to start shortening links
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col mt-2 gap-4">
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
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            className="p-2"
          />
        </div>
      </CardContent>
      <CardFooter className="text-center mt-4">
        <Button className="w-full bg-blue-500 text-white p-2 hover:bg-blue-600">
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
