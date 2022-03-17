import {render, screen} from '../../../test-utils/testing-library-utils';

import Options from '../Options';
import {OrderDetailsProvider} from '../../../contexts/OrderDetails';

test('displays image for each scoop option from server', async () => {
    render(<Options optionType="scoops"/>, { wrapper: OrderDetailsProvider });

    //find images 
    const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i});
    expect(scoopImages).toHaveLength(2);
    
    // confirm alt text on images
    const altText = scoopImages.map(element => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);  
})

test('displays images for each toppings option from server', async() => {
    render(<Options optionType="toppings"/>,{ wrapper: OrderDetailsProvider }); 

    //find images
    const toppingsImages = await screen.findAllByRole('img', {name: /topping$/i});
    expect(toppingsImages).toHaveLength(3);

    //confirm alt text on images
    const altTextImages = toppingsImages.map(element => element.alt);
    expect(altTextImages).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
}); 