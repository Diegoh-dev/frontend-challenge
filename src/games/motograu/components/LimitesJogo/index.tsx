import { XMarkIcon } from "@heroicons/react/24/outline"

type Props = {
    show: boolean
    toggle: Function
  }

export function LimitesJogos({show,toggle}:Props){
    return(
        <div className="w-1/2 rounded-[28px] bg-color-Secondary opacity-100 absolute left-1/3 top-[100px]">
        <section className="bg-color-Primary py-1  flex justify-between items-center px-5  relative rounded-tl-[28px] rounded-tr-[28px]">
          <h1 className="text-1xl uppercase ">Limites do Jogo</h1>
          <button
            onClick={(_) => toggle()}
            className="btn p-0 btn-sm hover:bg-transparent hover:text-white  btn-ghost "
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </section>

        <div className="flex text-sm flex-col p-4 bg-color-Secondary gap-3 rounded-s-3xl rounded-e-3xl">
          <div className="flex justify-between px-4 items-center border text-sm w-full h-12 rounded-[20px]  border-gray-600 bg-transparent">
            <span className="font-bold">Aposta mínima (R$):</span>

            <span className="bg-color-Emphasis1 font-bold py-1 px-3 rounded-full text-xs">
              1.00
            </span>
          </div>

          <div className="flex justify-between px-4 items-center text-sm w-full h-12 border border-gray-600 bg-transparent rounded-[20px]">
            <span className="font-bold">Aposta máxima (R$):</span>

            <span className="bg-color-Emphasis1 font-bold py-1 px-3 rounded-full text-xs ">
              500.00
            </span>
          </div>

          <div className="flex justify-between px-4 items-center text-sm w-full h-12 border  border-gray-600 bg-transparent  rounded-[20px]">
            <span className="font-bold">Ganho máximo por aposta (R$):</span>

            <span className="bg-color-Emphasis1 font-bold py-1 px-3 rounded-full text-xs ">
              10000.00
            </span>
          </div>
        </div>
      </div>
    )
}