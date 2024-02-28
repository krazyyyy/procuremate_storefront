import { CheckoutFormValues } from "@lib/context/checkout-context"
import { emailRegex } from "@lib/util/regex"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import AddressSelect from "../address-select"
import CountrySelect from "../country-select"
import { SectionTitle } from "../../../cart/templates/guest"
import CountrySelectFull from "../country-select/country-full"
import { useFormContext } from "react-hook-form";
import { useCart, useRegions } from "medusa-react"
import { useMemo } from "react"
import { useAccount } from "@lib/context/account-context"

const ShippingAddress = () => {
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

  const { customer } = useAccount()
  return (
    <div>
      {customer && (customer.shipping_addresses?.length || 0) > 0 && (
        <div className="mb-6 flex flex-col gap-y-4">
          <p className="text-regular-xl">
            Do you want to use one of your saved addresses?
          </p>
          <AddressSelect addresses={customer.shipping_addresses} />
        </div>
      )}
      <ConnectForm<CheckoutFormValues>>
        {({ register, formState: { errors, touchedFields } }) => (
          <div className="grid grid-cols-1 gap-y-2">
            <div className='flex small:max-w-lg flex-col gap-2 w-full relative'>
              <SectionTitle>Your details</SectionTitle>
              <Input
                label="First name"
                {...register("shipping_address.first_name", {
                  required: "First name is required",
                })}
                autoComplete="given-name"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label="Last name"
                {...register("shipping_address.last_name", {
                  required: "Last name is required",
                })}
                autoComplete="family-name"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: emailRegex,
                })}
                disabled={customer?.email !== null ?? cart?.email}
                // message={customer?.email ? "This email is already linked with your account" : ''}
                autoComplete="email"
                errors={errors}
                touched={touchedFields}
              />
              <SectionTitle>Shipping Address</SectionTitle>
              <Input
                label="Company"
                {...register("shipping_address.company")}
                autoComplete="organization"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label="Address"
                {...register("shipping_address.address_1", {
                  required: "Address is required",
                })}
                autoComplete="address-line1"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label="Apartments, suite, etc."
                {...register("shipping_address.address_2")}
                autoComplete="address-line2"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label="Postal code"
                {...register("shipping_address.postal_code", {
                  required: "Postal code is required",
                })}
                autoComplete="postal-code"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label="City"
                {...register("shipping_address.city", {
                  required: "City is required",
                })}
                autoComplete="address-level2"
                errors={errors}
                touched={touchedFields}
              />
              <CountrySelectFull
                {...register("shipping_address.metadata.country", {
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
                      country_code = "ge"
                    }
                    else if (currentRegion?.currency_code === "aud") {
                      country_code = "au"
                    }
                    else if (currentRegion?.currency_code === "gbp") {
                      country_code = "gb"
                    }
                  }

                  setValue(
                    "shipping_address.country_code",
                    country_code
                  );

                }}
              />
              <div className="hidden">

                <CountrySelect
                  {...register("shipping_address.country_code", {
                    required: "Country is required",
                  })}
                  autoComplete="country"
                  errors={errors}
                  touched={touchedFields}
                />
              </div>
              <Input
                label="State / Province"
                {...register("shipping_address.province")}
                autoComplete="address-level1"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label="Phone"
                {...register("shipping_address.phone")}
                autoComplete="tel"
                errors={errors}
                touched={touchedFields}
              />
            </div>
          </div>
        )}
      </ConnectForm>
    </div>
  )
}

export default ShippingAddress
