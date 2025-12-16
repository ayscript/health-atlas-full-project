"use client"
import { SignupForm } from "@/components/auth/signup-form"
import useAuthRedirect from "@/hooks/use-auth-redirect";
import { MessageSquare } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const { checked, loading, user } = useAuthRedirect();

  if (!checked || loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-muted-foreground">
          Loading...  
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-soft-cyan/30 to-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary">
              <MessageSquare className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Health Atlas</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mt-6">Create your account</h1>
          <p className="text-muted-foreground mt-2">Start your healthcare journey with Health Atlas</p>
        </div>

        <SignupForm />

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
