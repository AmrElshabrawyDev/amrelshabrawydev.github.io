---
title: "WordPress to Next.js Migration Without Losing SEO"
description: "A step-by-step checklist to migrate a WordPress site to Next.js while keeping your Google rankings — URLs, metadata, redirects, sitemaps and monitoring."
date: "2026-09-26"
lang: "en"
tags: ["Next.js", "WordPress", "SEO", "Migration"]
---

Moving from WordPress to Next.js can make your site dramatically faster and easier to secure. But a careless migration can also wipe out years of Google rankings in a few weeks. The difference is almost never the framework — it's whether the migration protects the things Google already knows about your site.

I recently rebuilt a crashed WordPress site for a moving company in Kuwait that had **182 Arabic articles indexed on Google**. Those pages were the company's main source of calls, so losing them wasn't an option. This is the checklist I follow. (You can read the [full case study here](/work/al-amal-furniture-moving-kuwait).)

## Why migrate at all?

Common reasons business owners come to me:

- The site is **slow** because of heavy themes and too many plugins.
- It keeps getting **hacked** or breaking after updates.
- It's **down**, and the old developer is gone.
- They need features WordPress makes awkward: a custom dashboard, a web app, or a truly custom design.

If your WordPress site is fast, secure and does its job, you may not need to migrate. Migration is a tool, not a goal.

## Step 1: Build a complete URL inventory

Before writing any code, list **every URL that exists today**. Combine several sources, because each one misses something:

- Your XML sitemap (`/sitemap.xml` or `/sitemap_index.xml`).
- Google Search Console → *Pages* report (indexed URLs) and *Performance* report (URLs that get clicks).
- A crawl of the live site.
- The Web Archive, if the site is already down — that's how I recovered the Kuwait project's content.

Mark each URL with its clicks and impressions. Those are the pages you **must not lose**.

## Step 2: Keep the same URLs whenever possible

The safest redirect is no redirect. Next.js dynamic routes can serve your existing slugs exactly — including Arabic slugs like `/فني-تركيب-اثاث-ايكيا-الكويت/`.

Things to match carefully:

- **Trailing slashes.** WordPress usually uses them. Set `trailingSlash` in `next.config` to match, or every URL changes.
- **Encoding.** Store Arabic slugs decoded and use `decodeURIComponent` when looking them up.
- **Category and date prefixes** such as `/blog/2023/05/post-name/`.

## Step 3: Migrate the SEO data, not just the text

For every page, carry over:

- The `<title>` and meta description (from Yoast or Rank Math fields, not just the post title).
- Headings (H1/H2 structure).
- Image `alt` text and image file URLs if they get image-search traffic.
- Internal links — update them to the final URLs so they don't go through redirects.

Then add what WordPress often did poorly: a **self-referencing canonical URL** on every page, and **structured data** (for a local business: `LocalBusiness`, `Service` and `BreadcrumbList`).

## Step 4: Redirect only what must change

Some URLs will have to change (tag archives, `?p=123` links, attachment pages). For those:

- Use **301 (permanent) redirects**, one hop, straight to the most relevant new page.
- Never redirect everything to the homepage — Google treats that like a 404.
- Keep a spreadsheet of old URL → new URL so you can check it after launch.

## Step 5: Match or beat the old performance

Next.js makes this the easy part, but check it anyway:

- Use `next/image` for responsive, lazy-loaded images.
- Use `next/font` to self-host fonts and avoid layout shift.
- Pre-render pages (static generation) so they load instantly.

Run Lighthouse on the old and new versions of your top pages. The new ones should be faster.

## Step 6: Give the client an easy way to publish

A migration fails quietly when the owner can't update the site anymore. Either connect a headless CMS or build a simple admin panel. For the Kuwait project I built a custom admin so the owner can publish articles without touching the database.

## Step 7: Launch checklist

- [ ] Every URL from the inventory returns **200** or a single **301**.
- [ ] No `noindex` left over from the staging site.
- [ ] `robots.txt` allows crawling and points to the new sitemap.
- [ ] New XML sitemap submitted in Search Console.
- [ ] Search Console verification kept (same meta tag or DNS record).
- [ ] Analytics installed and tracking conversions (calls, WhatsApp clicks, forms).

## Step 8: Monitor for 4–8 weeks

Rankings often wobble for a few days after a migration — that's normal. What you're watching for:

- **Coverage errors** in Search Console (404s, redirect errors).
- A **sustained drop** in clicks for specific pages → compare old vs. new content for those URLs.
- Crawl stats returning to normal.

## The short version

1. Inventory every URL.
2. Keep URLs identical wherever you can.
3. Move titles, descriptions and content exactly.
4. Redirect the rest with single-hop 301s.
5. Launch clean, then monitor.

Thinking about moving your WordPress site to Next.js? [Tell me about your site](/contact) — I'll review it and tell you honestly whether a migration is worth it, and what it would take. See the [services I offer](/services) for more details.
