/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Config from "../../../config/configs/config";
import VoterDTO from "../../../data/dto/voter.dto";

const baseUrl: string = Config.BASE_URL;

const createVoter = (voter: VoterDTO, token:any) => {
  const create_Voter = axios.post(`${baseUrl}/api/admin/voter/create`, voter, {
    headers: {Authorization:`Bearer ${token}`},
  });
  return create_Voter;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getVoters = (token: any) => {
  return axios.get(baseUrl + "/api/admin/voter/get", {
    headers: {Authorization:`Bearer ${token}`},
  });
};
const getVoterById = (id: string, token: any) => {
  return axios.get(baseUrl + "/api/admin/voter/get/" + id, {
    headers: {Authorization:`Bearer ${token}`},
  });
};
const deleteVoterById = (id: string, token: any) => {
  return axios.delete(baseUrl + "/api/admin/voter/delete/" + id, {
    headers: {Authorization:`Bearer ${token}`},
  });
};
const updateVoterById = (id: string, voter: VoterDTO, token: any) => {
  return axios.put(baseUrl + "/api/admin/voter/update/" + id, voter, {
    headers: {Authorization:`Bearer ${token}`},
  });
};

export const VoterRepository = {
  createVoter,
  getVoters,
  deleteVoterById,
  updateVoterById,
  getVoterById,
};
