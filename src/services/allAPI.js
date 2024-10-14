import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";
 
// 1 upload a video api call - post - reqbody
export const uploadVideo =async(reqBody)=>{
    return await commonAPI("post",`${serverURL}/videos`,reqBody)
} 


// 2 get all video 
export const getAllVideos = async()=>{
    return await commonAPI("get",`${serverURL}/videos`,'')
}


// 3 get a particular video 
export const getAVideo = async (id)=>{
    return await commonAPI("get",`${serverURL}/videos/${id}`,'')
}


// 4 delete a video
export const deleteAVideo = async (id)=>{
    return await commonAPI("delete",`${serverURL}/videos/${id}`,{})
}

// store watching video history to json server
export const watchVideoHistory=async(videoDetails)=>{
    return await commonAPI("post",`${serverURL}/history`,videoDetails)
}


// get video hstory from json server
export const getVideoHistory = async()=>{
     return await commonAPI("get",`${serverURL}/history`,"")
}

// add category
export const addCategory=async(reqBody)=>{
    return await commonAPI("post",`${serverURL}/categories`,reqBody)
}

// getCategory
export const getCategory=async()=>{
    return await commonAPI("get",`${serverURL}/categories`,"")
}

// delete category
export const deleteCategory=async(id)=>{
    return await commonAPI("delete",`${serverURL}/categories/${id}`,{})
}

// update a category 
export const updateCategory=async(id,reqBody)=>{
    return await commonAPI("put",`${serverURL}/categories/${id}`,reqBody)
}