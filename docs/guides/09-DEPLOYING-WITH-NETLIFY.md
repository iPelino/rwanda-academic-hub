# Phase 9 — Deploying with Netlify MCP
## Putting Your App Live on the Internet

> **Phase goal:** Deploy your completed application to a live public URL using Netlify, with everything working — real authentication, real database, real data.
>
> **Why this matters:** An app that only runs on your laptop is not a real app. Deployment is what takes your project from "something I built" to "something people can actually use." With Netlify MCP, you can deploy and manage your live site directly from your AI editor — no separate deployment dashboard needed.

---

## What Is Netlify?

Netlify is a cloud platform that hosts web applications. For static HTML/CSS/JavaScript projects like yours, it:

- Serves your files from a global CDN (Content Delivery Network) — fast, worldwide
- Gives you a free subdomain (`your-app.netlify.app`) immediately
- Supports custom domains if you have one
- Handles HTTPS (secure connection) automatically
- Re-deploys automatically when you push to GitHub
- Has a generous free tier — more than enough for your project

**Why Netlify for this course:**
- Zero configuration required for static sites
- Free tier covers everything you need
- MCP integration allows AI-assisted deployment
- Works perfectly with Supabase backends

---

## Part 1 — Pre-Deployment Checklist

Before deploying, make sure these are ready:

### 1. Update Your Supabase Auth Settings

Your Supabase project needs to know about your production URL so OAuth and email redirects work correctly.

In your Supabase project: go to **Authentication → URL Configuration**

You'll update this with your actual Netlify URL after you deploy. For now, note that you'll need to come back here.

### 2. Check Your HTML Links

All links in your HTML should work with both relative and root-relative paths:

**Good (root-relative — works on Netlify):**
```html
<a href="/pages/auth/sign-in.html">Sign In</a>
<script src="/assets/js/auth.js"></script>
```

**Risky (relative — may break depending on page depth):**
```html
<a href="../auth/sign-in.html">Sign In</a>
<script src="../../assets/js/auth.js"></script>
```

Check all your `href`, `src`, and `import` paths. Root-relative paths (starting with `/`) are safest on Netlify.

### 3. Remove Any Hardcoded Development URLs

Search your code for any `localhost` references:
```bash
grep -r "localhost" assets/
```

Replace any with the correct relative or Supabase URLs.

### 4. Create a `_redirects` File (Important for SPAs)

Create a file called `_redirects` in your project root (no extension) with this content:

```
/*    /index.html    200
```

This tells Netlify to serve `index.html` for any URL that doesn't match a file — important if users bookmark a specific page URL.

**Note:** For a multi-page static HTML app like yours (not a React SPA), you may not need this. But it's a good practice.

### 5. Final Git Commit

Before deploying, commit everything:

```bash
git add .
git commit -m "chore: pre-deployment cleanup and path fixes"
git push
```

---

## Part 2 — Create a Netlify Account

If you don't have a Netlify account:

1. Go to [netlify.com](https://netlify.com)
2. Click **"Sign up"**
3. Sign up with GitHub (recommended — enables automatic deployment from your repo)
4. Authorize Netlify to access your GitHub

---

## Part 3 — Install the Netlify MCP Server

The installation method depends on which editor you are using. Follow your editor's section below.

---

### Option A — Antigravity (Built-in MCP Store — Easiest)

Antigravity's built-in MCP Store includes Netlify. The process is identical to how you installed Supabase in Phase 7:

1. Click **"..."** at the top of the side panel → **"MCP Store"**
2. Search for **"Netlify"**
3. Click **"Install"**
4. Follow the authentication prompts — log in to your Netlify account when the browser window opens
5. Once installed, Netlify tools are available in the AI chat

---

### Option B — VS Code (One-Click Install — Recommended)

VS Code has a one-click install button for Netlify MCP. Click this link in your browser while VS Code is open:

**[Install Netlify MCP in VS Code](https://insiders.vscode.dev/redirect/mcp/install?name=netlify&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40netlify%2Fmcp%22%5D%7D)**

VS Code will ask you to confirm the installation. Click **Allow**. The Netlify MCP server is then ready.

**Alternatively, add it manually** to your `.vscode/mcp.json` (the same file you used for Supabase):

```json
{
  "servers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp"
    },
    "netlify": {
      "command": "npx",
      "args": ["-y", "@netlify/mcp"]
    }
  }
}
```

---

### Option C — Manual / PAT-Based (Any Editor — Fallback)

**Prerequisites — Install Node.js and Netlify CLI**

```bash
node --version      # check if Node.js is installed
npm install -g netlify-cli
netlify login       # authenticate via browser — no PAT needed after this
```

Once logged in via `netlify login`, the Netlify MCP server uses your CLI session automatically:

```json
{
  "mcpServers": {
    "netlify": {
      "command": "npx",
      "args": ["-y", "@netlify/mcp"]
    }
  }
}
```

**If you need a PAT instead of CLI login** (e.g., in CI or if `netlify login` is not working):

1. Go to [app.netlify.com/user/applications#personal-access-tokens](https://app.netlify.com/user/applications#personal-access-tokens)
2. Click **"New access token"**, name it `MCP Editor Token`, set expiration 1 year, copy it immediately
3. Add the token to your config:

```json
{
  "mcpServers": {
    "netlify": {
      "command": "npx",
      "args": ["-y", "@netlify/mcp"],
      "env": {
        "NETLIFY_PERSONAL_ACCESS_TOKEN": "YOUR-NETLIFY-PAT"
      }
    }
  }
}
```

> **Security:** If using the PAT approach, add `.mcp.json` to your `.gitignore` to prevent accidentally committing your token.

---

### Verify Netlify MCP is Connected

In the AI chat panel, type:

```
Can you list my Netlify sites using the MCP server?
```

If connected, the AI will list your sites (or say you have none yet — that's expected before first deploy).

---

## Part 4 — Deploy Your App Using MCP

Now you'll deploy your project to Netlify from the AI chat. This is where MCP makes deployment easy.

### Option A — Deploy from GitHub (Recommended)

This method connects your GitHub repository to Netlify so every `git push` automatically re-deploys your site.

```
Using the Netlify MCP server, create a new Netlify site connected to my
GitHub repository at https://github.com/[YOUR-USERNAME]/[YOUR-REPO-NAME].

Configure it to:
- Deploy from the main branch
- Build command: (leave empty — this is a static HTML site, no build needed)
- Publish directory: . (root of the repository)
- Site name: [YOUR-PREFERRED-SUBDOMAIN] (becomes your-name.netlify.app)
```

The AI will:
1. Use the Netlify MCP to create a new site
2. Connect it to your GitHub repo
3. Trigger the first deployment
4. Return your live URL

### Option B — Manual Deploy (Without GitHub)

If you're not using GitHub, or want a quick one-time deploy:

```
Using the Netlify MCP server, deploy my project to a new Netlify site.
The project is in the current directory. This is a static HTML site
with no build process needed. The publish directory is the project root.
Suggest a site name based on [YOUR APP NAME].
```

### Option C — Direct Deploy via Netlify Drop (Simplest, No MCP)

If MCP is not working, use Netlify's drag-and-drop deploy:

1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag your entire project folder (not the ZIP, the extracted folder) onto the page
3. Netlify deploys it and gives you a URL immediately
4. To make it permanent, sign up/in and claim the site

---

## Part 5 — Access Your Live App

After deployment, Netlify gives you a URL like:
`https://random-name-123456.netlify.app`

Or if you set a custom name:
`https://your-app-name.netlify.app`

Open this URL in your browser. Your app is live on the internet.

---

## Part 6 — Update Supabase for Production

Now that you have a real URL, update Supabase to recognize it.

### Update Auth Redirect URLs

1. Go to Supabase → **Authentication → URL Configuration**
2. **Site URL:** Set to your Netlify URL (`https://your-app.netlify.app`)
3. **Redirect URLs:** Add these:
   - `https://your-app.netlify.app`
   - `https://your-app.netlify.app/pages/auth/oauth-callback.html`
   - `https://your-app.netlify.app/**` (wildcard for all pages)
4. Save

### Update Google OAuth Callback URL (If You Set Up Google Login)

1. Go to [console.cloud.google.com](https://console.cloud.google.com) → Credentials
2. Find your OAuth Client ID
3. Add to "Authorized redirect URIs": `https://your-project-ref.supabase.co/auth/v1/callback`
4. Also add your Netlify domain to "Authorized JavaScript origins": `https://your-app.netlify.app`
5. Save

---

## Part 7 — Test Your Live App End to End

Go through the full user journey on your live URL:

### Sign-Up Flow
- [ ] Visit `https://your-app.netlify.app/pages/auth/sign-up.html`
- [ ] Create a new account
- [ ] Check that you receive a verification email
- [ ] Verify your email and confirm you're redirected correctly

### Sign-In Flow
- [ ] Visit the sign-in page
- [ ] Sign in with your test account
- [ ] Confirm the navbar shows your user info
- [ ] Navigate to a few pages — confirm you stay logged in

### Core Functionality
- [ ] Visit the homepage — confirm real data loads from Supabase
- [ ] Visit a content detail page — confirm it shows real data
- [ ] Test a user action (bookmark, RSVP, etc.) — confirm it saves to the database
- [ ] Sign out — confirm the navbar reverts to showing "Sign In"

### Checklist for Each Page
- [ ] No JavaScript errors in browser console (F12)
- [ ] All images load correctly
- [ ] All links work
- [ ] Looks correct on mobile (test by resizing the browser or using DevTools)

---

## Part 8 — Configure Continuous Deployment

If you connected your GitHub repo, Netlify automatically re-deploys when you push. Test this:

1. Make a small change to your app (e.g., fix a typo in the footer)
2. Commit and push:
   ```bash
   git add .
   git commit -m "fix: correct footer copyright text"
   git push
   ```
3. Go to your Netlify dashboard → Deploys
4. Watch the deployment run (takes 30–60 seconds)
5. Refresh your live URL and confirm the change appears

This is **continuous deployment** — your live app stays up to date automatically.

---

## Part 9 — Setting Up a Custom Domain (Optional)

If you have a domain name (e.g., `myapp.rw` or `myapp.com`):

**Using Netlify MCP:**
```
Using the Netlify MCP server, configure a custom domain for my site
[SITE-NAME].netlify.app. The domain I want to use is [YOUR-DOMAIN].
What DNS records do I need to add?
```

**Manual steps:**
1. Go to Netlify → Site Settings → Domain Management
2. Click "Add custom domain"
3. Enter your domain
4. Add the DNS records Netlify shows you to your domain registrar
5. Wait for DNS propagation (can take up to 24 hours)
6. HTTPS is provisioned automatically

---

## Part 10 — Managing Your Deployment with MCP

Now that your site is deployed, you can manage it from the AI chat using Netlify MCP:

**List your deployments:**
```
List my recent Netlify deployments and their status.
```

**Roll back to a previous deployment:**
```
My last deployment broke something. Roll back to the previous deployment
for site [SITE-NAME].netlify.app.
```

**Check deployment logs:**
```
Show me the build logs for my last Netlify deployment.
```

**Update environment variables:**
```
Add an environment variable FEATURE_FLAGS=true to my Netlify site
[SITE-NAME].netlify.app in the production context.
```

---

## Troubleshooting Common Deployment Issues

**"Page not found" for URLs that work locally:**
- Root-relative paths (starting with `/`) work on Netlify
- Double-check all `href` and `src` attributes in your HTML
- Add the `_redirects` file if you're using client-side routing

**Supabase auth not working on live site:**
- Check that your Netlify URL is added to Supabase Auth redirect URLs
- Check that your Google OAuth credentials (if used) include the production URL

**JavaScript modules not loading:**
- Netlify serves files with correct MIME types — but check that all `<script type="module">` tags point to valid paths
- Open DevTools → Network tab and look for 404 errors on JS files

**Styles/fonts not loading:**
- Check Google Fonts CDN links in your HTML — they should use `https://`, not `http://`
- Check that Tailwind CSS CDN link is correct

**"Build failed" in Netlify:**
- If you configured a build command but your project is static, set the build command to empty
- Check the deploy log in Netlify dashboard for the specific error

---

## Your App Is Live — What's Next?

Congratulations — you have built and deployed a real, full-stack web application using AI. Take a moment to appreciate what you've accomplished:

- ✅ Defined a product concept with real user needs
- ✅ Designed a professional UI using AI
- ✅ Built a complete multi-page frontend with HTML, CSS, and JavaScript
- ✅ Created a relational database with security policies
- ✅ Wired a real backend using Supabase
- ✅ Deployed to the internet for anyone to use

### Ideas for What to Do Next

**Improve the UX:**
- Add real-time notifications using Supabase real-time subscriptions
- Add image upload for user-created content using Supabase Storage
- Add email notifications using Supabase Edge Functions

**Grow the platform:**
- Share your URL with potential users and gather feedback
- Add analytics (Netlify Analytics or Plausible)
- Build the Phase 2 features from your planning documents

**Go deeper on skills:**
- Learn how Row Level Security policies work by reading the SQL directly
- Try converting your project to React using the Google AI Studio path (Phase 3, Option B)
- Explore Supabase Edge Functions for server-side logic

---

## Final Checklist — Your Project Is Complete When:

- [ ] Your app is deployed and accessible at a public URL
- [ ] Authentication works on the live site (sign up, sign in, sign out)
- [ ] Real data from Supabase loads on the live site
- [ ] At least one user-generated action persists to the database
- [ ] No JavaScript errors on the live site
- [ ] The app works on mobile devices
- [ ] Your GitHub repository is up to date with all your code
- [ ] Your Netlify site is connected to your GitHub repo for auto-deployment

---

## Complete Guide Index

| # | Guide | Status |
|---|-------|--------|
| [01](01-IDEATION-AND-PLANNING.md) | Ideation & Planning | |
| [02](02-TCREI-PROMPTING-FRAMEWORK.md) | The TCREI Framework | |
| [03](03-UI-DESIGN-WITH-STITCH.md) | UI Design with Google Stitch | |
| [04](04-OPENING-PROJECT-IN-IDE.md) | Opening Project in IDE | |
| [05](05-GITHUB-BASICS.md) | Git & GitHub Basics | |
| [06](06-FRONTEND-DEVELOPMENT-WITH-AI.md) | Frontend Development with AI | |
| [07](07-SUPABASE-BACKEND-WITH-MCP.md) | Backend with Supabase MCP | |
| [08](08-WIRING-FRONTEND-TO-SUPABASE.md) | Wiring Frontend to Backend | |
| [09](09-DEPLOYING-WITH-NETLIFY.md) | Deploying with Netlify MCP | ← You are here |

---

*Afretec Web Development Short Course — AI-Powered Full-Stack Development*
*Guide version 1.0*
