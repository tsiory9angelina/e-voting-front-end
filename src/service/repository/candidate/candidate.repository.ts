/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Config from "../../../config/configs/config";
import CandidateDTO from "../../../data/dto/candidate.dto";

const baseUrl: string = Config.BASE_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createCandidate = (candidate: any, token: any) => {
  const create_candidate = axios.post(
    `${baseUrl}/api/admin/candidate/create`,
    candidate,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return create_candidate;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCandidates = (token: any) => {
  console.log("eto====================================");
  return axios.get(baseUrl + "/api/admin/candidate/get", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//code incomplet ici
const getCandidateById = (id: string, token: any) => {
  return axios.get(baseUrl + "/api/admin/candidate/get/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deleteCandidateById = (id: string, token: any) => {
  return axios.delete(baseUrl + "/api/admin/candidate/delete/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const updateCandidateById = (
  id: string,
  candidate: any,
  token: any
) => {
  return axios.put(baseUrl + "/api/admin/candidate/update/" + id, candidate, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const CandidateRepository = {
  createCandidate,
  getCandidates,
  deleteCandidateById,
  updateCandidateById,
  getCandidateById,
};
