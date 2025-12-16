"use client";

import type React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
// import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Info } from "lucide-react";

import { Bounce, toast, ToastContainer } from "react-toastify";

interface FormData {
  email: string;
  display_name: string;
  password: string;
}

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    display_name: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter()

  function popupError(text: string) {
    toast.error(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle email/password signup
    try {
      if (confirmPassword != formData.password){
        throw new Error("Password and confirm password does not match")
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail);
      }

      toast.success(data?.message || "Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });


      
      setFormData({
        email: "",
        display_name: "",
        password: "",
      });
      setConfirmPassword("")

      // route user to the login page
      router.push("/login")

      console.log(data);
    } catch (error) {
      // console.log(error);
      popupError(String(error));
      setError(String(error));
      setTimeout(() => {
        setError("");
      }, 6000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: "google" | "apple") => {
    if (!agreedToTerms) return;
    setIsLoading(true);
    // Handle social signup
    console.log(`Signing up with ${provider}`);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((prev: FormData): FormData => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-lg p-6">
      <div className="space-y-3">
        {/* <Button
          type="button"
          variant="outline"
          className="w-full h-11 bg-transparent"
          onClick={() => handleSocialSignup("google")}
          disabled={isLoading}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button> */}
        {/* <Button
          type="button"
          variant="outline"
          className="w-full h-11 bg-transparent"
          onClick={() => handleSocialSignup("apple")}
          disabled={isLoading}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          Continue with Apple
        </Button> */}
      </div>

      {/* <div className="relative my-6">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
          Or continue with email
        </span>
      </div> */}

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="px-4 py-3 border flex gap-3 items-center text-red-500 rounded border-red-500">
            <Info />
            <span>{error}</span>
          </p>
        )}
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            type="text"
            name="display_name"
            value={formData.display_name}
            className="placeholder:text-gray-500"
            onChange={handleInputChange}
            placeholder="John Doe"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="placeholder:text-gray-500"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            className="placeholder:text-gray-500"
            onChange={handleInputChange}
            placeholder="Create a password"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            className="placeholder:text-gray-500"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
            disabled={isLoading}
          />
        </div>

        {/* <div className="flex items-start gap-2 pt-2">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
          />
          <label
            htmlFor="terms"
            className="text-sm text-muted-foreground leading-tight cursor-pointer"
          >
            I agree to the{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </label>
        </div> */}

        <Button type="submit" className="w-full h-11" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
