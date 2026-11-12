"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAuthClient, getAdmin } from "@/lib/supabase-auth";

export type FormState = { ok?: boolean; error?: string; message?: string } | undefined;

const imageTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const maxImageBytes = 5 * 1024 * 1024; // matches the bucket's file_size_limit

const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();

export async function signIn(_prev: FormState, form: FormData): Promise<FormState> {
  const supabase = await createAuthClient();
  if (!supabase) return { error: "Supabase тохируулаагүй байна (.env.local)." };

  const { error } = await supabase.auth.signInWithPassword({
    email: text(form, "email"),
    password: String(form.get("password") ?? ""),
  });
  if (error) return { error: "И-мэйл эсвэл нууц үг буруу байна." };

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createAuthClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

/** Saves one card. Row Level Security also blocks non-admins; this check gives a clear message. */
export async function updateModel(_prev: FormState, form: FormData): Promise<FormState> {
  const admin = await getAdmin();
  if (admin.status !== "ok") return { error: "Нэвтрэх эрх дууссан эсвэл admin биш байна. Дахин нэвтэрнэ үү." };
  const { supabase } = admin;

  const slug = text(form, "slug");
  const fields = {
    name: text(form, "name"),
    card_description: text(form, "card_description"),
    card_price: text(form, "card_price"),
    image_alt: text(form, "image_alt"),
    sort_order: Number.parseInt(text(form, "sort_order"), 10),
  };

  if (!slug) return { error: "Карт олдсонгүй." };
  if (!fields.name || !fields.card_description || !fields.card_price) {
    return { error: "Нэр, тайлбар, үнийг бөглөнө үү." };
  }
  if (!Number.isFinite(fields.sort_order)) return { error: "Дараалал нь тоо байх ёстой." };

  const update: Record<string, string | number> = { ...fields };

  const image = form.get("image");
  if (image instanceof File && image.size > 0) {
    const extension = imageTypes[image.type];
    if (!extension) return { error: "Зураг JPG, PNG эсвэл WebP байх ёстой." };
    if (image.size > maxImageBytes) return { error: "Зураг 5MB-аас бага байх ёстой." };

    // A new name on every upload, so browsers and the image CDN never show a stale copy.
    const path = `images/${slug}-${Date.now()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(path, image, { contentType: image.type, cacheControl: "31536000" });
    if (uploadError) return { error: `Зураг хадгалагдсангүй: ${uploadError.message}` };

    update.image_url = supabase.storage.from("images").getPublicUrl(path).data.publicUrl;
  }

  const { data, error } = await supabase.from("models").update(update).eq("slug", slug).select("slug");
  if (error) return { error: `Хадгалагдсангүй: ${error.message}` };
  if (!data?.length) return { error: "Хадгалагдсангүй: засах эрх алга." };

  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true, message: "Хадгалагдлаа. Нүүр хуудас шинэчлэгдсэн." };
}
