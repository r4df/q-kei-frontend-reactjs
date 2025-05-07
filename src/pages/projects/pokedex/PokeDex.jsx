import React, { Component } from "react";
import "./style.css"
import ContainerType1 from '../../../component/ContainerType1'
import PokemonLogo96 from "./assets/icons8-pokemon-ball-96.png"


const GLPOKEAPIURL = "https://pokeapi.co/api/v2/pokemon/";


export default class PokeDex extends Component {

    constructor() {
        super();
        this.handlerGetUrlData = this.getUrlData.bind(this);
        this.default_state = {
            data: {
                name: "???",
                height: 0.0,
                weight: 0.0,
                sprites: {
                    front_default: PokemonLogo96,
                },
                types: [{ type: { name: "???" } }],
                id: "???",
            }
        }

        this.state = this.default_state
    }

    handleInputSearch = (event) => {
        const search_val = event.target.value ? event.target.value : "test"
        const search_val_lc = search_val.toLowerCase()
        this.setState({
            searchValue: search_val_lc,
        });
    };



    getUrlData() {
        fetch(GLPOKEAPIURL + `${this.state.searchValue}`)
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                console.info(jsonData)
                this.setState({
                    data: jsonData,
                });
            }).catch((error) => {
                this.setState(this.default_state);
            });
    }

    render() {
        return (
            <div className="container">
                <ContainerType1 className="d-lg-block d-none">
                    <h1 className="m-0">PokeDex</h1>
                </ContainerType1>

                <ContainerType1 style={{ fontFamily: "zx-spectrum" }}>
                    {/* Search Button */}
                    <div className="border border-1 border-dark rounded p-3 mb-3" style={{ backgroundColor: "#8EA3A6" }}>
                        <div className="d-flex flex-column flex-lg-row gap-2">
                            <input type="text" className="form-control" placeholder="e.g. pikachu" onChange={this.handleInputSearch}></input>
                            <button className="btn btn-primary" type="button" id="button-search" onClick={this.handlerGetUrlData}>
                                <span className="d-flex flex-row justify-content-center">Search<i className="bi bi-search ms-1"></i></span>
                            </button>
                        </div>
                    </div>

                    {/* Result */}
                    <div className="d-flex flex-lg-row flex-column border border-1 border-black p-3 rounded" style={{ backgroundColor: "#8EA3A6" }}>

                        <>
                            <div className="d-lg-flex d-none align-items-center w-25 border border-1 border-black p-3 mb-0 me-3 rounded" style={{ backgroundColor: "#E6E9AF" }}>
                                <img className="w-100" src={this.state.data.sprites.front_default} alt="pokemon"></img>
                            </div>

                            <div className="d-lg-none d-flex justify-content-center border border-1 border-black p-3 mb-3 rounded" style={{ backgroundColor: "#E6E9AF" }}>
                                <img className="w-50" src={this.state.data.sprites.front_default} alt="pokemon"></img>
                            </div>
                        </>


                        <div className="flex-fill">

                            <div className="border border-1 border-black p-3 rounded mb-3" style={{ backgroundColor: "#E6E9AF" }}>
                                <p>No.{this.state.data.id}</p>
                                <p>Name: {this.state.data.name.toUpperCase()}</p>
                            </div>

                            <div className="border border-1 border-black p-3 rounded mb-3" style={{ backgroundColor: "#E6E9AF" }}>
                                <p>Type: </p>
                                <div className="d-flex flex-row">
                                    {this.state.data.types.map((item, index) => (
                                        <div key={index} className={`pokedex-pd-type-${item.type.name}`}>
                                            <p className="m-0 p-0">{item.type.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border border-1 border-black p-3 rounded" style={{ backgroundColor: "#E6E9AF" }}>
                                <p>Ht: {Number(this.state.data.height) / 10} m</p>
                                <p>Wt: {Number(this.state.data.weight) / 10} kg</p>
                            </div>

                        </div>


                    </div>
                </ContainerType1>
            </div>
        );
    }
}
