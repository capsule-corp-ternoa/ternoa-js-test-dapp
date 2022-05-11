import React from 'react'

interface ArrowRightProps {
  className?: string
}

const ArrowRight: React.FC<ArrowRightProps> = ({ className }) => (
  <svg className={className} width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.351225 0.351225C0.819525 -0.117075 1.57879 -0.117075 2.04709 0.351225L8.4426 6.74673C8.9109 7.21503 8.9109 7.9743 8.4426 8.4426L2.04709 14.8381C1.57879 15.3064 0.819525 15.3064 0.351225 14.8381C-0.117075 14.3698 -0.117075 13.6105 0.351225 13.1422L5.8988 7.59466L0.351225 2.04709C-0.117075 1.57879 -0.117075 0.819525 0.351225 0.351225Z"
      fill="white"
    />
  </svg>
)

export default ArrowRight
