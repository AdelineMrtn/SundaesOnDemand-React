import {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useOrderDetails } from "../../contexts/OrderDetails";
  
export default function SummaryForm ({setOrderPhase}) {
    const [tcChecked, setTcChecked] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        //la prochaine page OrderConfimration ecera le status 'completed'
        setOrderPhase('completed');
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Popover right</Popover.Header>
          <Popover.Body>
            No ice cream will actually be delivered
          </Popover.Body>
        </Popover>
      );

    const checkboxLabel = (
    <span>
        I agree to 
        <OverlayTrigger placement="right" overlay={popover}>
            <span style={{color: 'blue'}}>Terms and Conditions</span>
        </OverlayTrigger>
    </span>
    );  

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="terms-and-conditions">
                <Form.Check 
                    type="checkbox" 
                    checked={tcChecked} 
                    onChange={(e) => setTcChecked(e.target.checked)} 
                    label={checkboxLabel}>
                </Form.Check>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={(!tcChecked)}>
                Confirm order
            </Button>
        </Form>
    );
}