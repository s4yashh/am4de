/**
 * Client-side SHA-256 hashing utility
 * Used to hash passwords before sending to backend per API documentation
 */

export async function sha256(input: string): Promise<string> {
  // Prevent SSR crash - crypto.subtle only exists in browser
  if (typeof window === 'undefined') {
    return '';
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert buffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}
