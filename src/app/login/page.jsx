"use client";

import { useState } from "react";
import { Card, Separator, Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      console.log({ data, error });

      if (data) {
        router.push("/");
      }

      if (error) {
        setServerError(error.message || "Invalid email or password.");
      }
    } catch (err) {
      setServerError("Something went wrong. Please try again.");
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setServerError("Google sign-in failed.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[75vh] px-4">
      <div className="text-center my-4">
        <h1 className="text-3xl font-black text-gray-800">Login</h1>
        <p className="text-gray-500 text-sm mt-1">Start your adventure with TutorPlatform</p>
      </div>

      <Card className="border rounded-none p-8 bg-white shadow-sm max-w-md w-full flex flex-col gap-5">
        
        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 text-center font-medium">
            ⚠️ {serverError}
          </div>
        )}

        <Form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-semibold text-gray-700">Email</Label>
            <Input placeholder="john@example.com" className="mt-1" />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
          >
            <div className="flex justify-between items-center">
              <Label className="text-sm font-semibold text-gray-700">Password</Label>
              <button type="button" className="text-xs text-blue-600 hover:underline">
                Forgot Password?
              </button>
            </div>
            <Input placeholder="Enter your password" className="mt-1" />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <div className="flex justify-center gap-2 pt-2">
            <Button className="rounded-none w-full bg-cyan-500 text-white font-bold tracking-wide hover:bg-cyan-600" type="submit">
              Login
            </Button>
          </div>
        </Form>

        <div className="flex justify-center items-center gap-3 my-2">
          <Separator className="h-[1px] bg-gray-200" />
          <div className="whitespace-nowrap text-xs text-gray-400 uppercase tracking-wider"> Or sign up with </div>
          <Separator className=" bg-gray-200" />
        </div>

        <div>
          <Button
            onClick={handleGoogleSignin}
            variant="outline"
            className="w-full rounded-none border border-gray-300 flex items-center justify-center gap-2 font-medium py-2 hover:bg-gray-50"
          >
            <FcGoogle size={20} /> Sign in with Google
          </Button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          Don't have an account?{" "}
          <Link href="/signup" className="text-cyan-600 font-bold hover:underline">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
