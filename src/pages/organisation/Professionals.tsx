import { useEffect, useState } from 'react'
import { Stethoscope } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip, VerifiedBadge } from '@/components/shared/IdentityBadges'
import { useAuth } from '@/context/AuthContext'
import { getOrganisationProfessionals } from '@/lib/medoraServices'

type Professional = { id: string; name: string; role: string; verified: boolean }

export default function Professionals() {
  const { user } = useAuth()
  const [professionals, setProfessionals] = useState<Professional[]>([])
  useEffect(() => { if (user?.organisationProfile.id) void getOrganisationProfessionals(user.organisationProfile.id).then(setProfessionals).catch(() => setProfessionals([])) }, [user?.organisationProfile.id])
  return <div className="space-y-6"><PageHeader title="Professionals" description="Professionals associated with this organisation." /><Card><CardContent className="grid gap-4 p-6 md:grid-cols-2">{professionals.length === 0 ? <p className="text-sm text-slate-500">No professionals are associated with this organisation.</p> : professionals.map((professional) => <Card key={professional.id}><CardHeader title={professional.name} description={professional.role} icon={<Stethoscope className="size-5" />} action={<Badge tone="green">Active</Badge>} /><CardContent className="flex items-center justify-between"><IdChip id={professional.id} /><VerifiedBadge verified={professional.verified} /></CardContent></Card>)}</CardContent></Card></div>
}
