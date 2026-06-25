/**
 * Generates a random email address to avoid duplicate registration conflicts.
 */
export function generateRandomEmail(domain = 'mailinator.com'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `test.user.${timestamp}.${random}@${domain}`;
}
