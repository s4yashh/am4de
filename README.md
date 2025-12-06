# SecureNet - AI-Powered Threat Detection Dashboard

A modern, professional cybersecurity dashboard built with Svelte, Vite, and Tailwind CSS. Analyzes encrypted network traffic for threats without decryption, displaying real-time ML-based threat detection with formal colors and smooth animations.

## ✨ Features

### Dashboard UI

- ✅ **Full-screen responsive layout** - Uses entire viewport width with adaptive padding
- ✅ **Modern animations** - Smooth transitions, pulsing indicators, fade-ins, and gradient effects
- ✅ **Formal color scheme** - Professional blue, indigo, amber, and red gradients
- ✅ **Loads immediately** - No authentication required (backend will add later)
- ✅ **Real-time updates** - Auto-refreshes every 3 seconds

### Dashboard Sections

#### 1. **Top Bar** (Always Visible)

- Permission status with animated indicator
- Active security commands panel
- Live status badge with current time
- Responsive design (hides panel on mobile)

#### 2. **Network Metrics Section**

- 6 security parameters displayed in responsive grid (1-5 columns based on screen size)
- Each metric card features:
  - Colored gradient backgrounds (blue, indigo, purple, slate, rose, cyan)
  - Animated hover effects with smooth transitions
  - Gradient text for metric values
  - Progress bar indicating metric status
  - Subtle background icons

#### 3. **AI Detection Models Section**

- 4 ML model predictions with confidence scores
- Visual progress bars with smooth animations
- Color-coded confidence levels:
  - 🟢 Green (≥85%): High confidence
  - 🟡 Amber (70-85%): Medium confidence
  - 🔴 Red (<70%): Low confidence
- Pulsing active indicator
- Hover animations with background color transitions

#### 4. **Security Alerts & Logs Section**

- Vercel-style scrollable log panel (max-height: 600px)
- Two log types with distinct styling:
  - **Warning** (🟠 Amber): Non-critical alerts
  - **Alert** (🔴 Red): Critical security events
- Features:
  - Animated fade-in on load
  - Gradient left borders
  - Rounded icon containers with shadows
  - Relative timestamps ("Just now", "5m ago", etc.)
  - Status badges with uppercase labels
  - Hover effects with icon shadow transitions
  - Pulse animation on critical alerts

## 🏗️ Project Structure

```
src/
├── App.svelte                           # Main dashboard (full-screen layout)
├── app.css                              # Tailwind CSS imports
├── main.js                              # Entry point
│
└── lib/
    ├── api.ts                           # Mock API functions & types
    │
    └── components/
        ├── TopBar.svelte                # Header with permission & commands
        ├── ParameterCard.svelte         # Network metric card
        ├── PredictionCard.svelte        # ML model confidence display
        ├── LogEntry.svelte              # Alert/warning log entry
        ├── AutoSafeCommands.svelte      # Safety commands panel
        │
        └── Auth/                        # Authentication pages (placeholder)
            ├── LoginForm.svelte         # Email/password login
            ├── RegisterForm.svelte      # User registration
            └── OTPForm.svelte           # 6-digit OTP verification
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit: http://localhost:5173 (or 5174 if 5173 is in use)

### Build

```bash
npm run build
```

## 📊 API Mock Data

Located in `src/lib/api.ts`. Replace with real API endpoints:

```typescript
// Network Metrics
getParameters() → [{ name, value }, ...]

// ML Model Scores
getPredictions() → [{ modelName, confidence }, ...]

// Security Events
getLogs() → [{ message, level: 'warning'|'alert', timestamp }, ...]

// Permission Status
getPermissionStatus() → string

// Active Commands
getAutoSafeCommands() → [{ command, status, timestamp }, ...]
```

## 🎨 Design System

### Colors

- **Primary**: Blue (600/700) + Indigo (600/700)
- **Warnings**: Amber (400/700)
- **Alerts**: Red (500/800)
- **Neutral**: Slate & Gray (50-900)
- **Success**: Emerald (500)

### Typography

- **Headers**: Gradient text (slide-900 to slate-700)
- **Bold numbers**: Gradient (color-specific)
- **Subtext**: Gray-600

### Spacing

- **Section gaps**: 16px (mb-16)
- **Card gaps**: 24px (gap-6)
- **Responsive padding**: 4px (mobile) to 8px (lg)

### Animations

- Hover transitions: 300ms ease-out
- Fade-ins: 300ms ease-out
- Pulsing indicators: 2s cubic-bezier(0.4, 0, 0.6, 1)
- Gradient bar expansion: 500ms ease-in-out

## 🔐 Authentication Pages (Ready for Backend)

Three forms included for the backend team to implement:

1. **LoginForm.svelte** - Email & password login
2. **RegisterForm.svelte** - Account creation with validation
3. **OTPForm.svelte** - 6-digit OTP verification

All forms have:

- Error handling & validation
- Loading states
- Professional branding (SecureNet)
- Responsive design

## 📱 Responsive Breakpoints

- **Mobile**: 1 column grid
- **SM (640px)**: 2 columns
- **MD (768px)**: 2-3 columns
- **LG (1024px)**: 3-4 columns
- **XL (1280px)**: 4 columns
- **2XL (1536px)**: 5 columns

## 🔄 Auto-Refresh Configuration

Edit in `src/App.svelte` (currently 3 seconds):

```typescript
const interval = setInterval(loadData, 3000); // milliseconds
```

## 📦 Dependencies

- **svelte** (^5.43.8) - UI framework
- **vite** (^7.2.4) - Build tool
- **tailwindcss** (^3.3.5) - CSS framework
- **typescript** (^5.3.3) - Type safety

## 🛠️ Development Notes

### Adding New Metrics

1. Update mock data in `src/lib/api.ts`
2. Add to `mockParameters` array with `name` and `value`
3. Component auto-assigns gradient colors based on name

### Adding New Models

1. Add to `mockPredictions` array with `modelName` and `confidence` (0-1)
2. Component auto-colors based on confidence level

### Adding New Logs

1. Add to `mockLogs` with `message`, `level`, and `timestamp`
2. Auto-displays as warning or alert based on level

### Custom Animations

All Tailwind animations available. For custom keyframes, add to `<style>` blocks in components.

## 🔐 Security Considerations

- [ ] Add HTTPS enforcement
- [ ] Implement CSRF protection
- [ ] Validate all user inputs
- [ ] Add rate limiting
- [ ] Implement session management
- [ ] Encrypt sensitive data in transit

## 📞 Backend Integration Checklist

- [ ] Replace mock API functions with real endpoints
- [ ] Implement authentication endpoints
- [ ] Add WebSocket for real-time log streaming
- [ ] Setup CORS configuration
- [ ] Add rate limiting & validation
- [ ] Implement proper error handling

## 📝 Notes

- Dashboard is production-ready for styling and animations
- Mock data provides realistic cybersecurity context
- Components are fully typed with TypeScript
- Tailwind configuration supports all required colors
- Ready for backend team to add API integration

---

Built with ❤️ for SecureNet - AI-Powered Threat Detection

## 🛠️ Installation & Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open browser at `http://localhost:5173` (or `5174` if port is busy)

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🔌 API Endpoints (Mocked for now)

### `getParameters()`

Returns array of system parameters:

```typescript
[
  { name: "Temperature", value: 72.5 },
  { name: "Humidity", value: 45 },
  ...
]
```

### `getPredictions()`

Returns array of model predictions:

```typescript
[
  { modelName: "Alert System", confidence: 0.92 },
  ...
]
```

### `getLogs()`

Returns array of system logs:

```typescript
[
  {
    id: "1",
    message: "High temperature detected",
    level: "warning", // or "alert"
    timestamp: "2025-12-06T12:25:00Z"
  },
  ...
]
```

### `getPermissionStatus()`

Returns permission status string:

```typescript
"Waiting for Permission";
```

### `getAutoSafeCommands()`

Returns array of auto-safety commands:

```typescript
[
  {
    id: "1",
    command: "Auto-Safety Brake",
    status: "completed", // or "active"
    timestamp: "2025-12-06T12:25:00Z"
  },
  ...
]
```

## 🎨 Components

### TopBar

- Shows permission status with pulse indicator
- Displays recent auto-safety commands
- Sticky header that stays at top

### ParameterCard

- Blue left border
- Shows parameter name and value
- Hover effect with shadow

### PredictionCard

- Purple left border
- Confidence percentage in large font
- Visual progress bar (color changes: green ≥85%, yellow ≥70%, red <70%)

### LogEntry

- Warning: Orange left border + icon
- Alert: Red left border + icon
- Shows timestamp in relative format (e.g., "5m ago")
- Scrollable panel with max height

### AutoSafeCommands

- Shows command name with status badge
- Active commands have green pulse indicator
- Completed commands appear grayed out

## 📱 Responsive Design

- Mobile-first approach
- Grid layouts adjust: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- Header adapts for smaller screens

## 🎯 Future Integration Points

When backend is ready:

1. Replace mock data in `src/lib/api.ts` with real fetch calls
2. Update permission status from `/api/system/permission`
3. Implement actual data fetching from all endpoints
4. Add real-time updates with WebSocket if needed

## 📋 Tech Stack

- **Svelte 5** - Reactive UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **TypeScript** - Type safety
- **PostCSS + Autoprefixer** - CSS processing

## 🚀 Getting Started

### Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Need an official Svelte framework?

Check out [SvelteKit](https://github.com/sveltejs/kit#readme), which is also powered by Vite. Deploy anywhere with its serverless-first approach and adapt to various platforms, with out of the box support for TypeScript, SCSS, and Less, and easily-added support for mdsvex, GraphQL, PostCSS, Tailwind CSS, and more.

## Technical considerations

**Why use this over SvelteKit?**

- It brings its own routing solution which might not be preferable for some users.
- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.

This template contains as little as possible to get started with Vite + Svelte, while taking into account the developer experience with regards to HMR and intellisense. It demonstrates capabilities on par with the other `create-vite` templates and is a good starting point for beginners dipping their toes into a Vite + Svelte project.

Should you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `checkJs` in the JS template?**

It is likely that most cases of changing variable types in runtime are likely to be accidental, rather than deliberate. This provides advanced typechecking out of the box. Should you like to take advantage of the dynamically-typed nature of JavaScript, it is trivial to change the configuration.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/sveltejs/svelte-hmr/tree/master/packages/svelte-hmr#preservation-of-local-state).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```js
// store.js
// An extremely simple external store
import { writable } from "svelte/store";
export default writable(0);
```
