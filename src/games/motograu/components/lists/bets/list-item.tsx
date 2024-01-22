import React from 'react'
import { Transaction, TransactionStatus } from '.'
import If from '@/core/components/conditions/if'

type Props = {
  data: Transaction
}

export default function ListItem({ data }: Props) {
  const isGreen = data.cashed_out_at != null
  const isRed =
    data.status == TransactionStatus.PROCESSED &&
    data.cashed_out_at == null

  return (
    <div
      className={`mb-2 flex items-center rounded-lg  border text-xs border-transparent p-1 ${
        isGreen
          ? 'border-color-Emphasis1 bg-color-Emphasis1 '
          : isRed
          ? 'border-red-800 bg-red-600 bg-opacity-20 '
          : 'border-slate-700 bg-slate-600 bg-opacity-25 '
      } `}
    >
      <h1 className="w-1/4 flex gap-3 items-center">
        <img
          src="https://www.fiscalti.com.br/wp-content/uploads/2021/02/default-user-image.png"
          className="w-5 h-5 rounded"
        />{' '}
        {data.username}
      </h1>
      <h1 className="w-1/4 flex items-center gap-2">
        <span className="w-10">{data?.amount}</span>
      </h1>
      <div className="w-1/4">
        <If condition={data.cashed_out_at != null}>
          <div className="bg-color-Emphasis1 rounded-full text-xs h-5 flex items-center justify-center text-gray-100 w-12 text-center">
            {data?.cashed_out_at?.toFixed(2)}x
          </div>
        </If>
      </div>
      <div className="w-1/4">
        <If condition={data.cashed_out_at != null}>
          {(data.amount * data.cashed_out_at).toFixed(2)}
        </If>
      </div>
    </div>
  )
}
