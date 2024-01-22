import React, { useState, useEffect } from 'react'
import { Transaction, TransactionStatus } from '.'
import If from '@/core/components/conditions/if'

type Props = {
  data: Transaction
}

export default function ListItem({ data }: Props) {
  const isGreen = data.outcome == 'win'
  const isRed = data.outcome == 'lose'
  const [randomNumber, setRandomNumber] = useState(null)


  // Gere o número aleatório uma única vez quando o componente for montado
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 21)
    setRandomNumber(randomNum)
  }, []) // O array vazio [] garante que o efeito seja executado apenas uma vez

  return (
    <div
      className={`flex items-center rounded-xl mb-2 border text-xs border-transparent p-2 gap-2 ${
        isGreen
          ? 'border-color-Emphasis1 bg-color-Emphasis1 '
          : ' border-color-Secondary bg-color-Secondary '
      } `}
    >
      <h1 className="w-1/4 flex gap-3 overflow-hidden items-center">
        <img
          src={`https://api.multiavatar.com/${randomNumber}.svg`}
          className="w-5 h-5 rounded invert"
        />
        <span className="whitespace-nowrap player-name">
          {data.player.username}
        </span>
      </h1>
      <h1 className="w-1/4 text-center items-center gap-2">
        <span className="w-10 text-right">
          R$ {data.amount.toFixed(2)}
        </span>
      </h1>
      <h1 className="w-1/4 items-center text-center gap-2">
        <If condition={data.outcome == 'win'}>
          <span
            className="bg-color-white text-center mx-auto rounded-full text-xs h-5 flex items-center justify-center text-color-Emphasis3 w-12 font-bold">
            {data.payout}x
          </span>
        </If>
      </h1>
      <div className="w-1/4 text-right font-bold">
        <If condition={data.outcome === 'win'}>
          {data.profit !== undefined && typeof data.profit === 'number'
            ? `R$ ${data.profit.toFixed(2)}`
            : '0,00'}
        </If>
      </div>
    </div>
  )
}
