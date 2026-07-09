
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='bg-slate-900 border-t border-slate-800'>
      <div className='flex items-center justify-between gap-4 px-4 lg:px-44 py-6'>

          <img className='w-[130px] h-auto opacity-90 object-contain' src={assets.logo} alt="BgDrop Logo" />
          <p className='flex-1 border-l border-slate-700 pl-4 text-xs font-mono uppercase tracking-widest text-slate-500 max-sm:hidden'>© 2026 Background Remover</p>
          <div className='flex gap-3'>
              <img className='w-8 opacity-60 hover:opacity-100 transition-opacity duration-200' src={assets.facebook_icon} alt="" />
              <img className='w-8 opacity-60 hover:opacity-100 transition-opacity duration-200' src={assets.twitter_icon} alt="" />
              <img className='w-8 opacity-60 hover:opacity-100 transition-opacity duration-200' src={assets.google_plus_icon} alt="" />
          </div>

      </div>
    </div>
  )
}

export default Footer
