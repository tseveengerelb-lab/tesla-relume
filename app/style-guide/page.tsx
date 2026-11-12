import type { Metadata } from "next";
import Image from "next/image";
import { features } from "@/data/content";
import { requireModel } from "@/data/models";
import { breakpoints, colorGroups, containers, gapScale, spacingTokens, typeScale } from "@/data/design-tokens";
import { ProductCard } from "@/components/home/ProductCard";
import { TrimCard } from "@/components/model/TrimGrid";
import { CompareTable } from "@/components/shared/CompareTable";
import { FeatureCard } from "@/components/shared/Features";
import { ChipNav, Code, GuideSection, Rules, SideNav, Specimen, SubHeading } from "@/components/style-guide/Guide";
import { BoolIcon } from "@/components/ui/BoolIcon";
import { Actions, Button, ButtonLink } from "@/components/ui/Button";
import { Checkbox, TextAreaField, TextField, TextLink } from "@/components/ui/Field";
import { Stat } from "@/components/ui/Stat";
import { cx } from "@/lib/cx";

export const metadata: Metadata = {
  title: "Загварын заавар",
  description: "Tesla Улаанбаатар сайтын өнгө, үсэг, зай, товч, компонентын нэгдсэн заавар.",
  robots: { index: false },
};

const model3 = requireModel("model-3");
const modelY = requireModel("model-y");
const colorCount = colorGroups.reduce((sum, group) => sum + group.colors.length, 0);

const icons = [
  { src: "/icons/check.svg", name: "check", usage: "Тийм" },
  { src: "/icons/close.svg", name: "close", usage: "Үгүй" },
  { src: "/icons/chevron-right.svg", name: "chevron-right", usage: "Link товч" },
];

export default function StyleGuidePage() {
  return (
    <>
      {/* Intro: centred title, then a Tesla-style row of large figures. */}
      <header className="px-page pb-16 pt-16 md:pt-24">
        <div className="mx-auto flex max-w-title flex-col items-center gap-4 text-center">
          <p className="font-semibold leading-normal">Дизайн систем</p>
          <h1 className="text-h1">Загварын заавар</h1>
          <p className="text-md text-body">
            Сайтын өнгө, үсэг, зай, товч, компонентын нэгдсэн заавар. Энд харагдаж буй бүх жишээ сайтад ашиглагдаж буй
            жинхэнэ код, token-оор зурагдсан.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-content grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Stat value="Inter" label="Фонт" fluid />
          <Stat value={String(colorCount)} label="Өнгөний token" fluid />
          <Stat value={String(breakpoints.length)} label="Дэлгэцийн хэмжээ" fluid />
          <Stat value="0.33 с" label="Шилжилтийн хугацаа" fluid />
        </div>
      </header>

      <div className="px-page pb-section">
        <div className="mx-auto flex max-w-content gap-16">
          <aside className="hidden w-52 flex-none lg:block">
            <SideNav />
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-12 lg:hidden">
              <ChipNav />
            </div>

            <div>
              {/* 01 Brand */}
              <GuideSection
                id="brand"
                description="Цэвэр, цагаан дэвсгэр, том гэрэл зураг, цөөн үг. Машин өөрөө гол дүр байх ёстой тул интерфэйс аль болох ард нь байна."
              >
                <div>
                  <SubHeading>Лого</SubHeading>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Specimen
                      caption="Цагаан дэвсгэр дээр"
                      code="brightness-0"
                      className="flex h-40 items-center justify-center"
                    >
                      <Image
                        src="/icons/tesla-logo.svg"
                        alt="Tesla"
                        width={156}
                        height={16}
                        unoptimized
                        className="h-4 w-[156px] brightness-0"
                      />
                    </Specimen>
                    <Specimen
                      tone="dark"
                      caption="Бараан дэвсгэр, зураг дээр"
                      code="brightness-0 invert"
                      className="flex h-40 items-center justify-center"
                    >
                      <Image
                        src="/icons/tesla-logo.svg"
                        alt="Tesla"
                        width={156}
                        height={16}
                        unoptimized
                        className="h-4 w-[156px] brightness-0 invert"
                      />
                    </Specimen>
                  </div>
                </div>
                <div>
                  <SubHeading>Зарчим</SubHeading>
                  <Rules
                    items={[
                      "Зураг тэргүүлнэ. Том, бодит гэрэл зураг гол үүрэгтэй; чимэглэл, сүүдэр, градиент хэрэглэхгүй.",
                      "Нэг онцлох өнгө. Зөвхөн үндсэн үйлдэл indigo өнгөтэй; бусад бүх зүйл хар, саарал, цагаан.",
                      "Товч, тодорхой. Богино өгүүлбэр, бодит тоо, тодорхой үйл үг: «Захиалах», «Туршиж жолоодох».",
                    ]}
                  />
                </div>
                <div>
                  <SubHeading>Бичвэрийн дүрэм</SubHeading>
                  <dl className="divide-y divide-line border-y border-line">
                    {[
                      ["Үнэ", "$36,990-с эхэлнэ", "Доллараар, мянгатыг таслалаар"],
                      ["Хурдатгал", "0–97 км/цаг 2.9 с", "Зураас (–), нэгж нь товчилсон"],
                      ["Явах зай", "~507 км, EPA", "Ойролцоо утгад ~ тэмдэг"],
                      ["Товч", "Захиалах", "1–2 үг, үйл үгээр эхэлнэ"],
                    ].map(([term, example, rule]) => (
                      <div key={term} className="grid gap-1 py-4 md:grid-cols-[160px_1fr_1fr] md:gap-6">
                        <dt className="font-medium">{term}</dt>
                        <dd className="font-semibold">{example}</dd>
                        <dd className="text-body">{rule}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </GuideSection>

              {/* 02 Colors */}
              <GuideSection
                id="colors"
                description="Хар цагаан суурь дээр ганц онцлох өнгө. Өнгө бүр app/globals.css-ийн @theme дотор token болж тодорхойлогдсон тул bg-*, text-*, border-* классаар хэрэглэнэ."
              >
                {colorGroups.map((group) => (
                  <div key={group.title}>
                    <SubHeading>{group.title}</SubHeading>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
                      {group.colors.map((color) => (
                        <div key={color.token} className="flex flex-col gap-3">
                          <div
                            className={cx("h-24 rounded-lg", color.swatch, color.outlined && "border border-line")}
                          />
                          <div className="flex flex-col gap-1">
                            <p className="font-medium">{color.name}</p>
                            <p className="font-mono text-[13px] text-body">{color.value}</p>
                            <div>
                              <Code>{color.token}</Code>
                            </div>
                            <p className="text-sm text-body">{color.usage}</p>
                            {color.contrast && <p className="text-sm text-muted">Тодрол {color.contrast}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </GuideSection>

              {/* 03 Typography */}
              <GuideSection
                id="typography"
                description="Нэг фонт, цөөн жин. Гарчиг Medium 500, текст Regular 400. Том гарчгууд дэлгэц багасахад өөрөө жижгэрнэ (компьютер / таблет / утас)."
              >
                <Specimen caption="Inter · Latin, Кирилл · next/font-оор ачаалагдана" code="font-sans">
                  <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <p className="text-[96px] font-medium leading-none tracking-[0.01em] md:text-[128px]">Аа</p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-md">
                      <span className="font-normal">Regular 400</span>
                      <span className="font-medium">Medium 500</span>
                      <span className="font-semibold">Semibold 600</span>
                      <span className="font-bold">Bold 700</span>
                    </div>
                  </div>
                </Specimen>
                <div className="border-t border-line">
                  {typeScale.map((type) => (
                    <div
                      key={type.name}
                      className="grid gap-4 border-b border-line py-6 lg:grid-cols-[1fr_240px] lg:items-start lg:gap-8"
                    >
                      <p className={cx(type.className, "min-w-0")}>{type.sample}</p>
                      <div className="flex flex-col gap-1 text-sm text-body">
                        <span className="font-medium text-ink">{type.name}</span>
                        <span>
                          {type.size} px · {type.meta}
                        </span>
                        <span>{type.usage}</span>
                        <div>
                          <Code>{type.className}</Code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GuideSection>

              {/* 04 Layout */}
              <GuideSection
                id="layout"
                description="Их зай нь агуулгыг тайван, ойлгомжтой болгоно. Хуудасны болон хэсгийн зай дэлгэцийн хэмжээгээр өөрчлөгддөг token, бусад зай Tailwind-ийн 4px алхмаар."
              >
                <div>
                  <SubHeading>Хуудасны зай</SubHeading>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[520px] text-left">
                      <thead>
                        <tr className="border-b border-line text-sm text-body">
                          <th className="py-3 pr-6 font-normal">Token</th>
                          <th className="py-3 pr-6 font-normal">Компьютер</th>
                          <th className="py-3 pr-6 font-normal">Таблет</th>
                          <th className="py-3 pr-6 font-normal">Утас</th>
                          <th className="py-3 font-normal">Хэрэглээ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {spacingTokens.map((token) => (
                          <tr key={token.name} className="border-b border-line">
                            <td className="py-4 pr-6">
                              <Code>{token.className}</Code>
                            </td>
                            {token.values.map((value, index) => (
                              <td key={index} className="py-4 pr-6 font-semibold tabular-nums">
                                {value}px
                              </td>
                            ))}
                            <td className="py-4 text-body">{token.usage}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <SubHeading>Элемент хоорондын зай</SubHeading>
                  <div className="flex flex-col gap-4">
                    {gapScale.map((gap) => (
                      <div
                        key={gap.className}
                        className="grid grid-cols-[72px_1fr] items-center gap-4 md:grid-cols-[72px_120px_1fr]"
                      >
                        <Code>{gap.className}</Code>
                        <div className="flex items-center gap-3">
                          <span className="h-4 rounded-sm bg-accent" style={{ width: gap.px }} />
                          <span className="text-sm tabular-nums text-body">{gap.px}px</span>
                        </div>
                        <span className="col-span-2 text-sm text-body md:col-span-1">{gap.usage}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <SubHeading>Агуулгын өргөн</SubHeading>
                  <div className="flex flex-col gap-4">
                    {containers.map((container) => (
                      <div key={container.name} className="flex flex-col gap-2">
                        <div
                          className="flex h-10 items-center rounded bg-surface"
                          style={{ width: `${(container.px / 1280) * 100}%` }}
                        >
                          <span className="px-3 text-sm font-semibold tabular-nums">{container.px}px</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-body">
                          <Code>{container.className}</Code>
                          {container.usage}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <SubHeading>Дэлгэцийн хэмжээ</SubHeading>
                  <div className="grid gap-6 md:grid-cols-3">
                    {breakpoints.map((bp) => (
                      <div key={bp.name} className="flex flex-col gap-2 rounded-lg bg-surface p-6">
                        <p className="text-h6">{bp.name}</p>
                        <p className="font-semibold tabular-nums">{bp.range}</p>
                        <p className="text-sm text-body">{bp.note}</p>
                        <div>
                          <Code>{bp.prefix}</Code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GuideSection>

              {/* 05 Shape & motion */}
              <GuideSection
                id="shape"
                description="Хэлбэр энгийн, булан зөөлөн. Хөдөлгөөн зөвхөн өнгөнд: шилжилт 0.33 секунд, нэг ижил муруйгаар. Хэрэглэгч хөдөлгөөн багасгахыг сонгосон бол бүх шилжилт унтарна."
              >
                <div>
                  <SubHeading>Булан</SubHeading>
                  <div className="grid gap-6 md:grid-cols-3">
                    {[
                      { className: "rounded-none", label: "0", usage: "Товч, формын талбар" },
                      { className: "rounded", label: "4px", usage: "Цэсний сонгогдсон хэсэг" },
                      { className: "rounded-lg", label: "8px", usage: "Зураг, карт, панел" },
                    ].map((radius) => (
                      <div key={radius.className} className="flex flex-col gap-3">
                        <div className={cx("h-28 border-2 border-ink bg-surface", radius.className)} />
                        <p className="font-medium tabular-nums">{radius.label}</p>
                        <p className="text-sm text-body">{radius.usage}</p>
                        <div>
                          <Code>{radius.className}</Code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <SubHeading>Шилжилт</SubHeading>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Specimen caption="Хулганаа аваачиж үзээрэй" code="duration-330 ease-tesla">
                      <div className="flex h-28 items-center justify-center rounded-lg bg-surface text-body transition-colors duration-330 ease-tesla hover:bg-accent hover:text-white">
                        Hover
                      </div>
                    </Specimen>
                    <div className="flex flex-col gap-3 text-base text-body">
                      <p>
                        <span className="font-medium text-ink">Муруй:</span> <Code>cubic-bezier(0.5, 0, 0, 0.75)</Code>
                      </p>
                      <p>
                        <span className="font-medium text-ink">Юу хөдөлнө:</span> өнгө, дэвсгэр, хүрээ, focus-ийн
                        цагираг. Байрлал, хэмжээ хөдлөхгүй.
                      </p>
                      <p>
                        <span className="font-medium text-ink">Цэс:</span> хуудсыг 72px гүйлгэхэд цагаан, бүдэг шил
                        (75%, blur 12px) болно.
                      </p>
                    </div>
                  </div>
                </div>
              </GuideSection>

              {/* 06 Buttons */}
              <GuideSection
                id="buttons"
                description="Товч тэгш өнцөгт, Medium жинтэй. Үндсэн үйлдэлд indigo, бусдад саарал. Focus хийхэд дотогшоо 2px цагираг гарна."
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <Specimen
                    caption="Primary · үндсэн үйлдэл"
                    code='variant="primary"'
                    className="flex h-32 items-center justify-center"
                  >
                    <ButtonLink href="#buttons">Захиалах</ButtonLink>
                  </Specimen>
                  <Specimen
                    caption="Secondary · хоёрдогч үйлдэл"
                    code='variant="secondary"'
                    className="flex h-32 items-center justify-center"
                  >
                    <ButtonLink href="#buttons" variant="secondary">
                      Туршиж жолоодох
                    </ButtonLink>
                  </Specimen>
                  <Specimen
                    tone="surface"
                    caption="Саарал карт дээр"
                    code='variant="secondary-on-surface"'
                    className="flex h-32 items-center justify-center"
                  >
                    <ButtonLink href="#buttons" variant="secondary-on-surface">
                      Захиалах
                    </ButtonLink>
                  </Specimen>
                  <Specimen
                    caption="Link · гуравдагч үйлдэл"
                    code='variant="link"'
                    className="flex h-32 items-center justify-center"
                  >
                    <ButtonLink href="#buttons" variant="link">
                      Дэлгэрэнгүй
                      <Image
                        src="/icons/chevron-right.svg"
                        alt=""
                        width={24}
                        height={24}
                        unoptimized
                        className="brightness-0"
                      />
                    </ButtonLink>
                  </Specimen>
                  <Specimen caption="Жижиг · цэсэнд" code='size="sm"' className="flex h-32 items-center justify-center">
                    <ButtonLink href="#buttons" size="sm">
                      нэвтрэх
                    </ButtonLink>
                  </Specimen>
                  <Specimen
                    caption="Хослол · primary эхэнд"
                    code="<Actions>"
                    className="flex h-32 items-center justify-center"
                  >
                    <Actions>
                      <ButtonLink href="#buttons">Захиалах</ButtonLink>
                      <ButtonLink href="#buttons" variant="secondary">
                        Туршиж жолоодох
                      </ButtonLink>
                    </Actions>
                  </Specimen>
                </div>
                <Rules
                  items={[
                    "Нэг хэсэгт нэг л primary товч байна.",
                    "Текст 1–2 үг, үйл үгээр: «Захиалах», «Бусад загвар».",
                    'Хуудас доторх холбоосод <ButtonLink>, формд <Button type="submit">.',
                  ]}
                />
              </GuideSection>

              {/* 07 Forms */}
              <GuideSection
                id="forms"
                description="Талбар нь зөвхөн доод зураастай, хүрээгүй. Focus хийхэд зураас Ink өнгөтэй болно. Шошго үргэлж талбарын дээр харагдана."
              >
                <Specimen caption="components/ui/Field.tsx" code="<TextField> <TextAreaField> <Checkbox>">
                  <div className="mx-auto flex max-w-form flex-col items-center gap-6">
                    <TextField id="sg-name" label="Овог нэр" type="text" autoComplete="off" />
                    <TextField
                      id="sg-email"
                      label="И-мэйл"
                      type="email"
                      defaultValue="bat@example.mn"
                      autoComplete="off"
                    />
                    <TextAreaField id="sg-zip" label="Шуудангийн код" placeholder="ж.нь 94301" />
                    <div className="flex w-full flex-col gap-3">
                      <Checkbox id="sg-check-off">Сонгоогүй</Checkbox>
                      <Checkbox id="sg-check-on" defaultChecked>
                        <TextLink href="#forms">Үйлчилгээний нөхцөл</TextLink>-ийг зөвшөөрч байна
                      </Checkbox>
                    </div>
                    <Button>Захиалга өгөх</Button>
                  </div>
                </Specimen>
              </GuideSection>

              {/* 08 Icons */}
              <GuideSection
                id="icons"
                description="24px, нимгэн шугаман дүрс. SVG файлууд цагаан өнгөтэй тул цагаан дэвсгэр дээр brightness-0 классаар харлуулна."
              >
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                  {icons.map((icon) => (
                    <Specimen
                      key={icon.name}
                      tone="surface"
                      caption={icon.usage}
                      code={icon.name}
                      className="flex h-32 items-center justify-center"
                    >
                      <Image src={icon.src} alt="" width={24} height={24} unoptimized className="size-8 brightness-0" />
                    </Specimen>
                  ))}
                </div>
                <div>
                  <SubHeading>Хүснэгтэд</SubHeading>
                  <div className="flex gap-8">
                    <div className="flex items-center gap-3">
                      <BoolIcon value={true} /> <Code>{"<BoolIcon value={true} />"}</Code>
                    </div>
                    <div className="flex items-center gap-3">
                      <BoolIcon value={false} /> <Code>{"<BoolIcon value={false} />"}</Code>
                    </div>
                  </div>
                </div>
              </GuideSection>

              {/* 09 Components */}
              <GuideSection
                id="components"
                description="Хуудсууд эдгээр компонентоос бүтнэ. Өгөгдөл нь data/ хавтаснаас ирдэг тул компонентын кодыг өөрчлөхгүйгээр контент шинэчилнэ."
              >
                <div>
                  <SubHeading>Үзүүлэлт</SubHeading>
                  <Specimen caption="components/ui/Stat.tsx" code="<Stat value label />">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      {model3.stats.slice(0, 2).map((stat) => (
                        <Stat key={stat.label} {...stat} fluid />
                      ))}
                    </div>
                  </Specimen>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <SubHeading>Загварын карт</SubHeading>
                    <Specimen caption="components/home/ProductCard.tsx">
                      <div className="mx-auto max-w-[280px]">
                        <ProductCard model={model3} />
                      </div>
                    </Specimen>
                  </div>
                  <div>
                    <SubHeading>Хувилбарын карт</SubHeading>
                    <Specimen caption="components/model/TrimGrid.tsx" code="<TrimCard />">
                      <div className="flex flex-col gap-6">
                        {model3.trims?.slice(0, 2).map((trim) => (
                          <TrimCard key={trim.name} trim={trim} />
                        ))}
                      </div>
                    </Specimen>
                  </div>
                </div>
                <div>
                  <SubHeading>Онцлогийн карт</SubHeading>
                  <Specimen caption="components/shared/Features.tsx" code="<FeatureCard />">
                    <div className="mx-auto max-w-[420px]">
                      <FeatureCard feature={features[0]} />
                    </div>
                  </Specimen>
                </div>
                <div>
                  <SubHeading>Үзүүлэлтийн хүснэгт</SubHeading>
                  <Specimen caption="components/shared/CompareTable.tsx" code="<CompareTable headers rows />">
                    <CompareTable
                      headers={[{ name: modelY.name, price: modelY.priceFrom }]}
                      rows={(modelY.specs ?? []).slice(0, 5)}
                    />
                  </Specimen>
                </div>
              </GuideSection>

              {/* 10 Imagery */}
              <GuideSection
                id="imagery"
                description="Машиныг байгалийн гэрэлд, бодит орчинд харуулсан гэрэл зураг. Зураг бүр 8px булантай, бүтэн өргөнтэй hero-оос бусад нь. Зургийн дээр текст тавих бол 40% хар давхарга нэмнэ."
              >
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    {
                      src: model3.image.src,
                      alt: model3.image.alt,
                      ratio: "aspect-[3/2]",
                      label: "3 : 2",
                      usage: "Загварын hero (таблет, утас)",
                    },
                    {
                      src: modelY.image.src,
                      alt: modelY.image.alt,
                      ratio: "aspect-[296/364.8]",
                      label: "≈ 4 : 5",
                      usage: "Загварын карт",
                    },
                    {
                      src: features[1].image.src,
                      alt: features[1].image.alt,
                      ratio: "aspect-[405.33/270]",
                      label: "3 : 2",
                      usage: "Онцлогийн карт",
                    },
                  ].map((img) => (
                    <figure key={img.usage} className="flex flex-col gap-3">
                      <div className={cx("relative w-full", img.ratio)}>
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <figcaption className="flex flex-col gap-1 text-sm text-body">
                        <span className="font-medium text-ink">{img.label}</span>
                        {img.usage}
                      </figcaption>
                    </figure>
                  ))}
                </div>
                <Specimen
                  tone="surface"
                  caption="Hero: бүтэн өргөн, 40% хар давхарга, цагаан текст"
                  code="bg-black/40"
                  flush
                >
                  <div className="relative flex aspect-[16/7] items-center justify-center overflow-hidden rounded-lg text-white">
                    <Image
                      src="/images/hero.jpg"
                      alt=""
                      fill
                      sizes="(min-width: 1101px) 960px, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative flex flex-col items-center gap-2 px-6 text-center">
                      <p className="text-sm font-semibold">Цахилгаан</p>
                      <p className="text-h5">Tesla-гаа сонгоорой</p>
                    </div>
                  </div>
                </Specimen>
              </GuideSection>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
