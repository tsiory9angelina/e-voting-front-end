/* eslint-disable @typescript-eslint/no-explicit-any */

import StationDTO from "../../../data/dto/station.dto";
import { StationRepository } from "../../repository/station/station.repository";

const createStation = (product: StationDTO, token: string) => {
    //send request
    return StationRepository.createStation(product, token)
    .then(
        (response:any)=>{
            console.log(response)
            return response.data;
        })
}
const getStations=( token: string) => {
    return StationRepository.getStations(token).then(
        (response:any)=>{
            return response.data
        }
    )
}
const getStationById=(id: string, token: string) => {
    return StationRepository.getStationById(id, token).then(
        (response:any)=>{
            return response.data
        }
    )
}
const deleteStationById=(id: string, token: string) => {
    return StationRepository.deleteStationById(id, token).then( 
        (response:any)=>{
            return response.data
        }
    )
}
const updateStation=(id: string,station: StationDTO, token: string) => {
    return StationRepository.updateStation(id, station, token).then( 
        (response:any)=>{
            return response.data
        }
    )
}


export const StationMetier={
    createStation, 
    getStations, 
    deleteStationById, 
    updateStation, 
    getStationById
}