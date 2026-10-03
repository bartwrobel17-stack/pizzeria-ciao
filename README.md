# Pizzeria CIAO!

Premium landing page for Pizzeria CIAO!, Wrocław.

## Stack
Next.js 15 + React 19 + TypeScript + CSS. Ready for Vercel.

## Owner panel
The owner panel is intentionally implemented as a **local demo** for the first version. Demo password: `CIAO2026`.

Gallery uploads are stored in browser localStorage as data URLs, so they persist only in the same browser/device. The UI and data model are separated so a persistent backend such as Supabase Storage + database can be connected later without redesigning the public gallery.

For production authentication and persistent gallery management, replace the local login/storage functions in `app/page.tsx` with server-side auth and storage.

## Data
Address: Karczemna 1b, 54-067 Wrocław
Phone: 722 148 445
Rating: 4.8 / 833 Google reviews
Price: 20–40 zł / person
