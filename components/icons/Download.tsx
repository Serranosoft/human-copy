import * as React from "react"

const DownloadSVG = (props: any) => (
    <svg width={20} height={20}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 490 490"
        style={{
            enableBackground: "new 0 0 490 490",
        }}
        xmlSpace="preserve"
        {...props}
    >
        <path fill="white" d="M245 0c-9.5 0-17.2 7.7-17.2 17.2v331.2L169 289.6c-6.7-6.7-17.6-6.7-24.3 0s-6.7 17.6 0 24.3l88.1 88.1c3.3 3.3 7.7 5 12.1 5 4.4 0 8.8-1.7 12.1-5l88.1-88.1c6.7-6.7 6.7-17.6 0-24.3-6.7-6.7-17.6-6.7-24.3 0L262 348.4V17.1c.1-9.5-7.5-17.1-17-17.1z" />
        <path fill="green" d="M462.1 472.9v-99.7c0-9.5-7.7-17.2-17.2-17.2s-17.2 7.7-17.2 17.2v82.6H62.2v-82.6c0-9.5-7.7-17.2-17.1-17.2s-17.2 7.7-17.2 17.2v99.7c0 9.5 7.7 17.1 17.2 17.1h399.8c9.5 0 17.2-7.6 17.2-17.1z" />
    </svg>
)

export default DownloadSVG
