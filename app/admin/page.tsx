import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "./actions";
import { ModelEditor, type ModelRow } from "@/components/admin/ModelEditor";
import { OrdersTable, type OrderRow } from "@/components/admin/OrdersTable";
import { TestDrivesTable, type TestDriveRow } from "@/components/admin/TestDrivesTable";
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

  const [{ data, error }, orders, testDrives] = await Promise.all([
    admin.supabase
      .from("models")
      .select("slug, name, card_description, card_price, image_url, image_alt, sort_order, updated_at")
      .order("sort_order")
      .returns<ModelRow[]>(),
    admin.supabase
      .from("orders")
      .select("id, model, full_name, email, postal_code, phone, amount, amount_paid, status, created_at, paid_at")
      .order("created_at", { ascending: false })
      .limit(200)
      .returns<OrderRow[]>(),
    admin.supabase
      .from("test_drives")
      .select("id, model, full_name, phone, preferred_date, preferred_time, status, created_at")
      .order("preferred_date", { ascending: false })
      .limit(200)
      .returns<TestDriveRow[]>(),
  ]);

  return (
    <Section>
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-semibold leading-normal">Admin</p>
            <h1 className="text-h2">Удирдлага</h1>
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

      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-h2">Захиалгууд</h2>
          <p className="text-body">Byl-ээр урьдчилгаа төлсөн захиалга webhook ирмэгц “Төлөгдсөн” болно.</p>
        </div>
        {orders.error ? (
          <p role="alert" className="w-full text-red-400">
            Захиалгуудыг уншиж чадсангүй: {orders.error.message}
          </p>
        ) : (
          <OrdersTable orders={orders.data ?? []} />
        )}
      </div>

      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-h2">Туршилтын жолоодлого</h2>
          <p className="text-body">Төлбөргүй хүсэлтүүд. Утсаар холбогдож цагийг баталгаажуулна.</p>
        </div>
        {testDrives.error ? (
          <p role="alert" className="w-full text-red-400">
            Хүсэлтүүдийг уншиж чадсангүй: {testDrives.error.message}
          </p>
        ) : (
          <TestDrivesTable requests={testDrives.data ?? []} />
        )}
      </div>

      <h2 className="w-full text-h2">Машины картууд</h2>
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
