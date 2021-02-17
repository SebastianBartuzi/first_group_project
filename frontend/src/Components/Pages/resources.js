import axios from 'axios'
import {useState} from 'react'
import "../../Styles/resources.css";
import { DropdownButton, Dropdown } from 'react-bootstrap'

const Resources = () =>{

   
    
    
    return (


        <div  className ="content-box res"> 
        <h1 class="content-title">Mental Health Resources</h1>
        {/* <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
             POGGERS
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown> */}
        <DropdownButton id="dropdown-basic-button" title="United Kingdom" style={{width: "1000", fontSize:"50px"}}>
        <Dropdown.Item href="https://www.thecalmzone.net" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem"}}><p><b>CALM</b></p>
        <p>CALM is the Campaign Against Living Miserably.</p>
        <p>A charity providing a mental health helpline and webchat.</p>
        <p>Phone: 0800 58 58 58 (daily, 5pm to midnight)</p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
       
        <Dropdown.Item href="https://www.samaritans.org.uk" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem"}}><p><b>Samaritans</b></p>
        <p>Confidential support for people experiencing feelings of distress or despair.</p>
        <p>Phone: 116 123 (free 24-hour helpline)</p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
       
       
        <Dropdown.Item href="https://www.menshealthforum.org.uk" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem"}}><p><b>Men's Health Forum</b></p> 
        <p>24/7 stress support for men by text, chat and email.</p>
        <p>Phone: +44 020 7922 7908 </p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
        
        <Dropdown.Item href="https://www.childline.org.uk/" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem"}}><p><b>Childline</b></p> 
        <p>Childline offers help to anyone under 19 in the UK with any issue they’re going through.</p>
        <p>Speak to a counsellor every day from 9:00am - 3:30am</p>
        <p>Phone number: 0800 1111</p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
        </DropdownButton>



        <DropdownButton title="United States" style={{marginTop: "20px"}}>
        <Dropdown.Item href="https://www.samaritans.org" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem"}}><p><b>Samaritans</b></p>
        <p>Confidential support for people experiencing feelings of distress or despair.</p>
        <p>Rhode Island - (401) 272 – 4044</p>
        <p>New York - (212) 673-3000</p>
        <p>Boston – (617) 274-0220</p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
       
        <Dropdown.Item href="https://suicidepreventionlifeline.org/" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem"}}><p><b>Suicide Prevention Lifeline</b></p>
        <p>The Lifeline provides 24/7, free and confidential support for people in distress, </p>
        <p>prevention and crisis resources for you or your loved ones, and best practices for professionals</p>
        <p>Phone number: 1-800-273-8255 </p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
     
        </DropdownButton>
        
        </div>
    )
}

export default Resources;