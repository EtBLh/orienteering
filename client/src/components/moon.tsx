import React from 'react';
import {Planets} from '../resource/planet-resouce'

type Prop = {
    location: string;
    time: string
}

export default (props:Prop) => {
    return (
        <div>
            <div className="Moon">
                <img src={Planets[5]} alt="A Moon"/>
                <h2>{props.location}</h2>
                <span>{props.time}</span>
            </div>  
        </div>
    )
}