import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "./actions";
import { ModelEditor, type ModelRow } from "@/components/admin/ModelEditor";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getAdmin } from "@/lib/supabase-auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false },
};

function SignOutButton() {
  return (
    <form action={signOut}>
      <Button type="submit" variant="secondary" size="sm">
        Гарах
      </Button>
    </form>
  );
}

export default async function AdminPage() {
  const admin = await getAdmin();

  if (admin.status === "signed-out") redirect("/admin/login");

  if (admin.status === "not-configured") {
    return (
      <Section>
        <SectionTitle title="Admin" description="Supabase тохируулаагүй байна. .env.local файлаа шалгана уу." />
      </Section>
    );
  }

  if (admin.status === "not-admin") {
    return (
      <Section>
        <SectionTitle
          title="Эрх алга"
          description="Энэ бүртгэл admin биш байна. Supabase-ийн admins хүснэгтэд нэмүүлнэ үү."
        />
        <SignOutButton />
      </Section>
    );
  }

  const { data, error } = await admin.supabase
    .from("models")
    .select("slug, name, card_description, card_price, image_url, image_alt, sort_order, updated_at")
    .order("sort_order")
    .returns<ModelRow[]>();

  return (
    <Section>
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-semibold leading-normal">Admin</p>
            <h1 className="text-h2">Машины картууд</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-body">
            <span>{admin.email}</span>
            <SignOutButton />
          </div>
        </div>
        <p className="max-w-[640px] text-body">
          Хадгалмагц{" "}
          <Link href="/#vehicles" className="underline underline-offset-4 hover:text-ink">
            нүүр хуудасны картууд
          </Link>{" "}
          шууд шинэчлэгдэнэ. Дараалал бага тоо нь эхэнд гарна.
        </p>
      </div>

      {error ? (
        <p role="alert" className="w-full text-red-400">
          Картуудыг уншиж чадсангүй: {error.message}
        </p>
      ) : (
        <div className="flex w-full flex-col gap-8">
          {data?.map((model) => (
            <ModelEditor key={`${model.slug}-${model.updated_at}`} model={model} />
          ))}
        </div>
      )}
    </Section>
  );
}
