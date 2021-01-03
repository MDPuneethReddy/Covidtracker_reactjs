import './App.css';
import React,{useEffect,useState} from "react"
import axios from "axios"
import { Row, Col, Card } from 'antd';
import { AllCountries } from './components/AllCountries';
import {  useDispatch } from 'react-redux';
import { updateCountries } from './store/dispatcher';
import 'antd/dist/antd.css';
import { LineChart } from './components/LineChart';
import { BarChart } from './components/BarChart';
import { Countries } from './components/Countries';
function Main() {
  const [confirmed,setConfirmed]=useState<any>("")
  const [recovered,setRecovered]=useState<any>("")
  const [deaths,setDeaths]=useState<any>("")
  const [date,setDate]=useState<any>("")
  const dispatch=useDispatch()
  const style = {  padding: '8px 0' };
  useEffect(()=>{
    axios.get("https://covid19.mathdro.id/api").then(response=>{
      console.log(response)
      setConfirmed(response.data.confirmed.value)
        setRecovered(response.data.recovered.value)
        setDeaths(response.data.deaths.value)
        setDate(response.data.lastUpdate)
      axios.get("https://covid19.mathdro.id/api/countries").then(response=>{
        let countries:Array<any>=[]
        response.data.countries.map((item:any)=>{
          countries.push(item.name)
        })
        dispatch(updateCountries(countries))
      })
      .catch(err=>{
          console.log(err)
        })
    })
    .catch(err=>{
      console.log(err)
    })
  },[])
  return (
    <div>
      <h1 style={{textAlign:"center"}}>CovidTracker</h1>
      <p>Last updated on {new Date(date).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</p>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" span={8}>
        <div style={style}>
        <Card title="Confirmed" style={{textAlign:"center", backgroundColor: "#eaff8f",borderStyle: "solid" }}>
          <p style={{textAlign:"center"}}>{confirmed}</p>
        </Card>
        </div>
      </Col>
      <Col className="gutter-row" span={8}>
        <div style={style}>
        <Card title="Recovered" style={{ textAlign:"center",backgroundColor: "#fffb8f",borderStyle: "solid" }}>
       <p style={{textAlign:"center"}}>{recovered}</p>
       </Card>
        </div>
      </Col>
      <Col className="gutter-row" span={8}>
        <div style={style}>
        <Card title="Deaths" style={{textAlign:"center",backgroundColor: "#ffa39e",borderStyle: "solid" }}>
        <p style={{textAlign:"center"}}>{deaths}</p>
       </Card>
        </div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
    </Row>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" span={12}>
        <div style={style}>
        <LineChart />
        </div>
      </Col>
      <Col className="gutter-row" span={12}>
        <div style={style}>
        <BarChart confirmed={confirmed} recovered={recovered} deaths={deaths}/>
        </div>
      </Col>
    </Row>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" span={24}>
        <div style={style}>
          <AllCountries />
        </div>
      </Col>
    </Row>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" span={24}>
        <div style={style}>
          <h2 style={{textAlign:"center"}}>Countries List</h2>
          <Countries />
        </div>
      </Col>
    </Row>
    </div>
  );
}

export default Main;
