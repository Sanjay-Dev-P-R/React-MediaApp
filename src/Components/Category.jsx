import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { addCategory, deleteCategory, getAVideo, getCategory, updateCategory } from '../services/allAPI';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import VideoCard from './VideoCard';



function Category() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categoryName,setCategoryName]=useState('')// to hold category name 

  const [categoryData,setCategoryData]=useState([])//to hold category data

  console.log(categoryName);

  const handleCategory=async()=>{
    if(categoryName){
      // make an api call
      const reqBody={
        categoryName
      }
      const response = await addCategory(reqBody)
      console.log(response);
      alert("category Added successfully")
      handleClose()
      setCategoryName("")//state le eppolum oru value kedakkum 
      getCategoryVideos()
    }
    else{
      alert("Please provide a category name")

    }
  }

  const getCategoryVideos=async()=>{
    // make an api call
    const {data}=await getCategory()
    console.log(data);
    setCategoryData(data)
   }

   const handleDelete=async(id)=>{
    await deleteCategory(id)
    getCategoryVideos()
   }



   console.log(categoryData);

   useEffect(()=>{
    getCategoryVideos()
   },[]);

   
   const dragOver=(e)=>{
    console.log("Drag Over");
    e.preventDefault()
   }


   const videoDrop=async(e,categoryId)=>{
    console.log("Video dropped at "+categoryId);
    const videoId = e.dataTransfer.getData("videoId")
    console.log("VideoCardId: "+videoId);
    // api call for particular video 
    const {data} = await getAVideo(videoId)
    console.log(data);
    // get category details
    const selectedCategory = categoryData?.find(item=>item.id==categoryId)
    console.log(selectedCategory);
    // video details push to allVideo array in json
    selectedCategory.allVideos.push(data)
    // make an api call to update details 
    await updateCategory(categoryId,selectedCategory)
    getCategoryVideos()


   }



  return (
    <div className='text-center'>
      <button onClick={handleShow} className='btn btn-primary' > Add Category</button>
      <div>
        {
          categoryData.length>0?categoryData.map((item)=>(
            <div droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item.id)} className='container border border-1 m-4'>
              <div className='d-flex justify-content-between p-3'>
                <h5>{item.categoryName}</h5>
                <button onClick={()=>handleDelete(item.id)} className='btn'>
                  <i className='fa-solid fa-trash text-danger'></i>
                </button>
              </div>
              <Row>
                {
                  item.allVideos.map((data)=>{
                    <Col>
                    <VideoCard displayData={data}/>
                    </Col>
                    
                  })
                }
              </Row>

            </div>
          )):"No category selected"
        }
      </div>
      <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
    <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {/* <MDBInput label='Category Id' id='formControlLg' type='text' size='lg' /> */}
      <br />
      <MDBInput onChange={(e)=>setCategoryName(e.target.value)} label='Category Name' id='formControlLg' type='text' size='lg' />
      <br />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button onClick={(e)=>handleCategory()} variant="primary">Add</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default Category