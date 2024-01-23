import './index.css'

import React, { useContext, useEffect, useState } from 'react'
import Display from './components/display'
import Snackbar from '@/core/components/snackbar'
// import Results from '@/core/components/results'
import Results from '../motograu/components/resultsMotoGrau';
import TransactionBar from '@/core/components/transaction-bar'
import Controls from '@/core/components/controls/crash-control'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import { SessionContext } from '@/core/providers/session.provider'
import { GameStatus } from '@/core/providers/enums/game-status'
import Navbar from '@/core/components/navbar'
import NavbarMotoGrau from './components/NavBarMotoGrau'
import HowToPlay from './components/HowToPlay/how-to-play';
import { FaInfoCircle } from "react-icons/fa";
import { MdGraphicEq } from "react-icons/md";
import { ClockIcon, XMarkIcon } from '@heroicons/react/24/outline'



function HomePage() {
  const { setLoading } = useContext<any>(SessionContext)
  const { iframeRef, gameStatus, executeAction, balance } =
    useContext<any>(CrashGameContext)

  useEffect(() => {
    iframeRef.current?.contentWindow.addEventListener(
      'instance-created',
      () => {
        setLoading(false)
        if (gameStatus == GameStatus.RUNNING)
          setTimeout(() => executeAction('start'), 1000)
      }
    )
  }, [iframeRef])

  const [showModal,setShowModal] = useState(false)
  const [expand, setExpand] = useState(false)

  return (
    <>
      <div className="flex min-h-screen overflow-hidden bg-gradient-to-r bg-color-Primary">
        <div className="flex w-full sm:gap-3 min-h-screen relative">
          <section className="flex flex-col h-full grow p-0">
            <div className="" style={{ zIndex: 100 }}>
              {/* <Navbar
              game="motograu"
              executeAction={executeAction}
              balance={balance}
            /> */}
              <NavbarMotoGrau
                game="motograu"
                executeAction={executeAction}
                balance={balance}
              />
            </div>
            <div className="grid px-3 gap-3 grow rounded w-full grid-cols-12">
              <div className="col-span-12 sm:col-span-4 grow xl:col-span-3 order-2 sm:order-1">
                <TransactionBar />
              </div>

              <div className="col-span-12 sm:col-span-8 xl:col-span-9 relative order-1 sm:order-1 lg:order-2">
                <div className="flex gap-1 h-full flex-col">
                  {/* <Results /> */}

                  <div className="grow relative z-0 mb-[2px]">
                    <iframe
                      ref={iframeRef}
                      className="rounded-[28px] overflow-hidden w-full h-full pointer-events-none min-h-[250px] sm:min-h-[300px]"
                      src="/motograu/index.html"
                    ></iframe>
                    <div className="absolute left-1/2 top-1/2 right-1/2">
                      <Display color={'pink'} />
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Results expand={expand} setExpand={setExpand} />
                    <button
                      className="flex justify-end mr-2 m-0 p-0"
                      onClick={() => setExpand(!expand)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>

                    <button
                      className="flex justify-end mr-2 m-0 p-0"
                      onClick={() => setShowModal(!showModal)}
                    >
                      <FaInfoCircle size={20} />
                    </button>
                  </div>

                  <Controls color="lime" position={'center'} />
                </div>

                <Snackbar />
              </div>
            </div>

            <HowToPlay show={showModal} toggle={setShowModal} />
          </section>
        </div>
      </div>
    </>
  )
}

export default HomePage
