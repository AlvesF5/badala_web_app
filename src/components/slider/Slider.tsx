import Image from "next/image"
import brega from "../../images/sliderhome/brega.jpg"
import safadao from "../../images/sliderhome/safadao.jpg"
import tico from "../../images/sliderhome/tico-a.jpg"
import { FaLocationDot } from "react-icons/fa6";

import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

export default function Slider() {
    return (
        <div className="w-full h-screen md:flex md:flex-wrap-reverse md:p-10 overflow-hidden">
            <div className="slider-box">
                <div id="slide-text">
                    <div className="desc">
                        <div className="desc-item">
                            <div className="name"><h1 className="slide-title">Brega Light</h1></div>
                            <div className=" flex flex-row items-center gap-1">
                                <span><FaLocationDot className=" w-4"/></span>
                                <div className="des"><h4>28/06/2024 Fazenda Eldorado - Ibicuí-Ba</h4></div>
                            </div>
                            <button className="button-balada-green">Ver ingressos</button>
                        </div>
                    </div>
                    <div className="desc">
                        <div className="desc-item">
                            <div className="name"><h1 className="slide-title">TBT do Safadão</h1></div>
                            <div className=" flex flex-row items-center gap-1">
                                <span><FaLocationDot className=" w-4"/></span>
                                <div className="des"><h4>28/12/2024 Arena Axé moí - Porto Seguro-Ba</h4></div>
                            </div>
                            <button className="button-balada-green">Ver ingressos</button>
                        </div>
                    </div>
                    <div className="desc">
                        <div className="desc-item">
                            <div className="name"><h1 className="slide-title">Ticomia #23</h1></div>
                            <div className=" flex flex-row items-center gap-1">
                                <span><FaLocationDot className=" w-4"/></span>
                                <div className="des"><h4>03/07/2024 Fazenda Eldorado - Ibicuí-Ba</h4></div>
                            </div>
                            <button className="button-balada-green">Ver ingressos</button>
                        </div>
                    </div>
                    <div className="desc">
                        <div className="desc-item">
                            <div className="name"><h1 className="slide-title">Baile da Santinha</h1></div>
                            <div className="des"><h4>Local e data do evento 4</h4></div>
                            <button className="button-balada-green">Ver ingressos</button>
                        </div>
                    </div>
                    <div className="desc">
                        <div className="desc-item">
                            <div className="name"><h1 className="slide-title">Baile da Santinha</h1></div>
                            <div className="des"><h4>Local e data do evento 5</h4></div>
                            <button className="button-balada-green">Ver ingressos</button>
                        </div>
                    </div>
                    <div className="desc">
                        <div className="desc-item">
                            <div className="name"><h1 className="slide-title">Ticomia #23</h1></div>
                            <div className="des"><h4>Local e data do evento 6</h4></div>
                            <button className="button-balada-green">Ver ingressos</button>
                        </div>
                    </div>
                </div>

                <div className="container-slide">

                    <div id="slide">
                        <div className="item">
                            <Image src={brega} fill alt="" className="-z-10 rounded-[30px] overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out" />
                        </div>

                        <div className="item">
                            <Image src={safadao} fill alt="" className="-z-10 rounded-[30px] overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out" />
                        </div>

                        <div className="item">
                            <Image src={tico} fill alt="" className=" -z-10 rounded-[30px] overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out" />
                        </div>

                        <div className="item">
                            <Image src={brega} fill alt="" className=" -z-10 rounded-[30px] overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out" />
                        </div>
                        <div className="item">
                            <Image src={brega} fill alt="" className=" -z-10 rounded-[30px] overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out" />
                        </div>
                        <div className="item">
                            <Image src={brega} fill alt="" className=" -z-10 rounded-[30px] overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out" />
                        </div>
                    </div>

                </div>
                <div className="buttons">
                    <button id="prev"><FaArrowLeft /></button>
                    <button id="next"><FaArrowRight /></button>
                </div>
            </div>
        </div>
    )
}