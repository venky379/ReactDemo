import './App.css';
import {useState,useEffect,useCallback} from 'react';

function App() {
  const [data, setData] = useState(null);
  const [year, setYear] = useState(null);
  const [launchStatus, setlaunchStatus] = useState(null);
  const [landStatus, setlandStatus] = useState(null);
  const [statusLaunch,setStatusLaunch] = useState(['True','False'])
  const [filterData, setFilterData] = useState(null);
  const [launchYear, setlaunchYear] = useState(null);

  const getInvoice = useCallback(async () => {
    fetch("https://api.spacexdata.com/v3/launches?limit=100")
      .then((response)=>response.json())
      .then((resp)=>{
        const obj = [...new Map(resp.map(item => [JSON.stringify(item.launch_year), item.launch_year])).values()];
        setlaunchYear(obj)
        const filtereddata = resp.filter((item)=>item.launch_year === '2020')
        setFilterData(filtereddata)
        setData(resp)
      })
      .catch((error)=>{
        console.log(error)
      });
  }, []);

  useEffect(() => {
    getInvoice();
  }, [getInvoice]);

  if (!data) {
    return null;
  }

  const FilterByDate = (Fyear) => {
    if(year === Fyear){ 
      setYear(null)
      setFilterData(data)  
    }
    else{ 
      setYear(Fyear)
      const filtereddata = data.filter((item)=>item.launch_year === Fyear)
      setFilterData(filtereddata) 
    } 
  }
  const FilterLaunch = (fyear,flaunchStatus,flandStatus) => {
    setYear(fyear)
    setlaunchStatus(flaunchStatus)
    setlandStatus(flandStatus)
    console.log(year,launchStatus,landStatus)
      fetch("https://api.spacexdata.com/v3/launches?limit=100&launch_success="+(flaunchStatus===null?'':flaunchStatus)+"&land_success="+(flandStatus===null?'':flandStatus)+"&launch_year="+(fyear===null?'':fyear))
      .then((response)=>response.json())
        .then((resp)=>{
          setFilterData(resp)
        })
        .catch((error)=>{
          console.log(error)
        });
  }
  return (
    <div style={{backgroundColor:'#F5F5F5'}}>
       <div className="row">
         <div>SpaceX Launch Programs</div>
         <div className='col-lg-2-20 col-md-2-20 col-sm-1'>
           <div style={{margin:10,backgroundColor:'white',padding:10,height:450}}>
            <div style={{fontWeight:'bold'}}>Filters</div>
            <div style={{textAlign:'center',marginTop:20,textDecoration: 'underline'}}>Launch Years
            <div className='row'>
            {
                launchYear.map((item)=>
                <div className='col-md-2 col-sm-2 col-lg-2'>
                  <button onClick={() => FilterLaunch(item,launchStatus,landStatus)} 
                  className='btn'style={year === item ? {backgroundColor:"#0FF335"} : { backgroundColor:"#C6FECF"}}>{item}</button>
                </div>
                )
              }
              </div>
              
            <div style={{textAlign:'center',marginTop:20,textDecoration: 'underline'}}>SuccessFull Launch</div>
            {
              statusLaunch.map((item)=>
                <div className='col-md-2 col-sm-2 col-lg-2'>

                  <button className='btn'style={launchStatus === item ? {backgroundColor:"#0FF335"} : { backgroundColor:"#C6FECF"}}onClick={() => FilterLaunch(year,(item==="True"?true:false),landStatus)} >{item}</button>
                </div>
              )
            }
            <div style={{textAlign:'center',marginTop:50,textDecoration: 'underline'}}>SuccessFull Langing</div>
            {
              statusLaunch.map((item)=>
                <div className='col-md-2 col-sm-2 col-lg-2'>
                  <button className='btn'style={landStatus === item ? {backgroundColor:"#0FF335"} : { backgroundColor:"#C6FECF"}}onClick={() => FilterLaunch(year,launchStatus,(item==="True"?true:false))} >{item}</button>
                </div>
              )
            } 
            </div>
            </div>
          </div>  
         <div className='col-lg-2-80 col-md-2-80 col-sm-1'style={{marginTop:10}}>
         {
              filterData.map((item)=>
              <div className='col-md-2 col-sm-1 col-lg-4'>
                <div style={{height:'440px',backgroundColor:'white',marginBottom:5,marginRight:2.5,marginLeft:2.5,padding:10,}}>
                  <img style={{height:'250px',width:'250px',backgroundColor:'#F5F5F5'}}src={item.links.mission_patch}/>
                  <div style={{color:'#7B86F3',marginTop:'15px'}}>{item.mission_name}({item.flight_number})</div>
                  <div><span style={{fontWeight:'bold'}}>Mission Ids:</span> {
                    item.mission_id.map((i)=>{
                      if(item.mission_id){
                        return <div>{i}</div>
                      }
                    })
                    }
                    </div>
                  <div><span style={{fontWeight:'bold'}}>Launch Year: </span>{item.launch_year}</div>
                  <div><span style={{fontWeight:'bold'}}>SuccessFull Launch: </span>{item.launch_success?'True':'False'}</div>
                  <div><span style={{fontWeight:'bold'}}>SuccessFull Landing: </span>{item.rocket.first_stage.cores[0].land_success?'True':'False'}</div>    
                </div>
              </div>
              )
            }
        </div> 
       </div>
       <div style={{textAlign:'center'}}><span style={{fontWeight:'bold'}}>Developed By:</span> Venkatesh S K</div>
    </div>
  );
}

export default App;
// kjdkjs