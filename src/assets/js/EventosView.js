import '../css/UsuariosView.css';
import React, { useState, useEffect } from 'react';
import { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import axios from 'axios';
import '../../../node_modules/primeicons/primeicons.css'

class EventosView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            row: undefined
        }
    }

    queryGetDatos = () => {
        axios
        .get('https://localhost:44342/api/Eventos/')
        .then(res => {
            //console.log(res.data);
            this.setState({events: res.data}, () => console.log(res.data));
        });
    }

    componentDidMount() {
        this.queryGetDatos();
    }

    render() {
        
        

        const queryPostDatos = () => {
            axios
            .post("https://localhost:44342/api/Eventos/", 
                {
                    "EventoId": null,
                    "EquipoLocal": document.getElementById("equipoLocal").value,
                    "EquipoVisitante": document.getElementById("equipoVisitante").value,
                    "Goles": document.getElementById("goles").value,
                    "Fecha": document.getElementById("fecha").value,
                    "Mercados": null
                }
            )
            .then(function (response) {
                //this.queryGetDatos();
                console.log(response);
            });
        }

        const queryPutDatos = () => {
            console.log(this.state.row.EventoId);
            const res = axios.post('https://localhost:44342/api/Eventos/',
            {
                "EventoId": this.state.row.EventoId,
                "EquipoLocal": this.state.row.EquipoLocal,
                "EquipoVisitante": this.state.row.EquipoVisitante,
                "Goles": this.state.row.Goles,
                "Fecha": document.getElementById("fecha_mod").value,
                "Mercados": null
            });
        }

        const queryDeleteDatos = (id) => {
            axios
            .delete('https://localhost:44342/api/Eventos/?id=' + id)
            .then(response => {
                //this.queryGetDatos();
            });
        }

        const DateBtns = (rowData) => {
            return (<div>
                <Button icon="pi pi-pencil" className="btn-modify-pwd" onClick={()=>handleEditDate(rowData)}></Button>
                <div style={{height: '5px'}}></div>
                <Button icon="pi pi-trash" className="btn-delete-user" onClick={()=>handleDeleteClick(rowData)}></Button>
            </div>);
        }

        const DeleteBtns = (rowData) => {
            return (<div>
                    <button className="btn-delete-user" onClick={()=>handleDeleteClick(rowData)}></button>
            </div>);
        }

        const handleNewEventClick = (rowData) => {
            console.log(rowData);
            if (document.getElementsByClassName("addNewEvent")[0].style.display == "flex") {
                document.getElementsByClassName("addNewEvent")[0].style.display = "none";
                document.getElementsByClassName("pwd_input")[0].value = "";
                document.getElementsByClassName("pwd_input")[1].value = "";
                document.getElementsByClassName("pwd_input")[2].value = "";
                document.getElementsByClassName("pwd_input")[3].value = undefined;

            } else {
                document.getElementsByClassName("addNewEvent")[0].style.display = "flex";
            }
        }

        const handleEditDate = (rowData) => {
            this.setState({row: rowData});

            if (document.getElementsByClassName("editDate")[0].style.display == "flex") {
                console.log(rowData);
                document.getElementsByClassName("editDate")[0].style.display = "none";
                document.getElementById("fecha_mod").value = undefined;

            } else {
                document.getElementsByClassName("editDate")[0].style.display = "flex";
            }
        }

        const handleDeleteClick = (rowData) => {
            if (window.confirm("¿Realmente quieres eliminar el evento: " + rowData.EventoId + "? \n Se borrará de forma permanente")) {
                queryDeleteDatos(rowData.EventoId);
            } 
        }

        return ( 
            <div>

                <div className="table-wrapper">
                    <div className="fl-table">
                        <DataTable class="fl-table" paginator rows={13} value={this.state.events}>
                            <Column sortable={true} field="EventoId" header="ID Evento" filter filterPlaceholder="ID Evento"></Column>
                            <Column sortable={true} field="EquipoLocal" header="Equipo local" filter filterPlaceholder="Equipo local"></Column>
                            <Column sortable={true} field="EquipoVisitante" header="Equipo visitante" filter filterPlaceholder="Equipo visitante"></Column>
                            <Column sortable={true} field="Goles" header="Goles"></Column>
                            <Column sortable={true} field="Fecha" filter header="Fecha"></Column>
                            <Column sortable={true} body={DateBtns} header="Eliminar"></Column>
                        </DataTable>
                    </div>
                    <div className="addNewEvent">
                        <h1>Nuevo evento</h1>
                        <br>
                        </br>
                        <input id="equipoLocal" className="pwd_input" placeholder="Equipo local"></input>
                        <input id="equipoVisitante" className="pwd_input" placeholder="Equipo visitante"></input>
                        <input id="goles" className="pwd_input" type="number" placeholder="Goles"></input>
                        <input id="fecha" className="pwd_input" type="date" placeholder="Fecha"></input>
                        <br></br>
                        <div style={{display: 'flex'}}>
                            <button onClick={queryPostDatos}>Aceptar</button>
                            <div style={{width: "25px"}}></div>
                            <button onClick={handleNewEventClick}>Cancelar</button>
                        </div>
                    </div>
                    <div className="editDate">
                        <h1>Modificar fecha del partido</h1>
                        <br>
                        </br>
                        <input id="fecha_mod" className="date_input" type="date" placeholder="Fecha"></input>
                        <br></br>
                        <div style={{display: 'flex'}}>
                            <button onClick={queryPutDatos}>Aceptar</button>
                            <div style={{width: "25px"}}></div>
                            <button onClick={handleEditDate}>Cancelar</button>
                        </div>
                    </div>
                    <Button onClick={handleNewEventClick}>Nuevo Evento</Button>
                </div>
            </div>
        );
    }
}
export default EventosView;