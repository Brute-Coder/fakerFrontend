import React, { useState } from "react";
import { Button } from "flowbite-react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { CustomToastContainer } from "../components";
import { toast } from "react-toastify";
const defaultConfig = {
  ip: "192.168.1.100", // Default IP
  port: "12345", // Default port
  protocol: "TCP", // Default protocol
  delay: "1.0", // Default delay
  thread_id: "", // No thread ID by default
  action: "start", // Default action is to start new thread
};
function NetworkLogger() {
  const [config, setConfig] = useState({ ...defaultConfig });
  const [data, setData] = useState(null);
  const [threads, setThreads] = useState([]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const uri = "http://127.0.0.1:5000";

    const apiEnd =
      config.action === "start"
        ? "/start-continuous-events"
        : config.action === "update"
        ? "/update-thread-config"
        : "/stop-event-generation";
    const endpoint = uri + apiEnd;

    const payload = {
      ip: config.ip,
      port: parseInt(config.port, 10),
      protocol: config.protocol,
      delay: parseFloat(config.delay),
    };

    if (config.action === "start") {
      if (threads.length >= 8) {
        toast.error("Maximum 8 Threads are in exicution");
      }
    }

    if (config.action === "update" || config.action === "delete") {
      const tempData = parseInt(config.thread_id, 10);
      if (!threads.includes(tempData)) {
        toast.error("Entered invalid thread Id");
        return;
      }
      payload.thread_id = tempData;
    }

    axios
      .post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        const id = response.data.thread_id;
        if (config.action === "start") {
          toast.success(`Sucessfully started exicution. Thread id ${id}`);
          setThreads((prev) => [...prev, id]);
        } else if (config.action === "delete") {
          toast.success(`Sucessfully stopped exicution. Thread id ${id}`);
          setThreads((prev) => prev.filter((el) => el !== id));
        } else {
          toast.success(`successfully updatated. Thread id ${id}`);
        }
      })
      .catch((error) => {
        toast.error("error while sending data");
        alert("Error sending data: " + error);
      });
  };

  return (
    <div className=" flex  flex-col  items-center justify-center w-full ">
      <h1 className=" font-dosis text-center mt-4 p-2 text-3xl font-bold">
        Configure Network Event Logger
      </h1>
      <form
        onSubmit={handleSubmit}
        className=" border border-black m-4 p-4 shadow-xl "
      >
        <div className=" mb-3">
          <label>
            <div className="flex w-full relative">
              <h1 className=" font-bold text-lg font-dosis">Action : </h1>
              <div className=" flex flex-col ">
                <label className=" inline">
                  <input
                    type="radio"
                    name="action"
                    value="start"
                    className=" mr-4 ml-3 hover:scale-105"
                    checked={config.action === "start"}
                    onChange={handleChange}
                  />
                  Start new thread
                </label>
                <label>
                  <input
                    type="radio"
                    name="action"
                    value="update"
                    className=" mr-4 ml-3 hover:scale-105"
                    checked={config.action === "update"}
                    onChange={handleChange}
                  />
                  Update existing thread
                </label>
                <label>
                  <input
                    type="radio"
                    name="action"
                    value="delete"
                    className=" mr-4 ml-3 hover:scale-105"
                    checked={config.action === "delete"}
                    onChange={handleChange}
                  />
                  Delete existing thread
                </label>
              </div>
            </div>
          </label>
        </div>

        {(config.action === "update" || config.action === "delete") && (
          <div className=" mb-3">
            <label>
              <h1 className=" font-bold text-lg font-dosis inline mr-3">
                Thread ID:
              </h1>

              <input
                type="text"
                name="thread_id"
                placeholder="Thread ID"
                className=" dark:text-black hover:scale-105"
                value={config.thread_id}
                onChange={handleChange}
                required={config.action === "update"}
              />
            </label>
          </div>
        )}

        {config.action !== "delete" && (
          <div>
            <div className=" mb-3">
              <label>
                <h1 className=" font-bold text-lg font-dosis inline mr-2">
                  IP Address:
                </h1>

                <input
                  type="text"
                  name="ip"
                  placeholder="IP Address"
                  value={config.ip}
                  className=" dark:text-black hover:scale-105"
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className=" mb-3">
              <label>
                <h1 className=" font-bold text-lg font-dosis inline mr-3">
                  Port:
                </h1>
                <input
                  type="number"
                  name="port"
                  placeholder="Port"
                  className=" dark:text-black hover:scale-105"
                  value={config.port}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className=" mb-3">
              <label>
                <h1 className=" font-bold text-lg font-dosis inline mr-2">
                  Protocol:
                </h1>

                <select
                  name="protocol"
                  value={config.protocol}
                  onChange={handleChange}
                  className=" dark:text-black hover:scale-105"
                  required
                >
                  <option value="TCP" className="hover:scale-105">
                    TCP
                  </option>
                  <option value="UDP" className=" hover:scale-105">
                    UDP
                  </option>
                </select>
              </label>
            </div>
            <div>
              <label>
                <h1 className=" font-bold text-lg font-dosis inline mr-1">
                  Delay (in sec):
                </h1>
                <input
                  type="text"
                  name="delay"
                  className=" dark:text-black hover:scale-105"
                  placeholder="Delay in seconds"
                  value={config.delay}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>
        )}
        <div className=" w-full flex flex-row justify-center items-center">
          <Button
            outline
            gradientDuoTone="pinkToOrange"
            size="md"
            className=" mt-10 hover:scale-105 "
            type="submit"
          >
            {config.action === "delete" ? "Stop Thread" : "Generate Event"}
          </Button>
        </div>
      </form>
      <div>
        <label className=" mt-3 ">
          <h1 className=" font-dosis inline mr-2 text-xl font-bold mt-3">
            Current Exicuting Threads :
          </h1>
          <h1 className=" text-md inline">
            {threads.length > 0
              ? threads.toString()
              : "No threads in exicution"}
          </h1>
        </label>
      </div>
      <CustomToastContainer />
    </div>
  );
}

export default NetworkLogger;

/*
we will have two endpoints 
/start-continuous-events 
/update-continuous-events 
*/
