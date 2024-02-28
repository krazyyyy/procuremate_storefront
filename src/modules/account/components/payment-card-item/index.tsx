
const PaymentCardItem = ({ name, card_number, exp_date, cvc }:
  {
    name: string,
    card_number: string,
    exp_date: string,
    cvc: string
  }) => {
  return <div className="flex justify-between rounded-[10px] items-end p-4 border-black border-2">
    <div className="flex whitespace-nowrap flex-col gap-4 w-full">
      <span className="">{name}</span>
      <span className="">{card_number.substring(0, 4) + '-****' + card_number.substring(card_number.length - 3)}</span>
      <span className="">{exp_date}</span>
      <span className="">{cvc.substring(0, 1) + '**'}</span>
    </div>
    <div>
      <button className="underline text-red-600">
        Delete
      </button>
      <button className="underline">
        Edit
      </button>
    </div>
  </div>
}


export default PaymentCardItem