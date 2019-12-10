import React from 'react'
import styled from 'styled-components'


const LoadingContainer = styled.div`
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin: 4rem auto;
  animation: spin 2s linear infinite;
`

export default function LoadingCircle(props){
  return <LoadingContainer />
}
