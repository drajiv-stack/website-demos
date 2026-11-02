# START HERE — Building the 3 export demo sites in Antigravity

Order: **Spices → Castings → Textiles.** Spices is the simplest; use it to time yourself. Textiles has the admin panel; do it last.

---

## 1. One-time setup (≈ 30 min)

### Repo
1. On GitHub (`dstack-rajivdudeja`), create a **private** repo: `export-demos`.
2. Clone it, unzip this kit into the repo root, commit: `chore: add agent kit`.
3. Open the folder in **Antigravity App** (custom subagents such as `reviewer` run in the App and CLI).
4. Check it loaded: Agent panel → … → Customizations → Rules should show `AGENTS.md`; Agents should show `reviewer`.

### Supabase (one project for all 3 demos)
1. In your org "exportdesi's Org", create a project `export-demos` (free tier is fine; region `ap-south-1` Mumbai).
2. SQL editor → paste and run `supabase/migrations/0001_init.sql`.
3. Authentication → Users → add your admin user (email + password). Copy its UUID.
4. SQL editor: `insert into public.admins (user_id) values ('<uuid>');`
5. Project Settings → API: copy the **Project URL** and the **publishable/anon key**. Never copy the secret/service_role key into the project.
6. Free projects pause after about a week without activity. Open the textiles admin weekly, or rely on the recorded demo video.

### Vercel (3 projects, 1 repo)
1. Upgrade to **Pro** before sharing links (Hobby is non-commercial only).
2. Add New Project → import `export-demos` three times. For each, set **Root Directory**: `spices`, `castings`, `textiles`.
3. Environment variables (all three): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_WHATSAPP_NUMBER` (optional, international format, digits only).
4. Domains: add `spices.<yourdomain>`, `castings.<yourdomain>`, `textiles.<yourdomain>`. Create the DNS record exactly as Vercel shows it at your registrar.

### Optional skills (recommended: GSAP only)
- Skills live in `.agents/skills/<name>/SKILL.md`.
- GSAP official skills: `npx skills add greensock/gsap-skills` → choose Antigravity as the target if offered; otherwise copy the skill folder into `.agents/skills/`.
- Impeccable (design polish) is optional. Use one style engine only.
- Read each SKILL.md before installing; community skills can include scripts.

### Before you start
- Decide your studio name for the footer and replace `[STUDIO NAME]` in `AGENTS.md`.
- Create `docs/build-log.md` (template included) and note your start time.

---

## 2. Prompts to paste (per demo)

Replace `<demo>` with `spices`, `castings` or `textiles`.

### Prompt A — Plan
```
Read AGENTS.md and briefs/<demo>.md. The brief is approved; do not re-grill me.
Write docs/<demo>/plan.md with: 3 invented company names for me to choose from; sitemap; every section with its one job; the motion plan table (element | trigger | duration | what it communicates); a Mermaid diagram of data flow (pages, Supabase tables, Vercel); an asset list with the source you will use for each image/video (licensed stock or AI-generated) and its target file size; and how you will keep the budget (LCP element, JS size estimate).
Do not write app code yet. Stop and wait for my approval.
```

### Prompt B — Build (after you approve the plan and pick a name)
```
Plan approved. Company name: <NAME>. Build the <demo>/ Next.js app exactly per docs/<demo>/plan.md and AGENTS.md.
Log the start time in docs/build-log.md now and the finish time when the build compiles.
Ship complete code: no TODOs, no lorem ipsum. Log every asset in docs/credits.md.
When the build passes locally, invoke the reviewer subagent on <demo>/ and save its findings to docs/<demo>/review-1.md.
```

### Prompt C — Fix loop
```
Fix every blocker and major in docs/<demo>/review-<n>.md, then invoke the reviewer again and save review-<n+1>.md. Stop after 3 loops and list anything still open.
```

### Prompt D — Ship
```
Reviewer verdict is SHIP. Commit with a clear message and push to main.
When the Vercel deployment is live, open the live URL in the browser and capture the 3 gallery screenshots per AGENTS.md into docs/gallery/<demo>/.
Report: live URL, Lighthouse mobile scores, LCP, CLS, initial JS size, and total build time from docs/build-log.md.
```

### If the reviewer subagent doesn't run (e.g. IDE extension)
Open a **new** conversation (fresh context, so it's still independent) and paste:
```
You are the reviewer defined in .agents/agents/reviewer.md. Follow it exactly. Do not edit any files. Review <demo>/ and return the findings table and verdict.
```

---

## 3. When all three are live
Send the 3 URLs and the gallery screenshots back to Claude. Next steps there:
1. Independent check of each live URL against the budget.
2. Upload gallery images to the draft Fiverr gig and add the demos to your profile portfolio.
3. Final review of the gig before you approve publishing.

## Watch-outs
- **Time per demo is the key number.** If one demo takes more than 4–5 hours of your time, the $150 Basic package needs a higher price or less scope.
- **Do not show these as client work.** Every footer says concept/fictional. Your gig promises "no fake reviews, logos or certificates".
- **Fewer, better effects.** One signature moment per site that runs smoothly on a mid-range phone impresses more than five that stutter.
