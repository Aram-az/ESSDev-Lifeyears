## Current frontend routing

### Normalized Routes (Primary)

1. "/" ==> routes to `./frontend/src/pages/Landing.jsx` (landing / home page)
2. "/onboarding" ==> routes to `./frontend/src/pages/OnboardingTemp.jsx` (onboarding flow)
3. "/dashboard" ==> routes to `./frontend/src/pages/DashboardProto.jsx` (main dashboard)
4. "/profile" ==> routes to `./frontend/src/pages/Profile.jsx` (profile / account page)

### Legacy / Dev Routes (Kept for backward compatibility & internal use)

5. "/dashboard-temp" ==> routes to `./frontend/src/pages/DashboardTemp.jsx` (legacy dashboard prototype)
6. "/onboarding-temp" ==> routes to `./frontend/src/pages/OnboardingTemp.jsx` (older onboarding path, alias of /onboarding)
7. "/profile-temp" ==> routes to `./frontend/src/pages/ProfileTemp.jsx` (legacy profile prototype)
8. "/dashboard-proto" ==> routes to `./frontend/src/pages/DashboardProto.jsx` (alias of /dashboard used during design/dev)
9. "/demo" ==> routes to `./frontend/src/pages/Demo.jsx` (mock API + localStorage demo page)

**Note:**  
The normalized routes (`/`, `/onboarding`, `/dashboard`, `/profile`) are the ones used for the actual user flow and should be used in the Navbar, Footer, and any external links. The legacy/dev routes are kept for debugging and backward compatibility during development; you can remove them once the team no longer needs the older URLs or prototype pages.

---

## How to add a new page

1. Create a `.jsx` component in `./frontend/src/pages`  
   - Example: `./frontend/src/pages/Settings.jsx`.

2. In `./frontend/src/App.jsx`, import the new component and add a `<Route>`:
```jsx
import Settings from "./pages/Settings.jsx";

// inside <Routes>...
<Route
  path="/settings"
  element={
    <Layout>
      <Settings />
    </Layout>
  }
/>