import { createContext, useState} from "react";
import axios from "axios";
import { SignedIn, useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

export const AppContext = createContext();

const AppContextProvider = (props) => {

    

    const [credit,setCredit]=useState(false);
    const [image,setImage]=useState(false);
    const [resultImage, setResultImage] = useState(null);

    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const navigate=useNavigate()

    const { getToken } = useAuth();
    const { isSignedIn } = useUser()
    const {openSignIn}=useClerk();
    
    const loadCreditsData= async()=>{
        try {
            const token = await getToken();
            const { data } = await axios.get(backendUrl+'/api/user/credits',{headers: {
            Authorization: `Bearer ${token}`,
            }});
            if(data.success){
                setCredit(data.credits)

            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const removeBg = async (image) => {
    try {
        if (!image) return;

        // Validate file type
        if (!image.type.startsWith("image/")) {
            toast.error("Please select a valid image file.");
            return;
        }

        if (!isSignedIn) {
            return openSignIn();
        }

        setImage(image);
        setResultImage(false);

        // Show loading screen immediately
        navigate("/result");

        const token = await getToken();

        const formData = new FormData();
        formData.append("image", image);

        const { data } = await axios.post(
            backendUrl + "/api/image/remove-bg",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Success
        setResultImage(data.image);
        setCredit(data.credits);

    } catch (error) {

        console.log(error);

        const message = error.response?.data?.message || error.message;

        toast.error(message);

        // User has no credits
        if (message === "No credits left") {
            navigate("/buy", { replace: true });
            return;
        }
        // Any other error
        else {
            navigate("/");
        }
    }
};

    const value = {
        credit,setCredit,loadCreditsData,backendUrl,image,setImage,removeBg,resultImage,setResultImage
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
