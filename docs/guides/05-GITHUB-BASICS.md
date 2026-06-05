# Phase 5 — Git & GitHub Basics
## Saving Your Work, Creating a GitHub Account, and Pushing Code

> **Phase goal:** Set up Git and GitHub, create your first repository, and learn the essential commands to save and back up your project throughout development.
>
> **Why this matters:** Every professional developer uses version control. Git tracks every change you make to your code so you can go back in time if something breaks. GitHub is the cloud service where you store those changes safely. Without this, one accidental deletion or computer crash could mean losing all your work.

---

## The Problem Git Solves

Imagine you're building your app and it's working perfectly. Then you try to add a new feature, something breaks, and now nothing works. Without Git, you're stuck — you can't get back to the working version.

**With Git:**
- Every time you save a "commit," you create a restore point
- If something breaks, you can go back to any previous commit
- Your work is backed up to GitHub in the cloud
- You can work on multiple features in parallel using "branches"
- Other people can collaborate on your project

Git is not optional for professional developers. This phase makes sure you know the basics.

---

## Part 1 — Installing Git

### Check If Git Is Already Installed

Open your terminal (in your IDE or system terminal) and type:

```bash
git --version
```

If you see something like `git version 2.39.0`, Git is already installed. Skip to Part 2.

If you see `command not found` or an error, follow the installation steps below.

### Installing Git

**Mac:**
1. Install Xcode Command Line Tools (includes Git):
   ```bash
   xcode-select --install
   ```
2. A dialog will appear — click "Install"
3. Wait for it to finish (takes a few minutes)
4. Verify: `git --version`

**Alternatively for Mac** — install Homebrew first, then Git:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install git
```

**Windows:**
1. Go to [git-scm.com/download/win](https://git-scm.com/download/win)
2. Download the installer (64-bit recommended)
3. Run the installer — accept all defaults
4. **Important during installation:** Select "Git from the command line and also from 3rd-party software" when asked
5. Click through remaining defaults and Finish
6. Open a new terminal and verify: `git --version`

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install git
git --version
```

---

## Part 2 — Create a GitHub Account

If you already have a GitHub account, skip to Part 3.

1. Go to [github.com](https://github.com)
2. Click **"Sign up"**
3. Enter your email address and click "Continue"
4. Create a password (make it strong — you'll use this account professionally)
5. Choose a username — **use your real name or a professional variation of it** (e.g., `john-doe` or `johndoe-rw`). This username is visible on your public profile.
6. Solve the verification puzzle
7. Click "Create account"
8. Check your email for the verification code and enter it
9. Choose the free plan when asked about pricing

**After creating your account:**
1. Go to your profile (click your avatar top right → "Your profile")
2. Click "Edit profile"
3. Add your full name, a brief bio, and your country
4. This profile is like a professional portfolio — employers look at GitHub profiles

---

## Part 3 — Configure Git With Your Identity

Before using Git, you need to tell it who you are. Open your terminal and run these two commands (replace with your actual name and email):

```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

Use the **same email address** you used to sign up for GitHub.

**Verify the configuration:**
```bash
git config --global --list
```

You should see your name and email listed.

---

## Part 4 — Initialize Git in Your Project

Now you'll set up Git tracking in your project folder.

1. Open the terminal in your IDE (make sure you're inside your project folder)
2. Run:

```bash
git init
```

You should see: `Initialized empty Git repository in .../your-project/.git/`

This creates a hidden `.git` folder that Git uses to track changes. You never need to touch this folder directly.

---

## Part 5 — Create a .gitignore File

A `.gitignore` file tells Git which files to **not** track. Some files should never be saved to GitHub — especially files containing passwords or API keys.

Create a file called `.gitignore` in your project root with this content:

```
# Operating system files
.DS_Store
Thumbs.db

# IDE configuration
.vscode/settings.json
.antigravity/

# Environment variables / secrets — NEVER commit these
.env
.env.local
.env.production
config.local.js

# Node modules (if you ever add Node)
node_modules/

# Build output
dist/
build/

# Netlify
.netlify/
```

**Why this matters:** If you ever accidentally store your Supabase API key in a file and commit it to GitHub, anyone can see it and use your database. The `.gitignore` prevents common mistake files from being committed.

---

## Part 6 — Make Your First Commit

Now you'll save your first snapshot of your project.

**Step 1 — Check what Git sees:**
```bash
git status
```

This shows all the files in your project as "untracked" (Git hasn't saved them yet).

**Step 2 — Stage all files for the first commit:**
```bash
git add .
```

The `.` means "add everything in the current folder." You can also add specific files: `git add index.html`

**Step 3 — Check status again:**
```bash
git status
```

Now your files should show as "Changes to be committed" (green).

**Step 4 — Create the commit:**
```bash
git commit -m "Initial commit: add project files from Stitch export"
```

The `-m` flag lets you write a message describing what this commit contains. **Good commit messages are short but descriptive.**

**Verify the commit was created:**
```bash
git log
```

You should see your commit with your name, email, date, and the message.

---

## Part 7 — Create a Repository on GitHub

Now you'll create a place on GitHub to store your project online.

1. Go to [github.com](https://github.com) and log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name:** Use your project name in lowercase with hyphens (e.g., `my-event-app` or `rwanda-academic-hub`)
   - **Description:** One sentence about your project
   - **Visibility:** Public (free, and shows off your work) or Private (only you can see it)
   - **Do NOT** check "Add a README file" — you already have one
   - **Do NOT** check "Add .gitignore" — you already have one
4. Click **"Create repository"**

---

## Part 8 — Connect Your Local Project to GitHub

After creating the repository, GitHub shows you instructions. Follow the "push an existing repository" section:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username and `YOUR-REPO-NAME` with your repository name.

**What these commands do:**
- `git remote add origin ...` — tells your local Git where GitHub is
- `git branch -M main` — renames your default branch to "main" (GitHub's standard)
- `git push -u origin main` — uploads your commits to GitHub

**Authentication:** GitHub will ask you to authenticate. The easiest method is a Personal Access Token:

1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Click "Generate new token"
3. Give it a name, set expiration to 90 days, check the "repo" scope
4. Click "Generate token" and **copy it immediately** (you won't see it again)
5. When Git asks for your password, paste the token

After this, your code is on GitHub. Visit `https://github.com/YOUR-USERNAME/YOUR-REPO-NAME` to confirm.

---

## Part 9 — The Daily Git Workflow

After the initial setup, you'll use these commands repeatedly as you develop:

### The Three-Step Save Cycle

Every time you finish a meaningful piece of work:

**1. Check what changed:**
```bash
git status
```

**2. Stage the files you want to save:**
```bash
git add .                           # Stage everything
git add index.html pages/auth/      # Or stage specific files/folders
```

**3. Commit with a descriptive message:**
```bash
git commit -m "Add sign-in page with form validation states"
```

**4. Push to GitHub (optional each time, but do it at the end of each session):**
```bash
git push
```

---

## Writing Good Commit Messages

A good commit message tells your future self (and collaborators) what changed and why.

**Format:** `[type]: [short description]`

| Type | Use for |
|------|---------|
| `feat` | Adding a new feature |
| `fix` | Fixing a bug |
| `style` | CSS/design changes only |
| `docs` | Documentation changes |
| `chore` | Setup, config, tooling |

**Good examples:**
```
feat: add event discovery homepage with filter chips
fix: correct navbar color on mobile screens
style: update button hover states to match design system
feat: add sign-in and sign-up pages
chore: add .gitignore and project structure
```

**Bad examples:**
```
update                    ← Too vague
fix stuff                 ← What stuff?
asdfghjkl                 ← Not helpful at all
final version v3          ← "Final" is never final
```

---

## Essential Git Commands Reference

Here are all the Git commands you need for this course:

```bash
# --- Setup (do once) ---
git init                          # Start tracking a folder
git remote add origin [URL]       # Connect to GitHub
git config --global user.name "Name"
git config --global user.email "email"

# --- Daily workflow ---
git status                        # See what has changed
git add .                         # Stage all changes
git add [filename]                # Stage a specific file
git commit -m "your message"      # Save a snapshot
git push                          # Upload to GitHub
git pull                          # Download latest from GitHub

# --- History and navigation ---
git log                           # See commit history
git log --oneline                 # Compact history view
git diff                          # See exact changes since last commit

# --- Undo mistakes ---
git checkout -- [filename]        # Discard unsaved changes to a file
git restore [filename]            # Same as above (newer Git)
```

---

## Understanding Branches (Optional but Useful)

A **branch** is a parallel version of your project. It lets you try something new without affecting your main working version.

**When to use branches:**
- Trying a risky experiment
- Adding a big new feature
- Fixing a bug while someone else is working on the project

**Basic branch workflow:**
```bash
git branch feature/add-search-bar        # Create a new branch
git checkout feature/add-search-bar      # Switch to it
# ... make changes and commit ...
git checkout main                         # Switch back to main
git merge feature/add-search-bar          # Merge your changes in
```

For this course, working directly on the `main` branch is fine. But knowing branches exist will help you when you collaborate with others.

---

## Checklist — You Are Ready to Move to Phase 6 When:

- [ ] Git is installed and configured with your name and email
- [ ] You have a GitHub account
- [ ] Your project has a `.gitignore` file
- [ ] You have run `git init` in your project folder
- [ ] You have made your first commit
- [ ] Your project is pushed to a GitHub repository
- [ ] You can run `git status`, `git add`, `git commit`, and `git push` without errors

---

## Common Mistakes to Avoid

**Committing the `.env` file or any file with API keys.** This is the most dangerous Git mistake. Always check your `.gitignore` before committing. If you accidentally commit secrets, change them immediately.

**Long stretches between commits.** Commit frequently. Small, focused commits are much easier to manage than one giant commit at the end.

**Meaningless commit messages.** You will thank yourself later when you can read your history and understand what changed when.

**Not pushing to GitHub.** Commits only on your local machine are not backed up. Push at the end of every session.

**Not running `git status` first.** Always check `git status` before staging. It shows you exactly what you're about to save.

---

*Next: [Phase 6 — Frontend Development with AI](06-FRONTEND-DEVELOPMENT-WITH-AI.md)*
