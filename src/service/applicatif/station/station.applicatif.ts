import StationDTO from "../../../data/dto/station.dto";
import { StationMetier } from "../../metier/station/station.metier";


const createStation= (voter: StationDTO, token: string) => {
    const response = StationMetier.createStation(voter, token)
    return response;
}
const getStations = (token: string) => {
    return StationMetier.getStations(token);
}
const getStationById = (id: string, token: string) => {
    return StationMetier.getStationById(id, token);
}
const deleteStationById = (id: string, token: string) => {
    return StationMetier.deleteStationById(id, token);
}
const updateStation = (id: string, voter: StationDTO, token: string) => {
    return StationMetier.updateStation(id, voter, token);
}
export const StationApplicatif = {
    createStation,
    getStations,
    getStationById,
    deleteStationById,
    updateStation

    
}