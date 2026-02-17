# Contributing to UNIZERO

Thank you for your interest in contributing to UNIZERO! This guide will help you get started.

## Quick Start

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Submit a Pull Request

## Development Workflow

### Setting Up Development Environment

```bash
# Clone and install
git clone https://github.com/YOUR_USERNAME/project-unizero.git
cd project-unizero
npm install

# Set up environment
cp .env.example .env
# Edit .env with your credentials

# Start dev server
npm run dev
```

### Code Style

- **Formatting**: Prettier (automatic on save)
- **Linting**: ESLint (runs on commit via Husky)
- **TypeScript**: Strict mode enabled

### Working with Issues

1. **Find an issue** to work on
2. **Comment** on the issue to claim it
3. **Wait** for maintainer assignment
4. **Create** your branch from `main`
5. **Work** on the solution
6. **Submit** a PR linked to the issue

### Issue Labels

| Label              | Meaning                      |
| ------------------ | ---------------------------- |
| `good first issue` | Beginner friendly            |
| `help wanted`      | Needs community contribution |
| `bug`              | Something isn't working      |
| `enhancement`      | New feature or improvement   |
| `documentation`    | Docs need updating           |

## Commit Guidelines

We use Conventional Commits:

```
type(scope): description

[optional body]
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code restructure
- `test` - Tests
- `chore` - Maintenance

### Example

```bash
git commit -m "feat(dashboard): add subscription count widget"
```

## Testing

Run tests before submitting:

```bash
# Lint
npm run lint

# Build
npm run build

# Test (when available)
npm run test
```

## Code Review Process

1. **Automated checks** run (CI)
2. **Maintainers** review code
3. **Feedback** provided if needed
4. **Approved** or **Changes requested**
5. **Merged** after approval

## Recognition

Contributors are recognized in:

- GitHub Contributors graph
- README Acknowledgments section

## Questions?

- Open a [Discussion](https://github.com/py-kalki/project-unizero/discussions)
- Join our [Discord](https://discord.gg/unizero)

---

_Last updated: February 2026_
