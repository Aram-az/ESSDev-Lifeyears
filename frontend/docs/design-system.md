# Design System Documentation

## Overview
The LifeYears design system provides a set of reusable UI components to ensure consistency and maintainability across the application. It is built on top of Tailwind CSS.

## Components

### Button
A versatile button component with multiple variants and sizes.

**Props:**
- `variant`: 'primary', 'secondary', 'outline', 'disabled' (default: 'primary')
- `size`: 'sm', 'md', 'lg' (default: 'md')
- `disabled`: boolean
- `onClick`: function

**Usage:**
```jsx
<Button variant="primary" onClick={handleClick}>Click Me</Button>
```

### Input
A standard input field with label and error support.

**Props:**
- `label`: string
- `error`: string
- `type`: string (default: 'text')
- `placeholder`: string
- `required`: boolean

**Usage:**
```jsx
<Input label="Email" type="email" value={email} onChange={handleChange} />
```

### Select
A dropdown selection component matching the Input styling.

**Props:**
- `label`: string
- `error`: string
- `options`: Array of objects `{ value, label }` or strings
- `placeholder`: string
- `required`: boolean

**Usage:**
```jsx
<Select 
  label="Role" 
  options={[{ value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }]} 
  value={role} 
  onChange={handleChange} 
/>
```

### Card
A container component with optional header and footer slots.

**Props:**
- `header`: ReactNode
- `footer`: ReactNode
- `children`: ReactNode

**Usage:**
```jsx
<Card header={<h3>Title</h3>} footer={<Button>Save</Button>}>
  <p>Content goes here.</p>
</Card>
```

### Badge
A status indicator or tag.

**Props:**
- `variant`: 'confirmed', 'pending', 'default' (default: 'default')

**Usage:**
```jsx
<Badge variant="confirmed">Confirmed</Badge>
```

### PageTitle
The standard H1 for page headers.

**Props:**
- `description`: string

**Usage:**
```jsx
<PageTitle description="Subtitle text">Page Title</PageTitle>
```

### SectionTitle
The standard H2 for section headers.

**Props:**
- `description`: string
- `icon`: ReactNode

**Usage:**
```jsx
<SectionTitle description="Section description">Section Title</SectionTitle>
```

## Colors
The design system uses a custom `brand` color palette (Red) defined in `tailwind.config.js`.
- `bg-brand-500`: Primary action color
- `text-brand-500`: Primary text color
- `border-brand-200`: Subtle borders

## Typography
- Font Family: Inter (sans-serif)
- Headings: Bold/Semibold
- Body: Regular
