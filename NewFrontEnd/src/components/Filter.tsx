import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import single from '../assets/icons/roomType/single.svg'
import double from '../assets/icons/roomType/double.svg'
import triple from '../assets/icons/roomType/triple.svg'
import livingRoom from '../assets/icons/roomType/livingRoom.svg'
import studio from '../assets/icons/roomType/studio.svg'
import suite from '../assets/icons/roomType/suite.svg'
import singleChosen from '../assets/icons/roomType/singleChosen.svg'
import doubleChosen from '../assets/icons/roomType/doubleChosen.svg'
import tripleChosen from '../assets/icons/roomType/tripleChosen.svg'
import livingRoomChosen from '../assets/icons/roomType/livingRoomChosen.svg'
import studioChosen from '../assets/icons/roomType/studioChosen.svg'
import suiteChosen from '../assets/icons/roomType/suiteChosen.svg'
import {PathProps} from '../assets/interface/props'
import {intervalOptions,yearMonths} from '../assets/interface/constants'
import {
    female,
    femaleChosen,
    male,
    maleChosen,
    lgbtq,
    lgbtqChosen,
    parking,
    parkingChosen,
    pets,
    petsChosen,
    privateBath,
    privateBathChosen,
    fourTwoZero,
    fourTwoZeroChosen
} from "./utility/OtherPic"

interface OtherReq {
    female: boolean;
    male: boolean;
    lgbtq: boolean;
    parking: boolean;
    pets: boolean;
    privateBath: boolean;
    fourTwoZero:boolean;
}

interface RoomType {
    single: boolean;
    double: boolean;
    triple: boolean;
    livingRoom: boolean;
    suite: boolean;
    studio: boolean;
}

interface Price{
    minimum: number;
    maximum: number;
}

function MoveInSelect(selectedEarlyMonth:string, selectedEarlyInterval:string,selectedLateMonth:string, selectedLateInterval:string){
    if (yearMonths.indexOf(selectedEarlyMonth) >  yearMonths.indexOf(selectedLateMonth)){
        // neither has anytime as the option
        if (![selectedEarlyMonth,selectedLateMonth].includes(yearMonths[0])){
            return false
        }
    }
    if (yearMonths.indexOf(selectedEarlyMonth) ==  yearMonths.indexOf(selectedLateMonth) && ![selectedEarlyMonth,selectedLateMonth].includes(yearMonths[0])){
        // neither has anytime as the option
        if (![selectedEarlyInterval,selectedLateInterval].includes(intervalOptions[0]) && intervalOptions.indexOf(selectedEarlyInterval) >  intervalOptions.indexOf(selectedLateInterval)){
            return false
        }
    }
    return true
}

function StringWrap(toWrap:string|null){
    if (toWrap == null){
        return "placeHolder"
    }
    return toWrap
}

const Filter: React.FC<PathProps> = ({
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [selectedEarlyInterval, setEarlyInterval] = useState<string>("Anytime");
  const [selectedEarlyMonth, setEarlyMonth] = useState<string>("Anytime");
  const [selectedLateInterval, setLateInterval] = useState<string>("Anytime");
  const [selectedLateMonth, setLateMonth] = useState<string>("Anytime");
  const [monthCount, setMonthCount] = useState<number>(1);
  const [minute, setMinute] = useState<number>(20);
  const [roomType, setRoomType] = useState<RoomType>({
    single: false,
    double: false,
    triple: false,
    livingRoom: false,
    suite: false,
    studio: false
})
   const [OtherReq, setOtherReq] = useState<OtherReq>({
    female: false,
    male: false,
    lgbtq: false,
    parking: false,
    pets: false,
    privateBath: false,
    fourTwoZero:false
   })

const [price, setPrice] = useState<Price>({
    minimum:100,
    maximum:1000
});
  return (
    <>
      <Button onClick={() => setShow(true)}>Filter & Match</Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        centered
      >
        <Container>
        <Form>
        <br></br>
            <Row className="justify-content-md-center">
                <span className="title">Distance</span>
          </Row>
            <br></br>
            <Row>
                <Col md={{span:9,offset:1}}>
                <Row>
                <Col md={2}> <span className="word"> Less than </span></Col>
                <Col md={3}> 
                    <Form.Group controlId="distanceToSchool">
                        <Form.Control className="form-input" type="number" min="0" max="120" 
                        value={minute}
                        onChange={ event => setMinute(parseInt(event.target.value))}
                        isValid={minute > 0 && monthCount <= 120}
                        isInvalid={monthCount <= 0 || monthCount > 120}
                        placeholder="minutes to school" />
                    </Form.Group>
                </Col>
                <span className="word">min public transportation to Price Center</span>
                </Row>
                </Col>
            </Row>
            <br></br>
            <hr/>
            <br></br>
            <br></br>
            <Row>
                <Col md={1}></Col>
                <span className="title">Room Type</span>
                <Col md={3}></Col>
                <span className="title">Price Range</span>
          </Row>
          <Row>
                <Col md={{span:6,offset:1}}>
                    <Row>
                    <Button className="btn-filter">
                    <img
                    className="d-block"
                    src={roomType["single"] ? singleChosen : single}
                    onClick ={()=>{setRoomType({...roomType, single:!roomType["single"]})}}
                    alt="Single"
                    />
                    </Button>
                    <Button className="btn-filter">
                    <img
                    className="d-block"
                    src={roomType["double"] ? doubleChosen : double}
                    onClick ={()=>{setRoomType({...roomType, double:!roomType["double"]})}}
                    alt="Double"
                    />
                    </Button>
                    <Button className="btn-filter">
                    <img
                    className="d-block"
                    src={roomType["triple"] ? tripleChosen : triple}
                    onClick ={()=>{setRoomType({...roomType, triple:!roomType["triple"]})}}
                    alt="Triple"
                    />
                    </Button>
                    </Row>
                    <Row>
                    <Button className="btn-filter">
                    <img
                    className="d-block"
                    src={roomType["livingRoom"] ? livingRoomChosen : livingRoom}
                    onClick ={()=>{setRoomType({...roomType, livingRoom:!roomType["livingRoom"]})}}
                    alt="LivingRoom"
                    />
                    </Button>
                    <Button className="btn-filter">
                    <img
                    className="d-block"
                    src={roomType["suite"] ? suiteChosen : suite}
                    onClick ={()=>{setRoomType({...roomType, suite:!roomType["suite"]})}}
                    alt="Suite"
                    />
                    </Button>
                    <Button className="btn-filter">
                    <img
                    className="d-block"
                    src={roomType["studio"] ? studioChosen : studio}
                    onClick ={()=>{setRoomType({...roomType, studio:!roomType["studio"]})}}
                    alt="Studio"
                    />
                    </Button>
                    </Row>
                </Col>
                <Col>
                    <br></br>
                    <Row>
                    <span className="word notes"> Min</span>
                    <Form.Group controlId="minPrice">
                            <Form.Control className="form-input" type="number" min="0"
                            value={price["minimum"]}
                            onChange={(event)=>{setPrice({...price, minimum:parseInt(event.target.value)})}}
                            isValid={price["minimum"] > 0}
                            isInvalid={price["minimum"] <= 0}
                            placeholder="min Price" />
                    </Form.Group>
                    </Row>
                    <Row>
                    <span className="word notes"> Max</span>
                    <Form.Group controlId="maxPrice">
                            <Form.Control className="form-input" type="number" min="0"
                            value={price["maximum"]}
                            onChange={(event)=>{setPrice({...price, maximum:parseInt(event.target.value)})}}
                            isValid={price["maximum"] > 0 && price["maximum"] >= price["minimum"]}
                            isInvalid={price["maximum"] <= 0}
                            placeholder="max Price" />
                    </Form.Group>
                    </Row>
                </Col>

          </Row>
          <br></br>
          <hr/>
            <br></br>
            <br></br>
            <Row>
                <Col md={1}></Col>
                <span className="title">Move in time</span>
                <Col md={3}></Col>
                <span className="title">Stay period</span>
            </Row>
            <br></br>
          <Row>
          <Col md={1}> 
          </Col>
              <Row>
              <span className="word notes">As early as </span>
              <Dropdown>
              <Dropdown.Toggle className="drop-width" variant="success" id="dropdown-basic">
                    {selectedEarlyInterval}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {intervalOptions.map(interval => <Dropdown.Item eventKey={interval} onSelect={ eventKey => setEarlyInterval(StringWrap(eventKey))}>{interval}</Dropdown.Item>)}
                </Dropdown.Menu>
                </Dropdown>
              <Form.Group>
                <Form.Control className="clear-border" as={Dropdown} isValid={MoveInSelect(selectedEarlyMonth, selectedEarlyInterval,selectedLateMonth, selectedLateInterval)} isInvalid={!MoveInSelect(selectedEarlyMonth, selectedEarlyInterval,selectedLateMonth, selectedLateInterval)}>
                <Dropdown.Toggle className="form-dropdown right-button drop-width" variant="success" id="dropdown-basic">
                    {selectedEarlyMonth}
                </Dropdown.Toggle>
                <Dropdown.Menu className="menu">
                {yearMonths.map(month => <Dropdown.Item eventKey={month} onSelect={ eventKey => setEarlyMonth(StringWrap(eventKey))}>{month}</Dropdown.Item>)}
                </Dropdown.Menu>
                </Form.Control>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Invalid Value!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Col md={1}></Col>
              <Row>
              <Col md={2}></Col>
              <Col>
              <Form.Group as={Row} controlId="formNumberOfMonths">
                    <Col sm={8} md={8}>
                    <Form.Control 
                    value={monthCount}
                    onChange={ event => setMonthCount(parseInt(event.target.value))}
                    type="number" placeholder="# of Months" isValid={monthCount > 0 && monthCount <= 12}
                    isInvalid={monthCount <= 0 || monthCount > 12}
                    />
                    </Col>
                    <span className="word">Month(s)</span>
                </Form.Group>
              </Col>
              </Row>
          </Row>
          <Row>
          <Col md={1}> 
          </Col>
          <Row>
              <span className="word notes">As late as </span>
              <Dropdown>
              <Dropdown.Toggle className="drop-width" variant="success" id="dropdown-basic">
                    {selectedLateInterval}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {intervalOptions.map(interval => <Dropdown.Item eventKey={interval} onSelect={ eventKey => setLateInterval(StringWrap(eventKey))}>{interval}</Dropdown.Item>)}
                </Dropdown.Menu>
                </Dropdown>
              <Form.Group>
                <Form.Control className="clear-border" as={Dropdown}>
                <Dropdown.Toggle className="form-dropdown right-button drop-width" variant="success" id="dropdown-basic">
                    {selectedLateMonth}
                </Dropdown.Toggle>
                <Dropdown.Menu className="menu">
                {yearMonths.map(month => <Dropdown.Item eventKey={month} onSelect={ eventKey => setLateMonth(StringWrap(eventKey))}>{month}</Dropdown.Item>)}
                </Dropdown.Menu>
                </Form.Control>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Invalid Value!</Form.Control.Feedback>
                </Form.Group>
              </Row>
          </Row>
          <br></br>
          <hr/>
          <br></br>
          <Row className="justify-content-md-center">
                <span className="title">Others</span>
          </Row>
          <br></br>
          <Row>
                    <Button className="btn-filter">
                    <img
                    className="d-block"
                    src={OtherReq["female"] ? femaleChosen : female}
                    onClick ={()=>{setOtherReq({...OtherReq, female:!OtherReq["female"]})}}
                    alt="Female"
                    />
                    </Button>
                    <Button className="btn-filter">
                    <img
                    className="d-block"
                    src={OtherReq["male"] ? maleChosen : male}
                    onClick ={()=>{setOtherReq({...OtherReq, male:!OtherReq["male"]})}}
                    alt="Male"
                    />
                    </Button>
                    <Button className="btn-filter">
                    <img
                    className="d-block"
                    src={OtherReq["parking"] ? parkingChosen : parking}
                    onClick ={()=>{setOtherReq({...OtherReq, parking:!OtherReq["parking"]})}}
                    alt="Parking"
                    />
                    </Button>
                    </Row>
                    <Row>
                    <Button className="btn-filter">
                    <img
                    className="d-block"
                    src={OtherReq["pets"] ? petsChosen : pets}
                    onClick ={()=>{setOtherReq({...OtherReq, pets:!OtherReq["pets"]})}}
                    alt="Pets"
                    />
                    </Button>
                    <Button className="btn-filter">
                    <img
                    className="d-block"
                    src={OtherReq["lgbtq"] ? lgbtqChosen : lgbtq}
                    onClick ={()=>{setOtherReq({...OtherReq, lgbtq:!OtherReq["lgbtq"]})}}
                    alt="Lgbtq"
                    />
                    </Button>
                    <Button className="btn-filter">
                    <img
                    className="d-block"
                    src={OtherReq["privateBath"] ? privateBathChosen : privateBath}
                    onClick ={()=>{setOtherReq({...OtherReq, privateBath:!OtherReq["privateBath"]})}}
                    alt="PrivateBath"
                    />
                    </Button>
                    <Button className="btn-filter">
                    <img
                    className="d-block"
                    src={OtherReq["fourTwoZero"] ? fourTwoZeroChosen : fourTwoZero}
                    onClick ={()=>{setOtherReq({...OtherReq, fourTwoZero:!OtherReq["fourTwoZero"]})}}
                    alt="420"
                    />
                    </Button>
                    </Row>
                    <br></br>
          </Form>
        <Row>
        </Row>
        </Container>
      </Modal>
    </>
  );
};

export default Filter;

