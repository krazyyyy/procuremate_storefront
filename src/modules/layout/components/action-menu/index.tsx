import React from "react"

type ActionMenuProps = {
  undo: () => void,
  redo: () => void,
  reset: () => void,
  zoomin: () => void,
  zoomout: () => void,
  undoEnabled: boolean,
  redoEnabled: boolean,
}

const ActionMenu = ({ reset, zoomin, zoomout }: ActionMenuProps) => {
  return (
    <div
      className="small:h-full fixed small:absolute z-10 small:z-auto h-min top-[80px] small:top-0 small:left-0 left-10">
      <div className="relative z-20 font-montserrat text-right py-8 flex px-12 items-end gap-3">
        <button onClick={reset} className="text-black underline hover:bg-gray-100 cursor-pointer">Reset</button>
        <button onClick={zoomin} className="text-black underline hover:bg-gray-100 cursor-pointer">Zoom in</button>
        <button onClick={zoomout} className="text-black underline hover:bg-gray-100 cursor-pointer">Zoom Out</button>
        <span className='hidden small:block'> Press (Shift + Left Click) to pan</span>
      </div>
    </div>
  )
}

export default ActionMenu
