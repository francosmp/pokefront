import { Modal, Button } from "react-bootstrap";
import React from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

class ModalC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      hideModal: null,
      result: true,
    };
    this.updateStateOnce = this.updateStateOnce.bind(this);
    this.reiniciar = this.reiniciar.bind(this);
  }

  componentWillUpdate() {
    if (this.state.result) this.updateStateOnce();
  }

  reiniciar() {
    this.props.onHide();
    this.setState({ details: {}, result: true });
  }

  async updateStateOnce() {
    await axios.get(this.props.pokemon.url).then((res) => {
      this.setState({ details: res.data, result: false });
    });
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.pokemon.name.charAt(0).toUpperCase() +
              this.props.pokemon.name.slice(1)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="row">
            <div class="columnl">
              <img
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                  this.state.details.id +
                  ".png"
                }
                alt=""
                width={280}
                height={280}
              />
            </div>
            <div class="columnr">
              <h5>Detalles</h5>
              {this.state.details.shape && !this.state.result ? (
                <Container>
                  <Row className="p-0">
                    <Col xs md lg="6">
                      Número:
                    </Col>
                    <Col>{this.state.details.order}</Col>
                  </Row>
                  <Row className="p-0">
                    <Col xs md lg="6">
                      Legendario:
                    </Col>
                    <Col>{this.state.details.is_legendary ? "Si" : "No"}</Col>
                  </Row>
                  <Row className="p-0">
                    <Col xs md lg="6">
                      Mítico:
                    </Col>
                    <Col>{this.state.details.is_mythical ? "Si" : "No"}</Col>
                  </Row>
                  <Row className="p-0">
                    <Col xs md lg="6">
                      Felicidad:
                    </Col>
                    <Col>{this.state.details.base_happiness}</Col>
                  </Row>
                  <Row className="p-0">
                    <Col xs md lg="6">
                      Otaku:
                    </Col>
                    <Col>{this.state.details.names[0].name}</Col>
                  </Row>
                </Container>
              ) : null}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.reiniciar()}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ModalC;
