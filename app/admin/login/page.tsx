import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Admin нэвтрэх",
  robots: { index: false },
};

export default function AdminLoginPage() {
  return (
    <Section>
      <SectionTitle tagline="Admin" title="Нэвтрэх" description="Машины картуудыг засахын тулд нэвтэрнэ үү." />
      <LoginForm />
    </Section>
  );
}
