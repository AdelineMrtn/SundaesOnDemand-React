import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test('update scoop subtotal when scoops change', async () => {
    render(<Options optionType="scoops" />, {wrapper: OrderDetailsProvider });

    //make sure total starts out $0.00
    const scoopsSubTotal = await screen.findByText('Scoops total: $', { exact: false });
    expect(scoopsSubTotal).toHaveTextContent('0.00');

    //update vanilla scoop to 1 and check subtotal
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla',});
    //chaque fois q'un elem est mis à jour, il faut effacer son contenu
    userEvent.clear(vanillaInput); 
    // // entrer du texte
    userEvent.type(vanillaInput, '1');
    expect(scoopsSubTotal).toHaveTextContent('2.00');

    // //update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate', });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput,'2');
    expect(scoopsSubTotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
    render(<Options optionType = "toppings"/>, {wrapper: OrderDetailsProvider});

    //make sure total starts out $0.00
    const toppingsSubTotal = await screen.findByText('Toppings total: $', {exact: false});
    expect(toppingsSubTotal).toHaveTextContent('0.00');

    //update cherries topping to 1 and check subtotal
    const cherriesCheckbox = await screen.findByRole('checkbox', {name: 'Cherries' });
    expect(cherriesCheckbox).not.toBeChecked();

    userEvent.click(cherriesCheckbox);
    expect(cherriesCheckbox).toBeChecked();
    expect(toppingsSubTotal).toHaveTextContent('1.50');

    //update fudge topping to 2 and check subtotal
    const fudgeCheckbox = await screen.findByRole('checkbox', {name: 'Hot fudge'})
    expect(fudgeCheckbox).not.toBeChecked();

    userEvent.click(fudgeCheckbox);
    expect(fudgeCheckbox).toBeChecked();
    expect(toppingsSubTotal).toHaveTextContent('3.00');

    //update bears topping remove to the list
    userEvent.click(fudgeCheckbox);
    expect(fudgeCheckbox).not.toBeChecked();
    expect(toppingsSubTotal).toHaveTextContent('1.50');
});

describe('grand total', () =>{
    test('grand total updtaes if scoop added first', async () => {
        render(<OrderEntry/>, {wrapper: OrderDetailsProvider });
        const grandTotal = screen.getByRole('heading', {name: /grand total: \$/i,});
        //make sure total starts out $0.00
        expect(grandTotal).toHaveTextContent('0.00');

        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla',});
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');

        expect(grandTotal).toHaveTextContent('2.00');
    });

    test('grand total updates if topping added first', async () => {
        render(<OrderEntry/>,{wrapper: OrderDetailsProvider });
        const grandTotal = screen.getByRole('heading', {name: /grand total: \$/i,});
        const cherriesCheckbox = await screen.findByRole('checkbox', {name: 'Cherries' });
        userEvent.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('1.50');

    });

    test('update grand total after elem is removed', async () => {
        render(<OrderEntry/>, {wrapper: OrderDetailsProvider });
        const grandTotal = screen.getByRole('heading', {name: /grand total: \$/i,});

        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla',});
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');

        const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate', });
        userEvent.clear(chocolateInput);
        userEvent.type(chocolateInput,'2');

        expect(grandTotal).toHaveTextContent('6.00');

        const cherriesCheckbox = await screen.findByRole('checkbox', {name: 'Cherries' });
        userEvent.click(cherriesCheckbox);

        expect(grandTotal).toHaveTextContent('7.50');

        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '0');
        expect(grandTotal).toHaveTextContent('5.50');

        userEvent.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('4.00');
    });
})