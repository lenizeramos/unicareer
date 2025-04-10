export async function waitForUserRole(expectedRole: string, maxAttempts = 10): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch("/api/check-role");
      if (!response.ok) {
        throw new Error(`Failed to check role: ${response.statusText}`);
      }
      const data = await response.json();
      
      if (data.role === expectedRole) {
        return true;
      }

      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error("Error checking role:", error);
    }
  }
  return false;
} 