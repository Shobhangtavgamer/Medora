import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getCurrentProfiles, signIn as signInWithSupabase, signOut as signOutFromSupabase, signUp, type AppProfile, type AppRole } from '@/lib/medoraServices'
import { supabase } from '@/lib/supabase'

export type Workspace = AppRole

export interface AuthUser {
  name: string
  email: string
  role: Workspace
  availableWorkspaces: Workspace[]
  mobile: string
  patientProfile: { id: string; since: string; dob: string }
  professionalProfile: { id: string; title: string; organisation: string }
  organisationProfile: { id: string; name: string }
}

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  workspace: Workspace
  setWorkspace: (w: Workspace) => void
  signIn: (args: { email: string; password: string }) => Promise<Workspace>
  signUp: (args: { email: string; password: string; name: string; role: Workspace }) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function toAuthUser(profile: AppProfile, profiles: AppProfile[]): AuthUser {
  const patient = profiles.find((item) => item.role === 'patient')?.patient
  const professional = profiles.find((item) => item.role === 'professional')?.professional
  const organisation = profiles.find((item) => item.role === 'organisation')?.organisation
  return {
    name: profile.name,
    email: profile.email,
    mobile: '',
    role: profile.role,
    availableWorkspaces: profiles.map((item) => item.role),
    patientProfile: { id: patient?.patient_id ?? '', since: '', dob: patient?.date_of_birth ?? '' },
    professionalProfile: { id: professional?.professional_id ?? '', title: '', organisation: '' },
    organisationProfile: { id: organisation?.organisation_id ?? '', name: organisation?.name ?? '' },
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [workspace, setWorkspace] = useState<Workspace>('patient')

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    void getCurrentProfiles().then((profiles) => {
      if (profiles[0]) {
        setUser(toAuthUser(profiles[0], profiles))
        setWorkspace(profiles[0].role)
      }
    }).catch(() => setUser(null)).finally(() => setLoading(false))
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null)
        return
      }
      void getCurrentProfiles().then((profiles) => {
        if (profiles[0]) {
          setUser(toAuthUser(profiles[0], profiles))
          setWorkspace(profiles[0].role)
        }
      })
    })
    return () => data.subscription.unsubscribe()
  }, [])

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    await signInWithSupabase(email, password)
    const profiles = await getCurrentProfiles()
    const profile = profiles[0]
    if (!profile) throw new Error('No Medora profile exists for this account.')
    setUser(toAuthUser(profile, profiles))
    setWorkspace(profile.role)
    return profile.role
  }

  const register = async ({ email, password, name, role }: { email: string; password: string; name: string; role: Workspace }) => {
    await signUp(email, password, name, role)
  }

  const signOut = async () => {
    await signOutFromSupabase()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, workspace, setWorkspace, signIn, signUp: register, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}