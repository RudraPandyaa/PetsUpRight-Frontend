import { useVendure } from './useVendure'

export interface PincodeDeliverability {
  pincode: string
  deliverable: boolean
  message: string
}

const CHECK_PINCODE = `
  query CheckPincodeDeliverability($pincode: String!) {
    checkPincodeDeliverability(pincode: $pincode) {
      pincode
      deliverable
      message
    }
  }
`

/**
 * Checks whether orders can be delivered to a pincode. The admin manages the
 * deliverable pincodes in the dashboard (Settings > Deliverable Pincodes);
 * the backend also refuses payment for orders outside that list.
 */
export function usePincode() {
  const { client } = useVendure()

  async function checkPincode(pincode: string): Promise<PincodeDeliverability> {
    const data: any = await client.request(CHECK_PINCODE, {
      pincode: String(pincode ?? '').trim(),
    })

    return data.checkPincodeDeliverability
  }

  return { checkPincode }
}
