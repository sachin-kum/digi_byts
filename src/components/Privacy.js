import React,{useEffect,useState} from 'react'
import Header from './Header'
import Footer from './Footer';
import Scroll from '../Scroll';
import Loader from "./Loader";
import axios from 'axios';

function Privacy() {
const [privacyData , setPrivacyData] = useState();
const [loader, setloader] = useState(true);
const ApiUrl = 'https://news.digibyts.com/api';
    useEffect(()=>{
    axios.get(`${ApiUrl}/?method=privacy`).then((res)=>{
        setPrivacyData(res?.data);
        {res?.data && setloader(false)}
    })
    },[])

  return (
    <>
          {loader && <Loader />}
  <Header heading={privacyData?.heading}/>
  < Scroll/>
  <div className='Head'>
    <div className='container'>
        <div className='pt-5 pb-5'>
        <p  dangerouslySetInnerHTML={{__html:privacyData?.desc}}></p>
        </div>
    </div>
  </div>
  <Footer/>
    </>
  )
}

export default Privacy