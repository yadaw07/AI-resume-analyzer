import React from 'react'

type Props = {
  score: number
}

const ScoreBadge: React.FC<Props> = ({ score }) => {
  let bgClass = 'bg-badge-red'
  let textClass = 'text-red-500'
  let label = 'Needs work'

  if (score > 70) {
    bgClass = 'bg-badge-green'
    textClass = 'text-green-500'
    label = 'Strong'
  } else if (score > 49) {
    bgClass = 'bg-badge-yellow'
    textClass = 'text-yellow-500'
    label = 'Good start'
  }

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded ${bgClass}`}>
      <p className={`${textClass} text-sm font-medium`}>{label}</p>
    </div>
  )
}

export default ScoreBadge
