/* eslint-disable @typescript-eslint/no-explicit-any */
import VoterDTO from "../../../data/dto/voter.dto";
import { VoterMetier } from "../../metier/voter/voter.metier";

const createVoter = (voter: VoterDTO, token:any) => {
    console.log(token)
    const response = VoterMetier.createVoter(voter, token)
    return response;
}
const getVoters = (token:any) => {
    return VoterMetier.getVoters(token);
}
const getVoterById = (id: string, token:any) => {
    return VoterMetier.getVoterById(id, token);
}
const deleteVoterById = (id: string, token:any) => {
    return VoterMetier.deleteVoterById(id, token);
}
const updateVoterById = (id: string, voter: VoterDTO, token:any) => {
    return VoterMetier.updateVoterById(id, voter, token);
}
export const VoterApplicatif = {
    createVoter,
    getVoters, 
    deleteVoterById, 
    updateVoterById, 
    getVoterById
}