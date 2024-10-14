import React from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBRipple
} from 'mdb-react-ui-kit';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { deleteAVideo } from '../services/allAPI';
import { watchVideoHistory } from '../services/allAPI';


function VideoCard({ displayData, setdeleteVideoStatus }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = async () => {
    setShow(true);
    // make an api call
    const { caption, embedLink } = displayData

    //  date and time 
    let today = new Date()
    // console.log(today);
    const timestamp = new Intl.DateTimeFormat('en-us', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(today);
    console.log(timestamp);//11/07/2023, 10:10:10 Am

    let videoDetails = {
      caption,
      embedLink,
      timestamp
    }

    await watchVideoHistory(videoDetails)
  }


  // deleting a video 
  const deleteVideo = async (id) => {
    // make an api call 
    const response = await deleteAVideo(id)
    console.log(response);
    setdeleteVideoStatus(true)
  }


  const dragStarted=(e,id)=>{
    console.log("Drag Started "+id,e);
    e.dataTransfer.setData("videoId",id)
  }


  return (
    <div>
      <MDBCard draggable onDragStart={(e)=>dragStarted(e,displayData?.id)} style={{ width: '350px', height: '500px' }}>
        <MDBRipple onClick={handleShow} rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage style={{ width: '100%', height: '250px' }} src={displayData.url} fluid />
          <a>
            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </a>
        </MDBRipple>
        <MDBCardBody className='d-flex'>
          <MDBCardTitle><h3>{displayData.caption}</h3></MDBCardTitle>
          <p><i onClick={() => deleteVideo(displayData?.id)} className='ms-4 btn fa-solid fa-trash text-danger fs-6'></i></p>
          {/*  onClick={()=>deleteVideo(displayData?.id)} */}


        </MDBCardBody>
      </MDBCard>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{displayData.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe width="100%" height="315" src={displayData.embedLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default VideoCard