import React, { useState } from "react";
import { Button } from "flowbite-react";

const defaultConfig = {
  ip: "192.168.1.100", // Default IP
  port: "12345", // Default port
  protocol: "TCP", // Default protocol
  delay: "1.0", // Default delay
  threadId: "", // No thread ID by default
  action: "start", // Default action is to start new thread
};
function NetworkLogger() {
  const [config, setConfig] = useState({ ...defaultConfig });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className=" flex  flex-col  items-center justify-center w-full ">
      <h1 className=" font-dosis text-center mt-4 p-2 text-3xl font-bold">
        Configure Network Event Logger
      </h1>
      <form onSubmit={handleSubmit} className=" border border-black m-4 p-4 ">
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
                    className=" mr-4 ml-3 "
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
                    className=" mr-4 ml-3"
                    checked={config.action === "update"}
                    onChange={handleChange}
                  />
                  Update existing thread
                </label>
              </div>
            </div>
          </label>
        </div>

        {config.action === "update" && (
          <div className=" mb-3">
            <label>
              <h1 className=" font-bold text-lg font-dosis inline mr-3">
                Thread ID:
              </h1>

              <input
                type="text"
                name="threadId"
                placeholder="Thread ID"
                className=" dark:text-black"
                value={config.threadId}
                onChange={handleChange}
                required={config.action === "update"}
              />
            </label>
          </div>
        )}

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
              className=" dark:text-black"
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className=" mb-3">
          <label>
            <h1 className=" font-bold text-lg font-dosis inline mr-3">Port:</h1>
            <input
              type="number"
              name="port"
              placeholder="Port"
              className=" dark:text-black"
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
              className=" dark:text-black"
              required
            >
              <option value="TCP">TCP</option>
              <option value="UDP">UDP</option>
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
              className=" dark:text-black"
              placeholder="Delay in seconds"
              value={config.delay}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className=" w-full flex flex-row justify-center items-center">
          <Button
            outline
            gradientDuoTone="pinkToOrange"
            size="md"
            className=" mt-10 hover:scale-105"
            type="submit"
          >
            Generate Event
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NetworkLogger;

/*
we will have two endpoints 
/start-continuous-events 
/update-continuous-events 
*/
