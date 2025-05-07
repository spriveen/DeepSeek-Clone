'use client';

import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="flex h-screen">
       <Sidebar expand={expand} setExpand={setExpand}/>
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          
          {/* Mobile Menu */}
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image
              onClick={() => (expand ? setExpand(false) : setExpand(true))}
              className="rotate-180 cursor-pointer"
              src={assets.menu_icon}
              alt="menu icon"
              width={24}
              height={24}
            />
            <Image
              className="opacity-70"
              src={assets.chat_icon}
              alt="chat icon"
              width={24}
              height={24}
            />
          </div>

          {messages.length === 0 ? (
            <>
              <div className="flex items-center gap-3">
                <Image src={assets.logo_icon} alt="" className="h-16 w-16" />
                <p className="text-2xl font-medium">Hi, I'm Deepseek</p>
              </div>
              <p className="text-sm mt-2">How can I help you today?</p>
            </>
          ) : (
            <div>
              <Message role='user' content='What is next js'/>
            </div>
          )
          }
          <PromptBox isLoading={isLoading} setIsLoading={setIsLoading}/>
          <p className="text-xs absolute bottom-1 text-gray-500">AI-generated, for reference only</p>
          
        </div>
      </div>
    </div>
  );
}
