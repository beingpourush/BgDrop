import { assets } from "../assets/assets"

const Steps = () => {
  return (
    <div className="mx-4 lg:mx-40 py-20 xl:py-32 border-t border-slate-100">

        <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-teal-700 mb-3">The process</p>
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900">Three steps, a few seconds</h1>

        <div className="flex flex-col md:flex-row items-stretch gap-0 mt-16 xl:mt-20 max-w-5xl mx-auto border border-slate-200">

            <div className="flex-1 flex flex-col gap-4 p-8 border-b md:border-b-0 md:border-r border-slate-200 relative">
                <span className="font-mono text-4xl text-slate-200">01</span>
                <img className="max-w-9" src={assets.upload_icon} alt="" />
                <div>
                    <p className="text-lg font-semibold text-slate-900">Upload</p>
                    <p className="text-sm text-slate-500 mt-1">Select the image you want to lift the subject out of.</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-4 p-8 border-b md:border-b-0 md:border-r border-slate-200 relative">
                <span className="font-mono text-4xl text-slate-200">02</span>
                <img className="max-w-9" src={assets.remove_bg_icon} alt="" />
                <div>
                    <p className="text-lg font-semibold text-slate-900">Detect &amp; remove</p>
                    <p className="text-sm text-slate-500 mt-1">The model isolates the subject and strips the background automatically.</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-4 p-8 relative">
                <span className="font-mono text-4xl text-slate-200">03</span>
                <img className="max-w-9" src={assets.download_icon} alt="" />
                <div>
                    <p className="text-lg font-semibold text-slate-900">Download</p>
                    <p className="text-sm text-slate-500 mt-1">Grab the transparent PNG, full resolution, ready to use.</p>
                </div>
            </div>

        </div>

    </div>
  )
}

export default Steps
