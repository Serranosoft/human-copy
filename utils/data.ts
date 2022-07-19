export interface Request {
    id: string;
    finished: boolean | undefined;
    title: string | undefined;
    topic: string | undefined;
    description: string | undefined;
    download: string | undefined;
    words: string | undefined;
    priority: boolean;
    deliver_date: string | undefined;
}

export class Data {


    public static DummyRequests: Request[] = [
        {
            id: "1",
            title: "Título de ejemplo",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elementum pretium varius. Nulla facilisi. Etiam et semper urna. Duis vel vestibulum justo.",
            topic: "qweqwe",
            words: "500", 
            deliver_date: "14/11/2022",
            download: "",
            finished: false,
            priority: false
        },
        {
            id: "2",
            title: "Título de ejemplo",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elementum pretium varius. Nulla facilisi. Etiam et semper urna. Duis vel vestibulum justo.",
            topic: "qweqwe",
            words: "1500", 
            deliver_date: "02/12/2022",
            download: "",
            finished: false,
            priority: false
        },
        {
            id: "3",
            title: "Título de ejemplo",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elementum pretium varius. Nulla facilisi. Etiam et semper urna. Duis vel vestibulum justo.",
            topic: "qweqwe",
            words: "2000",
            deliver_date: "11/11/2022",
            download: "",
            finished: false,
            priority: false
        },

    ]

    public static Prices = [

    ]
}