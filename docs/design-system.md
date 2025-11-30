# LifeYears Design System

This document describes the design system components and design tokens used in the LifeYears Preventative Health Tracker application.

## Design Tokens

### Colors

The LifeYears brand uses a red color palette:

- **brand-50**: `#FEF2F2` - Very light red/pink (backgrounds)
- **brand-100**: `#FEE2E2` - Light red/pink (subtle backgrounds)
- **brand-200**: `#FECACA` - Light red (borders, inactive states)
- **brand-300**: `#FCA5A5` - Lighter red
- **brand-400**: `#F87171` - Medium-light red
- **brand-500**: `#EF4444` - **Primary red** (main brand color)
- **brand-600**: `#DC2626` - Darker red (hover states)
- **brand-700**: `#B91C1C` - Dark red (active states)
- **brand-800**: `#991B1B` - Very dark red
- **brand-900**: `#7F1D1D` - Darkest red

### Typography

- **Font Family**: Inter (with system font fallbacks)
- **Font Sizes**:
  - `xs`: 12px (0.75rem)
  - `sm`: 14px (0.875rem)
  - `base`: 16px (1rem)
  - `lg`: 18px (1.125rem)
  - `xl`: 20px (1.25rem)
  - `2xl`: 24px (1.5rem)
  - `3xl`: 30px (1.875rem)
  - `4xl`: 36px (2.25rem)
  - `5xl`: 48px (3rem)

### Border Radius

- `sm`: 2px (0.125rem)
- `DEFAULT`: 6px (0.375rem)
- `md`: 8px (0.5rem)
- `lg`: 12px (0.75rem)
- `xl`: 16px (1rem)
- `2xl`: 24px (1.5rem)
- `full`: 9999px (fully rounded)

### Spacing Scale

The spacing scale follows a consistent 4px base unit:
- `0.5`: 2px
- `1`: 4px
- `1.5`: 6px
- `2`: 8px
- `2.5`: 10px
- `3`: 12px
- `3.5`: 14px
- `4`: 16px
- `5`: 20px
- `6`: 24px
- `8`: 32px
- `10`: 40px
- `12`: 48px
- `16`: 64px
- `20`: 80px
- `24`: 96px

## Components

All components are located in `frontend/src/components/ui/` and can be imported independently.

### Button

A versatile button component with multiple variants and sizes.

**Location**: `components/ui/Button.jsx`

**Props**:
- `variant`: `'primary' | 'secondary' | 'outline' | 'disabled'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `children`: React node (required)
- `onClick`: Function
- `disabled`: Boolean (default: `false`)
- `className`: String (additional CSS classes)

**Usage**:
```jsx
import Button from '../components/ui/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

**Variants**:
- `primary`: Red background with white text (brand-500)
- `secondary`: Gray background with dark text
- `outline`: White background with red border and text
- `disabled`: Gray background, disabled state

### Input

An input field component with label and error message support.

**Location**: `components/ui/Input.jsx`

**Props**:
- `label`: String (optional)
- `error`: String (error message to display)
- `type`: String (input type: text, email, password, etc.)
- `id`: String (auto-generated if not provided)
- `name`: String
- `value`: String
- `onChange`: Function
- `placeholder`: String
- `required`: Boolean (default: `false`)
- `className`: String

**Usage**:
```jsx
import Input from '../components/ui/Input';

<Input
  label="Email Address"
  type="email"
  placeholder="example@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  required
/>
```

### Card

A container component with optional header and footer sections.

**Location**: `components/ui/Card.jsx`

**Props**:
- `header`: React node (optional)
- `children`: React node (required)
- `footer`: React node (optional)
- `className`: String

**Usage**:
```jsx
import Card from '../components/ui/Card';

<Card
  header={<h3>Card Title</h3>}
  footer={<Button>Action</Button>}
>
  <p>Card body content</p>
</Card>
```

### Badge

A small status indicator badge component.

**Location**: `components/ui/Badge.jsx`

**Props**:
- `variant`: `'confirmed' | 'pending' | 'default'` (default: `'default'`)
- `children`: React node (required)
- `className`: String

**Usage**:
```jsx
import Badge from '../components/ui/Badge';

<Badge variant="confirmed">confirmed</Badge>
<Badge variant="pending">pending</Badge>
```

**Variants**:
- `confirmed`: Red background (brand-500) with white text
- `pending`: Light red background (brand-200) with dark red text
- `default`: Gray background with dark text

### PageTitle

A page-level heading component (H1) with optional description.

**Location**: `components/ui/PageTitle.jsx`

**Props**:
- `children`: React node (required) - Title text
- `description`: String (optional) - Subtitle/description
- `className`: String

**Usage**:
```jsx
import PageTitle from '../components/ui/PageTitle';

<PageTitle description="Manage your health information">
  Health Profile
</PageTitle>
```

### SectionTitle

A section-level heading component (H2) with optional description and icon.

**Location**: `components/ui/SectionTitle.jsx`

**Props**:
- `children`: React node (required) - Title text
- `description`: String (optional) - Subtitle/description
- `icon`: React node (optional) - Icon element
- `className`: String

**Usage**:
```jsx
import SectionTitle from '../components/ui/SectionTitle';

<SectionTitle 
  description="Current body measurements"
  icon={<HeartIcon />}
>
  Physical Measurements
</SectionTitle>
```

## Usage Guidelines

### Importing Components

All components are self-contained and can be imported individually:

```jsx
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
// etc.
```

### Styling

- Components use Tailwind CSS utility classes
- Custom styling can be added via the `className` prop
- All components follow the design system color palette and spacing rules
- Components are responsive by default

### Accessibility

- Input components include proper ARIA attributes for error states
- Buttons include focus states and keyboard navigation support
- All interactive elements have proper focus indicators

### Best Practices

1. **Consistency**: Always use design system components instead of creating custom styled elements
2. **Composition**: Combine components to create complex UIs (e.g., Card with Button in footer)
3. **Props**: Use component props for customization rather than overriding styles
4. **Accessibility**: Always provide labels for inputs and proper ARIA attributes when needed

## Playground

Visit `/styleguide-temp` to see all components in action with interactive examples.

## Future Enhancements

Potential additions to the design system:
- Toggle/Switch component
- Dropdown/Select component
- Modal/Dialog component
- Toast/Notification component
- Loading/Spinner component
- Form components (Textarea, Checkbox, Radio)

