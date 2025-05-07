import { assets } from '@/assets/assets'; 
import Image from 'next/image';
import React, { useState } from 'react'; // ✅ Fixed here
import { useClerk, UserButton } from '@clerk/nextjs';
import { useAppContext } from '@/context/AppContext';
import ChatLabel from './ChatLabel';

const Sidebar = ({ expand, setExpand }) => {
  const { openSignIn } = useClerk();
  const { user } = useAppContext();
  const [openMenu, setOpenMenu] = useState({ id: 0, open: false });

  return (
    <div
      className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${
        expand ? 'p-4 w-64' : 'md:w-20 w-0 max-md:overflow-hidden'
      }`}
    >
      <div>
        {/* Logo and Toggle */}
        <div
          className={`flex ${
            expand ? 'flex-row gap-10' : 'flex-col items-center gap-8'
          }`}
        >
          <Image
            className={expand ? 'w-36' : 'w-10'}
            src={expand ? assets.logo_text : assets.logo_icon}
            alt=''
          />

          <div
            onClick={() => setExpand(!expand)}
            className='relative group flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 rounded-lg cursor-pointer'
          >
            <Image src={assets.menu_icon} alt='' className='md:hidden' />
            <Image
              src={expand ? assets.sidebar_close_icon : assets.search_icon}
              alt=''
              className='hidden md:block w-7'
            />
            <div
              className={`absolute w-max ${
                expand
                  ? 'left-1/2 -translate-x-1/2 top-12'
                  : '-top-12 left-0'
              } opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}
            >
              {expand ? 'Close sidebar' : 'Open sidebar'}
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 ${
                  expand
                    ? 'left-1/2 top-1.5 -translate-x-1/2'
                    : 'left-4 -bottom-1.5'
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* New Chat Button */}
        <button
          className={`mt-8 flex items-center justify-center cursor-pointer ${
            expand
              ? 'bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max'
              : 'relative group h-9 w-9 mx-auto hover:bg-gray-500/20 rounded-lg'
          }`}
        >
          <Image
            className={expand ? 'w-6' : 'w-7'}
            src={expand ? assets.chat_icon : assets.chat_icon_dull}
            alt=''
          />
          {!expand && (
            <div className='absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none'>
              New Chat
              <div className='w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5'></div>
            </div>
          )}
          {expand && <p className='text-white font-medium'>New Chat</p>}
        </button>

        {/* Recent Section */}
        <div className={`mt-8 text-white/25 text-sm ${expand ? 'block' : 'hidden'}`}>
          <p className='my-1'>Recent</p>
          <ChatLabel openMenu={openMenu} setOopenMenu={setOpenMenu} />
        </div>
      </div>

      {/* Bottom Get App Section */}
      <div>
        <div
          className={`flex items-center cursor-pointer group relative ${
            expand
              ? 'gap-1 text-white/80 text-sm p-2.5 border border-pink-700 rounded-lg hover:bg-white/10'
              : 'h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg'
          }`}
        >
          <Image
            className={expand ? 'w-5' : 'w-6.5 mx-auto'}
            src={expand ? assets.phone_icon : assets.phone_icon_dull}
            alt=''
          />
          <div
            className={`absolute -top-6 pb-8 ${
              !expand && '-right-40'
            } opacity-0 group-hover:opacity-100 hidden group-hover:block transition`}
          >
            <div className='relative w-max bg-black text-white text-sm p-3 rounded-lg shadow-lg'>
              <Image src={assets.qrcode} alt='' className='w-44' />
              <p>Scan to get DeepSeek App</p>
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 ${
                  expand ? 'right-1/2' : 'left-4'
                } -bottom-1.5`}></div>
            </div>
          </div>
          {expand && (
            <>
              <span>Get App</span>
              <Image alt='' src={assets.new_icon} />
            </>
          )}
        </div>

        {/* Profile or Sign in */}
        <div
          onClick={user ? null : openSignIn}
          className={`flex items-center ${
            expand ? 'hover:bg-white/10 rounded-lg' : 'justify-center w-full'
          } gap-3 text-white/60 text-sm p-2 mt-2 cursor-pointer`}
        >
          {user ? (
            <UserButton />
          ) : (
            <Image src={assets.profile_icon} alt='' className='w-7' />
          )}

          {expand && <span>My Profile</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
