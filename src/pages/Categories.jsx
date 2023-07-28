import React , {useState,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {motion} from "framer-motion";
function Categories() {
  const [categories , setCategories] = useState([]);
  const [input , setInput] = useState("");

  useEffect(()=>{
    fetch(`http://localhost:7000/categories`)
    .then(res => res.json())
    .then(data => setCategories(data))
  })
  const handleSubmit = (e) =>{
    e.preventDefault();
    let data = {  
        name : input
    }
    fetch(`http://localhost:7000/categories` , {
        method : "POST",
        headers : {
            "Content-Type" : "Application/json"
        },
        body : JSON.stringify(data)
    })
    .then((res) => {
        if(res.status === 201){
            toast.info('Category successfully added!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return res.json()
        }
    })
    .then((a) => setCategories([...categories , a]))
    .catch(console.log("error"))
    setInput('');
  }

  const deleteItem = (id) => {
    fetch(`http://localhost:7000/categories/${id}`, {
        method : "DELETE"
    })
    .then((res) => {
        if(res.status === 200){
            toast.info('Category successfully deleted!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            setCategories(categories.filter(e => e.id !== id))
        }
    })
  }

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }
  return (
    <>
        <motion.div variants={container} initial="hidden"
        animate="visible" className="container">
            <ToastContainer/>
            <motion.div variants={item} className="col-12 mt-2 header">
                <h2 className='text-white'>Kateqoriya əlavə et</h2>
            </motion.div>
            <motion.div variants={item} className="col-12 mt-4 mb-2">
                <form onSubmit={(e)=> handleSubmit(e)} action="" >
                    <div className='row'>
                        <div className="col-10">
                            <input className='form-control bg-dark text-white border border-dark p-2 w-100' type="text" placeholder='Kateqoriya əlavə et' name='category' onChange={(e)=> setInput(e.target.value)} />
                        </div>
                        <div className="col-2">
                            <button className='btn btn-primary p-2'>Əlavə et</button>
                        </div>
                    </div>
                </form>
                <table className='table table-dark table-hover table-striped shadow-lg mt-4'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Satış növü</th>
                            <th>Əməliyyat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((index,key) => (
                                <tr key={key}>
                                    <td className='col-2'>{key + 1}</td>
                                    <td className='col-8'>{index.name}</td>
                                    <td className='col-2'>
                                            <div className="btn btn-danger" onClick={()=>deleteItem(index?.id)}>Delete</div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </motion.div>
        </motion.div>
    </>
  )
}

export default Categories