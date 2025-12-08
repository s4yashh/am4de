/**
 * Get the correct API URL based on the environment
 * For localhost: use /api/ (Vite proxy)
 * For production/Vercel: use full URL to backend
 */
export function getApiUrl(endpoint: string): string {
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  
  if (isLocalhost) {
    // Use Vite proxy for localhost
    return `/api${endpoint}`;
  } else {
    // Use direct URL for production
    return `https://amide-backend.vercel.app${endpoint}`;
  }
}
