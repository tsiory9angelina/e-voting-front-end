import StationDTO from "../../../data/dto/station.dto";
import { StationMetier } from "../../metier/station/station.metier";


const createStation= (station: StationDTO, token: string) => {
    const response = StationMetier.createStation(station, token)
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
const updateStation = (id: string, station: StationDTO, token: string) => {
    return StationMetier.updateStation(id, station, token);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createStationByImportData= (station:any, token: string) => {
    const response = StationMetier.createStationByImportData(station, token)
    return response;
}
export const StationApplicatif = {
    createStation,
    getStations,
    getStationById,
    deleteStationById,
    updateStation,
    createStationByImportData

    
}