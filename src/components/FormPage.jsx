import { React, useEffect, useState } from "react";
import { Header, Form, Button, Table, Message, Icon } from "semantic-ui-react";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function FormPage() {
  const [task_name, setTaskName] = useState("");
  const [jira_link, setJiraLink] = useState("");
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.from("users").select("*").limit(1);
      if (error) {
        console.error("Supabase connection test failed:", error);
      } else {
        console.log("Supabase connection successful");
      }
    }
    testConnection();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from("users").select("*");
    console.log("Data inside fetch Data: ", data);
    if (error) {
      console.log(error);
    } else {
      setTableData(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("users")
        .insert({ task_name, jira_link });
      console.log("Data inside handleSubmit: ", data);
      if (error) {
        console.log(error);
        setErrorMessage("Something went wrong. Please try again.");
      } else {
        setTaskName("");
        setJiraLink("");
        fetchData();
        setSuccessMessage("Your form has been submitted successfully!");
      }

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong. Please try again.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  const exportToExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(tableData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Users");

    const excelBuffer = XLSX.write(workBook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users.xlsx";
    link.click();
  };

  return (
    <div>
      <div>
        <Header
          color="green"
          as="h2"
          icon
          textAlign="center"
          style={{ marginBottom: "50px" }}
        >
          <Icon inverted color="green" name="file excel" circular />
          <Header.Content>Form to Excel</Header.Content>
        </Header>
      </div>
      <Form>
        <Form.TextArea
          task_name="Task Name"
          placeholder="Enter Task Name"
          value={task_name}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Form.TextArea
          jiraTicket="JIRA Ticket Id"
          placeholder="Enter JIRA Link"
          value={jira_link}
          onChange={(e) => setJiraLink(e.target.value)}
        />
        <Button
          style={{ marginRight: "10px" }}
          color="green"
          onClick={handleSubmit}
          disabled={task_name === "" || jira_link === ""}
        >
          Submit
        </Button>
        <Button
          style={{ marginRight: "10px" }}
          basic
          inverted
          color="green"
          onClick={toggleTable}
        >
          {showTable ? "Hide Table" : "Show Table"}
        </Button>
        {showTable && (
          <Button basic inverted color="blue" onClick={exportToExcel}>
            Export to Excel
          </Button>
        )}
        {successMessage && (
          <Message positive>
            <Message.Header>{successMessage}</Message.Header>
          </Message>
        )}
        {errorMessage && (
          <Message negative>
            <Message.Header>{errorMessage}</Message.Header>
          </Message>
        )}
      </Form>

      {showTable && (
        <Table celled color="green" size="small">
          <Table.Header color="green">
            <Table.Row>
              <Table.HeaderCell color="green">Task Name</Table.HeaderCell>
              <Table.HeaderCell color="green">Jira Link</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableData.map((row, index) => (
              <Table.Row key={index}>
                <Table.Cell>{row.task_name}</Table.Cell>
                <Table.Cell>{row.jira_link}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}

export default FormPage;
