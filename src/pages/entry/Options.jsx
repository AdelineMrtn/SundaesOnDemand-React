import axios from 'axios';
import { useEffect, useState } from 'react';   
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import Row from 'react-bootstrap/Row';  


export default function Options({ optionType }) {
    const [items, setItems] = useState([]);

    // option type is 'scoops' or 'toppings'   
    useEffect(() => {
        axios
        .get(`http://localhost:3030/${optionType}`)
        .then((response) => setItems(response.data))
        .catch(error => {
            //TODO: handle error response
        });
    }, [optionType]);

    const ItemsComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
    const optionItems = items.map((item) => (
        <ItemsComponent
            key={item.name}  
            name={item.name} 
            imagePath={item.imagePath}
        />
    )); 
    return <Row>{optionItems}</Row>;
}

