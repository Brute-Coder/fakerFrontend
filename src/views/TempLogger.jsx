import React, { useState } from "react";

function EventLoggerConfig() {
  const [config, setConfig] = useState({
    ip: "192.168.1.100", // Default IP
    port: "12345", // Default port
    protocol: "TCP", // Default protocol
    delay: "1.0", // Default delay
    threadId: "", // No thread ID by default
    action: "start", // Default action is to start new thread
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const endpoint =
      config.action === "start"
        ? "/start-continuous-events"
        : "/update-thread-config";
    const payload = {
      ip: config.ip,
      port: parseInt(config.port, 10),
      protocol: config.protocol,
      delay: parseFloat(config.delay),
    };

    if (config.action === "update") {
      payload.threadId = parseInt(config.threadId, 10);
    }

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => alert(`Response: ${JSON.stringify(data)}`))
      .catch((error) => alert("Error sending data: " + error));
  };

  return (
    <div>
      <h1>Configure Event Logger</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Action:
            <input
              type="radio"
              name="action"
              value="start"
              checked={config.action === "start"}
              onChange={handleChange}
            />
            Start new thread
            <input
              type="radio"
              name="action"
              value="update"
              checked={config.action === "update"}
              onChange={handleChange}
            />
            Update existing thread
          </label>
        </div>

        {config.action === "update" && (
          <div>
            <label>
              Thread ID:
              <input
                type="text"
                name="threadId"
                placeholder="Thread ID"
                value={config.threadId}
                onChange={handleChange}
                required={config.action === "update"}
              />
            </label>
          </div>
        )}

        <div>
          <label>
            IP Address:
            <input
              type="text"
              name="ip"
              placeholder="IP Address"
              value={config.ip}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Port:
            <input
              type="number"
              name="port"
              placeholder="Port"
              value={config.port}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Protocol:
            <select
              name="protocol"
              value={config.protocol}
              onChange={handleChange}
              required
            >
              <option value="TCP">TCP</option>
              <option value="UDP">UDP</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Delay (in seconds):
            <input
              type="text"
              name="delay"
              placeholder="Delay in seconds"
              value={config.delay}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EventLoggerConfig;
