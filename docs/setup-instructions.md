# Setup Instructions

## Adding the Submodule to Your Project

### First Time Setup

```bash
cd /path/to/your/project
git submodule add https://github.com/Cloud-Lobsters/claude-best-practice.git .claude-team
git submodule update --init --recursive
git commit -m "feat: add shared Claude agents submodule"
```

### Clone Project with Submodule

```bash
git clone --recurse-submodules https://github.com/your-org/your-project.git
```

## Updating the Submodule

### Pull Latest Changes

```bash
cd .claude-team
git pull origin main
cd ..
git add .claude-team
git commit -m "chore: update shared Claude agents"
```

### Update All Submodules

```bash
git submodule update --remote
```

## Using Agents and Commands

### Agents

Agents are invoked via the Task tool in Claude Code. See [Agent Catalog](agent-catalog.md) for available agents.

### Commands

Commands are available via the `/` prefix in Claude Code:
- `/create-modal` - Scaffold a new modal component
- `/create-table` - Scaffold a new table component
- `/create-form` - Scaffold a new form component

See [Command Reference](command-reference.md) for all available commands.

## Referencing Team Patterns

In your project's CLAUDE.md, reference team patterns:

```markdown
# Your Project

> **Team Standards**: Universal patterns in `.claude-team/CLAUDE.md`

## Project-Specific Instructions
[Your project-specific content here]
```
