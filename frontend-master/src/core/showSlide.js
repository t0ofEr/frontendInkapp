import React from 'react'
import { API } from '../config'

const ShowSlide = (number) => (

    <div className="d-block w-100" style={{ height: "400px", width: "100%" }}>
        {
            number === "1" ? (
                <img
                    src="https://source.unsplash.com/FhSyMjEMOFs/2000x1200"
                    alt="First slide"
                    className="mb-3"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
            ) : number === "2" ? (
                <img
                    src="https://source.unsplash.com/W2HpZ8FFeHY/2000x1200"
                    alt="First slide"
                    className="mb-3"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
            ) : (
                <img
                    src="https://source.unsplash.com/Visezp_DeTU/2000x1200"
                    alt="First slide"
                    className="mb-3"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
            )
        }

    </div>

)

export default ShowSlide;