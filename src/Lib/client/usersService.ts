import { User, Candidate, Company } from "@/types/index";
import { ICandidate, ICompany } from "@/app/Types/slices";

export async function createUserAndCandidate(data: User & Candidate) {
  const response = await fetch('/api/users/candidate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create candidate profile');
  }
  
  return response.json();
}

export async function createUserAndCompany(data: User & Company) {
  const response = await fetch('/api/users/company', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create company profile');
  }
  
  return response.json();
}

export async function getUserByClerkId(clerkId: string | undefined) {
  if (!clerkId) return null;
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(
      `${baseUrl}/api/user/get-user-by-clerk-id?clerkId=${clerkId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );
    
    if (!response.ok) {
      console.error('Error response:', await response.text());
      return null;
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function setUserRole(role: string) {
  const response = await fetch("/api/user/set-role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role }),
  });

  if (!response.ok) {
    throw new Error(`Failed to set role: ${response.statusText}`);
  }
  return response.json();
}

export async function registerCandidate(candidate: ICandidate) {
  const response = await fetch("/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(candidate),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || `Registration error: ${response.statusText}`);
  }

  return response.json();
}

export async function registerCompany(company: ICompany) {
  const response = await fetch("/api/user/update-company-register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...company }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || `Registration error: ${response.statusText}`);
  }

  return response.json();
}

export async function checkUserRole(role: string): Promise<boolean> {
  try {
    const response = await fetch('/api/user/check-role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });
    
    if (!response.ok) return false;
    const { hasRole } = await response.json();
    return hasRole;
  } catch (error) {
    console.error('Error checking role:', error);
    return false;
  }
}

export async function waitForUserRole(role: string, maxAttempts = 10): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    const hasRole = await checkUserRole(role);
    if (hasRole) return true;
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  return false;
} 