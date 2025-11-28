## Current frontend routing:

### Normalized Routes (Primary)

1. "/" ==> routes to ./src/pages/Landing.jsx (landing page / home)
2. "/onboarding" ==> routes to ./src/pages/OnboardingTemp.jsx (onboarding page)
3. "/dashboard" ==> routes to ./src/pages/DashboardTemp.jsx (dashboard page)
4. "/profile" ==> routes to ./src/pages/ProfileTemp.jsx (profile page)

### Legacy Routes (Kept for backward compatibility)

5. "/dashboard-temp" ==> routes to ./src/pages/DashboardTemp.jsx (temporary dashboard page)
6. "/onboarding-temp" ==> routes to ./src/pages/OnboardingTemp.jsx (temporary onboarding page)
7. "/profile-temp" ==> routes to ./src/pages/ProfileTemp.jsx (temporary profile page)
8. "/demo" ==> routes to ./src/pages/Demo.jsx (api demo page)

**Note:** The legacy temp routes are kept temporarily but include navigation buttons to reach the normalized routes. The Navbar and Footer use the normalized routes.

## How to add a new page

1. Create a .jsx component in ./frontend/components/pages
2. In ./frontend/src/App.jsx import the component add a <Route> component with the path name and the React component you imported
3. If you want to add to Navbar/footer, use a <Link> component (there should be other examples to follow in those files)
