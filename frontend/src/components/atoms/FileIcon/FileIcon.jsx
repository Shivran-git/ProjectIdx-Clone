import React from 'react'
import { FaJsSquare } from "react-icons/fa";
import { BsFiletypeJson } from "react-icons/bs";
import { RiReactjsFill } from "react-icons/ri";
import { IoLogoHtml5 } from "react-icons/io";
import { MdOutlineCss } from "react-icons/md";
import { FaGitAlt } from "react-icons/fa";
import { FaReadme } from "react-icons/fa";



import { BsFiletypeSvg } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { FaFileVideo } from "react-icons/fa";
import { GrDocumentTxt } from "react-icons/gr";
import { PiFileAudioBold } from "react-icons/pi";
import { FaFile } from "react-icons/fa";


function FileIcon({extenstion}) {

    if(extenstion === "js") return <FaJsSquare className='h-6 w-6 p-1 text-yellow-300'/>
        if(extenstion === "json") return <BsFiletypeJson className='h-6 w-6 p-1 text-yellow-500'/>
    if(extenstion === "jsx") return <RiReactjsFill className='h-6 w-6 p-1 text-blue-500'/>
    if(extenstion === "html") return <IoLogoHtml5 className='h-6 w-6 p-1 text-blue-500'/>
    if(extenstion === "css") return <MdOutlineCss className='h-6 w-6 p-1 text-yellow-200'/>
    if(extenstion === "gitignore") return <FaGitAlt className='h-6 w-6 p-1 text-red-600' />
    if(extenstion === "md") return <FaReadme className='h-6 w-6 p-1 text-pink-400'/>
    if(extenstion === "svg") return <BsFiletypeSvg className='h-6 w-6 p-1 text-green-400'/>
    if(extenstion === "png" || extenstion === "jpg" || extenstion === "jpeg") return <CiImageOn className='h-6 w-6 p-1 text-green-400'/>
        if(extenstion === "mp4" || extenstion === "mkv") return <FaFileVideo className='h-6 w-6 p-1 text-red-600'/>
    if(extenstion === "txt") return <GrDocumentTxt className='h-6 w-6 p-1'/>
    if(extenstion === "mp3") return <PiFileAudioBold className='h-6 w-6 p-1 text-green-600'/>


  return (
    <FaFile/>
  )
}

export default FileIcon