import React from "react";

export const isAuthenticade = () => {
    

    var loged = localStorage.getItem("isloged");
    

    if (loged == "true"){
        return true;
    } else {
        return false;
    }
}
export const gettoken = () => {
    

    var tk = localStorage.getItem("token");
    return tk;
    
}

export const isadm = () => {
    var loged1 = localStorage.getItem("role");
    
    if (loged1 == "adm"){
        return true;
    } else {
        return false;
    }

}