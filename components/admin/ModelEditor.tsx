"use client";

import Image from "next/image";
import { useActionState, useEffect, useState, type ChangeEvent } from "react";
import { updateModel } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";

export type ModelRow = {
  slug: string;
  name: string;
  card_description: string;
  card_price: string;
  image_url: string;
  image_alt: string;
  sort_order: number;
  updated_at: string;
};

/** One card: photo on the left, its fields on the right, saved on its own. */
export function ModelEditor({ model }: { model: ModelRow }) {
  const [state, action, pending] = useActionState(updateModel, undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const id = (field: string) => `${model.slug}-${field}`;

  // Free the object URL when the preview changes or the card unmounts.
  useEffect(() => () => void (preview && URL.revokeObjectURL(preview)), [preview]);

  // After a successful save the server sends the new image URL; drop the local preview.
  useEffect(() => {
    if (state?.ok) setPreview(null);
  }, [state]);

  function onImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  return (
    <form
      action={action}
      className="grid gap-8 rounded-lg bg-surface p-6 md:grid-cols-[240px_minmax(0,1fr)] md:p-8"
    >
      <input type="hidden" name="slug" value={model.slug} />

      <div className="flex flex-col gap-3">
        <div className="relative aspect-[296/364.8] w-full overflow-hidden rounded-lg bg-canvas">
          {preview ? (
            // Local blob preview: next/image cannot optimise it.
            <img src={preview} alt="" className="size-full object-cover" />
          ) : (
            <Image src={model.image_url} alt={model.image_alt} fill sizes="240px" className="object-cover" />
          )}
        </div>
        <label htmlFor={id("image")} className="text-sm text-body">
          Зураг солих (JPG, PNG, WebP · 5MB хүртэл)
        </label>
        <input
          id={id("image")}
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onImage}
          className="text-sm text-body file:mr-3 file:cursor-pointer file:border-0 file:bg-canvas file:px-3 file:py-1.5 file:text-ink hover:file:bg-surface-hover"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-h5">{model.name}</h2>
          <code className="text-sm text-muted">/{model.slug}</code>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_120px]">
          <TextField id={id("name")} name="name" label="Нэр" defaultValue={model.name} required />
          <TextField
            id={id("sort_order")}
            name="sort_order"
            label="Дараалал"
            type="number"
            defaultValue={model.sort_order}
            required
          />
        </div>
        <TextField
          id={id("card_description")}
          name="card_description"
          label="Тайлбар"
          defaultValue={model.card_description}
          required
        />
        <TextField id={id("card_price")} name="card_price" label="Үнэ" defaultValue={model.card_price} required />
        <TextField
          id={id("image_alt")}
          name="image_alt"
          label="Зургийн тайлбар (alt)"
          defaultValue={model.image_alt}
        />

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={pending} className="disabled:opacity-60">
            {pending ? "Хадгалж байна…" : "Хадгалах"}
          </Button>
          <p role="status" className={state?.error ? "text-sm text-red-400" : "text-sm text-body"}>
            {state?.error ?? state?.message}
          </p>
        </div>
      </div>
    </form>
  );
}
