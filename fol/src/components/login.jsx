import React from 'react'
import styled from 'styled-components'

const Login = () => {
  return (
  <Container>
        <CTA>
            <CTALogo1  src="/images/cta-logo-one.svg" />
            <SignUp>GET ALL THERE</SignUp>
            <Description>
              Get Premium Access to Raya and the last Dragon for an Additional fee with a Disney+ Subscription . As of 26/08/25 , the price and the Disney+ and the Disney Bundle Will Increased by $1.
            </Description>
            <CTALogo2  src="/images/cta-logo-two.png" />
        </CTA>
  </Container>
  )
}

export default Login;

const  Container = styled.div`
    position:relative;
    height: calc(100vh - 70px);
    display:flex;
    justify-content:center;
    align-items:top;

    &:before{
    position:absolute;
    content:"";
    top:0;
    bottom:0;
    left:0;
    right:0;
    background-position:top;
    background-image: url("/images/login-background.jpg");
    background-size:cover;
    background-repeat:no-repeat;
    z-index:-1;
    }
`


const CTA = styled.div`
  max-width:650px;
  padding:80px 40px;
  width:70%;
  display:flex;
  flex-direction:column;
  margin-top:100px;

`

const CTALogo1 = styled.img`

`

const SignUp = styled.a`
width:100%;
background-color:#0063e5;
font-weight:bold;
padding:17px 0;
color:#f9f9f9;
border-radius:4px;
text-align:center;
font-size:18px;
cursor:pointer;
transition: all 250ms;
letter-spacing:1.5px;
margin-top:8px;

&:hover{
background-color:#0483ee;
}
`

const Description = styled.p`
font-size:11px;
letter-spacing:1.5px;
text-align:center;
line-height:1.5;
padding:10px;
`

const CTALogo2 = styled.img`
width:90%;
`