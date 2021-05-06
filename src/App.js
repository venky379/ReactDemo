import './App.css';
import {useState,useEffect,useCallback} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./redux/actions/productsActions";

function App() {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const [year, setYear] = useState(null);
  const [launchStatus, setlaunchStatus] = useState(null);
  const [landStatus, setlandStatus] = useState(null);
  const [statusLaunch,setStatusLaunch] = useState(['True','False'])
  const [launchYear, setlaunchYear] = useState(null);

  const getInvoice = useCallback(async () => {
    fetch("https://api.spacexdata.com/v3/launches?limit=100")
      .then((response)=>response.json())
      .then((resp)=>{
        const obj = [...new Map(resp.map(item => [JSON.stringify(item.launch_year), item.launch_year])).values()];
        dispatch(setProducts(resp));
        setlaunchYear(obj)
      })
      .catch((error)=>{
        console.log(error)
      });
  }, []);

  useEffect(() => {
    getInvoice();
  }, []);

  if (!launchYear) {
    return null;
  }
  const FilterLaunch = (fyear,flaunchStatus,flandStatus) => {
    setYear(fyear)
    setlaunchStatus(flaunchStatus)
    setlandStatus(flandStatus)
      fetch("https://api.spacexdata.com/v3/launches?limit=100&launch_success="+(flaunchStatus===null?'':flaunchStatus)+"&land_success="+(flandStatus===null?'':flandStatus)+"&launch_year="+(fyear===null?'':fyear))
      .then((response)=>response.json())
        .then((resp)=>{
          dispatch(setProducts(resp));
        })
        .catch((error)=>{
          console.log(error)
        });
  }
  return (
    <div style={{backgroundColor:'#F5F5F5'}}>
       <div className="row">
         <div style={{fontWeight:'bold',fontSize:'22px',paddingLeft:10}}>SpaceX Launch Programs</div>
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
                  <button className='btn'style={launchStatus === (item ==='True'?true:false)? {backgroundColor:"#0FF335"} : { backgroundColor:"#C6FECF"}}onClick={() => FilterLaunch(year,(item==="True"?true:false),landStatus)} >{item}</button>
                </div>
              )
            }
            <div style={{textAlign:'center',marginTop:50,textDecoration: 'underline'}}>SuccessFull Langing</div>
            {
              statusLaunch.map((item)=>
                <div className='col-md-2 col-sm-2 col-lg-2'>
                  <button className='btn'style={landStatus === (item ==='True'?true:false) ? {backgroundColor:"#0FF335"} : { backgroundColor:"#C6FECF"}}onClick={() => FilterLaunch(year,launchStatus,(item==="True"?true:false))} >{item}</button>
                </div>
              )
            } 
            </div>
            </div>
          </div>  
         <div className='col-lg-2-80 col-md-2-80 col-sm-1'style={{marginTop:10}}>
         {
              products.map((item)=>
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