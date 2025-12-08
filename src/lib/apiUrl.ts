/**
 * Get the correct API URL based on the environment
 * For localhost: use /api/ (Vite proxy)
 * For production/Vercel: use full URL to backend
 */
export function getApiUrl(endpoint: string): string {
  // Check if running on localhost (development)
  if (typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || 
       window.location.hostname === '127.0.0.1')) {
    // Use local proxy for development
    return `/api${endpoint}`;
  }
  
  // Use full URL for production
  return `https://amide-backend.vercel.app${endpoint}`;
}
