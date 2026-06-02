"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Card, Separator, Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUpPage = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    if (user.password.length < 6 || !/[A-Z]/.test(user.password) || !/[a-z]/.test(user.password)) {
      setServerError("Password criteria not met.");
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image || undefined,
      });

      console.log({ data, error });

      if (data) {
        router.push("/login");
      }

      if (error) {
        setServerError(error.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setServerError("An unexpected error occurred.");
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // Redirects to the Home page upon successful Google authentication
      });
    } catch (err) {
      setServerError("Google authentication failed.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[85vh] px-4 py-6">
      <div className="text-center my-3">
        <h1 className="text-3xl font-black text-gray-800">Create Account</h1>
        <p className="text-gray-500 text-sm mt-1">Start your adventure with TutorPlatform</p>
      </div>

      <Card className="border rounded-none p-8 bg-white shadow-sm max-w-md w-full flex flex-col gap-5">
        
        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 text-center font-medium">
            ⚠️ {serverError}
          </div>
        )}

        <Form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
          <TextField isRequired name="name" type="text">
            <Label className="text-sm font-semibold text-gray-700">Name</Label>
            <Input placeholder="Enter your name" className="mt-1" />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <TextField name="image" type="url">
            <Label className="text-sm font-semibold text-gray-700">Photo-URL</Label>
            <Input placeholder="Image url" className="mt-1" />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

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
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }
              return null;
            }}
          >
            <Label className="text-sm font-semibold text-gray-700">Password</Label>
            <Input placeholder="Enter your password" className="mt-1" />
            <Description className="text-xs text-gray-400 mt-1">
              Must be at least 6 characters with 1 uppercase and 1 lowercase letter.
            </Description>
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <div className="flex justify-center gap-2 pt-2">
            <Button className="rounded-none w-full bg-cyan-500 text-white font-bold tracking-wide hover:bg-cyan-600" type="submit">
              Register
            </Button>
          </div>
        </Form>

        <div className="flex justify-center items-center gap-3 my-2">
          <Separator className=" h-[1px] bg-gray-200" />
          <div className="whitespace-nowrap text-xs text-gray-400 uppercase tracking-wider"> Or sign up with </div>
          <Separator className=" h-[1px] bg-gray-200" />
        </div>

        <div>
          <Button onClick={handleGoogleSignin} variant="outline" className="w-full rounded-none border border-gray-300 flex items-center justify-center gap-2 font-medium py-2 hover:bg-gray-50">
            <FcGoogle size={20} /> Sign in with Google
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default SignUpPage;
