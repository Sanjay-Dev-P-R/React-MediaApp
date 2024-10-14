import React from 'react'
import { Row } from 'react-bootstrap';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import { MDBInput } from 'mdb-react-ui-kit';
import { uploadVideo } from '../services/allAPI';



function Add({setUploadVideoServerResponse}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // to hold video details
  const [video, setVideo] = useState({
    id:"",
    caption:"",
    url:"",
    embedLink:""
  })
   
  console.log(video);

  // const getEmbedLink=(e)=>{
  //   const {value}=e.target
  //   if(value){
  //     console.log(value.slice(-31));
  //     const link=`https://www.youtube.com/embed/${value.slice(-31)}`
  //   }
  //   else{

  //   }
  // }
  const getEmbedLink = (e) => {
    const { value } = e.target
    if (value) {
      console.log(value.slice(-31));
      const link = `https://www.youtube.com/embed/${value.slice(-31)}`
      setVideo({ ...video, embedLink: link })
    }
    else{
      setVideo({...video,embedLink:""})
    }
  }


  const handleAdd=async()=>{
    const {id,caption,url,embedLink}=video
    if(!id||!caption||!url||!embedLink){
      alert("Please enter valid details")
    }
    else{
      // make an api call to add video details
      const response = await uploadVideo(video)
      console.log(response);
      if(response.status>=200 && response.status<=300){
        setUploadVideoServerResponse(response.data)
        alert(`${response.data.caption} Added Successfully`)
        handleClose()
      }
      else{
        alert("Please enter a valid ID")
      }
    }
  }


  return (
    <div>
      <Row>
        <Col xl={6} className='d-flex m-1'>
          <h2>Upload Video</h2>
          <MDBBtn onClick={handleShow} className='btn mx-4' ><i className="fa-solid fa-upload"></i></MDBBtn>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Video</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <MDBInput onChange={(e)=>setVideo({...video,id:e.target.value})} label='Video id' id='formControlLg' type='text' size='lg' />
              <br />
              <MDBInput onChange={(e)=>setVideo({...video,caption:e.target.value})} label='Video Caption' id='formControlLg' type='text' size='lg' />
              <br />
              <MDBInput onChange={(e)=>setVideo({...video,url:e.target.value})} label='Video image url' id='formControlLg' type='text' size='lg' />
              <br />
              <MDBInput onChange={getEmbedLink} label='Youtube Video Link' id='formControlLg' type='text' size='lg' />
              <br />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handleAdd} variant="primary">Add</Button>
            </Modal.Footer>
          </Modal>

        </Col>
      </Row>
    </div>
  )
}

export default Add