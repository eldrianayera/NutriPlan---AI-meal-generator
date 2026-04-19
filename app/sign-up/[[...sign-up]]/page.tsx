import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-brand-50 via-white to-brand-50 flex items-center justify-center px-4 py-12">
      <SignUp signInFallbackRedirectUrl="/create-profile" />{" "}
    </div>
  );
}
