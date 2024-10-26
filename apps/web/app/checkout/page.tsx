'use client';
import React from 'react';
import { useCart } from '../../contexts/cartContext';

const CheckoutPage: React.FC = () => {
    const { cartItems } = useCart();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <div className="bg-white shadow-md rounded-lg p-4">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
                                    <div>
                                        <h2 className="text-lg font-semibold">{item.name}</h2>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t">
                            <span className="text-lg font-semibold">Total</span>
                            <span className="text-lg font-bold">${calculateTotal()}</span>
                        </div>
                    </div>
                )}
            </div>
            <button
                className="bg-blue-600 text-white px-6 py-2 rounded mt-6 hover:bg-blue-700"
                onClick={() => alert('Proceeding to payment is not yet implemented!')}
            >
                Proceed to Payment
            </button>
        </div>
    );
};

export default CheckoutPage;
