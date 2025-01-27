import React, { useState, useEffect, useRef, useContext } from 'react'
import { CrashGameContext } from '../../../../core/providers/games/crash-game.provider'
import Switch from '@mui/material/Switch';
type Props = {
  game: string
  balance: string
  name: string
  executeAction: Function
  openChatHandler?: Function
}

// import If from '../conditions/if'

import {
  QuestionMarkCircleIcon,
  Bars3Icon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline'
import { getGameLogo, getHowToPlay } from '../../../../core/helpers'
import GameLimitsModal from '../../../../core/components/provably-fair/game-limits'//provably-fair/game-limits
import { Chat } from '../../../../core/components/chat'
import motograuLogo from '../../../../assets/logos/moto-grau.png';
import ProgressBar from '../../../../core/components/progress-bar';
import Display from '../display'
import { LimitesJogos } from '../LimitesJogo';
export default function NavbarMotoGrau({
  game,
  balance,
  executeAction,
}: Props) {
  const HowToPlay = getHowToPlay(game)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showChat, setShowChat] = useState(false)
  const [showGameLimitsModal, setShowGameLimitsModal] =
    useState<boolean>(false)

  const [animationEnabled, setAnimationEnabled] = useState(true)
  const [musicEnabled, setMusicEnabled] = useState(true)
  const [audioContextAllowed, setAudioContextAllowed] = useState(true) //////////////////////////////////////

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const {soundEnabled,
        setSoundEnabled,
        soundClick,
        playerName,
        startTimeout, gameStatus, multiplier
        } = useContext(CrashGameContext)


  const handleSoundEnabled = (event) => {
    const { checked } = event.target
    executeAction(checked ? 'soundsOn' : 'soundsOff')
    setSoundEnabled(checked)
  }

  const handleMusicEnabled = (event) => {
    const { checked } = event.target

    executeAction(checked ? 'musicOn' : 'musicOff')
    setMusicEnabled(checked)
  }

  const handleAnimationEnabled = (event) => {
    const { checked } = event.target
    executeAction(checked ? 'animationOff' : 'animationOn')
    setAnimationEnabled(checked)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
    soundClick()
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    setTimeout(() => {
      if (window.AudioContext == false) {
        setAudioContextAllowed(false)
      }
    }, 2000)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const handleOutsideClick = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false)
    }
    setAudioContextAllowed(false)
  }

  const isMobileDevice =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

  return (
    <div className="">
      <div className="navbar mx-auto  my-auto sm:px-3 h-12 flex items-center w-full justify-between">
        <img className="w-16" src={motograuLogo} alt="motograuLogo" />
        <div>
          <div className="bg-color-Emphasis1 p-2 text-base  text-center font-bold  transition ease-in-out delay-150 hover:scale-110	 rounded-[28px] cursor-pointer ">
            <span className=" 	text-color-white ">
              <span className="player-currency">R$</span> {balance}
            </span>
          </div>

          <div className="mx-4 border-l h-6 border-gray-400 border-opacity-50"></div>

          <div className="dropdown dropdown-end" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="btn btn-sm px-1 btn-ghost"
            >
              <Bars3Icon className="w-6 h-6 bg-opacity-50" />
            </button>

            {isDropdownOpen && (
              <div className="mt-5 menu menu-compact  py-2 w-[280px] max-w-[300px] absolute top-[30px] right-[5px] z-10 bg-color-Secondary rounded-xl">
                <div className="flex gap-4 p-4">
                  <img
                    src="https://api.multiavatar.com/NOME.svg"
                    className="h-12 rounded-lg"
                  />
                  <div className="mt-1">
                    <p className="font-bold text-xs text-color-white">
                      {/* Nome do Jogador */}
                      {playerName}
                    </p>
                    <p className="text-xs flex mt-1">
                      <span className="block mt-1 mr-2 rounded-full bg-green-600 h-2 w-2"></span>{' '}
                      <span className="text-color-white">
                        Online agora
                      </span>
                    </p>
                  </div>
                </div>
                <div className="px-2 text-xs item">
                  <div className="form-control">
                    <label className="label hover:font-bold cursor-pointer">
                      <span className="label-text text-xs text-color-white">
                        Sons
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={soundEnabled}
                          onChange={handleSoundEnabled}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer bg-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </label>
                  </div>
                </div>
                <div className="px-2 text-xs item">
                  <div className="form-control">
                    <label className="label hover:font-bold cursor-pointer">
                      <span className="label-text text-xs text-color-white">
                        Música
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={musicEnabled}
                          onChange={handleMusicEnabled}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer bg-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </label>
                  </div>
                </div>
                {/*     {<div className="px-2 text-xs item">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text text-xs opacity-90">Animação</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={handleAnimationEnabled}
                          checked={animationEnabled}
                          className="sr-only peer"
                        />
                      <div className="w-8 h-4 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer bg-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </label>
                </div>
              </div>} */}

                <div
                  className="px-3 cursor-pointer py-3  hover:font-bold text-xs item"
                  onClick={() => {
                    setShowGameLimitsModal(!showGameLimitsModal)
                    setIsDropdownOpen(false)
                    soundClick()
                  }}
                >
                  <label className="cursor-pointer text-xs text-color-white">
                    Limites de Jogo
                  </label>
                </div>

                <a
                  className="px-3 cursor-pointer py-3  hover:font-bold text-xs item"
                  href=""
                >
                  <label className="cursor-pointer  text-xs text-color-white">
                    Suporte ao jogador Hypetech
                  </label>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {showGameLimitsModal && (
        <LimitesJogos
          show={showGameLimitsModal}
          toggle={setShowGameLimitsModal}
        />
      )}

      {/* <GameLimitsModal
        show={showGameLimitsModal}
        toggle={setShowGameLimitsModal}
      /> */}
    </div>
  )
}
