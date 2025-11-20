## Current frontend routing:

1. "/" ==> routes to .src/pages/Landing.jsx (landing page)
2. "/dashboard-temp" ==> routes to .src/pages/DashboardTemp.jsx (temporary dashboard page)
3. "/onboarding-temp" ==> routes to ./src/pages/OnboardingTemp.jsx (temporary onboarding page)
4. "/profile-temp" ==> routes to ./src/pages/ProfileTemp.jsx (temporary profile page)
5. "/demo" ==> routes to the ./src/pages/Demo.jsx (api demo page)

## How to add a new page

1. Create a .jsx component in ./frontend/components/pages
2. In ./frontend/src/App.jsx import the component add a <Route> component with the path name and the React component you imported
3. If you want to add to Navbar/footer, use a <Link> component (there should be other examples to follow in those files)
