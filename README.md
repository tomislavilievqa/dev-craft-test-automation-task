# CODE Hospitality — Playwright Automation Framework

A production-ready UI automation framework built with **Playwright + TypeScript**, targeting the registration flow on [https://code-staging-web.on.dev-craft.tech](https://code-staging-web.on.dev-craft.tech).

---

## Tech Stack

| Tool       | Version |
| ---------- | ------- |
| Playwright | ^1.61   |
| TypeScript | ^6.0    |
| ESLint     | ^10     |
| Prettier   | ^3      |
| Husky      | ^9      |
| Node.js    | ≥ 18    |

---

## Project Structure

```
project-root/
│
├── tests/
│   └── registration/
│       └── registration.spec.ts     # TC-001 (automated) + TC-002–010 (TODO manual)
│
├── pages/
│   ├── login.page.ts                # Login page POM
│   └── registration.page.ts        # Registration page POM
│
├── components/
│   ├── registration-form.component.ts
│   └── activation-popup.component.ts
│
├── validators/
│   ├── registration.validator.ts
│   └── activation-popup.validator.ts
│
├── test-data/
│   └── registration.json
│
├── utils/
│   ├── random-email.util.ts
│   ├── json-reader.util.ts
│   └── env.util.ts
│
├── constants/
│   ├── routes.enum.ts
│   └── user-type.enum.ts
│
├── playwright.config.ts
├── tsconfig.json
├── .env                             # Not committed — see .env.example
├── .env.example
├── .eslintrc.json
├── .prettierrc
└── package.json
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install chromium
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` if needed:

```env
BASE_URL=https://code-staging-web.on.dev-craft.tech
```

---

## Running Tests

```bash
# Run all tests (headless)
npm test

# Run with browser visible
npm run test:headed

# Run with Playwright UI mode
npm run test:ui

# Debug step-by-step
npm run test:debug

# Open last HTML report
npm run test:report
```

---

## Code Quality

```bash
# Lint check
npm run lint

# Lint and auto-fix
npm run lint:fix

# Format all files
npm run format

# Check formatting only (CI)
npm run format:check
```

---

## Git Hooks (Husky)

| Hook         | Command                                |
| ------------ | -------------------------------------- |
| `pre-commit` | `npm run lint && npm run format:check` |
| `pre-push`   | `npm run test`                         |

---

## Architecture

### Page Object Model (POM)

Each page is a class with locators, actions, and navigation methods. No assertions inside page objects.

### Component Objects

Reusable UI sections (registration form, activation popup) are extracted as components and injected into pages.

### Validators

All assertions live in dedicated Validator classes. Each validator receives the `page` and related POM via constructor injection.

### Waiting Strategy

1. Auto-waiting (Playwright default) — preferred
2. Assertion-based waiting (`expect(...).toBeVisible()`) — for explicit checks
3. Explicit waits (`locator.waitFor()`, `page.waitForURL()`) — only when necessary
4. `waitForTimeout()` — never in production tests

### Locator Priority

1. `data-testid`
2. `id`
3. `name`
4. `aria-label` / `role`
5. CSS selectors
6. XPath (last resort)

---

## Test Cases

### Automated

| ID     | Title                                        | Status       |
| ------ | -------------------------------------------- | ------------ |
| TC-001 | Register with valid email and valid password | ✅ Automated |

### Manual (TODO)

| ID     | Title                                                      |
| ------ | ---------------------------------------------------------- |
| TC-002 | Register with empty email                                  |
| TC-003 | Register with invalid email format                         |
| TC-004 | Register with empty password                               |
| TC-005 | Register with weak password                                |
| TC-006 | Register without accepting Terms & Conditions              |
| TC-007 | Verify password visibility toggle                          |
| TC-008 | Verify email field maximum length                          |
| TC-009 | Verify password field maximum length                       |
| TC-010 | Verify Activation Code popup after successful registration |

Full details for TC-002–TC-010 are documented as comments at the bottom of [tests/registration/registration.spec.ts](tests/registration/registration.spec.ts).
