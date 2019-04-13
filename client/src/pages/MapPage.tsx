import React,{useState, useEffect} from 'react';
import Planet from '../components/planet'
import {Link} from 'react-router-dom'

import Swiper from "react-id-swiper"
import { Navigation } from 'swiper/dist/js/swiper.esm'

import './swiper.css'
import './MapPage.scss'
import homeIcon from '../resource/home-icon.svg'

const MapPage = () => {

    type planet = {
        id?:number,
        type: 'img' | 'text' | 'link'
        content:string,
        level:number
    }

    let [modalState,setModalState] = useState("hidden");
    let [ID, setID] = useState(0)
    let [map, setMap] = useState<planet[]>([])

    useEffect(()=>{
        fetch("/api/getData")
        .then(res => {return res.json()})
        .then(json => {
            setMap(json['planets'])
        })
    },[])


    /**
     * @param id refer to the clicked planet information
     */
    let openModal = (id:number) =>{
        setModalState("open");
        setID(id);
    }
    let closeModal = () => {
        setTimeout(()=>{
            setModalState("hidden");
        },200)
        setModalState("closing")
    }

    const planetsSwiperParams = {
        modules: [Navigation],
        navigation: {
          nextEl: '.swiper-button-next.swiper-button-white',
          prevEl: '.swiper-button-prev.swiper-button-white'
        },
        shouldSwiperUpdate: true 
      }

    return (
        <div id="Page">
            {/* slider */}
            {
                map.length > 0 &&
                <Swiper {...planetsSwiperParams} >{
                        map.map((planet, index) => 
                            <div>
                                <Planet callback={openModal} id={index} key={index} level={planet.level}/>
                            </div> 
                        )
                    }
                </Swiper>
            }

            <Link to="/">
                <div id="backNav">
                    <img src={homeIcon} alt="home icon back to home page"/>
                </div>
            </Link>
            
            {/* modal */}
            <div id="modal" 
                className={modalState==="hidden"?"":modalState}
                onClick={closeModal}>
                <div id="modalContent">
                    {
                        map[ID] == undefined? <div></div>:
                        map[ID].type === 'img'?
                                (
                                    <div>
                                        <img src={'/api/'+map[ID]['content']} alt="key"/>
                                    </div>
                                ):
                        map[ID].type === 'text'?
                                (
                                    <div>
                                        <div>
                                            {map[ID]['content']}
                                        </div>
                                    </div>
                                ):
                        map[ID].type ===  'link'?
                                (
                                    <div>
                                        <a href={map[ID]['content']}>LINK</a>
                                    </div>
                                ):
                        (<div></div>)
                    }
                </div>
            </div>

        </div>
    )
}

export default MapPage;
