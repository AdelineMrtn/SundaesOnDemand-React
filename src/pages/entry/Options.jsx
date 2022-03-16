import axios from 'axios';
import { useEffect, useState } from 'react';   
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import Row from 'react-bootstrap/Row'; 
import AlertBanner from '../common/AlertBanner'; 


export default function Options({ optionType }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);

    // option type is 'scoops' or 'toppings'   
    useEffect(() => {
        axios
        .get(`http://localhost:3030/${optionType}`)
        .then((response) => setItems(response.data))
        .catch(error => setError(true));
    }, [optionType]);

    if (error) {
        return <AlertBanner/>
    }

    const ItemsComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
    const optionItems = items.map((item) => (
        <ItemsComponent
            key={item.name}  
            name={item.name} 
            imagePath={item.imagePath}
        />
    )); 
    return (<Row>{optionItems}</Row>);
}

