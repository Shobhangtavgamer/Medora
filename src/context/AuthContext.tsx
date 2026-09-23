import { createContext, useContext, useState, type ReactNode } from 'react'

export type Workspace = 'patient' | 'professional' | 'organisation'

export interface AuthUser {
  name: string
  email: string
  mobile: string
  patientProfile: { id: string; since: string; dob: string }
  professionalProfile: { id: string; title: string; organisation: string }
  organisationProfile: { id: string; name: string }
}

interface AuthContextValue {
  user: AuthUser | null
  workspace: Workspace
  setWorkspace: (w: Workspace) => void
  signIn: (args: { email: string; workspace?: Workspace }) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const demoUser: AuthUser = {
  name: 'Ava Thompson',
  email: 'ava.thompson@example.com',
  mobile: '+91 98765 43210',
  patientProfile: { id: 'PAT-21Q7M3', since: 'Mar 2021', dob: '1994-06-17' },
  professionalProfile: { id: 'HCP-29MX51', title: 'General Practice', organisation: 'Sharma Medical Clinic' },
  organisationProfile: { id: 'ORG-74PQ20', name: 'XYZ Hospital' },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(demoUser)
  const [workspace, setWorkspace] = useState<Workspace>('patient')

  const signIn = ({ email, workspace: w = 'patient' }: { email: string; workspace?: Workspace }) => {
    setUser({ ...demoUser, email })
    setWorkspace(w)
  }

  const signOut = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, workspace, setWorkspace, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}