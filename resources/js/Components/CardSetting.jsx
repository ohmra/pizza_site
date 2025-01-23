import {createContext} from "react";

const CardSettingContext = createContext();

const CardSetting = ({children}) => {
    return (
        <div className="card-setting">
            {children}
        </div>
    )
}
