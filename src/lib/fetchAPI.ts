/**
 * Custom fetch wrapper that intercepts Vercel URLs on localhost
 * and redirects them through the Vite proxy
 */
export async function fetchAPI(url: string, options?: RequestInit): Promise<Response> {
  let finalUrl = url;

  // On localhost, intercept Vercel URLs and use local proxy
  if (typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || 
       window.location.hostname === '127.0.0.1')) {
    // Convert https://amide-backend.vercel.app/endpoint to /api/endpoint
    finalUrl = url.replace('https://amide-backend.vercel.app', '/api');
  }

  return fetch(finalUrl, options);
}
