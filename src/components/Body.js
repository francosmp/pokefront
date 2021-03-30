import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import axios from "axios";
import "../css/body.css";
import ModalC from "./ModalC";

class Body extends React.Component {
  render() {
    let colsObjs = [];
    return (
      <Container className="App-body">
        {this.state.pokemonList.map((objP, indexP) => {
          colsObjs.push(objP);
          let colsObjsT = colsObjs;
          if ((indexP + 1) % 15 === 0) {
            colsObjs = [];
            return (
              <Row className="p-0" key={(indexP + 1) / 15}>
                {colsObjsT.map((objC, indexC) => {
                  return (
                    <Col className="p-1" key={indexC + 1}>
                      <img
                        className="hover-zoom"
                        src="https://icons.iconarchive.com/icons/chrisl21/minecraft/256/Tnt-icon.png"
                        alt=""
                        width={64}
                        height={64}
                        onClick={() => this.handleShow(indexP - 14 + indexC)}
                      />
                    </Col>
                  );
                })}
              </Row>
            );
          }
          return null;
        })}
        <ModalC
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          pokemon={this.state.pokemon}
        />
      </Container>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      show: false,
      pokemon: { name: "", url: "" },
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(num) {
    this.setState({ pokemon: this.state.pokemonList[num] });
    this.setState({ show: true });
  }

  async componentDidMount() {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=150`)
      .then((res) => {
        this.setState({ pokemonList: res.data.results });
      });
  }
}

export default Body;
