import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

function PayPalCheckout() {
    return (
        <PayPalScriptProvider options={{ "client-id": "AXSS4dtnRC6boUJeK3tcL_ijaw43cDA6a42JzTxziY4zbFRUPI_rymC8j5nxJiI3CvpbgKl63aIQbYWH" }}>
            <div style={{ width: "100%", textAlign: "center", padding: "20px" }}>
                <PayPalButtons
                    createOrder={async () => {
                        // Solicitud al backend en Vercel
                        const { data } = await axios.post("https://pocketcenter-backend.vercel.app/create-order");
                        return data.id;
                    }}
                    onApprove={async (data) => {
                        // Solicitud para capturar el pago
                        const response = await axios.post("https://pocketcenter-backend.vercel.app/capture-order", {
                            orderID: data.orderID,
                        });
                        console.log("Pago completado:", response.data);
                    }}
                />
            </div>
        </PayPalScriptProvider>
    );
}

export default PayPalCheckout;
