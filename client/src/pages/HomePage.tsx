import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import Swiper from 'react-id-swiper'
import ufo from '../resource/ufo.svg'

import './HomePage.scss'
import Moon from '../components/moon'
import {Planets} from '../resource/planet-resouce'
import PasscodeForm from '../components/passcodeForm'


export default () => {

    let [cp, setCP] = useState([])

    useEffect(()=>{
        fetch("/api/getData")
        .then(res => {return res.json()})
        .then(json => {
            setCP(json['checkpoint'])
        })
    },[])

    return (
        <div id="Page">
            <div id="MainPlanet">
                <img src={Planets[0]} alt="A Planet"/>
            </div> 

            <div className="ufoContainer">
                <Link to="/map">
                    <div id="ufo">
                        <img src={ufo} alt="a ufo"/>
                    </div>
                </Link>
            </div>

            <div id="cpViewer">
            {
                cp.length > 0 &&
                <Swiper>
                    {
                        cp.map((value, index) => 
                            <div>
                                <Moon location={value["location"]} time={value["time"]} key={index} />
                            </div>
                        ).concat(
                            <div>
                                <PasscodeForm/>
                            </div>
                        )
                    }
                </Swiper>
            }
            </div>
        </div>
    )
}