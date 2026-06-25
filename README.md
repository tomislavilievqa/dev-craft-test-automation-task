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
│   ├── navigation/
│   │   └── navigation.spec.ts           # NAV-001: login page → "Join here" → registration
│   └── registration/
│       └── registration.spec.ts         # TC-001 (automated) + TC-002–011 (skip/todo)
│
├── pages/
│   ├── login.page.ts                    # Login page — locators, actions, navigation
│   ├── registration.page.ts             # Registration page — form locators inlined
│   ├── components/
│   │   └── activation-popup.component.ts  # Reusable activation popup component
│   └── validators/
│       ├── registration.validator.ts    # Assertions for registration page
│       └── activation-popup.validator.ts  # Assertions for activation popup
│
├── fixtures/
│   └── pom.fixture.ts                   # Extends Playwright test with typed POM fixtures
│
├── types/
│   └── registration.types.ts            # TypeScript interfaces for test data
│
├── test-data/
│   └── registration.json                # Valid user, invalid user, boundary data
│
├── utils/
│   ├── random-email.util.ts             # Generates unique emails per test run
│   ├── json-reader.util.ts              # Type-safe JSON file reader
│   └── env.util.ts                      # Environment variable helper
│
├── constants/
│   ├── routes.enum.ts                   # App route constants (/login, /signup, /signup/1)
│   └── user-type.enum.ts                # User type keys (validUser, invalidUser)
│
├── playwright.config.ts                 # Playwright config — chromium, .env, trace/screenshot
├── eslint.config.js                     # ESLint flat config (v10+)
├── tsconfig.json                        # Strict TypeScript + path aliases
├── .env                                 # Part of .gitignore — see .env.example
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

Each page is a class owning its locators and action methods. No assertions live inside page objects — they are kept purely behavioural.

### Component Objects (`pages/components/`)

Reusable UI sections shared across pages (e.g. the activation popup, which can appear in both registration and login flows) are extracted as component classes and composed into page objects.

### Validators (`pages/validators/`)

All assertions live in dedicated Validator classes co-located under `pages/validators/`. Each validator receives the `page` and the related POM instance via constructor injection, keeping assertions decoupled from page actions.

### Fixtures (`fixtures/`)

`pom.fixture.ts` extends Playwright's `test` with typed POM fixtures (`loginPage`, `registrationPage`, `registrationValidator`, `activationPopupValidator`). Tests declare only what they need — construction and injection happen automatically.

### Types (`types/`)

TypeScript interfaces for test data structures (e.g. `RegistrationData`) live in `types/`, consumed by the JSON reader util for type-safe data access.

### Test Data (`test-data/`)

`registration.json` holds three categories:
- `validUser` — a valid email/password pair
- `invalidUser` — an invalid email/password for negative tests
- `boundaryData` — exact boundary strings for email (63/64/65-char local parts) and password (71/72/73-char) length tests

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
