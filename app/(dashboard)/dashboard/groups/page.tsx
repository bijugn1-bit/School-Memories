'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function GroupsPage() {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Batch 2020', school: 'St. Mary\'s School', year: 2020 },
    { id: 2, name: 'Batch 2021', school: 'St. Mary\'s School', year: 2021 },
    { id: 3, name: 'Friends Circle', school: 'St. Mary\'s School', year: 2020 },
  ])
  const [isCreating, setIsCreating] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Groups</h1>
        <Button onClick={() => setIsCreating(!isCreating)}>+ Create Group</Button>
      </div>

      {isCreating && (
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Create New Group</h2>
          <div className="space-y-4">
            <Input label="Group Name" placeholder="e.g., Batch 2022" />
            <Input label="School" placeholder="e.g., St. Mary's School" />
            <Input label="Batch Year" type="number" placeholder="2022" />
            <Button className="w-full">Create Group</Button>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="mb-4">
              <h3 className="text-xl font-bold">{group.name}</h3>
              <p className="text-gray-600 text-sm">{group.school}</p>
            </div>
            <p className="text-gray-500 text-sm mb-4">Batch {group.year}</p>
            <Button variant="outline" className="w-full">View Group</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
