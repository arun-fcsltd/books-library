export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth();

  const excludedRoutes = ['/', '/new'];

  if (excludedRoutes.includes(to.path)) {
    return;
  }


  // 1. If not logged in
  if (Object.keys(user).length === 0) {
    // Prevent access to protected [user] routes
    if (to.path.startsWith('/auth')) {
      // Allow access to login/register
      return;
    } else if (to.path.startsWith(`/${to.params.user || ''}`)) {
      // Redirect to login if trying to access user-specific route
      return navigateTo('/auth/login');
    }
  } else {
    // 2. If logged in
    // Prevent access to /auth routes
    if (to.path.startsWith('/auth')) {
      if (user.role === 'admin') {
        return navigateTo('/admin');
      }
      return navigateTo('/');
    }

    // 3. Handle [user] dynamic route as role-based access
    const role = user?.role || 'user';

    if (to.params.user && to.params.user !== role) {
      // Redirect to proper role route if they try to access another role's route
      return navigateTo(`/${role}`);
    }

    // 4. Handle admin routes
    if (to.path.startsWith('/admin') && role !== 'admin') {
      return navigateTo('/');
    }
  }

  console.log('User is logged in:', user);
});
