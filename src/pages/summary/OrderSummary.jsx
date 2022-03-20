import React from 'react';
import SummaryForm from './SummaryForm';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderSummary({setOrderPhase}){
    const [orderDetails] = useOrderDetails();

    //scoops list
    const scoopArray = Array.from(orderDetails.scoops.entries());
    const scoopList = scoopArray.map(([key, value]) => (
        <li key={key}>{value} {key}</li>
    ));

    //toppings list
    const toppingArray = Array.from(orderDetails.toppings.keys());
    const toppingList = toppingArray.map((key) => 
        <li key ={key}>{key}</li>
        );
    
    return(
        <div>
            <h1>Order Summary</h1>
            <h2>Scoops: {orderDetails.totals.scoops}</h2>
            <ul>{scoopList}</ul>
            <h2>Toppings: {orderDetails.totals.toppings}</h2>
            <ul>{toppingList}</ul>
            <SummaryForm setOrderPhase={setOrderPhase}></SummaryForm>
        </div>
        )
}