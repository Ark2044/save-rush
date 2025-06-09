# Save Rush Routing Update

## Routing System Change

As of May 20, 2025, this project exclusively uses the Next.js App Router for all routing. The older Pages Router implementation has been completely removed.

## Key Changes

1. **Removed `/src/pages` directory**: All routing is now handled through the App Router in `/src/app`.
2. **Simplified route structure**: Eliminated duplicate routes between the Pages Router and App Router.

3. **Route organization**:
   - Public routes (e.g., `/category/[category]`) are accessible to all users
   - Protected routes are grouped in `/app/(authenticated)`
   - Auth-related routes are grouped in `/app/(auth)`

## Benefits

- Cleaner codebase with a single routing system
- Better support for layouts and route groups
- More predictable routing behavior
- Improved performance
- Better developer experience

## Implementation Details

- `/category/[category]` remains a public route as defined in middleware
- Authentication checks are performed within components as needed
- Route protection is enforced by middleware for strictly protected routes
