import React, { useContext, useEffect, useState } from 'react'
import { ClockIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Badge from '@/core/components/results/badge'
import If from '@/core/components/conditions/if'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import RoundInfoModal from '../../../../core/components/shared/modals/crash/round-info';//../shared/modals/crash/round-info
import { BsGraphUpArrow } from "react-icons/bs";
import { BsFileBarGraphFill } from "react-icons/bs";
import { MdGraphicEq } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";

type Props = {
  variant: string
}

type ICrashResult = {
  round_id?: number
  point: number
}

export default function MultiplierResults({ variant }: Props) {
  const [expand, setExpand] = useState(false)
  const { results, getResults } = useContext<any>(CrashGameContext)
  const { roundInfo, getRoundInfo } =
    useContext<any>(CrashGameContext)

  const [showInfo, setShowInfo] = useState<boolean>(false)

  const showRoundInfo = (roundId) => {
    getRoundInfo(roundId)
    setShowInfo(true)
  }

  useEffect(() => {
    getResults()
  }, [])

  return (
    <div className="w-full h-6 relative z-10  mb-2">
      <If condition={!expand}>
        <div className="flex mr-[65px] items-center overflow-x-hidden gap-2">
          {results?.map((result, idx) => {
            return (
              <Badge
                key={idx}
                showRoundInfo={showRoundInfo}
                textColor={
                  result.point < 2
                    ? 'bg-[#34b4ff]'
                    : result.point < 10
                    ? 'bg-[#913ef8]'
                    : 'bg-[#c017b4]'
                }
                roundId={result.round_id}
                multipler={result.point}
              />
            )
          })}
        </div>
      </If>

      <If condition={expand}>
        <div className="h-6"></div>
        <div className="h-auto  absolute -top-1 w-full rounded-md bg-black bg-opacity-80">
          <div className="rounded-md results-bar">
            <div className="flex items-center justify-center border border-b-0 border-gray-700 border-opacity-40 relative rounded-t px-2 h-8">
              <h3 className="text-base uppercase font-bold">
                Histórico de Partidas
              </h3>
            </div>

            <div className="flex flex-wrap border border-gray-700 border-opacity-40 shadow h-[30vh] rounded-b p-2 gap-2 overflow-y-scroll scrollbar-w-0 scrollbar-track-gray-400 scrollbar-thumb-gray-700 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded">
              {results?.map((result, idx) => {
                return (
                  <Badge
                    key={idx}
                    showRoundInfo={showRoundInfo}
                    textColor={
                      result.point < 2
                        ? 'bg-[#34b4ff]'
                        : result.point < 10
                        ? 'bg-[#913ef8]'
                        : 'bg-[#003F33]'
                    }
                    roundId={result.round_id}
                    multipler={result.point}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </If>

      <div className=" results-btn h-auto flex absolute top-0 right-1 mt-0 z-10 rounded-xl ">
        <button
          className={`btn p-0 bg-black hover:bg-black border border-gray-700 hover:border-gray-600 rounded-xl  min-h-0 max-h-8 w-12 py-1 h-auto text-xs shadow`}
          onClick={(e) => setExpand(!expand)}
        >
          <If condition={!expand}>
            <MdGraphicEq size={20} />
          </If>

          <If condition={expand}>
            <IoMdCloseCircle size={20}  />
          </If>
        </button>
      </div>

      <RoundInfoModal
        show={showInfo}
        data={roundInfo}
        toggle={setShowInfo}
      />
    </div>
  )
}
