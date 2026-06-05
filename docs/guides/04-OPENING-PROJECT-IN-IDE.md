# Phase 4 — Opening Your Project in an IDE
## Setting Up Antigravity or VS Code and Understanding AI Features

> **Phase goal:** Set up your code editor, open your exported project, and understand how to use the AI features built into your editor to help you develop.
>
> **Why this matters:** Your code editor (IDE = Integrated Development Environment) is where you will spend most of your time for the rest of this course. Choosing the right one and knowing how to use its AI features effectively will dramatically speed up your development. This phase gets you set up properly from the start.

---

## What Is an IDE?

An IDE is a software application designed specifically for writing, editing, and organizing code. Think of it as Microsoft Word, but for code — it has features specifically for developers like:

- **Syntax highlighting** — colors different parts of code so it's easier to read
- **File explorer** — lets you navigate all your project files
- **Terminal** — a built-in command line for running commands
- **Extensions / Plugins** — add-ons that extend the editor's capabilities
- **AI assistant integration** — AI that understands your code and helps you write it

In this course, you have two options: **Antigravity** and **VS Code**. Both are excellent; they differ in their AI integration approach.

---

## Option A — Antigravity (Recommended for Beginners)

### What Is Antigravity?

Antigravity is a modern, AI-first code editor designed for developers who want AI assistance built deeply into their workflow. It is based on VS Code's foundation but adds more native AI capabilities.

**Why choose Antigravity:**
- AI is integrated at the core, not as an add-on
- Simpler setup — AI works out of the box
- Built-in **MCP Store**: install Supabase and Netlify MCP servers in one click — no JSON editing required (used in Phases 7 and 9)
- Better for learners who want AI to guide them through the code
- Less configuration required

### Installing Antigravity

1. Go to [Google Antigravity](https://antigravity.google/) in your browser
2. Click **"Download"** — select your operating system:
   - **Mac:** Download the `.dmg` file, open it, and drag Antigravity to your Applications folder
   - **Windows:** Download the `.exe` installer and run it, following the installation wizard
   - **Linux:** Download the `.AppImage` or `.deb` package for your distribution
3. Open Antigravity after installation

### First Launch — Setting Up Antigravity

When you open Antigravity for the first time:

1. **Sign in** — Antigravity may ask you to create an account or sign in. Create a free account if prompted.
2. **Theme** — Choose a color theme. "Dark+" or "One Dark Pro" are popular choices. Dark themes reduce eye strain during long coding sessions.
3. **AI configuration** — Antigravity uses Claude (Anthropic) as its AI engine. The AI is pre-configured — you don't need to add API keys for basic use.

### Opening Your Project in Antigravity

1. Extract your ZIP file from Phase 3 into a folder on your computer
   - **Mac:** Double-click the ZIP file to extract it
   - **Windows:** Right-click the ZIP file → "Extract All" → choose a location
   - **Recommended location:** Create a folder called `projects` in your Documents folder and put your project there

2. Open Antigravity

3. Go to **File → Open Folder** (Mac: `Cmd+O`, Windows: `Ctrl+K Ctrl+O`)

4. Navigate to and select your extracted project folder

5. Your project files will appear in the left sidebar (the Explorer panel)

### Understanding the Antigravity Interface

```
┌─────────────────────────────────────────────────────────────┐
│  ACTIVITY BAR    │  EXPLORER / SIDEBAR                       │
│  (left edge)     │  Shows your project files and folders     │
│                  │                                           │
│  📁 Explorer     │  ├── index.html                           │
│  🔍 Search       │  ├── pages/                               │
│  🔀 Git          │  │   ├── auth/                            │
│  🧩 Extensions   │  │   │   ├── sign-in.html                 │
│                  │  │   │   └── sign-up.html                 │
├──────────────────┴──┴───────────────────────────────────────┤
│  EDITOR AREA — where you read and edit code                  │
│                                                              │
│  <html>                                                      │
│    <body class="bg-sage-100">                                │
│      ...                                                     │
├──────────────────────────────────────────────────────────────┤
│  TERMINAL PANEL (bottom) — for running commands              │
│  $ git status                                                │
└──────────────────────────────────────────────────────────────┘
```

### AI Features in Antigravity

**1. Chat with AI about your code**
- Press `Cmd+L` (Mac) or `Ctrl+L` (Windows) to open the AI chat panel
- Ask questions like: "What does this function do?" or "Why isn't this button showing up?"
- The AI can see your entire project and answer questions in context

**2. Inline code suggestions (Autocomplete)**
- As you type, Antigravity suggests code completions
- Press `Tab` to accept a suggestion
- Press `Escape` to dismiss it

**3. Ask AI to generate code**
- Select a section of code and ask: "Rewrite this to be more readable"
- Or place your cursor and ask: "Write a function that filters these events by category"
- The AI generates code directly in your editor

**4. Explain code**
- Select any code you don't understand
- Right-click → "Explain with AI" or press `Cmd+/`
- The AI explains what the selected code does in plain English

**5. Fix errors**
- When you see a red underline (error), click the lightbulb icon
- Select "Fix with AI" to let the AI suggest a correction

**6. MCP Store (built-in)**
- Click the **"..."** menu at the top of the side panel → **"MCP Store"**
- Browse and install MCP servers (Supabase, Netlify, GitHub, and more) with one click
- Each server connects the AI directly to that external service — you'll use this in Phases 7 and 9

---

## Option B — VS Code with GitHub Copilot

### What Is VS Code?

Visual Studio Code (VS Code) is the world's most popular code editor, made by Microsoft. It is free, open source, and has a massive ecosystem of extensions.

**Why choose VS Code:**
- Industry standard — most professional developers use it
- Huge extension ecosystem
- GitHub Copilot provides AI assistance (requires a subscription or free trial)
- More configurable than Antigravity

### Installing VS Code

1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Click **"Download for [Your OS]"**
3. **Mac:** Open the downloaded `.zip` file and drag VS Code to Applications
4. **Windows:** Run the `.exe` installer — accept all defaults, and check "Add to PATH" when offered
5. **Linux:** Use the `.deb` or `.rpm` package, or install via your package manager: `sudo snap install code --classic`

### First Launch — Recommended Extensions

When VS Code opens, click the **Extensions** icon in the left sidebar (looks like four squares). Install these extensions:

**Essential Extensions:**
1. **GitHub Copilot** — AI code completion (requires GitHub account — free trial available)
2. **GitHub Copilot Chat** — Chat interface for asking Copilot questions
3. **Prettier - Code Formatter** — Automatically formats your code neatly
4. **Live Server** — Opens your HTML files in a browser with live reload

**To install each extension:**
1. Type the extension name in the search box
2. Click **Install**

### Setting Up GitHub Copilot

GitHub Copilot is Microsoft's AI coding assistant. You need a GitHub account to use it.

1. **Create a GitHub account** if you don't have one (see Phase 5 for detailed instructions)
2. Go to [github.com/features/copilot](https://github.com/features/copilot) and sign up for Copilot (free trial available for students via GitHub Education)
3. In VS Code, after installing the Copilot extension, click the Copilot icon in the bottom right
4. Sign in with your GitHub account
5. Follow the authorization prompts

**Verifying Copilot is working:**
- Open any HTML file
- Start typing a comment like `<!-- Create a navigation bar with -->`
- Copilot should suggest a completion in grey text
- Press `Tab` to accept it

### Opening Your Project in VS Code

1. Extract your ZIP file from Phase 3 (same as described for Antigravity above)
2. Open VS Code
3. Click **File → Open Folder** (Mac: `Cmd+O`, Windows: `Ctrl+K Ctrl+O`)
4. Navigate to your project folder and click "Select Folder" (Windows) or "Open" (Mac)
5. Click **"Yes, I trust the authors"** when VS Code asks about trusting the folder

### Opening a Live Preview

Using the **Live Server** extension:
1. Right-click `index.html` in the Explorer panel
2. Select **"Open with Live Server"**
3. Your browser opens automatically at `http://127.0.0.1:5500` showing your page
4. Any time you save a file, the browser refreshes automatically

### AI Features in VS Code with Copilot

**1. Inline code suggestions**
- Just start typing — Copilot suggests completions in grey ghost text
- Press `Tab` to accept, `Escape` to dismiss
- Press `Alt+]` (Windows) or `Option+]` (Mac) to cycle through alternative suggestions

**2. Copilot Chat**
- Press `Ctrl+Shift+I` (Windows) or `Cmd+Shift+I` (Mac) to open Copilot Chat
- Type questions about your code: "How do I make this button open a modal?"
- Copilot responds with explanations and code examples

**3. Generate code from comments**
This is powerful — write a comment describing what you want and Copilot writes the code:
```javascript
// Function that filters events by category and returns only published ones
```
After typing this comment, press Enter and Copilot will suggest the implementation.

**4. Inline chat**
- Press `Ctrl+I` (Windows) or `Cmd+I` (Mac) anywhere in the editor
- Type a request: "Add a loading spinner to this section"
- Copilot edits the code directly in place

**5. Explain and fix with /explain and /fix commands**
In Copilot Chat:
- `/explain` + select code → Copilot explains it
- `/fix` + describe the bug → Copilot suggests a fix
- `/doc` + select code → Copilot writes documentation for it

---

## Understanding Your Project Structure

After opening your project, explore the files. Here is what a typical exported Stitch project looks like and what each file does:

```
your-project/
│
├── index.html              ← Your main homepage
├── assets/
│   ├── css/
│   │   └── main.css        ← Your custom CSS styles
│   └── js/
│       └── (empty for now) ← JavaScript files go here
│
├── pages/
│   ├── auth/
│   │   ├── sign-in.html    ← Sign in page
│   │   └── sign-up.html    ← Sign up page
│   ├── events/
│   │   └── event-detail.html
│   └── dashboards/
│       ├── user.html
│       └── organizer.html
│
└── docs/
    ├── design.md            ← Your design system
    └── README.md            ← Project description
```

**Note:** Your structure may look different depending on what Stitch generated. That's fine — you'll organize it as you develop.

---

## Opening Files and Making Your First Edit

1. In the Explorer panel, click `index.html` to open it
2. Look at the code — it contains HTML (the structure) with Tailwind CSS class names
3. Find a heading text (something like `<h1>Your App Name</h1>`)
4. Change the text to your actual app name
5. Save the file: `Cmd+S` (Mac) or `Ctrl+S` (Windows)
6. If you have Live Server open, the browser will refresh and show your change

**Congratulations** — you just made your first code edit.

---

## Using the Built-in Terminal

Both Antigravity and VS Code have a built-in terminal (command line). You will use this throughout the course.

**Opening the terminal:**
- **Mac/Linux:** Press `Ctrl+`` ` (backtick, the key above Tab)
- **Windows:** Press `` Ctrl+` ``
- Or go to **Terminal → New Terminal** in the menu

The terminal opens at the bottom of the editor, already inside your project folder.

**Test it:**
```bash
ls          # Mac/Linux: lists all files in the current folder
dir         # Windows: lists all files in the current folder
```

You should see your project files listed.

---

## Checklist — You Are Ready to Move to Phase 5 When:

- [ ] You have installed Antigravity or VS Code
- [ ] You have extracted your Stitch ZIP file into a project folder
- [ ] You have opened the project folder in your IDE
- [ ] You can see your HTML files in the Explorer panel
- [ ] You have opened `index.html` in a browser and it shows your design
- [ ] You have successfully made a small edit and saved it
- [ ] You can open the terminal in your IDE
- [ ] AI features are working (Copilot activated, or Antigravity AI responding)

---

## Common Mistakes to Avoid

**Opening individual files instead of the folder.** Always use "Open Folder" — not "Open File." If you open a single file, your editor won't know about the rest of your project and AI context won't work properly.

**Not installing Live Server.** Without live reload, you have to manually refresh the browser every time you change a file. Install the Live Server extension early.

**Accepting every AI suggestion without reading it.** AI suggestions are usually right, but not always. Read each suggestion before pressing Tab. If you don't understand it, ask the AI to explain it.

**Editing inside the ZIP.** Always extract the ZIP first, then open the extracted folder. Editing inside a ZIP doesn't save properly.

---

*Next: [Phase 5 — Git & GitHub Basics](05-GITHUB-BASICS.md)*
