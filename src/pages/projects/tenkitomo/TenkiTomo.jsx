import React, { useState, useEffect } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import "./style/style.css"
import ContainerType1 from '../../../component/ContainerType1'
import TenkiTomoIcon from './assets/TenkiTomoIcon.png'
import axios from 'axios'
import * as bootstrap from 'bootstrap'; // // <-- This gives access to bootstrap.Tooltip

const API_URL = process.env.REACT_APP_API_URL;

const DEFAULT_FEATURE = {
    uv_index: 0,
    cloud_cover: 0,
    humidity: 0,
    temperature: 0,
    dew_point: 0,
    wind_speed: 0
}

const weatherMeta = {
    temperature: {
        label: 'Temp.:',
        unit: '°C',
        tooltip: 'Higher temperatures help clothes dry faster by speeding up evaporation.'
    },
    humidity: {
        label: 'Humidity:',
        unit: '%',
        tooltip: 'High humidity slows down drying since the air holds more moisture.'
    },
    uv_index: {
        label: 'UV Index:',
        unit: '',
        tooltip: 'Strong sunlight helps dry clothes faster and can also kill germs.'
    },
    cloud_cover: {
        label: 'Cloud Cover:',
        unit: '%',
        tooltip: 'Cloudy skies reduce sunlight, making clothes dry slower.'
    },
    wind_speed: {
        label: 'Wind Spd.:',
        unit: 'm/s',
        tooltip: 'A good breeze can help carry away moisture, speeding up drying.'
    },
    dew_point: {
        label: 'Dew Pt.:',
        unit: '°C',
        tooltip: 'When the dew point is close to the air temperature, drying becomes slower.'
    }
};


function TenkiTomo() {
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
        return () => {
            tooltipList.forEach(tooltip => tooltip.dispose());
        };

    }, []);



    const keys = Object.keys(weatherMeta);
    const [logme, setLogme] = useState("???")
    const [weatherFeatures, setWeatherFeatures] = useState(DEFAULT_FEATURE)
    const [recommendation, setRecommendation] = useState(null)

    const getUserLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject("Geolocation not supported")
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords
                        resolve({ latitude, longitude })
                    },
                    () => {
                        reject("Unable to retrieve your location")
                    }
                )
            }
        })
    }

    const handleClickCheckReco = async () => {
        const location = await getUserLocation()
        const response = await axios.post(`${API_URL}/api/proj/tenkitomo/predict`, location)

        setLogme(`${location.latitude.toFixed(1)}, ${location.longitude.toFixed(1)}`)
        setWeatherFeatures(response.data.weather_feature)
        setRecommendation(response.data)
        return 0
    }

    const dispRecommendation = () => {
        if (recommendation) {
            if (recommendation.recommendation) {
                return (
                    <div>
                        <p className='text-success'>
                            <Typewriter
                                words={["Yes, do your laundry!"]}
                                loop={1} cursor cursorStyle='_' ypeSpeed={100}
                            ></Typewriter>
                        </p>
                    </div>
                )
            } else {
                return (
                    <div>
                        <p className='text-danger'>
                            <Typewriter
                                words={["Not a good time."]}
                                loop={1} cursor cursorStyle='_' ypeSpeed={100}
                            ></Typewriter>
                        </p>
                    </div>
                )
            }
        } else {
            return (
                <div>
                    <p className='text-danger'>-</p>
                </div>
            )
        }
    }




    return (
        <div>
            <ContainerType1 className='d-lg-block d-none'>
                <h1>TenkiTomo AI</h1>
            </ContainerType1>

            <ContainerType1 style={{ fontFamily: "zx-spectrum" }}>
                <div className='container col-lg-6'>
                    <div className='row g-2'>
                        <div className='col-3 d-flex'>
                            <div className='border border-2 border-black rounded-4 bg-dark-subtle flex-fill'>
                                <img src={TenkiTomoIcon} alt="TenkiTomoIcon" className='bounce-retro-tenkitomo w-100' />
                            </div>
                        </div>
                        <div className='col-9 d-flex'>
                            <div className='border border-2 border-black rounded-4 bg-dark-subtle p-3 flex-fill'>
                                <p className='m-0'>
                                    Loc. :
                                </p>
                                <p className='m-0'>
                                    @
                                    <Typewriter
                                        key={logme} // forces re-mount on change
                                        words={[logme]} loop={1}
                                        typeSpeed={100}
                                    ></Typewriter>
                                </p>
                            </div>
                        </div>

                        <div className='col-12'>
                            <div className='border border-2 border-black rounded-4 bg-dark-subtle p-3'>

                                {keys.map((key, index) => (
                                    <p key={key} data-bs-toggle="tooltip" data-bs-placement="right"
                                        data-bs-custom-class="custom-tooltip"
                                        data-bs-title={weatherMeta[key].tooltip}>
                                        {weatherMeta[key].label}{weatherFeatures[key]}{weatherMeta[key].unit}
                                    </p>
                                ))}
                                <p>
                                    {recommendation ? `Drying Time: ${recommendation.drying_time_hours}hrs` : "-"}
                                </p>
                                {dispRecommendation()}
                            </div>
                        </div>

                        <div className='col-12'>
                            <button onClick={() => handleClickCheckReco()} className='btn btn-light border border-2 border-black rounded-4 w-100'>
                                Ask TenkiTomo
                            </button>
                        </div>
                    </div>

                </div>
            </ContainerType1>
        </div>
    )
}

export default TenkiTomo
