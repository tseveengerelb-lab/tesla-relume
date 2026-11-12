import Image from "next/image";

/** Check or cross for yes/no spec values. The SVGs are white; brightness-0 invert keeps them pure white. */
export function BoolIcon({ value }: { value: boolean }) {
  return (
    <Image
      src={value ? "/icons/check.svg" : "/icons/close.svg"}
      alt={value ? "Тийм" : "Үгүй"}
      width={24}
      height={24}
      unoptimized
      className="mx-auto brightness-0 invert"
    />
  );
}
