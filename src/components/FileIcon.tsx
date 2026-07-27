import React from 'react';
import { 
  SiPython, 
  SiJson, 
  SiMarkdown, 
  SiGnubash, 
  SiReact, 
  SiTypescript, 
  SiC 
} from 'react-icons/si';
import { VscFile, VscFolder, VscFolderOpened } from 'react-icons/vsc';

interface FileIconProps {
  name: string;
  isFolder?: boolean;
  isOpen?: boolean;
  className?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({ name, isFolder, isOpen, className = "w-4 h-4 shrink-0" }) => {
  if (isFolder) {
    return isOpen ? (
      <VscFolderOpened className={`${className} text-[#dcb67a]`} />
    ) : (
      <VscFolder className={`${className} text-[#dcb67a]`} />
    );
  }

  const ext = name.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'py':
      return <SiPython className={`${className} text-[#3776ab]`} />;
    case 'json':
      return <SiJson className={`${className} text-[#fbc02d]`} />;
    case 'md':
      return <SiMarkdown className={`${className} text-[#42a5f5]`} />;
    case 'sh':
    case 'bash':
      return <SiGnubash className={`${className} text-[#4eaa25]`} />;
    case 'tsx':
    case 'jsx':
      return <SiReact className={`${className} text-[#61dafb]`} />;
    case 'ts':
    case 'js':
      return <SiTypescript className={`${className} text-[#3178c6]`} />;
    case 'c':
      return <SiC className={`${className} text-[#a8b9cc]`} />;
    default:
      return <VscFile className={`${className} text-gray-400`} />;
  }
};

export default FileIcon;