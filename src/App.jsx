import { useState  , useEffect} from "react";
import { options, Qtyinput , EventTable ,CustomToastContainer } from "./components";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "flowbite-react";
import axios from "axios";
import {toast} from "react-toastify"

export default function App() {
  const [eventQty, setEventQty] = useState(0);
  const [directory, setDirectory] = useState("");
  const [generateMul, setGenerateMul] = useState(false);
  const [events, setEvents] = useState(null);
  const [saveFile, setSaveFile] = useState(true);
  const [fetchedProcess, setFetchedProcess] = useState([]);

  async function handleGenerate() {

    if(!events){
      toast.warning("Choose at least one event")
      return 
    }
    if(eventQty <= 0){
      toast.warning("Number of events can't be zero")
      return 
    }
    const saveLog = saveFile ? 1 : 0;
    if (!generateMul) {
      let tempFP = [...fetchedProcess]; 
      let data = await queryEvents(events.value, saveLog);
      tempFP.push(data);
      setFetchedProcess(tempFP);
    } else {
      let fetchedData = await Promise.all(events.map(async (singleEvent) => {
        let data = await queryEvents(singleEvent.value, saveLog);
        return data;
      }));
       setFetchedProcess(fetchedData);
    }
    toast.success("Successfully generated events!!")
    if(saveFile){
      if(directory !== ""){
        toast.success(`log saved in ${validateFilename(directory)}`)
      }else{
        toast.success('log saved in default directory')
      }
    }
  }

  async function queryEvents(route,saveLog){
     try {
        const backEndUri = "http://127.0.0.1:5000";
        let masterUri = `${backEndUri}${route}?qty=${eventQty}&savelog=${saveLog}`
        if(saveLog && directory !== ""){
           let dirname = validateFilename(directory);
           masterUri = masterUri +`&filename=${dirname}`
        }
        const data = await axios.get(masterUri);
        return data.data;
     } catch (e) {
        toast.error("error while fetching data")
        console.log("got some error while fetching data " , e);
     }
  }

  function validateFilename(filename) {
    if (filename.endsWith(".txt")) {
        return filename;
    } else {
        return filename + ".txt";
    }
}

 function handleClear(){
     setFetchedProcess([])
     setDirectory("")
     setEventQty(0)
     setEvents(null)
     toast.success("Cleared all processes")
 }

  useEffect(() => {
    setFetchedProcess(fetchedProcess)
  }, [fetchedProcess]);
  
  return (
    <div>
      <h1 className=" mt-3 font-dosis text-3xl text-center p-4 font-bold">
        Generate, Visualize, and Store events
      </h1>

      <div className="  flex  w-full flex-col justify-center  items-center">
        <div className=" flex flex-row w-full justify-evenly mt-2">
          <div>
            <label className=" block mb-2 text-md font-dosis font-medium dark:text-white text-gray-900 ">
              Choose Events to generate:
            </label>
            <div className=" flex flex-row gap-2">
              <Select
                options={options}
                onChange={(selectedOption) => setEvents(selectedOption)}
                isMulti={generateMul}
                placeholder="Select Events"
                className=" hover:scale-105"
              />
              <div className="flex items-center me-4 ">
                <input
                  checked={generateMul}
                  id="orange-checkbox"
                  type="checkbox"
                  onChange={() => setGenerateMul((prev) => !prev)}
                  value={generateMul}
                  className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="orange-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Multi Events
                </label>
              </div>
            </div>
          </div>
          <div>
            <Qtyinput value={{ eventQty, setEventQty }} />
          </div>
          <div>
            <label className=" block mb-2 text-md font-dosis dark:text-white font-medium text-gray-900 " >
              File name to save the logs:
            </label>
            <div className=" flex flex-row gap-2">
              <input
                type="text"
                className={`font-dosis hover:scale-105 ${saveFile ? "" : "cursor-not-allowed" } rounded-lg dark:text-black  focus:outline-none `}
                disabled={!saveFile}
                value={directory}
                placeholder="filename.txt"
                onChange={(e) => setDirectory(e.target.value)}
              />
              <div className="flex items-center me-4 ">
                <input
                  checked={saveFile}
                  id="orange-checkbox"
                  type="checkbox"
                  onChange={() => setSaveFile((prev) => !prev)}
                  value={saveFile}
                  className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="orange-checkbox"
                  className=" ms-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Save File
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button
            outline
            gradientDuoTone="pinkToOrange"
            size="lg"
            className=" mt-10 hover:scale-105"
            onClick={handleGenerate}
          >
            Generate Event
          </Button>
        </div>
        <div className=" mt-5 container overflow-auto h-96 w-2/3 border border-black rounded-xl ">
          {  fetchedProcess ?  fetchedProcess.map((fetchedProcess,ind)=> <EventTable key = {ind}value={{fetchedProcess}}/>)  : null}        
        </div>
           {fetchedProcess && fetchedProcess.length >0 && <div className=" absolute bottom-6 right-8 ">
                <Button outline gradientDuoTone="greenToBlue" className=" hover:scale-105" onClick={handleClear}> Clear Result</Button>
          </div>}
      </div>
      <CustomToastContainer/>
    </div>
  );
}
