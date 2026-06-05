# Phase 7 — Backend with Supabase MCP
## Creating Your Database and Backend Using AI with MCP

> **Phase goal:** Create a Supabase project, understand your database structure, and configure the Supabase MCP server so your AI editor can create and manage your database directly using natural language prompts.
>
> **Why this matters:** Your frontend looks great, but it's showing fake, hardcoded data. The backend is what makes it real — it stores actual user accounts, actual content, and lets users interact with the app. Supabase MCP (Model Context Protocol) is what makes this phase extraordinary: instead of writing SQL by hand, you describe your database to AI and it creates it for you.

---

## What Is Supabase?

Supabase is an open-source backend-as-a-service platform. It gives you:

- **PostgreSQL Database** — A powerful, production-grade relational database
- **Authentication** — Built-in user signup, login, OAuth (Google, GitHub, etc.)
- **Row Level Security (RLS)** — Database rules that control who can read/write what
- **Auto-generated APIs** — Instantly queries your database via REST or a JavaScript SDK
- **Real-time** — Live data subscriptions (optional)
- **Storage** — File storage for images and uploads (optional)

**Why Supabase for this course:**
- Free tier is generous enough for a real project
- Excellent JavaScript SDK that works in plain HTML/JS
- The MCP server integration means your AI can build your entire database
- Row Level Security means your data is protected without complex server code

---

## What Is MCP (Model Context Protocol)?

MCP is a protocol that allows AI assistants to connect to external tools and services. When you install a Supabase MCP server in your editor:

- Your AI assistant can **read** your database structure
- Your AI assistant can **create tables, run migrations, and execute SQL** on your behalf
- You describe what you want in plain English and the AI does the database work
- Everything happens in real-time without you switching between your editor and the Supabase dashboard

Think of MCP as giving your AI hands — instead of just telling you what to type, it can type it for you directly into your database.

---

## Part 1 — Create a Supabase Account and Project

### Step 1 — Sign Up for Supabase

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up with your GitHub account (recommended) or email
4. Verify your email if required

### Step 2 — Create a New Project

1. In the Supabase dashboard, click **"New project"**
2. Select your organization (usually your username)
3. Fill in the details:
   - **Project name:** Your app name (e.g., "my-event-app")
   - **Database password:** Generate a strong password and save it somewhere safe (password manager recommended)
   - **Region:** Choose the region closest to your users — for Rwanda, use **Europe West** (eu-west-1, London or Frankfurt are closest)
4. Click **"Create new project"**
5. Wait 1–2 minutes for the project to provision

### Step 3 — Note Your Project Credentials

After your project is ready, you'll need two pieces of information. Go to **Project Settings → API**:

1. **Project URL** — looks like: `https://xxxxxxxxxxxxxxxxxxxx.supabase.co`
2. **Anon Public Key** — a long string starting with `eyJ...`

**Important:** Also note the **project reference ID** — the part of your URL between `https://` and `.supabase.co`. You'll need this for MCP configuration.

Keep these safe. The anon key is safe to use in frontend code (it's designed to be public), but never expose your **service role key** in frontend code.

---

## Part 2 — Install the Supabase MCP Server

### How It Works

The Supabase MCP server connects your AI editor directly to your Supabase project. When your AI needs to create a table, run a query, or apply a migration, it sends the command through this connection — all from inside your editor chat.

The modern approach uses Supabase's **hosted remote MCP server** (`https://mcp.supabase.com/mcp`) with **OAuth authentication**, which means:
- No tokens to copy and paste
- No `npx` or Node.js required for the remote method
- Authentication happens in a browser window automatically

**Node.js is only required if you choose the local npm-based installation.** For the recommended remote approach, you can skip directly to Part 3.

---

## Part 3 — Configure MCP in Your Editor

The configuration steps differ between Antigravity and VS Code. Follow the section for your editor.

---

### Option A — Antigravity (Built-in MCP Store — Easiest)

Antigravity has a built-in **MCP Store** that lets you install Supabase MCP in one click — no JSON editing required.

**Step 1 — Open the MCP Store**

1. In Antigravity, look at the top of the **side panel** (the left sidebar)
2. Click the **"..."** (three-dot) menu
3. Select **"MCP Store"** from the dropdown

**Step 2 — Install Supabase**

1. In the MCP Store, search for **"Supabase"**
2. Click **"Install"** next to the Supabase listing
3. Follow the on-screen authentication prompts — Antigravity will open a browser window so you can log in to your Supabase account and grant access
4. Once authenticated, the Supabase server appears in your **Installed MCP Servers** list

**Step 3 — Verify**

In the Antigravity AI chat, type:
```
Can you list my Supabase tables?
```
If the connection works, the AI will list your tables (empty at this point is fine).

> **Troubleshooting:** If Supabase is not visible in the MCP Store, you can add it manually. Go to **Settings → Customizations → Open MCP Config** — this opens `mcp_config.json`. Add:
> ```json
> {
>   "mcpServers": {
>     "supabase": {
>       "serverUrl": "https://mcp.supabase.com/mcp"
>     }
>   }
> }
> ```
> **Important:** Antigravity uses `serverUrl` (not `url`) for remote servers. Save the file and restart the editor.

---

### Option B — VS Code with GitHub Copilot (One-Click Install)

VS Code supports MCP natively since version 1.102 (July 2025). The Supabase dashboard generates a pre-configured install link for you.

**Step 1 — Get Your One-Click Install Link From Supabase**

The easiest method is to use Supabase's interactive configuration panel:

1. Go to your [Supabase project dashboard](https://supabase.com/dashboard)
2. Select your project → click **"Connect"** at the top
3. Click the **"MCP"** tab
4. Select **"VS Code"** from the client dropdown
5. Click the **"Install in VS Code"** button — this opens VS Code and automatically configures the MCP server for your specific project

VS Code will prompt you to confirm the installation and then authenticate via a browser window.

**Step 2 — Manual Alternative (if the button doesn't work)**

If you prefer to configure manually, create a file called `.vscode/mcp.json` inside your project (create the `.vscode/` folder if it doesn't exist):

```json
{
  "servers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp"
    }
  }
}
```

> **Important:** VS Code uses the root key `"servers"` — **not** `"mcpServers"`. This is the most common configuration mistake when copying configs from Cursor or Claude Desktop.

**Step 3 — Authenticate**

1. Open the Command Palette: `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
2. Type **"MCP: List Servers"** and press Enter
3. Click the Supabase entry — VS Code will open a browser window for Supabase OAuth login
4. Log in and grant access

**Step 4 — Verify**

Open GitHub Copilot Chat (the chat panel) and type:
```
Can you list my Supabase tables using MCP?
```

---

### Option C — Manual / PAT-Based (Any Editor — Fallback)

If neither of the above methods works for your editor, use the Personal Access Token (PAT) approach. This also works with Claude Code, Cursor, and other MCP-compatible editors.

**Step 1 — Generate a PAT**

1. Go to [supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens)
2. Click **"Generate new token"**, name it `MCP Editor Token`
3. Copy the token immediately — you cannot see it again

**Step 2 — Create `.mcp.json`**

Create `.mcp.json` in your project root (this is the format used by Claude Code and Cursor):

```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR-PERSONAL-ACCESS-TOKEN"
      }
    }
  }
}
```

Replace `YOUR-PERSONAL-ACCESS-TOKEN` with the token you generated.

**Step 3 — Secure the file**

The `.mcp.json` contains a secret token. Add it to `.gitignore` immediately:

```bash
echo ".mcp.json" >> .gitignore
```

---

### Verifying the Connection Works (All Methods)

In the AI chat panel, type:

```
Can you list my Supabase tables using the MCP server?
```

The AI will respond with your table list. If your database is brand new, it will say the database is empty — that is correct. You haven't created tables yet.

If it fails, see the troubleshooting section at the end of this guide.

---

## Part 5 — Design Your Database Schema

Before creating tables, you need to plan what data your app stores. This is your **database schema** — the structure of all your tables and how they relate.

### Identify Your Core Data Objects

From your planning documents in Phase 1, identify your main "things":

**For an event platform:**
- Users (managed by Supabase Auth)
- User Profiles (extra info about users)
- Events (the main content)
- Organizers (who creates events)
- Categories (types of events)
- RSVPs (who is attending what)

**For a job board:**
- Users
- User Profiles
- Job Listings
- Companies
- Applications

**For a marketplace:**
- Users
- User Profiles
- Listings
- Categories
- Orders/Inquiries

### Write the Schema Design Prompt

Use this TCREI prompt (with the critical review gate):

```
[T]ask: Design a relational database schema for [YOUR APP NAME] and show it
to me BEFORE creating anything. You are a Staff Database Architect experienced
with PostgreSQL and Supabase with deep knowledge of RLS policy design.
Output: ER diagram + markdown table summary first; only create after my approval.

[C]ontext: Main data objects: [LIST YOUR TABLES — e.g., users via Supabase Auth,
user_profiles, events, organizers, categories, rsvps, saved_items].
Users managed via Supabase Auth. Database: PostgreSQL on Supabase.
RLS required on all tables. Use snake_case for all names.

[R]eferences:
- [MAIN TABLE].status: ENUM with values [draft, published, archived]
- user_profiles links to auth.users: id UUID REFERENCES auth.users(id)
- All PKs: UUID DEFAULT gen_random_uuid()
- All timestamps: TIMESTAMPTZ DEFAULT NOW()
- Show schema as: 1) Mermaid ER diagram, 2) markdown table (name, columns, types, FKs)
- WAIT for my explicit "approved" before running any SQL
- After approval: use apply_migration via MCP for all tables, ENUMs, triggers,
  indexes, and RLS policies
- RLS must ensure: public reads [YOUR PUBLIC CONTENT]; users edit only their own
  data; [CONTENT CREATORS] insert/update only their own [CONTENT]
```

### Rwanda Academic Hub Schema Example

For reference, here is a summary of the 19-table schema built for Rwanda Academic Hub:

| Table | Purpose |
|-------|---------|
| `user_profiles` | Extended user data linked to Supabase auth |
| `universities` | Directory of Rwandan universities |
| `organizers` | Event hosts (clubs, faculties, departments) |
| `cities` | Location taxonomy |
| `venues` | Physical event locations |
| `event_categories` | Category taxonomy with color coding |
| `events` | Core event records with status ENUMs |
| `event_speakers` | Speakers attached to events |
| `event_agenda_items` | Schedule items for events |
| `rsvps` | User attendance intent |
| `saved_events` | User bookmarks |
| `organizer_follows` | Users following organizers |
| `university_follows` | Users following universities |
| `user_interests` | User category preferences |
| `flag_reports` | Content moderation reports |
| `verification_requests` | Organizer verification workflow |
| `notifications` | User notification system |
| `featured_collections` | Curated event collections |
| `audit_logs` | Change history |

---

## Part 6 — Create Your Database via MCP

Once you've reviewed and approved your schema, ask the AI to create it:

```
The schema looks good. Approved.
Please now use the Supabase MCP apply_migration tool to create all tables,
ENUMs, triggers, and RLS policies as we designed.
Name the migration "initial_schema".
```

The AI will:
1. Generate the SQL for each table
2. Use the `apply_migration` MCP tool to run it on your Supabase project
3. Report back on each table as it's created

You can verify in the Supabase dashboard: go to **Table Editor** and you should see all your tables.

---

## Part 7 — Add Seed Data

Your database is empty. Seed data gives you realistic content to test with.

```
[T]ask: Generate a SQL seed migration for [YOUR APP NAME] to populate
the initial reference data tables. You are a Database Administrator
populating realistic seed data for a web platform.
Output: SQL statements shown first; only execute via MCP apply_migration after my approval.

[C]ontext: Tables that need seed data:
- [TABLE 1 — e.g., categories: seed with your app's categories]
- [TABLE 2 — e.g., cities: seed with relevant cities]
- [TABLE 3 — e.g., universities: seed with real institutions]
Migration name: "seed_reference_data". Show SQL, wait for my "approved".

[R]eferences:
- Categories: [LIST 5-8 REAL CATEGORIES FOR YOUR APP]
- [LOCATION TABLE]: [LIST 5-6 REAL LOCATIONS]
- Use INSERT ... ON CONFLICT DO NOTHING for idempotency (safe to run multiple times)
- Use realistic, accurate data — not placeholder text like "Category 1"
```

---

## Part 8 — Verify Your Backend

Check that everything is working:

1. Go to your Supabase project dashboard
2. Click **Table Editor** — you should see all your tables
3. Click a table (e.g., `categories`) — you should see your seed data
4. Click **Authentication** — the auth system is already configured
5. Click **API** — you can see the auto-generated API endpoints for your tables

---

## Troubleshooting MCP Connection Issues

**Antigravity — Supabase not appearing in the MCP Store:**
- Make sure Antigravity is updated to version 1.23.2 or later (the Supabase listing was fixed in that version)
- Try the manual `mcp_config.json` approach as a fallback (see Option A above)
- Remember to use `serverUrl` (not `url`) in Antigravity's config

**VS Code — "MCP server not connecting":**
- Confirm your VS Code is version 1.102 or later (MCP went GA in that release)
- Make sure the config is in `.vscode/mcp.json` with the root key `"servers"` (not `"mcpServers"`)
- Open the Command Palette → **"MCP: List Servers"** to see the server status
- If prompted to authenticate, complete the browser OAuth flow

**All editors — "Authentication failed":**
- For OAuth: try disconnecting and re-authenticating via the Command Palette
- For PAT-based setup: your token may have expired — generate a new one at [supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens)

**"Cannot read tables" (connection works but queries fail):**
- Check the Supabase dashboard to confirm tables exist
- Verify RLS policies are not blocking the MCP server's queries (the PAT approach bypasses RLS for schema operations, which is correct)

**The AI says it can't use MCP tools:**
- Make sure you're asking in the AI chat panel (not the inline editor)
- Try: Command Palette → **"MCP: Restart"** and re-ask

---

## Checklist — You Are Ready to Move to Phase 8 When:

- [ ] You have a Supabase project created and accessible in the dashboard
- [ ] Supabase MCP is connected in your editor (Antigravity MCP Store installed, or VS Code configured)
- [ ] You can ask the AI "list my Supabase tables" and get a response
- [ ] Your database schema is created (all tables visible in Supabase dashboard)
- [ ] Seed/reference data is populated (categories, cities, etc.)
- [ ] You understand the difference between the anon key (safe for frontend) and the service role key (never expose)
- [ ] If you used the PAT method: `.mcp.json` is listed in your `.gitignore`

---

*Next: [Phase 8 — Wiring Frontend to Backend](08-WIRING-FRONTEND-TO-SUPABASE.md)*
