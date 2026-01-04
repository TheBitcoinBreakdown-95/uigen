# Claude Code Workflow Setup Guide

This guide explains how to set up and use the Claude Code auto-review workflow in your repository.

## What Does This Workflow Do?

The Claude Code workflow automatically:
- ✅ Runs tests and fixes failures
- ✅ Fixes linting errors
- ✅ Resolves TypeScript type errors
- ✅ Verifies builds succeed
- ✅ Tests UI using browser automation
- ✅ Reviews code quality and suggests improvements
- ✅ Commits fixes automatically

## Setup Instructions

### Step 1: Get Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign in or create an account
3. Navigate to **API Keys** section
4. Click **Create Key**
5. Copy your API key (starts with `sk-ant-...`)

### Step 2: Add API Key to GitHub Secrets

1. Go to your GitHub repository: https://github.com/TheBitcoinBreakdown-95/uigen
2. Click **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Set:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Secret**: Paste your API key
6. Click **Add secret**

### Step 3: Enable Workflow Permissions

1. In your repository **Settings**
2. Go to **Actions** → **General**
3. Scroll to **Workflow permissions**
4. Select **Read and write permissions**
5. Check **Allow GitHub Actions to create and approve pull requests**
6. Click **Save**

## How to Use

### Automatic Mode (On Pull Requests)

The workflow runs automatically when:
- A new pull request is opened
- New commits are pushed to an existing PR
- A PR is reopened

Claude will review the PR, fix issues, and commit the fixes automatically.

### Manual Mode (Custom Tasks)

You can also trigger Claude manually with custom tasks:

1. Go to **Actions** tab in GitHub
2. Click **Claude Auto Review & Fix** workflow
3. Click **Run workflow**
4. Enter a custom task (e.g., "Add error handling to all API routes")
5. Click **Run workflow**

## Example Use Cases

### 1. Auto-fix failing tests
```
PR created → Claude runs tests → Finds failures → Fixes them → Commits fix
```

### 2. Fix linting errors
```
PR created → Claude runs lint → Finds errors → Auto-fixes → Commits
```

### 3. Custom improvements
```
Manual trigger: "Add JSDoc comments to all exported functions"
→ Claude adds comments → Commits changes
```

### 4. UI verification
```
PR with UI changes → Claude opens browser → Tests interactions
→ Takes screenshots → Reports issues
```

## Workflow Details

### Project Setup Phase
```yaml
- Installs dependencies (npm ci)
- Generates Prisma client
- Runs database migrations
- Starts dev server on localhost:3000
- Installs Playwright browsers
```

### Claude's Tasks
1. **Run Tests**: `npm run test` and fix failures
2. **Lint Check**: `npm run lint` and fix errors
3. **Type Check**: `npx tsc --noEmit` and fix type errors
4. **Build**: `npm run build` and fix build errors
5. **UI Test**: Open browser, test functionality, check console
6. **Code Review**: Review code quality, security, performance

### Tools Available to Claude
- **Bash**: Run npm, git, sqlite3 commands
- **File Operations**: Read, Edit, Write code
- **Playwright MCP**: Browser automation
  - Navigate to pages
  - Click buttons
  - Take screenshots
  - Check console logs

### Allowed Origins (for MCP)
- `localhost:3000` - Your dev server
- `cdn.tailwindcss.com` - Tailwind CSS
- `esm.sh` - ES modules
- `cdn.jsdelivr.net` - CDN
- `unpkg.com` - npm CDN

## Custom Instructions

Claude knows about your project:
- Next.js 14+ with App Router
- Tailwind CSS styling
- Prisma + SQLite database
- Virtual file system for components
- Babel for JSX transformation

## Cost Considerations

This workflow uses Claude API calls:
- **Typical PR review**: $0.10 - $0.50
- **Complex fixes**: $0.50 - $2.00
- **Large PRs**: $2.00 - $5.00

Set spending limits in your Anthropic console to control costs.

## Monitoring

### View Workflow Runs
1. Go to **Actions** tab
2. Click on a workflow run
3. View Claude's output and fixes

### Check Logs
- Dev server logs are captured
- Claude's decisions are logged
- All fixes are documented in commits

## Troubleshooting

### Workflow fails with "API key not found"
→ Ensure `ANTHROPIC_API_KEY` is set in repository secrets

### Workflow can't commit changes
→ Check workflow permissions are set to "Read and write"

### Dev server fails to start
→ Check the cleanup logs for port conflicts

### Playwright browser issues
→ Workflow installs chromium automatically; check logs

## Disabling the Workflow

To temporarily disable:
1. Go to **.github/workflows/claude-auto-review.yml**
2. Comment out the `on:` triggers
3. Or delete the file

## Security Notes

- API key is stored securely in GitHub Secrets
- Never commit API keys to the repository
- Claude only has access to this repository
- All changes are committed with clear attribution

## Questions?

- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [GitHub Actions Docs](https://docs.github.com/actions)
- [Anthropic API Docs](https://docs.anthropic.com/)
