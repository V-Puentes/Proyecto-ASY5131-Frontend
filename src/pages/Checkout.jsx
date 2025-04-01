// components/payPalcheckout.js
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const createOrder = async () => {
    try {
      const response = await fetch(
        'https://pocketcenter-backend.vercel.app/create-order',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amount
          })
        }
      );
      
      if (!response.ok) throw new Error('Error al crear la orden');
      
      const { id } = await response.json();
      return id;
    } catch (err) {
      onError(err);
      throw err; // Esto es importante para que PayPal muestre el error
    }
  };

  const onApprove = async (data) => {
    try {
      const response = await fetch(
        'https://pocketcenter-backend.vercel.app/capture-order',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderID: data.orderID
          })
        }
      );
      
      if (!response.ok) throw new Error('Error al capturar el pago');
      
      const captureData = await response.json();
      onSuccess(captureData);
    } catch (err) {
      onError(err);
    }
  };

  return (
    <PayPalScriptProvider 
      options={{ 
        "client-id": "AXSS4dtnRC6boUJeK3tcL_ijaw43cDA6a42JzTxziY4zbFRUPI_rymC8j5nxJiI3CvpbgKl63aIQbYWH",
        "currency": "USD",
        "intent": "capture"
      }}
    >
      <PayPalButtons
        style={{ 
          layout: "vertical",
          shape: "rect",
          color: "gold",
          height: 55
        }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;