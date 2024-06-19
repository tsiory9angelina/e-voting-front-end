import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ** MUI Imports
import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";

// ** PRIMEREACT Imports
import { DataTable} from "primereact/datatable";
import { FilterMatchMode } from 'primereact/api';
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

//Services
import { StationApplicatif } from "../../service/applicatif/station/station.applicatif";
import StationDTO from "../../data/dto/station.dto";
import { Dialog } from "primereact/dialog";


interface ExtendedStationDTO extends StationDTO {
  _id: string;
  prenom: string;
  site: string;
}
const TableStation = () => {
  const [token, setToken] = useState("");

  const [displayResponsiveUpdate, setDisplayResponsiveUpdate] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rowDataSelected, setRowDataSelected] = useState<any | null>();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [stations, setStations] = useState<StationDTO[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filters, setFilters] = useState<any>({global: { value: null, matchMode: FilterMatchMode.CONTAINS}});
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const onGlobalFilterChangeVoter = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const _filters1 = { ...filters };
    _filters1["global"].value = value;
    console.log(filters);
    setFilters(_filters1);
    setGlobalFilterValue(value);
  };

  const renderVoterHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
        <h4 className="m-0">Liste des bureaux de votes</h4>

        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChangeVoter}
            placeholder="Keyword Search"
          />
        </span>

        <Button
          label="Bureau de vote"
          style={{ marginLeft: "20px", backgroundColor: "#167845" }}
          icon="pi pi-plus"
          onClick={() => navigate("/dashboard/station/create")}
        />
      </div>
    );
  };

  const header = renderVoterHeader();
  const getStationsList = () => {
    console.log("-----------token new");
    console.log(localStorage.getItem("token"));
    console.log("-----------fin token new");
    let tokenUser = localStorage.getItem("token");

    if (tokenUser) {
      // Vérifier si le token commence et se termine par des guillemets doubles
      if (tokenUser.startsWith('"') && tokenUser.endsWith('"')) {
        // Enlever les guillemets doubles en utilisant replace avec une expression régulière
        tokenUser = tokenUser.replace(/^"(.*)"$/, "$1");
      }

      StationApplicatif.getStations(tokenUser)
        .then((response) => {
          console.log("-----Stations list-------");
          console.log(response);
          setStations(response || []);
          setLoading(false);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  const onClickDeleteStation = (rowData: ExtendedStationDTO) => {
    setDisplayResponsiveUpdate(true);
    setRowDataSelected(rowData);
  };
  const onHideUpdate = () => {
    setDisplayResponsiveUpdate(false);
  };

  const updateStation = (rowData: ExtendedStationDTO, type: string) => {
    navigate("/dashboard/station/update/" + rowData._id + "/" + type);
  };

  const deleteStation = (station: ExtendedStationDTO) => {
    if (token || token !== "") {
      StationApplicatif.deleteStationById(station._id, token).then(function () {
        getStationsList();
        onHideUpdate();
      });
    }
  };

  const actionTemplateStation = (rowData: ExtendedStationDTO) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-file"
          className="p-button-rounded p-button-success mr-2 ms-2"
          onClick={() => updateStation(rowData, "view")}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 ms-2"
          onClick={() => {
            updateStation(rowData, "update");
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning ms-2"
          onClick={() => onClickDeleteStation(rowData)}
        />
      </React.Fragment>
    );
  };

  const checkToken = () => {
    let tokenUser = localStorage.getItem("token");
    if (tokenUser) {
      if (tokenUser.startsWith('"') && tokenUser.endsWith('"')) {
        // Enlever les guillemets doubles en utilisant replace avec une expression régulière
        tokenUser = tokenUser.replace(/^"(.*)"$/, "$1");
        setToken(tokenUser.replace(/^"(.*)"$/, "$1"));
      } else {
        setToken(tokenUser);
      }
    }
  };
  const ComponentDialogForDelete = () => {
    return (
      <Dialog
        header="Delete"
        visible={displayResponsiveUpdate}
        onHide={() => onHideUpdate()}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "25vw" }}
      >
        <form>
          <div className="mb-3">
            <label>Voulez vous vraiment supprimer ce bureau de vote ?</label>
          </div>
        </form>
        <div>
          <Button
            label="Annuler"
            icon="pi pi-times"
            onClick={() => onHideUpdate()}
            className="p-button-text"
          />
          <Button
            label="Supprimer"
            icon="pi pi-check"
            onClick={() => {
              deleteStation(rowDataSelected);
            }}
            autoFocus
          />
        </div>
      </Dialog>
    );
  };

  // Style CSS pour les cellules avec ellipsis
const cellStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '120px', // Largeur maximale pour toutes les cellules
  height: '50px', // Hauteur fixe pour toutes les cellules
  };
  
  // Fonction de modèle pour les cellules avec ellipsis
  const cellTemplate = (rowData :StationDTO, field: keyof StationDTO) => {
  return (
  <div style={cellStyle}>
  {rowData[field]}
  </div>
  );
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    getStationsList();
  }, []);

  return (
    <>
      <ComponentDialogForDelete />

      <Card>
        <TableContainer>
          <DataTable
            value={stations}
            showGridlines
            stripedRows
            paginator
            rows={10}
            loading={loading}
            // size="small"
            header={header}
            filters={filters}
            filterDisplay="row"
            globalFilterFields={[
              "ID",
              "name",
              "region",
              "district",
              "commune",
              "fokontany",
              "centre",
              "code",
              "nbVoters",
            ]}
            dataKey="id"
            stateStorage="session"
            stateKey="dt-state-demo-session"
            emptyMessage="Aucun  élécteur trouvé."
          >
            <Column
              key="ID"
              field="_id"
              header="ID"
              sortable
              //style={{ ...cellStyle, minWidth: '120px' }}
              body={(rowData) => cellTemplate(rowData, '_id')}
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="name"
              field="name"
              header="Nom"
              //body={(rowData) => cellTemplate(rowData, 'name')}
              sortable
              filterPlaceholder="Search by name"
              body={(rowData) => cellTemplate(rowData, 'name')}
            ></Column>

            <Column
              key="region"
              field="region"
              header="region"
              body={(rowData) => cellTemplate(rowData, 'region')}
              sortable
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="district"
              field="district"
              header="district"
              body={(rowData) => cellTemplate(rowData, 'district')}
              sortable
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="commune"
              field="commune"
              header="commune"
              body={(rowData) => cellTemplate(rowData, 'commune')}
              sortable
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="fokontany"
              field="fokontany"
              header="fokontany"
              body={(rowData) => cellTemplate(rowData, 'fokontany')}
              sortable
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="centre"
              field="centre"
              header="centre"
              body={(rowData) => cellTemplate(rowData, 'centre')}
              sortable
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="code"
              field="code"
              header="code"
              body={(rowData) => cellTemplate(rowData, 'code')}
              sortable
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="nbVoters"
              field="nbVoters"
              header="nbVoters"
              body={(rowData) => cellTemplate(rowData, 'nbVoters')}
              sortable
              filterPlaceholder="Search by name"
            ></Column>

            <Column
              key="action"
              header="Action"
              body={actionTemplateStation}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
        </TableContainer>
      </Card>
    </>
  );
};

export default TableStation;
