#!/bin/bash

# Pull latest changes from .claude submodule

set -e

echo "📥 Pulling latest .claude changes..."

cd .claude
git pull origin main
cd ..

git add .claude

echo "✅ .claude submodule updated!"
echo "💡 Don't forget to commit: git commit -m 'chore: update .claude submodule'"
