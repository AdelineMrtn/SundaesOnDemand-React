import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import {OrderDetailsProvider} from './contexts/OrderDetails';
import './App.css';
// import SummaryForm from './pages/summary/SummaryForm';
// import ScoopOption from './pages/entry/ScoopOption';
// import ToppingOption from './pages/entry/ScoopOption';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider*/}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* confirmation page does not need provider */}
    </Container>
  );
}
export default App;
