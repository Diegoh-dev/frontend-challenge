import React, { useContext, useState } from 'react'
import If from '@/core/components/conditions/if'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import { dateToHumanReadable } from '@/core/helpers/date'

type Props = {
  data: any
  showRoundInfo: Function
}

export default function ListItem({ data, showRoundInfo }: Props) {
  const isGreen = data.outcome == 'win'
  const isRed = data.outcome == 'lose'

  return (
    <>
      <div
        className={`justify-between flex items-center rounded-xl mb-2 border text-xs border-transparent p-1.5 gap-1 ${
          isGreen
            ? 'border-color-Emphasis1 bg-color-Emphasis1 '
            : 'border-color-Secondary bg-colorborder-color-Secondary '
        } text-color-white`}
      >
        <h1 className="w-1/4 flex gap-3 items-center">
          {dateToHumanReadable(data.updated_at)}
        </h1>
        <h1 className="w-1/4 flex items-center justify-center gap-2 font-bold">
          R${data.amount}
        </h1>
        <h1 className="w-1/4 flex items-center gap-2">
          <If condition={data.outcome == 'win'}>
            <div className=" bg-color-white font-green-500 rounded-full text-xs h-5 flex mx-auto items-center justify-center text-color-Emphasis3 w-12 text-center font-bold">
              {data.payout}x
            </div>
          </If>
        </h1>
        <div className="w-1/4 flex items-center justify-end relative gap-1">
          <div className="z-0">
            <button
              className="btn btn-xs btn-ghost p-1 h-1"
              onClick={() => showRoundInfo(data.round_id)}
            >
              <ShieldCheckIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
