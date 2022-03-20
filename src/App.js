import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfimration from './pages/confirmation/OrderConfirmation.jsx';

import {OrderDetailsProvider} from './contexts/OrderDetails';

import './App.css';
// import SummaryForm from './pages/summary/SummaryForm';
// import ScoopOption from './pages/entry/ScoopOption';
// import ToppingOption from './pages/entry/ScoopOption';

function App() {
  // orderPhase needs to be in progress, review or completed
  const[orderPhase, setOrderPhase] = useState('inProgress');

  let Component = OrderEntry; // default to order page
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfimration;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container>
        {<Component setOrderPhase={setOrderPhase} />}
      </Container>
    </OrderDetailsProvider>
  );
}
export default App;
