import { useContext, useEffect } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser, useClerk } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";


const BuyCredit = () => {
  const { isSignedIn } = useUser();
const { openSignIn } = useClerk();

  const {backendUrl,loadCreditsData}=useContext(AppContext)

  const navigate=useNavigate()

  const {getToken}=useAuth()

  const { setImage, setResultImage } = useContext(AppContext);

  const initPay=async(order)=>{
    
    const options={
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Credits Payment',
      description:'Credits Payment',
      order_id:order.id,
      receipt:order.receipt,
      
      handler: async (response) => {

          try {
              const token = await getToken();
              const { data } = await axios.post(
                  backendUrl + "/api/user/verify-razor",
                  {
                      razorpay_order_id: response.razorpay_order_id,
                  },
                  {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  }
              );

              if (data.success) {
                  loadCreditsData();
                  toast.success("Credits Added Successfully");
                  navigate("/");
              } else {
                  toast.error(data.message);
              }

          } 
          
          catch (error) {
              console.log(error);
              toast.error(error.response?.data?.message || error.message);
          }

      }
    }

    const rzp=new window.Razorpay(options)
    rzp.open()
  }


  const paymentRazorpay=async(planId)=>{

    if (!isSignedIn) {
        toast.info("Please login to continue.");
        openSignIn();
        return;
    }


    try {

      const token=await getToken();
      const {data}=await axios.post(backendUrl+'/api/user/pay-razor',{planId},{headers:{Authorization: `Bearer ${token}`}})

      if(data.success){
        initPay(data.order)
      }


    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  useEffect(() => {
    setImage(null);
    setResultImage(null);
  }, []);

  return (
    <div className="min-h-[80vh] text-center pt-16 mb-10 px-4">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-teal-700 mb-3">Pricing</p>

      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900 mb-10 sm:mb-14">
        Pick a credit pack
      </h1>

      <div className="flex flex-wrap justify-center gap-0 text-left max-w-5xl mx-auto border border-slate-200 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
        {plans.map((item, index) => (
          <div
            key={index}
            className="flex-1 min-w-[240px] py-12 px-8 text-slate-700 hover:bg-slate-50 transition-colors duration-200"
          >
            <p className="font-mono text-xs text-slate-400 mb-4">PLAN_{String(index+1).padStart(2,'0')}</p>
            <img width={36} src={assets.logo_icon} alt="" />
            <p className="mt-4 font-semibold text-slate-900">{item.id}</p>
      

            <p className="mt-6">
              <span className="text-3xl font-mono font-medium text-slate-900">₹{item.price}</span> <span className="text-slate-400 text-sm">/ {item.credits} credits</span>
            </p>

            <button onClick={()=>paymentRazorpay(item.id)} className="w-full border border-slate-900 text-slate-900 mt-8 text-sm font-medium py-2.5 min-w-52 hover:bg-slate-900 hover:text-white transition-colors duration-200">
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
