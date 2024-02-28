import { useState } from "react"

const useCartSidebar = () => {

  const [selected, setSelected] = useState<string[]>([])
  const [items, setItems] = useState([])

  const handleSelect = (item: any) => {
    if (selected.includes(item)) {
      var index = selected.indexOf(item);
      selected.splice(index, 1)
      setSelected([...selected])
    } else {
      setSelected([...selected, item])
    }
  }
  const handleAmountChange = (index: number, amount: number) => {

  }

  const clearAll = () => {
    setSelected([])
  }

  return {
    items,
    selected,
    handleSelect,
    clearAll,
    handleAmountChange,
  }
}
export default useCartSidebar;