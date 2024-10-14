import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { getAllVideos } from '../services/allAPI'
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

function View({uploadVideoServerResponse}) {

  const [allVideos,setAllVideos]=useState()


  const [deleteVideoStatus,setdeleteVideoStatus]=useState(false)


  const getVideo=async()=>{
    // make api call
    const {data} = await getAllVideos()
    console.log(data);
    setAllVideos(data)
  }

  console.log(allVideos);

  useEffect(()=>{
    getVideo()
    setdeleteVideoStatus(false)
  },[uploadVideoServerResponse,deleteVideoStatus])

  return (
    <>
    <Row>
     {
      allVideos?.length>0? allVideos?.map((item)=>(
        <Col sm={12} md={6} lg={4} xl={6}>
         <VideoCard displayData={item} setdeleteVideoStatus={setdeleteVideoStatus}/>
         </Col>
      )):"Nothing to display"
    }
    </Row>
     
  </>
  )
}

export default View