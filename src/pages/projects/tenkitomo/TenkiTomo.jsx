import React, { useState, useEffect } from 'react'
import ContainerType1 from '../../../component/ContainerType1'
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

function TenkiTomo() {
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
        return () => {
            tooltipList.forEach(tooltip => tooltip.dispose());
        };

    }, []);
    const [logme, setLogme] = useState("---")
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
        setWeatherFeatures(response.data.weather_feature)
        setRecommendation(response.data)
        return 0
    }

    const dispRecommendation = () => {
        if (recommendation) {
            if (recommendation.recommendation) {
                return (
                    <div>
                        <p className='text-success'>Yes, do your laundry!<i className="bi bi-sun-fill ms-2"></i> </p>
                        <p>Drying Time: {recommendation.drying_time_hours}hrs</p>
                    </div>
                )
            } else {
                return (
                    <div>
                        <p className='text-danger'>Not a good time.<i className="bi bi-cloud-rain-fill ms-2"></i></p>
                        <p>Drying Time: {recommendation.drying_time_hours}hrs</p>
                    </div>
                )
            }
        } else {
            return (
                <div>
                    <p className='text-danger'>-</p>
                    <p>-</p>
                </div>
            )
        }
    }

    return (
        <div>
            <ContainerType1 className='d-lg-block d-none'>
                <h1>Tenki Tomo 天気友</h1>
            </ContainerType1>

            <ContainerType1 style={{ fontFamily: "zx-spectrum" }}>
                <div className='container col-lg-6'>
                    <div className='row mb-2'>
                        <div className='col-12'>
                            <div className='border border-2 border-black rounded-4 bg-dark-subtle p-3'>
                                <p className=''>{logme}</p>
                            </div>
                        </div>
                    </div>

                    <div className='row mb-2'>
                        <div className='col-12'>
                            <div className='border border-2 border-black rounded-4 bg-dark-subtle p-3'>
                                <p data-bs-toggle="tooltip" data-bs-placement="right"
                                    data-bs-custom-class="custom-tooltip"
                                    data-bs-title="Higher temperatures help clothes dry faster by speeding up evaporation.">
                                    Temp. : {weatherFeatures.temperature}°C
                                </p>
                                <p data-bs-toggle="tooltip" data-bs-placement="right"
                                    data-bs-custom-class="custom-tooltip"
                                    data-bs-title="High humidity slows down drying since the air holds more moisture.">
                                    Humidity : {weatherFeatures.humidity}%
                                </p>
                                <p data-bs-toggle="tooltip" data-bs-placement="right"
                                    data-bs-custom-class="custom-tooltip"
                                    data-bs-title="Strong sunlight helps dry clothes faster and can also kill germs.">
                                    UV Index : {weatherFeatures.uv_index}
                                </p>
                                <p data-bs-toggle="tooltip" data-bs-placement="right"
                                    data-bs-custom-class="custom-tooltip"
                                    data-bs-title="Cloudy skies reduce sunlight, making clothes dry slower.">
                                    Cloud Cover : {weatherFeatures.cloud_cover}%
                                </p>
                                <p data-bs-toggle="tooltip" data-bs-placement="right"
                                    data-bs-custom-class="custom-tooltip"
                                    data-bs-title="A good breeze can help carry away moisture, speeding up drying.">
                                    Wind Spd. : {weatherFeatures.wind_speed}kph
                                </p>
                                <p data-bs-toggle="tooltip" data-bs-placement="right"
                                    data-bs-custom-class="custom-tooltip"
                                    data-bs-title="When the dew point is close to the air temperature, drying becomes slower.">
                                    Dew Pt. : {weatherFeatures.dew_point}°C
                                </p>
                                {dispRecommendation()}
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-12'>
                            <button onClick={() => handleClickCheckReco()} className='btn btn-light border border-2 border-black rounded-4 w-100'>
                                Is It a Good Laundry Day? 🤔
                            </button>
                        </div>
                    </div>

                </div>
            </ContainerType1>
        </div>
    )
}

export default TenkiTomo
