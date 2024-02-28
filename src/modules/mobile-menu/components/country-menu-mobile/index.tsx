import { useStore } from "@lib/context/store-context"
import useCountryOptions from "@lib/hooks/use-country-options"
import { useEffect, useMemo, useState } from 'react'
import { useCart } from "medusa-react"


const CountryMenuMobile = () => {
  const { cart } = useCart();
  const { setRegion, countryCode } = useStore()
  const countryOptions = useCountryOptions()

  const handleSelectCountry = (regionId: string, countryCode: string) => {
    setRegion(regionId, countryCode)
  }

  const [currencies, setCurrencies] = useState<any[]>([])

  useEffect(() => {
    let options: any[] = [];
    let currencies: string[] = [];
    for (var opt of (countryOptions ?? [])) {
      if (currencies.includes(opt.currency)) continue;
      currencies.push(opt.currency);
      options.push(opt);
    }
    setCurrencies(options);
  }, [countryOptions])
  return (
    <div className="m-0">
      <div className="text-right">
        <div>
          <span className="pr-2">Currency :</span>
          <select
            value={JSON.stringify({ region: cart?.region_id, country: countryCode })}
            onChange={(e) => {
              var { region, country } = JSON.parse(e.target.value)
              handleSelectCountry(region, country)
            }}
            className="uppercase font-bold">
            {currencies.map((option) => {
              return <option className="uppercase" key={option.country} value={JSON.stringify({ region: option.region, country: option.country })}>
                {option.currency}
              </option>
            })}
          </select>
        </div>
      </div>
    </div >
  )
}

export default CountryMenuMobile
