"use client";

import { useActionState } from "react";
import { signIn } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, undefined);

  return (
    <form action={action} className="flex w-full max-w-[400px] flex-col items-center gap-6">
      <TextField id="email" label="И-мэйл" type="email" autoComplete="email" required />
      <TextField id="password" label="Нууц үг" type="password" autoComplete="current-password" required />
      {state?.error && (
        <p role="alert" className="w-full text-sm text-red-400">
          {state.error}
        </p>
      )}
      <Button type="submit" disabled={pending} className="disabled:opacity-60">
        {pending ? "Нэвтэрч байна…" : "Нэвтрэх"}
      </Button>
    </form>
  );
}
