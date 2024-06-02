import React from "react";
import { useNavigate } from "react-router-dom";

// ** MUI Imports
import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";

// ** PRIMEREACT Imports
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { CandidateApplicatif } from "../../service/applicatif/candidate/candidate.applicatif";
import { Avatar } from "@mui/material";
import { Dialog } from "primereact/dialog";
import CandidateDTO from "../../data/dto/candidate.dto";
import { FilterMatchMode } from "primereact/api";

// ** Types Imports
//import { ThemeColor } from 'src/@core/layouts/types'

const TableCandidate = () => {
  const [token, setToken] = useState("");
  const [displayResponsiveUpdate, setDisplayResponsiveUpdate] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rowDataSelected, setRowDataSelected] = useState<any | null>();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [candidates, setCandidates] = useState<CandidateDTO[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filters, setFilters] = useState<any>({global: { value: null, matchMode: FilterMatchMode.CONTAINS}});

  const navigate = useNavigate();

  const onGlobalFilterChangeCandidate = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const _filters1 = { ...filters };
    _filters1["global"].value = value;
    console.log(filters);
    setFilters(_filters1);
    setGlobalFilterValue(value);
  };

  const renderCandidateHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
        <h4 className="m-0">Liste des candidats</h4>

        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChangeCandidate}
            placeholder="Keyword Search"
          />
        </span>

        <Button
          label="Candidat"
          style={{ marginLeft: "20px", backgroundColor: "#167845" }}
          icon="pi pi-plus"
          onClick={() => navigate("/dashboard/candidate/create")}
        />
      </div>
    );
  };
  const header = renderCandidateHeader();

  const getCandidates = () => {
    let tokenUser = localStorage.getItem("token");
    if (tokenUser) {
      // Vérifier si le token commence et se termine par des guillemets doubles
      if (tokenUser.startsWith('"') && tokenUser.endsWith('"')) {
        // Enlever les guillemets doubles en utilisant replace avec une expression régulière
        tokenUser = tokenUser.replace(/^"(.*)"$/, "$1");
      }
      CandidateApplicatif.getCandidates(tokenUser)
        .then(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (response: any) => {
            console.log("-----Candidat LIst-------");
            if (response) {
              setCandidates(response || []);
            }
          }
        )
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  const onClickDeleteCandidate = (rowData: CandidateDTO) => {
    setDisplayResponsiveUpdate(true);
    setRowDataSelected(rowData);
  };
  const onHideUpdate = () => {
    setDisplayResponsiveUpdate(false);
  };

  const updateCandidate = (rowData: CandidateDTO, type: string) => {
    navigate("/dashboard/candidate/update/" + rowData._id + "/" + type);
  };

  const deleteCandidate = (candidate: CandidateDTO) => {
    if (token || token !== "") {
      CandidateApplicatif.deleteCandidateById(candidate._id, token).then(
        function () {
          getCandidates();
          onHideUpdate();
        }
      );
    }
  };

  //Template of the button wher there is action
  const actionTemplateCandidat = (rowData: CandidateDTO) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-file"
          className="p-button-rounded p-button-success mr-2 ms-2"
          onClick={() => updateCandidate(rowData, "view")}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 ms-2"
          onClick={() => {
            updateCandidate(rowData, "update");
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning ms-2"
          onClick={() => onClickDeleteCandidate(rowData)}
        />
      </React.Fragment>
    );
  };

  const imageBodyTemplate = (candidates: { imageUrl: string }) => {
    return (
      <Avatar
        src={candidates.imageUrl || undefined}
        sx={{
          minWidth: 100,
          maxWidth: 100,
          height: 80,
          border: "3px solid",
          borderColor: "primary.main",
        }}
        variant="rounded"
      />
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

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <>
      <div>
        <Dialog
          header="Delete"
          visible={displayResponsiveUpdate}
          onHide={() => onHideUpdate()}
          breakpoints={{ "960px": "75vw" }}
          style={{ width: "25vw" }}
        >
          <form>
            <div className="mb-3">
              <label>Voulez vous vraiment supprimer ce candidat ?</label>
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
                deleteCandidate(rowDataSelected);
              }}
              autoFocus
            />
          </div>
        </Dialog>
      </div>
      <Card>
        <TableContainer>
          <DataTable
            value={candidates}
            paginator
            rows={10}
            header={header}
            filters={filters}
            filterDisplay="menu"
            // stripedRows
            //showGridlines
            globalFilterFields={[
              "ID",
              "name",
              "partyEntity",
              "compaingLocation",
              "dateBirth",
              "cin",
              "birthLocation",
            ]}
            dataKey=" id"
            stateStorage="session"
            stateKey="dt-state-demo-session"
            emptyMessage="Aucun  candidat trouvé."
          >
            <Column
              key="ID"
              field="_id"
              header="ID"
              sortable
              // style={{ width: '10%' }}
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="imageUrl"
              //field="imageUrl"
              body={imageBodyTemplate}
              header="Photo"
              sortable
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="name"
              field="name"
              header="Nom"
              sortable
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="partyEntity"
              field="partyEntity"
              header="Parti politique"
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="compaingLocation"
              field="compaingLocation"
              header="Siege"
              sortable
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="dateBirth"
              field="dateBirth"
              header="Date de naissance"
              sortable
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="cin"
              field="cin"
              header="CIN"
              sortable
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="birthLocation"
              field="birthLocation"
              header="Lieu de naissance"
              sortable
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              key="action"
              header="Action"
              body={actionTemplateCandidat}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
        </TableContainer>
      </Card>
    </>
  );
};

export default TableCandidate;
