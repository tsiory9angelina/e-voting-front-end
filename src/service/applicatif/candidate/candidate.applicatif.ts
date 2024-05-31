/* eslint-disable @typescript-eslint/no-explicit-any */
import { CandidateMetier } from "../../metier/candidate/candidate.metier";

const createCandidate = (candidate: any, token: any) => {
  const response = CandidateMetier.createCandidate(candidate, token);
  return response;
};
const getCandidates = (token:any) => {
  return CandidateMetier.getCandidates(token);
};
const getCandidateById = (id: string, token: any) => {
  return CandidateMetier.getCandidateById(id, token);
};
const deleteCandidateById = (id: string, token: any) => {
  return CandidateMetier.deleteCandidateById(id, token);
};
const updateCandidateById = (id: string, candidate: any, token: any) => {
  return CandidateMetier.updateCandidateById(id, candidate, token);
};
export const CandidateApplicatif = {
  createCandidate,
  getCandidates,
  deleteCandidateById,
  updateCandidateById,
  getCandidateById,
};
