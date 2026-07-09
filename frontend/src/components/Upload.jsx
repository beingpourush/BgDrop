import { useContext } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext"

const Upload = () => {

  const {removeBg}=useContext(AppContext)

  return (
    <div className="bg-slate-900 py-20 md:py-28 mt-4">

        <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-teal-400 mb-3">Ready when you are</p>
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold text-white">Try it on your own image</h1>

        <div className="text-center mt-10">
            <input onChange={e=>removeBg(e.target.files[0])} type="file" accept="image/*" id="upload2" hidden/>
            <label className="inline-flex items-center gap-3 px-8 py-3.5 cursor-pointer bg-teal-500 hover:bg-teal-400 transition-colors duration-200" htmlFor="upload2">
                <img width={20} src={assets.upload_btn_icon} alt="" />
                <p className="text-slate-900 text-sm font-semibold tracking-wide">Upload your image</p>
            </label>
        </div>

    </div>
  )
}

export default Upload
