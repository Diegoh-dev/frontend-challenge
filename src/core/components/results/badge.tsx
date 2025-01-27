import React from 'react'

type Props = {
  multipler: string
  roundId: number
  textColor: string
  showRoundInfo: Function
}

export default function MultiplierBadge({
  multipler,
  roundId,
  textColor,
  showRoundInfo,
}: Props) {
  return (
    <>
      <button
        onClick={() => showRoundInfo(roundId)}
        className={` ${textColor} h-6 border border-gray-700 py-3 hover:border-gray-600 border-opacity-50 font-bold rounded-xl flex capitalize  hover:opacity-100 transition items-center justify-center cursor-pointer px-3 text-xs text-[#fff]  `}
      >
        {parseFloat(multipler).toFixed(2)}x
      </button>
    </>
  )
}
