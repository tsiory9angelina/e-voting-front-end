/* eslint-disable @typescript-eslint/no-explicit-any */


import { CandidateRepository } from "../../repository/candidate/candidate.repository";
const createCandidate = (candidate: any, token :any) => {
    //send request
    return CandidateRepository.createCandidate(candidate, token)
    .then(
        (response:any)=>{
            console.log(response)
            return response.data;
        })
}
const getCandidates=(token :any)=>{
    return CandidateRepository.getCandidates(token).then(
        (response:any)=>{
            return response.data
        }
    )
}
const getCandidateById=(id: string, token :any)=>{
    return CandidateRepository.getCandidateById(id, token).then(
        (response:any)=>{
            return response.data
        }
    )
}
const deleteCandidateById=(id: string, token :any)=>{
    return CandidateRepository.deleteCandidateById(id, token).then( 
        (response:any)=>{
            return response.data
        }
    )
}
const updateCandidateById=(id: string,candidate: any, token :any)=>{
    return CandidateRepository.updateCandidateById(id, candidate, token).then( 
        (response:any)=>{
            return response.data
        }
    )
}


export const CandidateMetier={
    createCandidate, 
    getCandidates, 
    deleteCandidateById, 
    updateCandidateById, 
    getCandidateById
}