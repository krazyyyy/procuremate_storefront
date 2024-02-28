import { Address } from "@medusajs/medusa"
import { formatAmount } from "medusa-react"
import { Region } from "types/medusa"

export const getAmount = (amount?: number | null, region?: Region) => {
  if (!amount || !region) {
    return
  }

  return formatAmount({ amount, region, includeTaxes: false })
}

export const getUserName = (first?: string, last?: string) => {
  if (first && last) return `${first} ${last}`;

  if (first) return first;
  if (last) return last;
  return '';
}


export const formatDate = (date?: any) => {
  if (!date) return '';
  try {
    if (typeof date === 'object') {
      date = date?.toString()
    }
    const d = new Date(date);
    const formattedDate = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return formattedDate;
  } catch (error) {
    return '';
  }
}

export const getShippingAddress = (shipping?: Address) => {
  if (shipping)
    return `${shipping.address_1 ?? ''} ${shipping.address_2 ?? ''} ${shipping.city ?? ''} ${shipping.country ?? ''}, ${shipping.postal_code ?? ''} `
  return '';
}