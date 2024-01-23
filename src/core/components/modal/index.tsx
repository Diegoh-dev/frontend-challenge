import React, { Children, ReactElement } from 'react'

type Props = {
  show: boolean
  children: ReactElement[]
  toggle: Function
}

export default function Modal({
  show = false,
  toggle,
  children,
}: Props) {
  return (
    <>
      <input
        type="checkbox"
        checked={show}
        onChange={(e) => toggle(e.target.checked)}
        id="uniqueDialog"
        className="modal-toggle"
      ></input>

      <div className="modal text-sm w-full px-5">
        <div className=" w-[700px] h-[500px] p-0 mt-20 sm:mt-0 left-14 scrollbar-track-rounded scrollbar-thumb-rounded relative custom-scrollbar scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black  bg-color-Secondary rounded-[28px]" >
          {Children.map(children, (child) => child)}
        </div>
      </div>
    </>
  )
}
