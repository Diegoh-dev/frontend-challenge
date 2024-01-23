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
  variant: string;
  expand:boolean;
   setExpand:(_value:boolean) => void;
}

type ICrashResult = {
  round_id?: number
  point: number
}

export default function MultiplierResults({ variant,expand,setExpand}: Props) {
  // const [expand, setExpand] = useState(false)
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
    <div className="w-11/12 h-6 relative z-10  mb-2">
      <If condition={true}>
        <div className="flex mr-[2px] items-center overflow-x-hidden gap-2">
          {results?.map((result, idx) => {
            return (
              <Badge
                key={idx}
                showRoundInfo={showRoundInfo}
                textColor={
                  result.point < 2
                    ? 'bg-color-Secondary'
                    : result.point < 10
                    ? 'bg-color-Emphasis2'
                    : 'bg-color-Emphasis1'
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
        <div className="h-[250px]  absolute top-[-18rem] left-[8.5rem]  rounded-[28px] bg-color-Primary w-[80%]">
          <div className="rounded-[28px]">
            <div className="flex items-center justify-between relative rounded-t p-2 border-b border-gray-600  border-opacity-20">
              <h3 className="text-base uppercase font-bold w-[96%] text-center">
                Histórico de Partidas
              </h3>

              <button
                className="flex justify-end m-0 p-0 mr-2"
                onClick={() => setExpand(!expand)}
              >
                    {/* className="w-6 h-6" */}
                <IoMdCloseCircle size={24}  />
              </button>
            </div>

            <div className="flex flex-wrap   h-[30vh] rounded-b px-4 py-3 gap-2 overflow-y-scroll scrollbar-w-0 scrollbar-track-gray-400 scrollbar-thumb-gray-700 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded">
              {results?.map((result, idx) => {
                return (
                  <Badge
                    key={idx}
                    showRoundInfo={showRoundInfo}
                    textColor={
                      result.point < 2
                        ? 'bg-color-Secondary'
                        : result.point < 10
                        ? 'bg-color-Emphasis2'
                        : 'bg-color-Emphasis1'
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

      {/* <div className=" results-btn h-auto flex absolute top-0 right-1 mt-0 z-10 rounded-xl ">
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
      </div> */}

      <RoundInfoModal
        show={showInfo}
        data={roundInfo}
        toggle={setShowInfo}
      />
    </div>
  )
}
