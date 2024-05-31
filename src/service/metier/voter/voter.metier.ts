/* eslint-disable @typescript-eslint/no-explicit-any */

import VoterDTO from "../../../data/dto/voter.dto";
import { VoterRepository } from "../../repository/voter/voter.repository";

const createVoter = (product: VoterDTO, token: any) => {
    //send request
    return VoterRepository.createVoter(product, token)
    .then(
        (response:any)=>{
            console.log(response)
            return response.data;
        })
}
const getVoters=(token:any)=>{
    return VoterRepository.getVoters(token).then(
        (response:any)=>{
            return response.data
        }
    )
}
const getVoterById=(id: string, token: any)=>{
    return VoterRepository.getVoterById(id, token).then(
        (response:any)=>{
            return response.data
        }
    )
}
const deleteVoterById=(id: string, token: any)=>{
    return VoterRepository.deleteVoterById(id, token).then( 
        (response:any)=>{
            return response.data
        }
    )
}
const updateVoterById=(id: string,product: VoterDTO, token: any)=>{
    return VoterRepository.updateVoterById(id, product, token).then( 
        (response:any)=>{
            return response.data
        }
    )
}


export const VoterMetier={
    createVoter, 
    getVoters, 
    deleteVoterById, 
    updateVoterById, 
    getVoterById
}