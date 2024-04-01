const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
const passwordRegx=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/



export const hookformRequired = (message?:string) => {
    return {
        required : message || "required"
    }
}

export const hookMaxValue = (value?: number , message?:string) => {
    return {
        maxLength : {
            value , 
            message:`Must be less than ${value}` || message
        }
    }
}
export const hookMinValue = (value?: number , message?:string) => {
    return {
        maxLength : {
            value , 
            message:`Must be greater than ${value}` || message
        }
    }
}
export const hookPatternRequired = ( pattern:any , message?:string) => {
    return {
        pattern : {
            value: pattern , 
            message: message || "Enter Valid Data"
        }
    }
}