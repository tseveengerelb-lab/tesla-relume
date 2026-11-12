# Tesla Улаанбаатар

Tesla-гийн Model 3, Model Y, Cybertruck, Roadster загваруудыг танилцуулах, харьцуулах, захиалга авах монгол хэлтэй вэб сайт. Дизайныг Figma (Relume) дээр гаргасан.

**Технологи:** Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript.

## Эхлүүлэх

Node.js 20.9 буюу түүнээс шинэ хувилбар шаардлагатай.

```bash
npm install
npm run dev      # http://localhost:3000
```

| Команд          | Үүрэг                                        |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Хөгжүүлэлтийн сервер                         |
| `npm run build` | Production build (TypeScript шалгалт орсон) |
| `npm run start` | Build хийсэн хувилбарыг ажиллуулах           |

## Өгөгдлийн сан (Supabase)

Нүүр хуудасны машины картууд (нэр, тайлбар, үнэ, зураг) Supabase-ийн `models` хүснэгтээс уншигдана.

1. supabase.com дээр project үүсгэнэ.
2. **SQL Editor** дээр `supabase/migrations/20261112000000_create_models.sql`-ийн агуулгыг ажиллуулна. Хүснэгт, унших эрх (RLS), эхний 4 мөр үүснэ.
3. Зураг: **Storage → New bucket** хэсэгт `images` нэртэй **Public** bucket үүсгэж, `public/images/` хавтсыг бүхэлд нь чирж оруулна (файлууд bucket доторх `images/` хавтсанд орно). Дараа нь `supabase/migrations/20261112000100_card_images_storage.sql`-ийг SQL Editor дээр ажиллуулна. Шинэ зураг солихдоо файлаа bucket-ийн `images/` хавтсанд хийгээд `models.image_url`-д түүний public URL-ийг (**Get URL**) бичнэ.
4. `.env.example`-ийг `.env.local` нэрээр хуулж, **Project Settings → API Keys** хэсгээс URL болон publishable key-г бөглөнө.
5. Vercel дээр **Settings → Environment Variables** хэсэгт ижил хоёр хувьсагчийг нэмээд Redeploy хийнэ.

Supabase тохируулаагүй эсвэл холбогдож чадахгүй үед сайт `data/models.ts`-ийн өгөгдлийг ашиглаж, server log-д анхааруулга бичнэ. Сан дахь өөрчлөлт нүүр хуудсанд 1 минутын дотор гарна (`revalidate = 60`).

### Admin хуудас (`/admin`)

Картын нэр, тайлбар, үнэ, зураг, дарааллыг сайт дээрээс засна. Хадгалмагц нүүр хуудас шууд шинэчлэгдэнэ.

1. **SQL Editor** дээр `supabase/migrations/20261112000200_admin.sql`-ийг ажиллуулна. `admins` хүснэгт, засах болон зураг upload хийх эрх (RLS) үүснэ.
2. **Authentication → Users → Add user → Create new user**: и-мэйл, нууц үг оруулж **Auto Confirm User**-ийг чагтална.
3. Тэр файлын төгсгөлд байгаа `insert into public.admins ...` мөрийг өөрийн и-мэйлээр бөглөж ажиллуулна.
4. **Authentication → Sign In / Providers** хэсэгт **Allow new users to sign up**-ийг унтраавал зөвхөн таны нэмсэн хүн бүртгэлтэй байна.

Нэвтрэлт Supabase Auth-ийн cookie-гээр явагдана (`lib/supabase-auth.ts`, `proxy.ts`). Admin биш хэрэглэгч нэвтэрсэн ч RLS-ийн улмаас юу ч засаж чадахгүй.

## Хуудаснууд

| Хаяг          | Файл                    |
| ------------- | ----------------------- |
| `/`           | `app/page.tsx`          |
| `/model-3`    | `app/[slug]/page.tsx`   |
| `/model-y`    | `app/[slug]/page.tsx`   |
| `/cybertruck` | `app/[slug]/page.tsx`   |
| `/roadster`   | `app/[slug]/page.tsx`   |
| `/style-guide` | `app/style-guide/page.tsx` — загварын заавар (хайлтын системд индекслэгдэхгүй) |

Загвар бүрийн хуудсыг нэг route үүсгэдэг. Бүх хуудас build хийх үед static HTML болно. Хуучин `model-3.html` гэх мэт хаягууд `next.config.ts` дахь redirect-ээр шинэ хаяг руу шилжинэ.

## Хавтасны бүтэц

```
app/
  layout.tsx          Inter фонт, Navbar, metadata
  page.tsx            Нүүр хуудас
  [slug]/page.tsx     Загварын хуудас
  globals.css         Tailwind token-ууд болон цөөн тусгай CSS
components/
  ui/                 Button, Section, SectionTitle, Stat, BoolIcon
  layout/             Navbar, NavLinks (цорын ганц client component)
  home/               Hero, VehicleGrid, ProductCard, ModelShowcase
  model/              ModelHero, StatsRow, TrimGrid
  shared/             CompareTable, Features, TestDriveCta, OrderForm, MediaSplit
data/
  models.ts           Загваруудын өгөгдөл
  content.ts          Нүүр хуудасны болон хуваалцсан текст
  types.ts            Өгөгдлийн төрлүүд
public/
  images/, icons/     Зураг, дүрс
```

## Контент засах

Текст, үнэ, үзүүлэлтийг component дотор биш, `data/` хавтсанд засна.

- **Нүүр хуудасны машины карт:** Supabase-ийн `models` хүснэгтэд засна (Table Editor).
- **Загварын хуудасны үнэ, хувилбар, үзүүлэлт:** `data/models.ts`. Загварын хуудас, navbar эндээс өгөгдлөө авна.
- **Шинэ загвар нэмэх:** `models` массивт шинэ объект нэмнэ. Хуудас, navbar-ийн холбоос, нүүр хуудасны карт автоматаар үүснэ. Зургийг `public/images/`-д хийнэ.
- **Хэсгүүдийг нуух:** `trims`, `specs` байхгүй бол тэр хэсэг харагдахгүй. `showFeatures: true` бол "Онцлог" хэсэг гарна. `preorder: true` бол туршиж жолоодох хэсэг нуугдаж, захиалга урьдчилсан захиалга болно (Roadster).
- **Нүүр хуудасны загварын хэсгүүд, онцлог, харьцуулах хүснэгт, туршиж жолоодох алхмууд:** `data/content.ts`.

## Загвар (styling)

Бүх token, товч, форм, компонентыг `/style-guide` хуудаснаас харна. Token-ийн утга өөрчлөгдвөл `data/design-tokens.ts` дахь тайлбарыг мөн шинэчилнэ.

Өнгө, фонтын хэмжээ, зай зэрэг token-ууд `app/globals.css`-ийн `@theme` хэсэгт байна.

| Token                          | Жишээ класс                      |
| ------------------------------ | -------------------------------- |
| Өнгө: `ink`, `body`, `accent` (indigo), `surface`, `line`, `muted` | `text-body`, `bg-accent` |
| Гарчиг: `h1`, `h2`, `h5`, `h6` | `text-h1`                        |
| Зай: `page`, `section`         | `px-page`, `py-section`          |
| Өргөн: `content`, `title`, `form` | `max-w-content`               |

- **Breakpoint:** `md` = 768px, `lg` = 1101px. Эдгээр нь Tailwind-ийн анхдагч утгаас өөр бөгөөд анхны дизайны 767px ба 1100px хязгаарт таарна.
- **Responsive token:** гарчгийн хэмжээ болон зай `@layer base` доторх media query-д багасдаг. Тиймээс `text-h1`, `px-page` зэрэг класс жижиг дэлгэц дээр өөрөө зохицно.
- **Нэр давхцахаас болгоомжил:** `--spacing-*` болон `--container-*` token-д ижил нэр бүү өг. Жишээ нь `--container-page` гэж нэрлэвэл `max-w-page` нь `--spacing-page` (64px)-ийг авч, layout эвдэрнэ.
- **Tailwind-аар илэрхийлэхэд хэцүү хэсгүүд** `globals.css`-д энгийн CSS хэлбэрээр байна. Үүнд navbar-ийн scroll хийхэд бүдгэрдэг эффект (`.navbar-frost`) болон textarea-ийн булангийн дүрс (`.textarea-grip`) орно.

## Мэдэгдэж буй онцлогууд

Дараах зүйлсийг Figma дизайнд байгаагаар нь үлдээсэн. Засах шийдвэр гараагүй байна.

- Нүүр хуудасны Roadster хэсэгт Roadster-ийн зураг байгаа ч текст нь Model 3-ынх (`data/content.ts`, `showcases`).
- Нүүр хуудасны харьцуулах хүснэгтэд 2 загварын толгой байгаа ч утгын багана 3 байна (`homeCompare`).
- Шуудангийн кодны талбар нь 180px өндөр textarea.
- Харьцуулах хүснэгтийн доорх хоёр "Товч" товч placeholder.
- Захиалгын форм хаашаа ч илгээгддэггүй (`action="#"`). Backend холбоогүй.
