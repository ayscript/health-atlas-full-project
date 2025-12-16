"use client"
import { LoginForm } from "@/components/auth/login-form"
import useAuthRedirect from "@/hooks/use-auth-redirect";
import { MessageSquare } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const { checked, loading, user } = useAuthRedirect();

  if (loading || !checked || user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-muted-foreground">
          Loading...  
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-soft-cyan/30 to-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary">
              <MessageSquare className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Health Atlas</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mt-6">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your Health Atlas account</p>
        </div>

        <LoginForm />

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
