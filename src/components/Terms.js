import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Scroll from '../Scroll';
import Loader from "./Loader";

function Terms() {
    const [termsData , setTermsData] = useState();
    const [loader, setloader] = useState(true);
    const ApiUrl = 'https://news.digibyts.com/api';

    useEffect(()=>{
    axios.get(`${ApiUrl}/?method=terms`).then((res)=>{
        setTermsData(res?.data);
        {res?.data && setloader(false)}
    })
    },[])
  return (
    <>
  {loader && <Loader />}
      <Header heading={termsData?.heading}/>
      < Scroll/>
  <div className='Head'>
    <div className='container'>
        <div className='pt-5 pb-5'>
        <p  dangerouslySetInnerHTML={{__html:termsData?.desc}}></p>
        </div>
    </div>
  </div>
    <Footer/>
    </>
  )
}

export default Terms