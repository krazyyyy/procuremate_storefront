import React, { useState } from 'react'
import clsx from 'clsx';
import PrimaryButton from '@modules/common/components/primary-button';
import PaymentCardItem from '../payment-card-item';
import EditUser from '../user-card/edit-user-values';
import EditPassword from '../edit-password';
import DeleteAccountModal from '../delete-modal';
import AddressBookSection from '../address-book-section';
import { useAccount } from '@lib/context/account-context';
import { Customer } from 'types/medusa';

const AccountTab = ({ title, onClick, active, disabled = false }: {
  onClick: React.MouseEventHandler,
  title: string,
  active: boolean,
  disabled: boolean,
}) => {
  return <div onClick={disabled ? undefined : onClick} className={clsx("flex py-8 transition-all items-center cursor-pointer justify-between border-b small:pr-10", {
    'text-gray-400': disabled,
  })}>
    <div className="flex items-center gap-6">
      <div className={clsx("w-[10px] h-20 rounded-r-[5px]", active ? 'bg-black' : '')} />
      <div className="flex flex-col justify-between">
        <span className={clsx({ 'font-bold': active })}>{title}</span>
      </div>
    </div>
  </div>
}

const AccountSection = ({ customer }: { customer: Customer }) => {
  const [tab, setTab] = useState(0);
  const { handleLogout } = useAccount()
  const accountTabs = [
    'Account Information',
    'Address Book',
  ];

  const tabs = [
    <div className="p-5 small:p-8" key={0}>
      <span className="font-bold text-3xl small:text-[40px]">
        Account Details
      </span>

      <div className="flex flex-col gap-3 mt-10 mb-1 justify-start items-start">
        <span className="font-bold text-base small:text-xl italic">
          Personal Details
        </span>
        <span className="">{customer?.first_name ?? ''} {customer?.last_name ?? ''}</span>
        <span className="">{customer?.phone ?? ''}</span>
        <EditUser />
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-2 mb-1 justify-start items-start">
        <span className="font-bold text-base small:text-xl italic">
          Login Details
        </span>
        <span className="font-bold">Email</span>
        <span className="">{customer?.email}</span>
        <span className="font-bold">Password</span>
        <EditPassword />
      </div>
      <hr className="my-4" />
      <div className="grid small:grid-cols-2 gap-10">
        <div className="flex flex-col h-full justify-between text-sm w-full items-start">
          <span className="font-bold">Manage Account</span>
          <span className="">By deleting your account you will no longer have access to the information stored in your Procuremate account such as order history or your wishlist.</span>
          <DeleteAccountModal />
        </div>
        <div className="flex flex-col h-full justify-between text-sm w-full items-start">
          <span className="font-bold">Log Out</span>
          <span className="my-1">
            This will log you out from all web browsers you have used to access the Procuremate website. To log in again, you{"'"}ll have to enter your credentials.
          </span>
          <PrimaryButton onClick={handleLogout} className="mt-3">Log out</PrimaryButton>
        </div>
      </div>
    </div>,
    <AddressBookSection key={1} />,
    // <PaymentOptionsSection key={2} />

  ];

  return <div className="bg-[#f9f9f9] gap-10 small:px-10 py-10">
    <div className="flex content-container flex-wrap small:flex-nowrap justify-between gap-10">
      <div className="flex flex-col w-full small:w-1/3 bg-white gap-3 small:min-h-[80vh]">
        <span className="font-bold p-5 small:p-8 text-xl">Orders History</span>
        {accountTabs.map((t, i) => <AccountTab disabled={false} onClick={() => setTab(i)} title={t} key={i} active={i == tab} />)}
      </div>
      <div className="flex flex-col w-full small:w-2/3 bg-white justify-start items-center">
        {tabs[tab]}
      </div>
    </div>
  </div>
}

export default AccountSection

const PaymentOptionsSection = () => {

  const cards = [
    {
      name: 'John Wick',
      card_number: '1234444422223388',
      exp_date: 'Phuket',
      cvc: '143',
    },
    {
      name: 'John Doe',
      card_number: '444422233344233',
      exp_date: 'Phuket',
      cvc: '444',
    },
  ];

  return <div className="flex flex-col  w-full bg-white p-5 small:p-8">
    <div className="flex flex-col gap-3 mb-1 justify-start items-start">
      <span className="font-bold text-base small:text-xl">
        Card Details
      </span>
    </div>

    <div className="grid small:grid-cols-2 mt-8 gap-5">
      <div className="rounded-[10px] min-h-[200px] border gap-2 flex-col flex items-center justify-center">
        <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M44.2402 19.1H25.6402V0.799996H19.3402V19.1H0.740234V25H19.3402V43.2H25.6402V25H44.2402V19.1Z" fill="black" />
        </svg>
        <span>Add Card</span>
      </div>
      {cards.map((add, i) => <PaymentCardItem {...add} key={i} />)}
    </div>
  </div>
}