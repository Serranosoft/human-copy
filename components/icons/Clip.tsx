import * as React from "react"

const ClipSVG = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Flat Gradient"
    viewBox="0 0 64 64"
    {...props}
  >
    <defs>
      <linearGradient
        id="a"
        x1={7.051}
        x2={56.948}
        y1={31.996}
        y2={31.996}
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset={0}
          stopColor="#52cc99"
          className="stopColorffa68d svgShape"
        />
        <stop
          offset={1}
          stopColor="#3afdab"
          className="stopColorfd3a84 svgShape"
        />
      </linearGradient>
    </defs>
    <path
      fill="url(#a)"
      d="M52.593 29.414 25.097 56.911c-6.515 6.641-18.144 1.83-18.045-7.476a10.5 10.5 0 0 1 3.092-7.476l27.5-27.5c6.033-5.662 14.488 2.832 8.841 8.843L24.45 45.337a1.932 1.932 0 0 1-2.732-2.732l22.035-22.034a2.39 2.39 0 0 0-3.378-3.38l-27.5 27.5c-6.086 6.468 3.04 15.564 9.49 9.488l27.497-27.496c9.94-10.75-4.84-25.523-15.6-15.6l-22.04 22.04a1.932 1.932 0 0 1-2.732-2.73L31.53 8.35a14.894 14.894 0 0 1 21.063 21.063Z"
    />
  </svg>
)

export default ClipSVG
