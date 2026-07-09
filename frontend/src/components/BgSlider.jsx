import { useState } from "react"
import { assets } from "../assets/assets"
const BgSlider = () => {

    const [sliderPosition,setSliderPosition]=useState(50)

    const handleSliderChange=(e)=>{
        setSliderPosition(e.target.value)
    }

  return (
    <div className="pb-10 md:py-20 mx-2 bg-slate-50 border-y border-slate-100">

        <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-teal-700 pt-14 mb-3">Side by side</p>
        <h1 className="mb-12 sm:mb-16 text-center text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900">Drag the line to compare</h1>

        <div className="relative w-full max-w-3xl mx-auto">

            <span className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-teal-600 z-10"></span>
            <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-teal-600 z-10"></span>

            <p className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest bg-slate-900 text-white px-2 py-1 z-10">original</p>
            <p className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest bg-teal-600 text-white px-2 py-1 z-10">removed</p>

            <div className="relative w-full overflow-hidden bg-white border border-slate-200">

                <img src={assets.image_w_bg} style={{clipPath:`inset(0 ${100.2-sliderPosition}% 0 0)`}} alt="" />

                <img className="absolute top-0 left-0 w-full h-full" src={assets.image_wo_bg} style={{clipPath:`inset(0 0 0 ${sliderPosition}%)`}} alt="" />

                <input className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider" type="range" min={0} max={100} value={sliderPosition} onChange={handleSliderChange} />

            </div>

        </div>




    </div>
  )
}

export default BgSlider
