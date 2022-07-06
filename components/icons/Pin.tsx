import * as React from "react"

const PinSVG = (props: any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Flat Gradient"
        viewBox="0 0 64 64"
        {...props}
    >
        <defs>
            <linearGradient
                id="a"
                x1={4.001}
                x2={60.01}
                y1={31.997}
                y2={31.997}
                gradientUnits="userSpaceOnUse"
            >
                <stop
                    offset={0}
                    stopColor="#52cc99"
                    className="stopColor00c0ff svgShape"
                />
                <stop
                    offset={1}
                    stopColor="#55ffb8"
                    className="stopColor5558ff svgShape"
                />
            </linearGradient>
        </defs>
        <path
            fill="url(#a)"
            d="M58.29 21.621c-.914-.916-3.16-3.157-4.05-4.05L42.38 5.711a1 1 0 0 1 1.41-1.42c4.1 4.115 11.806 11.82 15.92 15.92a1 1 0 0 1-1.42 1.41Zm-4.05-1.23L43.62 9.771l-9.4 9.39a8.764 8.764 0 0 1-12.4 0 7.514 7.514 0 0 0-10.62 0l-2.3 2.3a4.261 4.261 0 0 0 0 6.02l13.1 13.1-17.71 17.71a1.009 1.009 0 0 0 .71 1.71 1.024 1.024 0 0 0 .71-.29l17.71-17.71 13.1 13.1a4.252 4.252 0 0 0 6.02 0l2.3-2.3a7.508 7.508 0 0 0 0-10.62 8.764 8.764 0 0 1 0-12.4Z"
        />
    </svg>
)

export default PinSVG

