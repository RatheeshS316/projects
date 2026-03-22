import React from 'react'
import styled from 'styled-components'

function Footerpage() {
  return (
    <Container>
       <div className="bg-ground">
          <div className="flex-1">
            <h4>Company</h4>
            <p>About Us</p>
            <p>Careers</p>
            <p>&copy; 2025 STAR . All Right Reserved.</p>
            <p>Terms of Use   Privacy Policy   FAQ</p>
          </div>

          <div className="flex-1">
              <h4>View Website In</h4>
              <select id="language" name="language">
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
                <option value="telugu">Telugu</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Urdu">Urdu</option>
              </select>
          </div>

          <div className="flex-1"> 
            <h4>Need Help?</h4>
            <p>Visit Help Center <br /> Share Feedback</p>
          </div>

          <div className="flex-1">
            <h4>Connect with Us</h4>
            <p><i className="fab fa-facebook-f"></i><i className="fab fa-instagram"></i><i className="fab fa-twitter"></i></p>
            <img src="/images/google-playstorelogo.webp"  />
            <img src="/images/ios-appstorelogo.webp" />
          </div>
       </div>
    </Container>
  )
}

export default Footerpage;

const Container = styled.div`
    font-family:poppins, sans-serif;
    font-weight:100px;
    background-color: #11131C;
    margin:0 -30px;
    padding:15px;


        select {
          background-color: #11131C;   /* Dark background */
          color: #F7F8FA;              /* Light text */
          border: 1px solid #2B2D3A;   /* Subtle border */
          border-radius: 8px;
          padding: 0.5rem 1rem;
          font-size: 0.95rem;
          font-family: "Inter", system-ui, sans-serif;
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
          appearance: none; /* removes default arrow */
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1rem;
        }

        select:hover {
          border-color: #4ea3ff;
        }

        select:focus {
          border-color: #4ea3ff;
          box-shadow: 0 0 0 3px rgba(78, 163, 255, 0.3);
        }

        option {
          background-color: #11131C;
          color: #F7F8FA;
        }

        p{
        color: #f7f8fa8e;
        }
    img{
    display:flex;
     width:100px;
     height:30px;  
     margin:3px; 

     &:hover{
     border:2px solid blue;
     border-radius:5px;
     }
   }
     i{
      padding:5px; 
      color:white; 
      margin-left:5px;  
     }

     .bg-ground{
     display:flex;
     padding:10px;
     justify-content:space-between;

     div{
     display:flex;
     }
     }

     .flex-1{
    display:flex;
    flex-direction:column;
     }


  h4, p ,img{
  margin-bottom:10px;
  }
    
`