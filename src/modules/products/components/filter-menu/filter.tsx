import clsx from "clsx"
import useToggleState from "@lib/hooks/use-toggle-state"
import PrimaryButton from "@modules/common/components/primary-button"
import { FilterCategory, useProductsFilter } from "@lib/context/filter-context"
import Checkbox from "@modules/common/components/checkbox"
import { StoreGetProductsParams } from "@medusajs/medusa"
import { useCallback } from "react"

type RefinementListProps = {
  refinementList: StoreGetProductsParams
  setRefinementList: (refinementList: StoreGetProductsParams) => void
}

export default function Filter({
  refinementList,
  setRefinementList
}: RefinementListProps) {
  const { toggle, state } = useToggleState()
  const { types, selected, handleSelect, clearAll } = useProductsFilter()


  const handleCategoryChange = useCallback((
    item: FilterCategory
  ) => {
    handleSelect(item);
    const category_ids = refinementList.category_id || []
    const exists = category_ids.includes(item.id as string)
    var checked = !selected.includes(item);


    if (checked && !exists) {
      var ids: string[] = [...selected.map((s) => s.id as string)];
      setRefinementList({
        ...refinementList,
        category_id: [...ids, (item.id as string)],
      })
    }

    if (!checked && exists) {
      var ids: string[] = [...selected.map((s) => s.id as string)];
      var filtered = ids.filter((c) => c !== item.id);
      setRefinementList({
        ...refinementList,
        category_id: filtered,
      });
    }

  }, [selected])


  return <div className="">
    <PrimaryButton onClick={toggle} className="max-w-xs w-28 sm:w-40 small:min-w-[280px]">Filter</PrimaryButton>
    <aside className="w-full">
      <div onClick={toggle} className={clsx("fixed w-screen bg-black z-10 bg-opacity-50 transition-all top-0 h-screen right-0 ", { 'hidden': !state })} />
      <div className={clsx("fixed w-screen overflow-y-scroll max-w-lg z-50 shadow-lg transition-all duration-300 top-0 h-screen bg-white right-0", !state ? 'translate-x-full' : 'translate-x-0')}>

        <div className="p-5 flex justify-between items-center">
          <span className="p-2 uppercase font-bold small:text-base">filter</span>
          <button onClick={clearAll} className="font-normal hover:bg-gray-100">
            Clear All
          </button>
        </div>
        <hr />

        {selected.length > 0 && <div className="flex p-5 gap-5 flex-wrap">
          {selected.map((s, index) => {
            return <div className="border p-2 border-black rounded-lg borderblack" key={index}>
              {s.title}
            </div>
          })}
        </div>
        }
        <FilterSection items={types.readyMade} title="Ready Made" selected={selected} handleSelect={handleCategoryChange} />
        <FilterSection items={types.clubKits} title="Club Kits" selected={selected} handleSelect={handleCategoryChange} />
        <FilterSection items={types.customFightWear} title="Custom Fight Wear" selected={selected} handleSelect={handleCategoryChange} />
        <FilterSection items={types.customEquipment} title="Custom Equipment" selected={selected} handleSelect={handleCategoryChange} />
        <div className="h-40 w-full" />
      </div>
      {state && <button onClick={toggle} className="fixed max-w-lg right-0 bottom-10 z-50 py-5 bg-black text-white flex items-center justify-center w-full text-center">
        Close
      </button>}
    </aside>
  </div>
}

function SelectItem({ checked, title, onClick }: { checked: boolean, title: string, onClick: React.MouseEventHandler }) {
  return <div className="flex justify-between items-center w-full " onClick={onClick}>
    <Checkbox label={title} checked={checked} />
    {/* <span>20</span> */}
  </div>
}

function FilterSection({ items, title, selected, handleSelect }: { items: any[], title: string, selected: any[], handleSelect: (item: any) => void }) {
  if (items.length === 0) return null;

  return <>
    <p className="m-5 p-1 border-black border-b-2 font-bold small:text-base max-w-min whitespace-nowrap">{title}</p>
    <div className="p-5 flex flex-col gap-3">
      {items?.map((item: any, i) => <SelectItem
        key={i}
        checked={selected.includes(item)}
        onClick={() => handleSelect(item)}
        title={item.title} />)}
    </div>
  </>
}