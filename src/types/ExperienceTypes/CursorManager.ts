interface CursorManagerContextType {
    color: React.SetStateAction<string>;
    settings: {
        color: string;
        hover: boolean;
        text: string;
        contact: boolean;
        secret: boolean;
    };
    changeColor: (
        newColor: React.SetStateAction<string>
    ) => void;

    changeSettings: (
        newColor: string,
        newHover: boolean,
        newText: string,
        newContact: boolean,
        newSecret: boolean
    ) => void;
}

export default CursorManagerContextType;