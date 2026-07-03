export function getStartCreatingHref(isAuthenticated: boolean) {
  return isAuthenticated ? "/dashboard" : "/login";
}

export function getWorkspaceHref(isAuthenticated: boolean) {
  return isAuthenticated ? "/dashboard" : "/login";
}
