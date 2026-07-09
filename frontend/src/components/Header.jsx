import { useContext } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext"


const Header = () => {

    const {removeBg}=useContext(AppContext)

  return (
    <div className="grid sm:grid-cols-2 gap-y-12 px-4 mt-12 lg:mx-40 sm:mt-16 items-center">

        <div className="order-2 sm:order-1">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-teal-700 mb-4">Image tool · Free to start</p>
            <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-slate-900 leading-[1.05]">Cut the<br/><span className="relative inline-block">background
                <span className="absolute left-0 -bottom-1 w-full h-[6px] bg-teal-400/70"></span>
            </span><br/>keep the subject.</h1>
            <p className="my-6 text-[15px] text-slate-500 max-w-md">Drop in a photo and get a clean, transparent cut-out in seconds — no manual masking, no design software required.</p>
            <div>
                <input onChange={e=>removeBg(e.target.files[0])} type="file" accept="image/*" id="upload1" hidden/>
                <label className="inline-flex items-center gap-3 px-7 py-3.5 cursor-pointer bg-slate-900 hover:bg-teal-700 transition-colors duration-200" htmlFor="upload1">
                    <img className="invert" width={18} src={assets.upload_btn_icon} alt="" />
                    <p className="text-white text-sm font-medium tracking-wide">Upload an image</p>
                </label>
            </div>
        </div>

        <div className="order-1 sm:order-2 relative w-full max-w-md justify-self-center">
            <span className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-teal-600"></span>
            <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-teal-600"></span>
            <div className="border border-slate-200 p-2 bg-white">
                <img src={assets.header_img} alt="" />
            </div>
            <p className="absolute -bottom-6 right-2 font-mono text-[10px] uppercase tracking-widest text-slate-400">preview</p>
        </div>

    </div>
  )
}

export default Header
