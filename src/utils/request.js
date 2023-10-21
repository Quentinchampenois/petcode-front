import {backendUrl} from "./backendUrl";

export const request = (method, url, body = null, jwtToken) => {
    let headers = {
        "Content-Type": "application/json"
    }
    if (jwtToken !== undefined && jwtToken !== null ) {
        headers["Authorization"] = `Bearer ${jwtToken}`
    }

    let params = {
        method: method,
        headers: headers
    }

    if (body !== null) {
        params.body = JSON.stringify(body)
    }

    let fullUrl = `${backendUrl}${url}`
    return fetch(fullUrl, params)
}
