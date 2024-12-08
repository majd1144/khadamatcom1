import React from 'react';
import './informations.css';
import pic1 from '../../asset/pic1.png'
import pic2 from '../../asset/pic2.png'
import pic3 from '../../asset/pic3.png'
import pic4 from '../../asset/pic4.png'

export default function InforMation(){
    return(
       <div className='container'>
         <p className ="info" >A whole world of freelance talent at your fingertips</p>

         <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-12">
            <div className='pic'> <img src={pic1} alt="" className='pic' /> </div> 
            <p >Over 700 categories</p>
            <p className='paragraph1'>Get results from skilled freelancers 
                from all over the world, for every task,
                 at any price point.</p>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
            <div className='pic '> <img src={pic2} alt="" className='pic hand-pic' /> </div> 
            <p>Clear, transparent pricing</p>
            <p className='paragraph1'>Pay per project or by the hour (Pro).
            Payments only get released when you approve.</p>

            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
            <div className='pic'> <img src={pic3} alt="" className='pic' /> </div> 
            <p>Quality work done faster</p>
            <p className='paragraph1'>Filter to find the right freelancers quickly and get great work delivered in no time, every time.</p>


            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
            <div className='pic'> <img src={pic4} alt="" className='pic' /> </div> 
            <p>24/7 award-winning support</p>
            <p className='paragraph1'>Chat with our team to get your questions answered or resolve any issues with your orders.</p>
            </div>
        </div>
        </div>
    );
}