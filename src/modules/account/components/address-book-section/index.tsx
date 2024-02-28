import { useMeCustomer } from "medusa-react";
import React, { useEffect, useState } from "react";
import { medusaClient } from "@lib/config";
import { Address } from "@medusajs/medusa";
import AddAddress from "../user-card/add-address";
import AddressBookCard from "../address-book";

const AddressBookSection = () => {
  const { customer, refetch } = useMeCustomer();
  useEffect(() => {
    if (customer?.shipping_addresses) {
      setAddresses(customer.shipping_addresses)
    }
  }, [customer])

  const removeAddress = (id: string) => {
    medusaClient.customers.addresses.deleteAddress(id).then(() => {
      setAddresses([...addresses.filter((add) => add.id !== id)]);
      refetch()
    })
  }

  const [addresses, setAddresses] = useState<Address[]>([])

  return <div className="flex flex-col  w-full bg-white p-5 small:p-8">
    <div className="flex flex-col gap-3 mb-1 justify-start items-start">
      <span className="font-bold text-base small:text-xl">
        Address Details
      </span>
    </div>

    <div className="grid small:grid-cols-2 mt-8 gap-5">
      <div className="rounded-[10px] min-h-[200px] border gap-2 flex-col flex items-center justify-center">
        <AddAddress />
      </div>
      {addresses.map((add, i) => <AddressBookCard address={add} onDelete={removeAddress} key={i} />)}
    </div>


  </div>
}
export default AddressBookSection