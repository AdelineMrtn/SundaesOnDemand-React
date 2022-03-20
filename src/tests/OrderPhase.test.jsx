import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

//fonctionne sans erreur avec un flux de clients
test('order phase for happy path', async () => {
    //render app
    render(<App/>);

    //add ice scream scoop and topping
    const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const cherriesCheckbox = await screen.findByRole('checkbox', {name:'Cherries'});
    userEvent.click(cherriesCheckbox);

    //find and click order button
    const orderButton = screen.getByRole('button', {name:'/order sundae/i'});
    userEvent.click(orderButton);

    //check summary informations based on the order
    const headingSummary = screen.getByRole('heading', {name:'Order Summary'});
    expect(headingSummary).toBeInTheDocument();

    const headingScoops = screen.getByRole('heading', {name:'Scoops'});
    expect(headingScoops).toBeInTheDocument();

    const headingToppings = screen.getByRole('heading', {name:'Toppings'});
    expect(headingToppings).toBeInTheDocument();

    //confirm summary options details

    expect(screen.getByText('1 Vannila')).toBeInTheDocument();
    expect(screen.getByText('Cherries')).toBeInTheDocument();

    //accept terms and conditions and click button to confirm order
    const checkboxCondition = screen.getByRole('checkbox', {name:'/terms and conditions/i'});
    const confirmButton = screen.getByRole('button', {name:'/confirm order/i'});

    expect(checkboxCondition).not.toBeChecked();
    expect(confirmButton).toBeDisabled();

    userEvent.click(checkboxCondition);
    expect(confirmButton).toBeEnabled();

    userEvent.click(confirmButton);

    // confirm order number on confirmation page
    // this one is async because there is a POST request to server 

    const thankYouHeader = screen.getByText('Thank you!');
    expect(thankYouHeader).toBeInTheDocument();

    const orderNumber = await screen.findByText('/order number/i');
    expect(orderNumber).toBeInTheDocument();

    // click new order button on confirmation page
    const createNewOrderButton = screen.getByRole('button', {name:'/new order/i'});
    userEvent.click(createNewOrderButton);

    //check scoop's and topping's subtotal have been reset
    const scoopsSubTotal = screen.getByText('Scoops total: $0.0');
    expect(scoopsSubTotal).toBeInTheDocument();

    const toppingsSubTotal = screen.getByText('Toppings total: $0.0');
    expect(toppingsSubTotal).toBeInTheDocument();

    //do we need to await anything to avoid test errors?
})