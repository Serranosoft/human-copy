import { Price } from 'types';

export const getURL = () => {
    const url =
        process?.env?.URL && process.env.URL !== ''
            ? process.env.URL
            : process?.env?.VERCEL_URL && process.env.VERCEL_URL !== ''
                ? process.env.VERCEL_URL
                : 'http://localhost:3000';
    return url.includes('http') ? url : `https://${url}`;
};

export const postData = async ({
    url,
    data
}: {
    url: string;
    data?: { price: Price, mode: string };
}) => {
    console.log('posting,', url, data);

    const res: Response = await fetch(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify(data)
    });

    console.log(res);
    if (!res.ok) {
        console.log('Error in postData', { url, data, res });

        throw Error(res.statusText);
    }

    return res.json();
};

export const toDateTime = (secs: number) => {
    var t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
    t.setSeconds(secs);
    return t;
};

export const removeChildElements = (parent: HTMLElement) => {
    let child = parent.lastElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}

export const setError = (element: HTMLElement) => {
    element.classList.add("error");
    element.classList.remove("hide");
}