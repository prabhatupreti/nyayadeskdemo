# NyayaDesk — न्याय Desk Legal ERP Demo

A fully static demo of **NyayaDesk**, a Nepali Legal ERP system for law firms. No database required — all data is pre-loaded from `lib/static-data.ts`.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/auth` to pick a demo user.

## Demo Users

| Name | Role | Email |
|------|------|-------|
| Rajesh Sharma | Admin | rajesh@nyayadesh.com |
| Priya Adhikari | Lawyer | priya@nyayadesh.com |
| Bikash Thapa | Lawyer | bikash@nyayadesh.com |
| Sunita Karki | Staff | sunita@nyayadesh.com |
| Ram Bahadur KC | Client | ram@gmail.com |
| Sita Devi Rai | Client | sita@gmail.com |
| Dipesh Magar | External Lawyer | dipesh@lawfirm.com |
| Anita Tamang | Waris | anita@gmail.com |

Switch between roles anytime using the **floating role-switcher button** (bottom-right corner of the dashboard).

## Static Data Summary

All demo data lives in `lib/static-data.ts`:

- **12 Cases** — Property, Criminal, Family, Contract, Labor, Administrative, Banking, Tax
- **14 Pesi entries** — Dainik, Saptahik, and Purak Pesi Suchi
- **8 Court Decisions** — Faisala, Antarim Aadesh, Khardaj, Sunauwat
- **6 Meetings** — Online and in-person, with attendees
- **39 Master Data entries** — Case types, courts, judges, tarek types
- **10 Users** — Across all 6 roles

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Dashboard | `/dashboard` | Overview: pesi today, decisions, case stats |
| Cases | `/cases` | Filterable list of all cases |
| Case Detail | `/cases/[id]` | Tabs: Overview, Pesi, Decisions, Documents |
| Pesi Dairy | `/pesi` | Virtual pesi diary — Dainik / Saptahik / Purak |
| BS Calendar | `/calendar` | Bikram Sambat calendar with events |
| Meetings | `/meetings` | Online and in-person meetings |
| Users & Roles | `/users` | RBAC matrix + user management (Admin only) |
| Templates | `/templates` | 12 legal document templates |
| Master Data | `/masterdata` | Admin dropdown config (Admin only) |

## Role-Based Access

The floating role-switcher lets you explore the system from any user's perspective. Admin users see the full sidebar (Users & Roles, Master Data). Lawyers see their assigned cases. Clients see only their own cases.

## No Supabase Needed

The `lib/queries.ts` file returns static data directly. Supabase is disabled in demo mode. To connect a real database, fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` and restore the original `queries.ts` logic.
