export const CREATE_RAZORPAY_ORDER = `
    mutation CreateRazorpayOrder {
        createRazorpayOrder {
            id
            amount
            currency
            receipt
            status
        }
    }
`;