import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants';
import { formatCurrency } from '../utilities/index'

// @ts-ignore
const OrderDetails = createContext();

//create custom hook to check whether we're inside a provider
export function useOrderDetails() {
    // @ts-ignore
    const context = useContext(OrderDetails);

    if(!context) {
        throw new Error('useOrderDetails must be used within an OrderDetailsProvider');
    }
    return context;
}

function calculateSubtotal(optionType, optionCounts) {
    let optionCount = 0;
    for(const count of optionCounts[optionType].values()) {
        optionCount += count;
    }

    return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map(), 
    });
    const zeroCurrency = formatCurrency(0);
    const [totals, setTotals] = useState({
        scoops: zeroCurrency, 
        toppings: zeroCurrency,
        grandTotal: zeroCurrency,
    });

    useEffect(() => {
        const scoopsSubTotal = calculateSubtotal('scoops', optionCounts);
        const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
        const grandTotal = scoopsSubTotal + toppingsSubtotal;
        setTotals({
            scoops: formatCurrency(scoopsSubTotal),  
            toppings: formatCurrency(toppingsSubtotal), 
            grandTotal: formatCurrency(grandTotal),
        });
    }, [optionCounts]);

    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, optionType) {
            const newOptionCounts = {...optionCounts}

            // update option count for this item with the new value
            const optionCountsMap = optionCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount));

            setOptionCounts(newOptionCounts);
        }

        function resetOrder() {
            setOptionCounts({
                //on vide la liste des scoops et des toppings pour les réinitialiser
                scoops: new Map(),
                toppings: new Map(),
            });
        }
        //getter : object containing options counts for scoops and toppings, subtotals and totals
        //setter: update option count
        return [{...optionCounts, totals }, updateItemCount, resetOrder];
    }, [optionCounts, totals]);
    return <OrderDetails.Provider value={value} {...props} />
}
