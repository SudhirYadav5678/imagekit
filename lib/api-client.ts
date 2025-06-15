import { IVideo } from "@/model/Vidoe"

export type VideoFormData = Omit<IVideo,"_id">


type FetchOptions = {
    method?:"GET" | "POST" | "PUT" |"DELETE"
    body?:any
    headers?:Record<string,string>

}

class ApiClient{
    private async fetch<T>(
        endpoint:string,
        options:FetchOptions = {}
    ):Promise<T>{
        const {method="GET",body,headers={}} = options
        const defaultHeaders = {
            "Content-Type":"application/json",
            ...headers
        }
        const responce = await fetch(`/api${endpoint}`,{
            method,
            headers:defaultHeaders,
            body:body?JSON.stringify(body):undefined
        })
        if(!responce.ok){
            throw new Error(await responce.text())
        }
        return responce.json()
    }

    async getVideo(){
        return this.fetch("/videos")
    }

    async createVideo(videoData:VideoFormData){
        return this.fetch("/videos",{
            method:"POST",
            body:videoData
        })
    }
}

export const apiClient = new ApiClient()