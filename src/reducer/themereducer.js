import { TOGGLE_THEME } from "../action/themeaction";

const nilaiDefault = {
    theme: 'Light',
};

const themeReducer = (state= nilaiDefault, action) =>{
    
    switch (action.type){
        case TOGGLE_THEME:
            return {
                ...state, theme : state.theme === 'Light' ? 'dark' : 'Light',
            };
            default: return state;
    }
};

export default themeReducer;


