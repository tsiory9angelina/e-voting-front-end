import axios from "axios";
import Config from "../../../config/configs/config";
import StationDTO from "../../../data/dto/station.dto";

const baseUrl: string = Config.BASE_URL;

const createStation = (station: StationDTO, token: string) => {
  const create_station = axios.post(
    `${baseUrl}/api/admin/station/create`,
    station,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return create_station;
};

const getStations = (token: string) => {
  return axios.get(baseUrl + "/api/admin/station/get", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const getStationById = (id: string, token: string) => {
  return axios.get(baseUrl + "/api/admin/station/get/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const deleteStationById = (id: string, token: string) => {
  return axios.delete(baseUrl + "/api/admin/station/delete/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const updateStation = (id: string, station: StationDTO, token: string) => {
  return axios.put(baseUrl + "/api/admin/station/update/" + id, station, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createStationByImportData  = (station: any, token: string) => {
  const create_station = axios.post(
    `${baseUrl}/api/admin/station/create/multiple`,
    station,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return create_station;
}; 

export const StationRepository = {
  createStation,
  getStations,
  deleteStationById,
  updateStation,
  getStationById,
  createStationByImportData
};
