import '../css/UsuariosView.css';
import { Component, ReactDOM } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import axios from 'axios';
import '../../../node_modules/primeicons/primeicons.css';
import React, { useState, useEffect } from 'react';

class MercadosView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            markets: [],
            marketsBuffer: [],
            refresh: ""
        }
    }

    componentDidMount() {
        this.queryGetDatos();
    }

    filterTituloMercado = () => {
        const inputValue = document.getElementById("inputFilterTituloMercado").value;

        let strSearch = [];
        this.state.marketsBuffer = [];

        this.state.markets.forEach(element => {
            strSearch = element.Evento.EquipoLocal + " / " + element.Evento.EquipoVisitante;

            if (strSearch.indexOf(inputValue) >= 0) {
                console.log(this.state.marketsBuffer.indexOf(element));
                if (this.state.marketsBuffer.lastIndexOf(element) <= 0) {
                    this.state.marketsBuffer.push(element);
                }
            } else {
                if (this.state.marketsBuffer.lastIndexOf(element) >= 0) {
                    this.state.marketsBuffer.splice(this.state.marketsBuffer.indexOf(element), 1);
                }
            }
        });

        this.setState({refresh: "refr"});
    }

    queryGetDatos = () => {
        axios
        .get('https://localhost:44342/api/Mercados/')
        .then(res => {
            //console.log(res.data);
            this.setState({markets: res.data, marketsBuffer: res.data}, () => console.log(res.data));
        });
    }

  
    render() {
        const handleLockMarket = (rowData) => {
            if (rowData.Locked) {
                axios
                .get('https://localhost:44342/api/Mercados/?id=' + rowData.MercadoId + "&state=false")
                .then(res => {
                    //console.log(res.data);
                    this.setState({markets: res.data}, () => console.log(res.data));
                    this.queryGetDatos();
                });
            } else {
                axios
                .get('https://localhost:44342/api/Mercados/?id=' + rowData.MercadoId + "&state=true")
                .then(res => {
                    //console.log(res.data);
                    this.setState({markets: res.data}, () => console.log(res.data));
                    this.queryGetDatos();
                });
            }
        }

        const ApuestaBloqueado = (rowData) => {
            let btnIcon = "pi pi-lock";
            if (!rowData.Locked) {
                btnIcon = "pi pi-lock-open";
            }
            return (
                <div>
                    <Button icon={btnIcon} className="btn-lock-market" onClick={()=>handleLockMarket(rowData)}></Button>
                </div>
            );
        }

        const tituloMercado = (rowData) => {
            return (rowData.Evento.EquipoLocal + " / " + rowData.Evento.EquipoVisitante);
        }

        
        return ( 
            <div>
                <div className="table-wrapper">
                    <div className="fl-table">
                        <input id="inputFilterTituloMercado" placeholder="Filtrar por nombre" onChange={this.filterTituloMercado}></input>
                        <br></br>
                        <br></br>
                    </div>
                    
                    <DataTable class="fl-table" paginator rows={10} value={this.state.marketsBuffer}>
                        <Column sortable={true} body={tituloMercado} header="Título"></Column>
                        <Column sortable={true} field="Tipo" header="Tipo"></Column>
                        <Column sortable={true} field="CuotaOver" header="Cuota Over"></Column>
                        <Column sortable={true} field="CuotaUnder" header="Cuota Under"></Column>
                        <Column sortable={true} field="DineroOver" header="Dinero Over" ></Column>
                        <Column sortable={true} field="DineroUnder" header="Dinero Under"></Column>
                        <Column sortable={true} header="Bloqueado" body={ApuestaBloqueado}></Column>
                    </DataTable>
                </div>
            </div>
        );
    }
}
export default MercadosView;