import logo from './logo.svg';
import './App.css';
  
  import {useState,useEffect,useCallback} from 'react';

function App() {
  const [invoice, setInvoice] = useState(null);
  const [launchYear, setlaunchYear] = useState(null);

  const getInvoice = useCallback(async () => {
    fetch("https://api.spacexdata.com/v3/launches?limit=100")
      .then((response)=>response.json())
      .then((resp)=>{
        const obj = [...new Map(resp.map(item => [JSON.stringify(item.launch_year), item.launch_year])).values()];
        setlaunchYear(obj)
        console.log(resp,"ddddddddddddddddddddddddddd")
        setInvoice(resp)
      })
      .catch((error)=>{
        console.log(error)
      });
  }, []);

  useEffect(() => {
    getInvoice();
  }, [getInvoice]);

  if (!invoice) {
    return null;
  }

const filterdata = () =>{
  launchYear.map((item)=>
  <div>{item}</div>)
}
  return (
    <div style={{backgroundColor:'#F5F5F5'}}>
       <div className="row">
         <div>SpaceX Launch Programs</div>
         <div className='col-lg-2-20 col-md-2-20 col-sm-1'>
           <div style={{margin:20,backgroundColor:'white',padding:10}}>
            <div>Filters</div>
            <div style={{textAlign:'center',marginTop:20}}>Launch Years</div>
            <div className='row'>
            {
                launchYear.map((item)=>
                <div className='col-md-2 col-sm-2 col-lg-2'>
                  <div style={{textAlign:'center',backgroundColor:'green',marginRight:'20px',marginLeft:'20px',marginBottom:'2px',marginTop:10,border: '2px solid green',
                      borderRadius: '10px'}}>{item}</div>
                </div>
                )
              }
              </div>
            <div style={{textAlign:'center',marginTop:20}}>SuccessFull Launch</div>
              <div className='col-md-2 col-sm-2 col-lg-2'>
                      <div style={{textAlign:'center',backgroundColor:'green',marginRight:'20px',marginLeft:'20px',marginBottom:'2px',marginTop:10,border: '2px solid green',
                          borderRadius: '10px'}}>True</div>
                    </div>
                    <div className='col-md-2 col-sm-2 col-lg-2'>
                    <div style={{textAlign:'center',backgroundColor:'green',marginRight:'20px',marginLeft:'20px',marginBottom:'2px',marginTop:10,border: '2px solid green',
                        borderRadius: '10px'}}>False</div>
                  </div>
                  <div style={{textAlign:'center',marginTop:50}}>SuccessFull Langing</div>
              <div className='col-md-2 col-sm-2 col-lg-2'>
                      <div style={{textAlign:'center',backgroundColor:'green',marginRight:'20px',marginLeft:'20px',marginBottom:'2px',marginTop:10,border: '2px solid green',
                          borderRadius: '10px'}}>True</div>
                    </div>
                    <div className='col-md-2 col-sm-2 col-lg-2'>
                    <div style={{textAlign:'center',backgroundColor:'green',marginRight:'20px',marginLeft:'20px',marginBottom:'2px',marginTop:10,border: '2px solid green',
                        borderRadius: '10px'}}>False</div>
              </div>
            </div>
        </div>
          
            
          
         <div className='col-lg-2-80 col-md-2-80 col-sm-1'style={{marginTop:10}}>
         {
              invoice.map((item)=>
              <div className='col-md-2 col-sm-1 col-lg-4'>
                <div style={{height:'280px',backgroundColor:'white',marginBottom:5,marginLeft:5,marginRight:5,padding:10,}}>
                  <img style={{height:'150px',width:'150px',marginLeft:'20px'}}src={item.links.mission_patch}/>


                  <div>{item.mission_name}({item.flight_number})</div>
                  <div>Mission Ids:{
                    item.mission_id.map((i)=>{
                      if(item.mission_id){
                        return <div>{i}</div>
                      }
                    })
                    }
                    </div>


                  <div>Launch Year:{item.launch_year}</div>
                  <div>SuccessFull Launch:{item.launch_success?'True':'False'}</div>
                  <div>SuccessFull Landing:{item.launch_window}</div>
                  

                    
                </div>
              </div>
              )
            }
        </div> 
       </div>
    </div>
  );
}

export default App;
