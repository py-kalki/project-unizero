# 🔮 UNIZERO

<div align="center">

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0.en.html)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Discord](https://img.shields.io/badge/Discord-Join-5865F2?logo=discord)](https://discord.gg/unizero)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/py-kalki/project-unizero)

**AI Subscription Manager & Discovery Hub**

Discover, compare, and manage all your AI tool subscriptions in one place.

</div>

---

## 📋 Table of Contents

- [🔮 About](#about)
- [✨ Features](#features)
- [🛠️ Tech Stack](#tech-stack)
- [🚀 Getting Started](#getting-started)
- [📖 Project Structure](#project-structure)
- [🤝 Contributing](#contributing)
- [📝 Pull Request Rules](#pull-request-rules)
- [🔐 Security](#security)
- [📄 License](#license)

---

## 🔮 About

**UNIZERO** is an open-source platform that helps users discover, compare, and manage AI tool subscriptions in one centralized location.

### Our Vision

> Give users clarity and control over their AI subscriptions.

As AI tools proliferate, keeping track of subscriptions, costs, and features becomes increasingly complex. UNIZERO aims to be the single source of truth for managing your AI tool ecosystem.

### Why UNIZERO?

- **🔍 Discover** - Find new AI tools through our curated catalog
- **💰 Track** - Monitor all your subscriptions in one dashboard
- **⚖️ Compare** - Compare features, pricing, and alternatives
- **📊 Analyze** - Understand your AI spending patterns

---

## ✨ Features

### Current Features (v1 Roadmap)

| Feature               | Status         | Description                           |
| --------------------- | -------------- | ------------------------------------- |
| User Authentication   | 🔄 In Progress | Secure sign-in with Clerk             |
| AI Tool Discovery     | 📋 Planned     | Browse and search AI tool catalog     |
| Subscription Tracking | 📋 Planned     | Add, view, edit, delete subscriptions |
| Spending Analytics    | 📋 Planned     | Dashboard with totals and breakdowns  |
| Tool Comparison       | 📋 Planned     | Side-by-side AI tool comparison       |

### Planned Features (v2+)

- [ ] Import/Export subscriptions
- [ ] Reminders and notifications
- [ ] Price change alerts
- [ ] API for third-party integrations
- [ ] Mobile app (iOS/Android)
- [ ] Browser extensions

---

## 🛠️ Tech Stack

| Category      | Technology                                                                          |
| ------------- | ----------------------------------------------------------------------------------- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router)                                      |
| **Language**  | [TypeScript 5.4+](https://www.typescriptlang.org/)                                  |
| **Styling**   | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)      |
| **Database**  | [PostgreSQL](https://www.postgresql.org/) (Neon) + [Prisma](https://www.prisma.io/) |
| **Auth**      | [Clerk](https://clerk.com/)                                                         |
| **State**     | React Server Components                                                             |
| **Testing**   | Jest + React Testing Library                                                        |
| **Linting**   | ESLint + Prettier                                                                   |
| **Git Hooks** | Husky                                                                               |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or later
- **npm** 9.x or later
- **Git** 2.x or later
- **PostgreSQL** (local or cloud) - or use Neon for cloud

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/py-kalki/project-unizero.git
cd project-unizero
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Database - Neon PostgreSQL
DATABASE_URL="postgresql://user:password@host.neon.tech/db?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Database Setup**

Generate Prisma client and push schema:

```bash
npx prisma generate
npx prisma db push
```

5. **Start Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Create production build
npm run build

# Start production server
npm run start
```

---

## 📖 Project Structure

```
project-unizero/
├── .husky/                 # Git hooks
├── .next/                  # Next.js build output
├── prisma/                # Database schema
│   └── schema.prisma      # Prisma schema
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── (auth)/        # Auth pages (sign-in, sign-up)
│   │   ├── dashboard/     # Protected dashboard
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # React components
│   │   ├── ui/            # shadcn/ui components
│   │   └── theme-provider.tsx
│   ├── config/            # Centralized configuration
│   │   ├── clerk.ts       # Auth config
│   │   ├── constants.ts   # App constants
│   │   └── theme.ts       # Theme config
│   └── lib/               # Utilities
│       ├── api-response.ts # API helpers
│       ├── db.ts          # Prisma client
│       ├── utils.ts       # General utilities
│       └── validation.ts  # Validation helpers
├── .env.example           # Environment template
├── .eslintrc.json         # ESLint config
├── .prettierrc            # Prettier config
├── next.config.ts         # Next.js config
├── package.json           # Dependencies
├── tailwind.config.ts     # Tailwind config
└── tsconfig.json          # TypeScript config
```

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're a developer, designer, or documentation writer, there's a place for you in UNIZERO.

### How to Contribute

1. **🍴 Fork the repository**
2. **📦 Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/project-unizero.git
   ```
3. **🌿 Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```
4. **💻 Make your changes**

5. **✅ Run tests and linting**

   ```bash
   npm run lint
   npm run build
   ```

6. **📝 Commit your changes** (follow our commit message format)

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

7. **🚀 Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

8. **🔀 Create a Pull Request**

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

| Type       | Description             |
| ---------- | ----------------------- |
| `feat`     | New feature             |
| `fix`      | Bug fix                 |
| `docs`     | Documentation           |
| `style`    | Code style (formatting) |
| `refactor` | Code refactoring        |
| `test`     | Tests                   |
| `chore`    | Maintenance             |

**Examples:**

```
feat(auth): add password reset functionality
fix(dashboard): resolve subscription count error
docs(readme): update installation instructions
refactor(utils): extract validation to separate module
```

### What to Contribute?

- 🐛 **Bug fixes** - Help us identify and fix issues
- ✨ **New features** - Implement planned features from our roadmap
- 📖 **Documentation** - Improve docs, README, or add guides
- 🎨 **UI/UX** - Design improvements and accessibility
- 🧪 **Tests** - Add unit and integration tests

---

## 📝 Pull Request Rules

To maintain code quality and project coherence, all PRs must follow these rules:

### PR Requirements

| Rule                     | Description                               |
| ------------------------ | ----------------------------------------- |
| ✅ **Linked Issue**      | Every PR must be linked to an issue       |
| ✅ **Passing Tests**     | All tests must pass before merging        |
| ✅ **Lint Pass**         | No ESLint errors or warnings              |
| ✅ **Build Success**     | `npm run build` must succeed              |
| ✅ **Reviewed**          | At least one maintainer approval required |
| ✅ **Branch Up-to-date** | Must be rebased on latest `main`          |

### PR Title Format

Use the same format as commit messages:

```
<type>(<scope>): <description>
```

### PR Description Template

```markdown
## Summary

Brief description of changes.

## Changes

- Change 1
- Change 2

## Testing

How did you test these changes?

## Screenshots (if UI changes)

Add screenshots here.

## Checklist

- [ ] Linked issue
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Build passes
- [ ] Lint passes
```

### What Happens After You PR?

1. **Automated Checks** - CI runs tests, lint, build
2. **Code Review** - Maintainers review your code
3. **Feedback** - You may receive change requests
4. **Approval** - Once approved, maintainers merge
5. **Merged** - Your code lands in `main` 🎉

### PR Review Time

- **Initial Review**: 24-72 hours
- **Complex Changes**: May take longer
- **Urgent Fixes**: Tag with `urgent` label

### Don'ts

| ❌ Don't                                  | ✅ Do                       |
| ----------------------------------------- | --------------------------- |
| Create huge PRs (split into smaller ones) | Keep PRs focused and atomic |
| Skip tests                                | Always test your changes    |
| Ignore lint errors                        | Fix all lint issues         |
| Force push to main                        | Use feature branches        |
| Merge main into your branch constantly    | Rebase instead              |

---

## 🔐 Security

### Reporting Vulnerabilities

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT** open a public GitHub issue
2. Email the maintainer directly
3. Provide detailed reproduction steps
4. Wait for acknowledgment before disclosure

### Security Best Practices

- Never commit secrets to Git
- Use environment variables for sensitive data
- Follow OWASP guidelines
- Keep dependencies updated

---

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

### What does this mean?

- ✅ You can use this software for any purpose
- ✅ You can modify the source code
- ✅ You can distribute the software
- ✅ You can use it commercially
- ✅ You must disclose source code of modifications
- ✅ You must keep the same license (AGPL-3.0)

See the [LICENSE](LICENSE) file for full text.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Clerk](https://clerk.com/) - Authentication
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [All Contributors](https://github.com/py-kalki/project-unizero/graphs/contributors) - Thank you!

---

## 📞 Get In Touch

| Channel        | Link                                                                          |
| -------------- | ----------------------------------------------------------------------------- |
| 💬 Discord     | [Join our Discord](https://discord.gg/unizero)                                |
| 🐛 Issues      | [GitHub Issues](https://github.com/py-kalki/project-unizero/issues)           |
| 💡 Discussions | [GitHub Discussions](https://github.com/py-kalki/project-unizero/discussions) |

---

<div align="center">

**Made with ❤️ by the UNIZERO community**

⭐ Star us on [GitHub](https://github.com/py-kalki/project-unizero) | 🍴 Fork us | 🐛 Report bugs

</div>
