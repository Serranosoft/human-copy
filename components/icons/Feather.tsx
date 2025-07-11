import * as React from "react"

const FeatherSVG = (props: any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Flat Gradient"
        viewBox="0 0 64 64"
        {...props}
    >
        <defs>
            <linearGradient
                id="a"
                x1={7.648}
                x2={56.352}
                y1={32}
                y2={32}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset={0} stopColor="#9cffac" />
                <stop offset={1} stopColor="#00b59c" />
            </linearGradient>
        </defs>
        <path
            fill="url(#a)"
            d="M36.327 50.343c-1.873.148-4.156-.024-5.41 1.25-.34.32-.57.64-.13 1.46 1.67 3.443.307 5.36-2.93 6.1-6.363 1.277-13.214.912-19.31.2a.999.999 0 0 1-.88-1.01 61.302 61.302 0 0 1 15.99-39.94.998.998 0 0 0-1.48-1.34 63.233 63.233 0 0 0-12.9 21.56c-2.659-4.993-1.65-12.402.1-15.78.228-.685 1.3-.614 1.84-.73v.77a1 1 0 0 0 2 0c-.253-5.822 1.055-8.902 6.81-12.71a39.64 39.64 0 0 1 19.84-6.17 1.754 1.754 0 0 1 1.65 2.5l-4.65 9.6c-1.245 2.566-4.1 3.117-6.507 4.507a1 1 0 0 0 .905 1.784 72.1 72.1 0 0 1 .862-.43c-.193 3.412-2.228 10.395-6.36 11.71-.543.14-2.348.61-3.486.908a1 1 0 0 0-.715 1.217c.381 1.42 2.304.324 3.07.234a.954.954 0 0 1-.42.75 31.619 31.619 0 0 1-11.769 4.93 58.764 58.764 0 0 0-2.75 15.76 59.191 59.191 0 0 0 17.77-.28c1.966-.321 2.543-1.477 1.56-3.2a2.918 2.918 0 0 1 .51-3.84c1.57-1.56 3.73-1.66 5.63-1.75 1.537-.082 2.372-.134 4.54-.11 4.337-.122 18.049.576 13.87-5.1a1 1 0 0 1 1.65-1.13c5.585 9.453-11.03 8.027-18.9 8.28Z"
        />
    </svg>
)

export default FeatherSVG