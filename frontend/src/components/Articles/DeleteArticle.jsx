import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const DeleteArticle = () => {
    const {articleId}=useParams();
    const navigate=useNavigate();

    const [error,setError]=useState('')
    const axiosInstance=axios.create({
        withCredentials:true
    })
    useEffect(()=>{
        const deleteArtilce=async ()=>{
            axiosInstance.delete(`http://localhost:8000/articles`,{data:{id:articleId}}).then(
                res=>{//TODO error handling
                    if( res.status==204){
                        console.log(res.data);
                        navigate('/');
                    }
                   
                }
            ).catch(err=>{
                setError(err.response.data.msg)
            })

            
        }
        deleteArtilce();
    },[])
    
  return (
    <div className='text-danger'>{error}</div>
  )
}
