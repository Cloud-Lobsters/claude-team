# Contributing Guide

## How to Contribute

### Adding a New Agent

1. **Create Agent File**
   ```bash
   cd .claude/agents/
   touch your-agent-name.md
   ```

2. **Define Agent Structure**
   ```markdown
   # Your Agent Name

   Brief description of what this agent does.

   ## Role
   [Agent's role and expertise]

   ## Responsibilities
   [What the agent should do]

   ## Instructions
   [Detailed instructions for the agent]

   ## Example Usage
   [Examples of when to use this agent]
   ```

3. **Document in Catalog**
   Add entry to `docs/agent-catalog.md`

4. **Test the Agent**
   Test in a real project before committing

5. **Submit Pull Request**
   Create PR with clear description

### Adding a New Command

1. **Create Command File**
   ```bash
   cd .claude/commands/
   touch your-command-name.md
   ```

2. **Define Command Structure**
   ```markdown
   # Command Name

   Brief description of what this command does.

   ## Instructions

   Ask the user for:
   - [Required information]

   Then:
   1. [Step 1]
   2. [Step 2]
   3. [Step 3]

   ## Pattern Reference
   [Reference to CLAUDE.md patterns]
   ```

3. **Document in Reference**
   Add entry to `docs/command-reference.md`

4. **Test the Command**
   Test in a real project

5. **Submit Pull Request**
   Create PR with clear description

### Updating Patterns in CLAUDE.md

1. **Create Branch**
   ```bash
   git checkout -b feature/update-pattern-name
   ```

2. **Update CLAUDE.md**
   Make your changes with clear examples

3. **Test Across Projects**
   Verify pattern works in multiple projects

4. **Update CHANGELOG.md**
   Document the change

5. **Submit Pull Request**
   Include rationale for the change

### Best Practices

- ✅ Test thoroughly before submitting
- ✅ Provide clear examples
- ✅ Document use cases
- ✅ Keep patterns DRY
- ✅ Version breaking changes properly

## Code Review Process

1. Submit PR
2. Team reviews
3. Address feedback
4. Maintainer merges
5. Tag release if needed
6. Team updates submodules

## Questions?

Open an issue in the repository for questions or discussions.
