import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
