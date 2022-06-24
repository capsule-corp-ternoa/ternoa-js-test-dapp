import React from 'react'

interface WarningProps {
  className?: string
}

const Warning: React.FC<WarningProps> = ({ className }) => (
  <svg className={className} width="66" height="57" viewBox="0 0 66 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33 0L0 57H66L33 0ZM33 11.97L55.59 51H10.41L33 11.97ZM30 42H36V48H30V42ZM30 24H36V36H30V24Z" fill="url(#paint0_linear_1558_13230)" />
    <defs>
      <linearGradient id="paint0_linear_1558_13230" x1="0" y1="29.1667" x2="65.9357" y2="29.1667" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0B4BFE" />
        <stop offset="1" stopColor="#B80DEF" />
      </linearGradient>
    </defs>
  </svg>
)

export default Warning
