````md
# agents.md

## Frontend Development Rules

### 1. Prefer shadcn/ui Components

- Always try to use `shadcn/ui` components before creating custom components.
- Reuse existing shadcn patterns for:
  - dialogs
  - buttons
  - forms
  - dropdowns
  - tables
  - sheets
  - tabs
  - tooltips
  - popovers
- Only create custom components when no suitable shadcn component exists.

---

### 2. Use Lucide Icons Only

- Use `lucide-react` for all icons.
- Do not use:
  - Heroicons
  - FontAwesome
  - Material Icons
  - custom SVG icons
- Keep icon styling consistent across the app.

Example:

```tsx
import { Plus, Settings, ChevronRight } from "lucide-react";
```
````

---

### 3. Prefer Tailwind CSS

- Use Tailwind CSS utility classes whenever possible.
- Avoid traditional CSS files unless absolutely necessary.
- Avoid inline styles unless dynamically required.

Preferred:

```tsx
<div className="flex items-center gap-2 rounded-xl border p-4">
```

Avoid:

```css
.container {
  display: flex;
}
```

---

### 4. Prefer Flexbox Over Grid

- Use `flex` layouts instead of CSS grid whenever possible.
- Prefer:
  - `flex`
  - `flex-col`
  - `flex-row`
  - `flex-wrap`
  - `justify-*`
  - `items-*`

Only use grid when the layout truly requires two-dimensional control.

---

### 5. Avoid Responsive Prefixes

- Do not use:
  - `sm:`
  - `md:`
  - `lg:`
  - `xl:`
  - `2xl:`

Build layouts that work naturally without breakpoint-specific styling unless explicitly required.

Avoid:

```tsx
<div className="md:flex-row">
```

Preferred:

```tsx
<div className="flex flex-col">
```

---

### 6. Avoid Hardcoded Pixel Text Sizes

- Use semantic Tailwind typography classes instead of arbitrary pixel values.

Preferred:

- `text-sm`
- `text-base`
- `text-lg`
- `text-xl`

Avoid:

```tsx
text-[12px]
text-[18px]
```

Spacing should also avoid arbitrary pixel values whenever possible.

Preferred:

- `p-4`
- `gap-2`
- `mt-6`

Avoid:

```tsx
mt-[17px]
```

---

### 7. No Hardcoded Strings in Components

- Never hardcode user-facing text inside components.
- The application supports:
  - English
  - Chinese

All text content must come from the localization/messages system.

Preferred:

```tsx
t("dashboard.welcome");
```

Avoid:

```tsx
<h1>Welcome Back</h1>
```

- Store all translations inside the `messages` folder.
- Keep translation keys structured and scalable.

Example:

```json
{
  "dashboard": {
    "welcome": "Welcome Back"
  }
}
```

---

### 8. Keep Components Small and Reusable

- Components should have a single responsibility.
- Extract reusable UI patterns early.
- Avoid large monolithic components.
- Prefer composition over deeply nested logic.

---

### 9. Prefer Type Safety

- Avoid `any`.
- Use proper TypeScript types and interfaces.
- Prefer explicit typing for:
  - props
  - API responses
  - state objects

---

### 10. Keep Styling Consistent

- Use consistent spacing and sizing patterns.
- Prefer rounded corners:
  - `rounded-xl`
  - `rounded-2xl`

- Prefer soft UI patterns with:
  - subtle borders
  - muted backgrounds
  - consistent hover states

---

### 11. Clean Code Principles

- Avoid duplicated logic.
- Remove unused imports.
- Keep files organized.
- Use meaningful variable and component names.
- Prefer readability over clever implementations.

---

### 12. Animation Guidelines

- Prefer subtle animations.
- Use:
  - `transition-all`
  - `duration-200`
  - `ease-in-out`

- Avoid excessive motion.

Prefer:

```tsx
hover: scale - [1.02];
```

Over complex custom animations.

---

```

```
