import React from 'react'

type Props = {
  value: number
  max: number
  color: string
  label?: string
}

const getBackgroundColor = (color: string) => {
  switch (color) {
    case 'blue':
      return 'bg-blue-600'
    case 'lime':
      return 'bg-[#28a909]'
    case 'yellow':
      return 'bg-yellow-400'
    case 'amber':
      return 'bg-amber-600'
    case 'red':
      return 'bg-red-700'
    case 'pink':
      return 'bg-pink-700'
    case 'rose':
      return 'bg-rose-700'
    case 'gray':
      return 'bg-gray-400'
  }
}

export default function ProgressBarMotoGrau({
  max,
  value,
  color,
  label = 'Próxima Rodada em',
}: Props) {
  return (
    <div className="w-full relative flex items-center border border-gray-500 bg-color-Primary  border-opacity-50 rounded-full h-8 dark:bg-gray-700 p-1">
      <div
        className={`bg-color-Emphasis3 h-full transition-all duration-100 rounded-full`}
        style={{
          width: `${(value / max) * 100}%`,
          transitionTimingFunction: 'linear',
          transitionDuration: '990ms',
        }}
      ></div>

      <small className="absolute w-full h-full font-semibold text-center text-base  pointer-events-none flex items-center justify-center text-color-white uppercase">
        {label} {Math.abs(value)}
      </small>
    </div>
  )
}
