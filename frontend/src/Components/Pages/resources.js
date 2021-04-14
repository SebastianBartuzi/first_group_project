import axios from 'axios'
import {useState} from 'react'
import "../../Styles/resources.css";
import { DropdownButton, Dropdown } from 'react-bootstrap'
import FavButton from "../favButton"

const Resources = () =>{

   
    
    
    return (

        <div>
            {localStorage.getItem("authToken") && <FavButton> </FavButton>}
        <div  className ="content-box res"> 
        
        <h1 class="content-title">Mental Health Resources</h1>

        <DropdownButton title="Manchester" style={{marginTop: "20px"}}>
        <Dropdown.Item href="https://www.gmmh.nhs.uk/" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem", whiteSpace:"normal"}}><p><b>Greater Manchester Mental Health</b></p>
        <p>Provides inpatient and community-based mental health care for people living in the city of Manchester and a wide range of specialist mental health and substance misuse services across Greater Manchester.</p>
        <p>Phone: 0800 953 0285 (24/7 helpline)</p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
        <Dropdown.Item href="https://www.manchestermind.org/" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem", whiteSpace:"normal"}}><p><b>Mind Manchester</b></p>
        <p>A space where mental health comes first, believing that everyone deserves to be supported in their mental health needs. Mind Manchester delivers a wind range of services to support people's mental wellbeing.</p>
        <p>Phone: 0161 769 5732 (10am - 2pm / Mon - Fri)</p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
        </DropdownButton>

        <DropdownButton id="dropdown-basic-button" title="United Kingdom" style={{width: "1000", fontSize:"50px"}}>
        <Dropdown.Item href="https://www.thecalmzone.net" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem", whiteSpace:"normal"}}><p><b>CALM</b></p>
        <p>CALM is the Campaign Against Living Miserably. A charity providing a mental health helpline and webchat.</p>
        <p>Phone: 0800 58 58 58 (daily, 5pm to midnight)</p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
       
        <Dropdown.Item href="https://www.samaritans.org.uk" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem", whiteSpace:"normal"}}><p><b>Samaritans</b></p>
        <p>Confidential support for people experiencing feelings of distress or despair.</p>
        <p>Phone: 116 123 (free 24-hour helpline)</p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
       
       
        <Dropdown.Item href="https://www.menshealthforum.org.uk" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem", whiteSpace:"normal"}}><p><b>Men's Health Forum</b></p> 
        <p>24/7 stress support for men by text, chat and email.</p>
        <p>Phone: +44 020 7922 7908 </p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
        
        <Dropdown.Item href="https://www.childline.org.uk/" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem", whiteSpace:"normal"}}><p><b>Childline</b></p> 
        <p>Childline offers help to anyone under 19 in the UK with any issue they’re going through. Speak to a counsellor every day from 9:00am - 3:30am</p>
        <p>Phone number: 0800 1111</p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
        </DropdownButton>



        <DropdownButton title="United States" style={{marginTop: "20px"}}>
        <Dropdown.Item href="https://www.samaritans.org" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem", whiteSpace:"normal"}}><p><b>Samaritans</b></p>
        <p>Confidential support for people experiencing feelings of distress or despair.</p>
        <p>Rhode Island - (401) 272 – 4044</p>
        <p>New York - (212) 673-3000</p>
        <p>Boston – (617) 274-0220</p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
       
        <Dropdown.Item href="https://suicidepreventionlifeline.org/" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem", whiteSpace:"normal"}}><p><b>Suicide Prevention Lifeline</b></p>
        <p>The Lifeline provides 24/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones, and best practices for professionals.</p>
        <p>Phone number: 1-800-273-8255 </p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
        </DropdownButton>
        




        <DropdownButton title="Australia" style={{marginTop: "20px"}}>
        <Dropdown.Item href="https://www.beyondblue.org.au/" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem", whiteSpace:"normal"}}><p><b>Beyond Blue</b></p>
        <p>Aims to increase awareness of depression and anxiety and reduce stigma.</p>
        <p>Phone number: 1300 22 4636 (24 hours / 7 days a week)</p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
       
        <Dropdown.Item href="https://www.lifeline.org.au/" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem", whiteSpace:"normal"}}><p><b>Lifeline</b></p>
        <p>Provides 24-hour crisis counselling, support groups and suicide prevention.</p>
        <p>Phone number: 13 11 24</p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
        <Dropdown.Item href="https://mensline.org.au/" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem", whiteSpace:"normal"}}><p><b>MensLine</b></p>
        <p>A professional telephone and online support service for Australian men.</p>
        <p>Phone number: 1300 78 99 78 (24 hours / 7 days a week)</p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>

        <Dropdown.Item href="https://kidshelpline.com.au/" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem", whiteSpace:"normal"}}><p><b>Kids Helpline</b></p>
        <p>Australia's only free 24/7 confidential and private counseling service specifically for children and young people aged 5 to 25.</p>
        <p>Phone number: 1800 55 1800</p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>

        <Dropdown.Item href="https://qlife.org.au/" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem", whiteSpace:"normal"}}><p><b>QLife</b></p>
        <p>Provides nationwide telephone and web-based services to support lesbian, gay, bisexual, transgender and intersex (LGBTI) people of all ages</p>
        <p>Phone number: 1800 184 527 (3pm - 12am AEST / 7 days a week)</p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
        </DropdownButton>
        

        <DropdownButton title="Asia" style={{marginTop: "20px"}}>
        <Dropdown.Item href="https://www.iasp.info/" target = "_blank" rel = "noopener noreferrer" style={{width: "50vw", fontSize:"1.5rem", whiteSpace:"normal"}}><p><b>International Association for Suicide Prevention</b></p>
        <p>Dedicated to preventing suicide and suicidal behaviour, alleviating its effects, and providing a forum for academics, mental health professionals, crisis workers, volunteers and suicide survivors.</p>
        <p><i>Click here to visit site</i></p>
        </Dropdown.Item>
        </DropdownButton>

        </div>
        </div>
    )
}

export default Resources;