import { gql } from 'graphql-request'

const ORDER_FIELDS = gql`
  fragment CartOrderFields on Order {
    id
    code
    state
    totalQuantity

    subTotal
    subTotalWithTax

    shipping
    shippingWithTax

    shippingLines {
      id
      priceWithTax
      shippingMethod {
        id
        code
        name
      }
    }

    total
    totalWithTax

    taxSummary {
      description
      taxRate
      taxBase
      taxTotal
    }

    couponCodes
discounts {
  adjustmentSource
  type
  description
  amountWithTax
}

    lines {
      id
      quantity
      linePriceWithTax
      discountedLinePriceWithTax

      productVariant {
        id
        name
        sku
        priceWithTax

        product {
          id
          name
          slug

          featuredAsset {
            preview
          }
        }
      }
    }
  }
`

const ACTIVE_ORDER = gql`
  ${ORDER_FIELDS}

  query ActiveOrder {
    activeOrder {
      ...CartOrderFields
    }
  }
`

const ADD_ITEM_TO_ORDER = gql`
  ${ORDER_FIELDS}

  mutation AddItemToOrder(
    $productVariantId: ID!
    $quantity: Int!
  ) {
    addItemToOrder(
      productVariantId: $productVariantId
      quantity: $quantity
    ) {
      __typename

      ... on Order {
        ...CartOrderFields
      }

      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`

const ADJUST_ORDER_LINE = gql`
  ${ORDER_FIELDS}

  mutation AdjustOrderLine(
    $orderLineId: ID!
    $quantity: Int!
  ) {
    adjustOrderLine(
      orderLineId: $orderLineId
      quantity: $quantity
    ) {
      __typename

      ... on Order {
        ...CartOrderFields
      }

      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`

const REMOVE_ORDER_LINE = gql`
  ${ORDER_FIELDS}

  mutation RemoveOrderLine(
    $orderLineId: ID!
  ) {
    removeOrderLine(
      orderLineId: $orderLineId
    ) {
      __typename

      ... on Order {
        ...CartOrderFields
      }

      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`
const RETURN_ORDER_TO_ADDING_ITEMS = gql`
  ${ORDER_FIELDS}

  mutation ReturnOrderToAddingItems {
    transitionOrderToState(state: "AddingItems") {
      __typename

      ... on Order {
        ...CartOrderFields
      }

      ... on OrderStateTransitionError {
        errorCode
        message
        transitionError
        fromState
        toState
      }
    }
  }
`


export function useCart() {
  const { client } = useVendure()

  /*
  |--------------------------------------------------------------------------
  | GLOBAL ACTIVE ORDER
  |--------------------------------------------------------------------------
  */

  const activeOrder = useState<any | null>(
    'vendure-active-order',
    () => null
  )

  const cartLoading = useState<boolean>(
    'vendure-cart-loading',
    () => false
  )

  /*
  |--------------------------------------------------------------------------
  | COMPUTED CART DATA
  |--------------------------------------------------------------------------
  */

  const cartCount = computed(() => {
    return Number(
      activeOrder.value?.totalQuantity ?? 0
    )
  })

  const cartLines = computed<any[]>(() => {
    return activeOrder.value?.lines ?? []
  })

  const cartTotal = computed(() => {
    return (
      Number(
        activeOrder.value?.totalWithTax ?? 0
      ) / 100
    )
  })

  /*
  |--------------------------------------------------------------------------
  | HANDLE MUTATION RESULT
  |--------------------------------------------------------------------------
  */

  function handleOrderResult(result: any) {
    if (!result) {
      throw new Error(
        'No response received from Vendure'
      )
    }

    if (result.errorCode) {
      throw new Error(
        result.message ||
        'Vendure cart operation failed'
      )
    }

    if (result.__typename !== 'Order') {
      throw new Error(
        result.message ||
        `Unexpected cart response: ${result.__typename}`
      )
    }

    activeOrder.value = result

    return result
  }

  /*
  |--------------------------------------------------------------------------
  | GET ACTIVE ORDER
  |--------------------------------------------------------------------------
  */

  async function getActiveOrder() {
    try {
      cartLoading.value = true

      const data: any =
        await client.request(
          ACTIVE_ORDER
        )

      activeOrder.value =
        data?.activeOrder ?? null

      return activeOrder.value
    } catch (error) {
      console.error(
        'Failed to get active order:',
        error
      )

      activeOrder.value = null

      return null
    } finally {
      cartLoading.value = false
    }
  }

  async function refreshCart() {
    return await getActiveOrder()
  }

  function clearCartState() {
    activeOrder.value = null
  }
    async function ensureOrderCanBeModified() {
    // Always get the latest order state from Vendure.
    const order = await getActiveOrder()

    // No active order means addItemToOrder will create a new order.
    if (!order) {
      return null
    }

    if (order.state === 'AddingItems') {
      return order
    }

    if (order.state === 'ArrangingPayment') {
      const data: any = await client.request(
        RETURN_ORDER_TO_ADDING_ITEMS
      )

      const result = data?.transitionOrderToState

      if (!result) {
        throw new Error(
          'No response received while restoring the cart'
        )
      }

      if (result.__typename === 'OrderStateTransitionError') {
        throw new Error(
          result.transitionError ||
          result.message ||
          'Unable to return the order to the cart'
        )
      }

      return handleOrderResult(result)
    }

    /*
    * Completed, cancelled and settled orders cannot be edited.
    * Refreshing removes an old order left in frontend state.
    */
    activeOrder.value = null

    const latestOrder = await getActiveOrder()

    if (
      latestOrder &&
      latestOrder.state !== 'AddingItems'
    ) {
      throw new Error(
        `This order cannot be modified because it is in the "${latestOrder.state}" state`
      )
    }

    return latestOrder
  }

  async function applyCoupon(couponCode: string) {
  const code = couponCode.trim()

  if (!code) {
    throw new Error('Coupon code is required')
  }

  try {
    cartLoading.value = true

    const data: any = await client.request(
      APPLY_COUPON_CODE,
      {
        couponCode: code,
      }
    )

    return handleOrderResult(
      data?.applyCouponCode
    )
  } catch (error) {
    console.error(
      'Failed to apply coupon:',
      error
    )

    throw error
  } finally {
    cartLoading.value = false
  }
}

async function removeCoupon(couponCode: string) {
  const code = couponCode.trim()

  if (!code) {
    throw new Error('Coupon code is required')
  }

  try {
    cartLoading.value = true

    const data: any = await client.request(
      REMOVE_COUPON_CODE,
      {
        couponCode: code,
      }
    )

    if (data?.removeCouponCode) {
      activeOrder.value = data.removeCouponCode
    }

    return data?.removeCouponCode
  } catch (error) {
    console.error(
      'Failed to remove coupon:',
      error
    )

    throw error
  } finally {
    cartLoading.value = false
  }
}

  /*
  |--------------------------------------------------------------------------
  | ADD ITEM
  |--------------------------------------------------------------------------
  */

  async function addItem(
    productVariantId: string,
    quantity = 1
  ) {
    if (!productVariantId) {
      throw new Error(
        'Product variant ID is required'
      )
    }

    if (quantity <= 0) {
      throw new Error(
        'Quantity must be greater than 0'
      )
    }
    await ensureOrderCanBeModified()

    try {
      cartLoading.value = true

      const data: any =
        await client.request(
          ADD_ITEM_TO_ORDER,
          {
            productVariantId,
            quantity,
          }
        )

      return handleOrderResult(
        data?.addItemToOrder
      )
    } catch (error) {
      console.error(
        'Failed to add item:',
        error
      )

      throw error
    } finally {
      cartLoading.value = false
    }
  }

  /*
  |--------------------------------------------------------------------------
  | ADJUST QUANTITY
  |--------------------------------------------------------------------------
  */

  async function adjustQuantity(
    orderLineId: string,
    quantity: number
  ) {
    if (!orderLineId) {
      throw new Error(
        'Order line ID is required'
      )
    }

    if (quantity < 0) {
      throw new Error(
        'Quantity cannot be negative'
      )
    }
    await ensureOrderCanBeModified()

    try {
      cartLoading.value = true

      const data: any =
        await client.request(
          ADJUST_ORDER_LINE,
          {
            orderLineId,
            quantity,
          }
        )

      return handleOrderResult(
        data?.adjustOrderLine
      )
    } catch (error) {
      console.error(
        'Failed to adjust quantity:',
        error
      )

      throw error
    } finally {
      cartLoading.value = false
    }
  }

  /*
  |--------------------------------------------------------------------------
  | REMOVE ITEM
  |--------------------------------------------------------------------------
  */

  async function removeItem(
    orderLineId: string
  ) {
    if (!orderLineId) {
      throw new Error(
        'Order line ID is required'
      )
    }
    await ensureOrderCanBeModified()


    try {
      cartLoading.value = true

      const data: any =
        await client.request(
          REMOVE_ORDER_LINE,
          {
            orderLineId,
          }
        )

      return handleOrderResult(
        data?.removeOrderLine
      )
    } catch (error) {
      console.error(
        'Failed to remove item:',
        error
      )

      throw error
    } finally {
      cartLoading.value = false
    }
  }

  const APPLY_COUPON_CODE = gql`
  ${ORDER_FIELDS}

  mutation ApplyCouponCode($couponCode: String!) {
    applyCouponCode(couponCode: $couponCode) {
      __typename

      ... on Order {
        ...CartOrderFields
      }

      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`

const REMOVE_COUPON_CODE = gql`
  ${ORDER_FIELDS}

  mutation RemoveCouponCode($couponCode: String!) {
    removeCouponCode(couponCode: $couponCode) {
      ...CartOrderFields
    }
  }
`

  return {
    activeOrder,
    cartLines,
    cartCount,
    cartTotal,
    cartLoading,

    getActiveOrder,
    refreshCart,
    ensureOrderCanBeModified,
    clearCartState,

    addItem,
    adjustQuantity,
    removeItem,

    applyCoupon,
    removeCoupon,
  }
}