import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate,Navigate } from "react-router-dom";
const Result = () => {
  const { resultImage, image, removeBg } = useContext(AppContext);
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

if (!image) {
    return <Navigate to="/" replace />;
}
  return (
    <div className="mx-4 my-8 lg:mx-40 min-h-[75vh]">
      <div className="border border-slate-200 px-6 py-8 sm:px-10 sm:py-10">
        <div className="flex flex-col sm:grid grid-cols-2 gap-10">
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-2">01 / original</p>
            <span className="absolute top-8 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-300"></span>
            <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-300"></span>
            <img
              className="border border-slate-200 p-1"
              src={image ? URL.createObjectURL(image) : ""}
              alt=""
            />
          </div>

          <div className="flex flex-col relative">
            <p className="font-mono text-[10px] uppercase tracking-widest text-teal-700 mb-2">
              02 / background removed
            </p>
            <span className="absolute top-8 left-0 w-4 h-4 border-t-2 border-l-2 border-teal-500 z-10"></span>
            <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-teal-500 z-10"></span>
            <div className="border border-slate-200 p-1 h-full relative bg-layer overflow-hidden">
              <img src={resultImage ? resultImage : ""} alt="" />
              {!resultImage && image && (
                <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                  <div className="border-4 border-b-teal-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {resultImage && (
          <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-8">
            <input
              type="file"
              accept="image/*"
              id="upload-result"
              hidden
              onChange={(e) =>{
                removeBg(e.target.files[0])
              }}
            />

            <label
              htmlFor="upload-result"
              className="px-7 py-2.5 text-slate-700 text-sm font-medium border border-slate-300 hover:border-slate-900 transition-colors duration-200 cursor-pointer"
            >
              Try another image
            </label>

            <a href={resultImage} download className="px-7 py-2.5 text-white text-sm font-medium bg-slate-900 hover:bg-teal-700 transition-colors duration-200">
              Download image
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
