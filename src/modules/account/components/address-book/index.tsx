import { Address, Customer } from "@medusajs/medusa"
import React from "react"
// import AddAddress from "../address-card/add-address"
import EditAddress from "../address-card/edit-address-modal"

type AddressBookProps = {
  address: Address,
  onDelete: (id: string) => void,
}

const AddressBookCard = ({ address, onDelete }: AddressBookProps) => {


  return <div className="flex justify-between rounded items-end p-4 border-black border-2">
    <div className="flex flex-col gap-4 w-full">
      <span className="">{address.address_1}</span>
      <span className="">{address.address_2}</span>
      <span className="">{address.city}</span>
      <span className="">{address.postal_code}</span>
      <span className="">{address.country}</span>
      <span className="">{address.phone}</span>
    </div>
    <div>
      <button onClick={() => onDelete(address.id)} className="underline text-red-600">
        Delete
      </button>
      <EditAddress address={address} />
    </div>
  </div>
}

export default AddressBookCard
