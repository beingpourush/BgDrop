import {assets} from '../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import {useClerk, UserButton, useUser} from '@clerk/clerk-react'
import { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'


const Navbar = () => {

  const {openSignIn}=useClerk()
  const {isSignedIn,user}=useUser()
  const {credit,loadCreditsData}=useContext(AppContext)

  const navigate=useNavigate()

  useEffect(()=>{
    if(isSignedIn){
      loadCreditsData()
    }
  },[isSignedIn])



  return (
    <div className='sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200'>
      <div className='hidden sm:flex items-center justify-center gap-2 bg-slate-900 text-slate-300 text-[11px] font-mono uppercase tracking-[0.2em] py-1.5'>
        <span className='w-1.5 h-1.5 bg-teal-400 rounded-full'></span>
        Precision background removal — no watermark
      </div>
      <div className='flex items-center justify-between mx-4 py-4 lg:mx-44'>
          <Link to='/' className='flex items-center gap-2'>
          <img className='h-12 sm:h-16 -my-2 sm:-my-4 w-auto object-contain' src={assets.logo} alt="BgDrop Logo" />
          </Link>
          {
            isSignedIn
            ?<div className='flex items-center gap-3 sm:gap-4'>
              <button onClick={()=>navigate('/buy')} className='flex items-center gap-2 border border-slate-300 px-3 sm:px-5 py-1.5 sm:py-2 hover:border-teal-600 hover:bg-teal-50 transition-colors duration-200'>
                <img className='w-4' src={assets.credit_icon} alt="" />
                <p className='text-xs sm:text-sm font-mono text-slate-700'>{credit} <span className='text-slate-400'>credits</span></p>
              </button>
              <p className='text-slate-500 text-sm font-mono max-sm:hidden'>{user.fullName}</p>
              <UserButton/>
            </div>
            :<button onClick={()=>openSignIn({})} className='bg-slate-900 text-white flex items-center gap-3 px-5 py-2 sm:px-7 sm:py-2.5 text-sm font-medium tracking-wide hover:bg-teal-700 transition-colors duration-200'>
              Get started <img className='w-3 sm:w-4' src={assets.arrow_icon} alt="" />
              </button>
          }
          
      </div>
    </div>
  )
}

export default Navbar
