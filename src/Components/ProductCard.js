import React from 'react';
import { addtocart } from '../features/CartSlice';
import { useSelector, useDispatch } from 'react-redux';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

export default function App() {
  const items = useSelector((state) => state.allcart.items);
  const dispatch = useDispatch();

  return (
    <MDBContainer fluid>
      <MDBRow className='mb-3 mt-2'>
        {items && items.map((item, index) => (
          <MDBCol size='12' sm='6' md='4' lg='3' key={index} className='mt-4' >
            <MDBCard className='h-100 '>
              <MDBCardBody>
                <MDBCardImage src={item.img} position='top' alt={item.name} />
                <MDBCardBody>
                  <MDBCardTitle>{item.title}</MDBCardTitle>
                  <MDBCardText>$ {item.price}</MDBCardText>
                  <MDBBtn onClick={() => dispatch(addtocart(item))} color='dark'>Add to Cart</MDBBtn>
                </MDBCardBody>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
}
