#!/bin/bash

# Push changes from .claude submodule to team repository

set -e

echo "📤 Pushing .claude changes to team repo..."

# Get the actual .claude repo path (assuming it's in ~/Documents/.claude)
CLAUDE_REPO="$HOME/Documents/.claude"

if [ ! -d "$CLAUDE_REPO" ]; then
    echo "❌ Error: .claude repository not found at $CLAUDE_REPO"
    exit 1
fi

cd "$CLAUDE_REPO"

# Check if there are changes
if [ -z "$(git status --porcelain)" ]; then
    echo "📭 No changes to push"
else
    git add -A

    # Get commit message from user or use default
    if [ -z "$1" ]; then
        git commit -m "chore: update team standards"
    else
        git commit -m "$1"
    fi

    git push origin main
    echo "✅ Changes pushed to team repo!"
fi

# Go back to project and update submodule
cd -

echo "📥 Updating submodule reference..."
cd .claude
git pull origin main
cd ..

git add .claude

echo "✅ Done!"
echo "💡 Don't forget to commit: git commit -m 'chore: update .claude submodule'"
