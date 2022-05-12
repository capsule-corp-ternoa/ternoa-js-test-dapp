import React from 'react'

interface CloseProps {
  className?: string
}

const Close: React.FC<CloseProps> = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.7 12.3C14.1 12.7 14.1 13.3 13.7 13.7C13.5 13.9 13.3 14 13 14C12.7 14 12.5 13.9 12.3 13.7L7 8.4L1.7 13.7C1.5 13.9 1.3 14 1 14C0.7 14 0.5 13.9 0.3 13.7C-0.1 13.3 -0.1 12.7 0.3 12.3L5.6 7L0.3 1.7C-0.1 1.3 -0.1 0.7 0.3 0.3C0.7 -0.1 1.3 -0.1 1.7 0.3L7 5.6L12.3 0.3C12.7 -0.1 13.3 -0.1 13.7 0.3C14.1 0.7 14.1 1.3 13.7 1.7L8.4 7L13.7 12.3Z"
      fill="currentColor"
    />
  </svg>
)

export default Close
