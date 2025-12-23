import React from 'react'

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">Students</h2>
          <p className="text-sm text-gray-500">Overview of student stats</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">Teachers</h2>
          <p className="text-sm text-gray-500">Overview of teacher stats</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">Fees</h2>
          <p className="text-sm text-gray-500">Fee collection summary</p>
        </div>
      </div>
    </div>
  )
}