import emailjs from '@emailjs/browser'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()
  const [contact,setContact] = useState(null);
  const [lat,setLat] = useState("17.4917");
  const [lon,setLon] = useState("78.3920");


  useEffect(() => {
    const UniqueId = localStorage.getItem("UniqueId");
    if(UniqueId)
    {
        fetchUserDetails(UniqueId);
    }
    else
    {
        console.log("No UniqueId in localstorage");
    }
  },[]);

  const fetchUserDetails = async (UniqueId) => {
    try {
      const response = await axios.get(`http://localhost:5136/registration/get-user`, {
        params: { UniqueId }
      });
      console.log(response.data); // Check the structure of the response
      setContact(response.data);
      setLat(response.data?.Latitude);
      setLon(response.data?.Longitude);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  
  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault();
  
    // Ensure the contact data is loaded before attempting to send the email
    if (!contact || !contact.ServiceId || !contact.TemplateId || !contact.UserId) {
      alert("Please wait for contact details to load.");
      return;
    }
  
    // Send the email using EmailJS
    emailjs
      .sendForm(contact.ServiceId, contact.TemplateId, e.target, contact.UserId)
      .then(
        () => {
          alert('Message successfully sent!');
          window.location.reload(false);
        },
        (error) => {
          console.error("Email sending failed:", error);
          alert('Failed to send the message, please try again');
        }
      );
  
    e.target.reset();
  };
  

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            Contact me using below form.
          </p>
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input placeholder="Name" type="text" name="from_name" required />
                </li>
                <li className="half">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button buttons" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>
        
        <div className="map-wrap">
          <MapContainer center={[lat, lon]} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[lat, lon]}>
              <Popup>charan lives here</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
