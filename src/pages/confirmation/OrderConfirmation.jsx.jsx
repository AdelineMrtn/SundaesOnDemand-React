import axios from 'axios';
import { useEffect, useState } from 'react';   
import { useOrderDetails } from '../../contexts/OrderDetails';
import Button from 'react-bootstrap/Button';

export default function OrderConfimration({setOrderPhase}) {
    // on n'exporte que le dernier item du tableau que retourne la fonction resetOrder dans OrderDatails.jsx
    // les deux premiers items sont destrucutrés
    const [, , resetOrder] = useOrderDetails();
    const[orderNumber, setOrderNumber] = useState(null);

    useEffect(() => {
        axios
        .post(`http://localhost:3030/order`)
        .then((response) => {
            setOrderNumber(response.data.orderNumber);
        })
        .catch((error) => {
            //TODO : handle error here
        });
    }, []);
    //pas de tableau de dépendance puisqu'on ne travaille que sur un composant

    function handleClick() {
        //clear the order details
        resetOrder();

        //send back to order page
        setOrderPhase('inProgress');
    }

    if (orderNumber) {
        return(
            <div style={{textAlign:'center'}}>
                <h1>Thank you!</h1>
                <p>Your order number is {orderNumber}</p>
                <p style={{fontSize: '25%'}}> as per ot terms and conditions nothing will happens now</p>
                <Button onClick={handleClick}>Create new order</Button>
            </div>
        );
    }else{
        return <div>Loading</div>
    }

}
