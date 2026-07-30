import Assigned from "./forms/assigned";
import Description from "./forms/description";
import Task from "./forms/task";
import Button from "./forms/button";
import Name from "./forms/name";
import StartDate from "./forms/start-date";
import EndDate from "./forms/end-date";
import Status from "./forms/status";

import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react"


function Form() {

  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    assigned: "",
    status: "",
    task: "",
    description: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   try{
    const res = await fetch("http://127.0.0.1:8000/api/projects/",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(formData)
    })
    if(res.ok){
      alert("Successfully Created");
    }
    else{
      console.log(res.statusText);
    }
   }
   catch(error){
    console.log(error);
   }
  };

  return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: { xs: 3, md: 5 },
          px: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 600,
            p: { xs: 3, md: 4 },
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: { xs: 2, md: 3 }, fontWeight: "bold", fontSize: { xs: '1.75rem', md: '2.125rem' } }}
          >
            Create Project
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <Name />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2.5,
              }}
            >
              <Box sx={{ flex: 1 }}><StartDate /></Box>
              <Box sx={{ flex: 1 }}><EndDate /></Box>
            </Box>
            <Status />
            <Assigned />
            <Description />
            <Task />
            <Box sx={{ mt: 1 }}>
              <Button />
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }

  export default Form;