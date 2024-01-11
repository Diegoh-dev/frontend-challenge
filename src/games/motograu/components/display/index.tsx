import React, { useContext, useEffect, useState } from 'react'
import ProgressBar from '@/core/components/progress-bar'
import If from '@/core/components/conditions/if'
import { GameStatus } from '@/core/providers/enums/game-status'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import ProgressBarMotoGrau from '../progressBarMotoGrau'

type Props = {
  color: string
}

export default function Display({ color }: Props) {
  const { startTimeout, gameStatus, multiplier } =
    useContext<any>(CrashGameContext)

  return (
    <div className="">
      <If condition={gameStatus == GameStatus.IDLE}>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-44">
            <ProgressBarMotoGrau
              max={10}
              value={startTimeout}
              color={'#FF5A00'}
            />
          </div>
        </div>
      </If>

      <If condition={gameStatus == GameStatus.RUNNING}>
        <div className="relative flex justify-center items-center">
          <h1
            className="text-lg md:text-6xl lg:text-5xl font-bold text-gray-200 drop-shadow"
            style={{
              WebkitTextStroke: '1px #000',
            }}
          >
            {multiplier?.toFixed(2)}x
          </h1>
        </div>
      </If>

      <If condition={gameStatus == GameStatus.MAINTENANCE}>
        <div className="relative flex justify-center items-center">
          <h1
            className="text-2xl md:text-3xl uppercase lg:text-3xl font-bold text-gray-200 drop-shadow"
            style={{
              WebkitTextStroke: '1px #000',
            }}
          >
            Em manutenção!
          </h1>
        </div>
      </If>

      <If condition={gameStatus == GameStatus.GAME_OVER}>
        <div className="flex items-center flex-col">
          <h1
            className={`text-4xl md:text-4xl lg:text-4xl font-bold text-red-600 drop-shadow`}
            style={{
              WebkitTextStroke: '1px #000',
            }}
          >
            {multiplier.toFixed(2)}x
          </h1>
          <h1
            className="text-xl sm:text-xl text-gray-200 font-extrabold uppercase "
            style={{
              WebkitTextStroke: '1px #000',
              margin: '0',
              padding: '0',
            }}
          >
            O piloto caiu!
          </h1>
        </div>
      </If>
    </div>
  )
}
