import '../css/UsuariosView.css';
import React, { useState, useEffect } from 'react';
import { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import axios from 'axios';
import '../../../node_modules/primeicons/primeicons.css'

class ApuestasView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            bets: []
        }
    }

    queryGetDatos = () => {
      axios
      .get('https://localhost:44342/api/Apuestas/')
      .then(res => {
          //console.log(res.data);
          this.setState({bets: res.data}, () => console.log(res.data));
      });
    }

    componentDidMount() {
      this.queryGetDatos();
    }
  
    render() {

        return ( 
            <div>

                <div className="table-wrapper">
                    <div className="fl-table">
                        <DataTable class="fl-table" paginator rows={25} value={this.state.bets}>
                            <Column sortable={true} field="UsuarioId" header="Usuario" filter filterPlaceholder="ID Usuario"></Column>
                            <Column sortable={true} field="Mercado.Evento.EventoId" header="Evento" filter filterPlaceholder="ID evento" filterType="number" ></Column>
                            <Column sortable={true} field="Mercado.MercadoId" header="Mercado" filter filterPlaceholder="ID Mercado" filterType="number" ></Column>
                            <Column sortable={true} field="Fecha" header="Fecha"></Column>
                            <Column sortable={true} field="Cuota" header="Cuota"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        );
    }
}
export default ApuestasView;