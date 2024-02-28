import { CheckoutFormValues } from "@lib/context/checkout-context"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import CountrySelect from "../country-select"
import CountrySelectFull from "../country-select/country-full"
import { useFormContext } from "react-hook-form";
import { useCart, useRegions } from "medusa-react"
import { useMemo } from "react"


const BillingAddress = () => {
  const { regions, } = useRegions()
  const { cart } = useCart()
  const { setValue } = useFormContext<CheckoutFormValues>();
 
  const currentRegion = regions?.find((r) => r.id === cart?.region_id)
  const countryOptions = useMemo(() => {


    if (!currentRegion) {
      return []
    }
    return currentRegion.countries.map((country) => ({
      value: country.iso_2,
      label: country.name,
    }))

  }, [regions, cart])

  return (
    <ConnectForm<CheckoutFormValues>>
      {({ register, formState: { errors, touchedFields } }) => (
        <div className="grid grid-cols-1 gap-y-2 max-w-lg">
          <Input
            label="First name"
            {...register("billing_address.first_name", {
              required: "First name is required",
            })}
            autoComplete="given-name"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label="Last name"
            {...register("billing_address.last_name", {
              required: "Last name is required",
            })}
            autoComplete="family-name"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label="Company"
            {...register("billing_address.company")}
            autoComplete="organization"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label="Address"
            {...register("billing_address.address_1", {
              required: "Address is required",
            })}
            autoComplete="address-line1"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label="Apartments, suite, etc."
            {...register("billing_address.address_2")}
            autoComplete="address-line2"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label="Postal code"
            {...register("billing_address.postal_code", {
              required: "Postal code is required",
            })}
            autoComplete="postal-code"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label="City"
            {...register("billing_address.city", {
              required: "City is required",
            })}
            autoComplete="address-level2"
            errors={errors}
            touched={touchedFields}
          />
            <CountrySelectFull
                {...register("billing_address.metadata.country",  {
                  required: "Country is required",
                })}
                autoComplete="Country"
                errors={errors}
                touched={touchedFields}
                onChange={(e) => {
                  const selectedCountryName = e.target.value;
                  const selectedCountry = countryOptions.find(
                    (country) => country.label === selectedCountryName.toUpperCase()
                  );
                  let country_code = selectedCountry?.value || ""
                  if (!selectedCountry) {
                    if (currentRegion?.currency_code === "usd") {
                       country_code = "us"
                    }
                    else if (currentRegion?.currency_code === "thb") {
                       country_code = "th"
                    }
                    else if (currentRegion?.currency_code === "eur") {
                       country_code = "de"
                    }
                    else if (currentRegion?.currency_code === "aud") {
                       country_code = "au"
                    }
                    else if (currentRegion?.currency_code === "gbp") {
                       country_code = "gb"
                    }
                  } 
                  
                  setValue(
                    "billing_address.country_code",
                    country_code
                  );
                  
                }}
              />
        <div className="hidden">
          <CountrySelect
            {...register("billing_address.country_code", {
              required: "Country is required",
            })}
            autoComplete="country"
            errors={errors}
            touched={touchedFields}
          />
        </div>
          <Input
            label="State / Province"
            {...register("billing_address.province")}
            autoComplete="address-level1"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label="Phone"
            {...register("billing_address.phone")}
            autoComplete="tel"
            errors={errors}
            touched={touchedFields}
          />
        </div>
      )}
    </ConnectForm>
  )
}

export default BillingAddress
