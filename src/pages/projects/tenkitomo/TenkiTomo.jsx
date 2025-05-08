import React, { useState, useEffect } from 'react'
import ContainerType1 from '../../../component/ContainerType1'
import axios from 'axios'
import * as bootstrap from 'bootstrap'; // // <-- This gives access to bootstrap.Tooltip

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;
const LAT = '35.6895'; // Tokyo
const LON = '139.6917';


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

    const [weatherFeatures, setWeatherFeatures] = useState(DEFAULT_FEATURE)
    const [recommendation, setRecommendation] = useState(null)

    const calculateDewPtFeature = (temperature_c, humidity) => {
        // Magnus formula (simplified version) -> Dont ask I dont know this formula
        const a = 17.27
        const b = 237.7
        const alpha = ((a * temperature_c) / (b + temperature_c)) + Math.log(humidity / 100)
        const dewPoint = (b * alpha) / (a - alpha);
        return dewPoint.toFixed(1)
    }

    const convertWindSpeedKphToMps = (wind_kph) => {
        const windSpeedMps = wind_kph / 3.
        return windSpeedMps.toFixed(1)
    }

    const getWeatherFeature = async () => {
        const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json`,
            {
                params: {
                    key: WEATHER_API_KEY,
                    q: "Tokyo"
                }
            }
        )
        const data = response.data;

        // Calculate dewPoint
        const windSpeedMps = convertWindSpeedKphToMps(data.current.wind_kph)
        const dewPoint = calculateDewPtFeature(data.current.temp_c, data.current.humidity)

        // const features = {
        //     uv_index: data.current.uv,
        //     cloud_cover: data.current.cloud,
        //     humidity: data.current.humidity,
        //     temperature: data.current.temp_c,
        //     dew_point: dewPoint,
        //     wind_speed: windSpeedMps
        // }

        const features = {
            uv_index: 11,
            cloud_cover: 40,
            humidity: data.current.humidity,
            temperature: 11,
            dew_point: dewPoint,
            wind_speed: windSpeedMps
        }

        setWeatherFeatures(features)
        return features
    }

    const handleClickCheckReco = async () => {
        const feature = await getWeatherFeature()
        const response = await axios.post(`${API_URL}/api/proj/tenkitomo/predict`, feature)
        const data = response.data;
        setRecommendation(data)
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
