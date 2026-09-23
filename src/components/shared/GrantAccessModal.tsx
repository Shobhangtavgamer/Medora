import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Checkbox, Field, Select } from '@/components/ui/Field'

const informationOptions = [
  'Relevant history',
  'Medications',
  'Allergies',
  'Timeline & events',
  'Selected records',
]

export function GrantAccessModal({
  open,
  onClose,
  onGranted,
  granteeName,
  purpose,
}: {
  open: boolean
  onClose: () => void
  onGranted: (info: string[], duration: string) => void
  granteeName: string
  purpose: string
}) {
  const [info, setInfo] = useState<string[]>(['Relevant history', 'Medications'])
  const [duration, setDuration] = useState('30 days')

  const toggle = (item: string) =>
    setInfo((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Grant access to ${granteeName}`}
      description={`Purpose: ${purpose}`}
    >
      <div className="space-y-5">
        <div>
          <p className="text-sm font-semibold text-slate-900">Information to share</p>
          <p className="mb-3 mt-0.5 text-sm text-slate-500">Choose exactly what they can see.</p>
          <div className="space-y-2.5">
            {informationOptions.map((item) => (
              <Checkbox
                key={item}
                label={item}
                checked={info.includes(item)}
                onChange={() => toggle(item)}
              />
            ))}
          </div>
        </div>
        <Field label="Duration" required>
          <Select id="duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
            <option>7 days</option>
            <option>30 days</option>
            <option>90 days</option>
            <option>Ongoing (revocable)</option>
          </Select>
        </Field>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onGranted(info, duration)}>Grant access</Button>
        </div>
      </div>
    </Modal>
  )
}