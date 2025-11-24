# Cloud Lobsters - Claude Best Practices

Shared repository of Claude Code agents, commands, and best practices for the Cloud Lobsters team.

## What's Inside

- **CLAUDE.md** - Team-wide patterns and best practices
- **.claude/agents/** - Reusable behavioral agents
- **.claude/commands/** - Workflow shortcuts
- **.claude/skills/** - Tool integration guides
- **templates/** - Code templates
- **docs/** - Documentation

## Usage

### Add to Your Project

```bash
cd your-project
git submodule add https://github.com/Cloud-Lobsters/claude-best-practice.git .claude-team
git submodule update --init --recursive
```

### Update to Latest

```bash
cd .claude-team
git pull origin main
cd ..
git add .claude-team
git commit -m "chore: update shared agents"
```

## Documentation

- [Setup Instructions](docs/setup-instructions.md)
- [Agent Catalog](docs/agent-catalog.md)
- [Command Reference](docs/command-reference.md)
- [Contributing Guide](docs/contributing.md)

## Contributing

See [docs/contributing.md](docs/contributing.md) for contribution guidelines.

## License

MIT
