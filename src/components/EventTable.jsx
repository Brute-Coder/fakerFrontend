
"use client";

import { Table } from "flowbite-react";

function EventTable({value}) {
  const { fetchedProcess } = value;
  const events = fetchedProcess
  const masterObj = fetchedProcess[0];
  
  return (
    <div className="overflow-auto m-4">
      <Table hoverable>
        <Table.Head>
        {Object.keys(masterObj).map((key) => (
            <Table.HeadCell key={key}>{key}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {events && events.map((eventObj,index) => 
          <Table.Row key = {index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            {Object.keys(eventObj).map((key) => (
            <Table.Cell key={key}>{eventObj[key]}</Table.Cell>
          ))}
          </Table.Row>
        )}
        </Table.Body>
      </Table>
    </div>
  );
}


export default EventTable