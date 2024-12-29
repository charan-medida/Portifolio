
import axios from 'axios';
import { useState } from 'react';
import './formcss.css';


function Form()
{
    const [formData, setFormData] = useState({
        name: '',
        job: '',
        image: '',
        linkedinUrl: '',
        githubUrl: '',
        about: '',
        project1h: '',
        project1: '',
        project2h: '',
        project2: '',
        project3h: '',
        project3: '',
        project4h: '',
        project4: '',
        latitude: '',
        longitude: '',
        serviceid: '',
        templateid: '',
        userid: ''
    })
    const [generatedLink, setGeneratedLink] = useState("");

    const updateFormData = (field,value) => {
        setFormData(prevData => ({
            ...prevData,[field]:value
        }))
    }

    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:5136/registration/register",formData,{
                headers: {
                    "Content-Type": "application/json"
                },
            });
            // localStorage.setItem("UniqueId", response.data);
            console.log("Server Response", response.data);
            const url = `http://localhost:3000/home?data=${response.data}`;
            setGeneratedLink(url);
        }
        catch(error)
        {
            console.error("Error during API call", error)
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if(file)
        {
            const reader = new FileReader();

            reader.onload = () => {
                updateFormData('image',reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const copyToClipboard = () => {
        if (generatedLink) {
        navigator.clipboard.writeText(generatedLink);
        alert("Link copied to clipboard!");
        }
    };
    
    return(
        <div className="containers ">
            <h3>Fill the form to create a portifolio</h3>
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" class="form-control" placeholder="Enter the name" name="name" onChange={(e) => updateFormData('name',e.target.value)}/>

                <label htmlFor="job">Job Description</label>
                <textarea name="job" class="form-control" placeholder="Enter the description" id="about" cols="30" rows="10" 
                onChange={(e) => updateFormData('job',e.target.value)}></textarea>

                <label htmlFor="image">Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} 
                class="form-control" placeholder="Select Image" name="image" />

                <label htmlFor="linkedinUrl">Linkedin Url</label>
                <input type="text" name="linkedinUrl" class="form-control" onChange={(e)=> updateFormData('linkedinUrl',e.target.value)} 
                placeholder="Enter the linkedin url"/>

                <label htmlFor="githubUrl">Github Url</label>
                <input type="text" name="githubUrl" class="form-control" onChange={(e) => updateFormData('githubUrl',e.target.value)}
                placeholder="Enter the github url"/>

                <label htmlFor="about">About</label>
                <textarea name="about" class="form-control"
                onChange={(e) => updateFormData('about',e.target.value)} placeholder="Enter description" id="about" cols="30" rows="10"></textarea>

                <label htmlFor="project1">project-1</label>
                <input type="text" name="project1h" class="form-control"
                onChange={(e) => updateFormData('project1h',e.target.value)} placeholder="Enter the project title" id="projects" cols="30" rows="10"></input><br/>
                <textarea name="project1" class="form-control"
                onChange={(e) => updateFormData('project1',e.target.value)} placeholder="Description" id="projects" cols="30" rows="10"></textarea>

                <label htmlFor="project2">project-2</label>
                <input type="text" name="project2h" class="form-control"
                onChange={(e) => updateFormData('project2h',e.target.value)} placeholder="Enter the project title" id="projects" cols="30" rows="10"></input><br/>
                <textarea name="project2" class="form-control"
                onChange={(e) => updateFormData('project2',e.target.value)} placeholder="Description" id="projects" cols="30" rows="10"></textarea>

                <label htmlFor="project3">project-3</label>
                <input type="text" name="project3h" class="form-control"
                onChange={(e) => updateFormData('project3h',e.target.value)} placeholder="Enter the project title" id="projects" cols="30" rows="10"></input><br/>
                <textarea name="project3" class="form-control"
                onChange={(e) => updateFormData('project3',e.target.value)} placeholder="Description" id="projects" cols="30" rows="10"></textarea>

                <label htmlFor="project4">project-4</label>
                <input type="text" name="project4h" class="form-control"
                onChange={(e) => updateFormData('project4h',e.target.value)} placeholder="Enter the project title" id="projects" cols="30" rows="10"></input><br/>
                <textarea type="text" name="project4" class="form-control"
                onChange={(e) => updateFormData('project4',e.target.value)} placeholder="Description" id="projects" cols="30" rows="10"></textarea>

                <label htmlFor="latitude">Latitude</label>
                <input type="text" name="latitude" onChange={(e) => updateFormData('latitude',e.target.value)} 
                class="form-control" placeholder="Enter your location latitude"/>

                <label htmlFor="longitude">Longitude</label>
                <input type="text" name="longitude" onChange={(e) => updateFormData('longitude',e.target.value)} 
                class="form-control" placeholder="Enter your location longitude"/>

                <h1>login in EmilJs and then create Email Services and Email Templates.</h1>
                <label htmlFor="serviceid">ServiceId</label>
                <input type="text" name="serviceid" onChange={(e) => updateFormData('serviceid',e.target.value)} 
                class="form-control" placeholder="Enter you service id"/>

                <label htmlFor="templateid">TemplateId</label>
                <input type="text" name="templateid" onChange={(e) => updateFormData('templateid',e.target.value)} 
                class="form-control" placeholder="Enter you template id"/>

                <label htmlFor="userid">UserId</label>
                <input type="text" name="userid" onChange={(e) => updateFormData('userid',e.target.value)} 
                class="form-control" placeholder="Enter you user id"/>

                <button type="submit" onClick={handleSubmit} className="buttons">Submit</button>
            </form>
            {generatedLink && (
                <div className="link-container">
                    <button onClick={copyToClipboard} className="buttons">
                        Copy to Clipboard
                    </button>
                    </div>
                )}
                </div>
    );
}

export default Form;