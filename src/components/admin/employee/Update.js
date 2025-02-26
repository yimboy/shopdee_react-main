import { React, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import axios from "axios";
import AppNavbar from '../components/AppNavbar';
import SideMenu from '../components/SideMenu';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Link from '@mui/material/Link';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const token = localStorage.getItem('token');
const url = process.env.REACT_APP_BASE_URL;

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function Update() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(""); 
  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch the current employee data when the component is mounted      
    axios.get(`${url}/employee/${id}`,
      {
        headers: {
        'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        const employee = response.data;
        setUsername(employee.username);
        setFirstName(employee.firstName);
        setLastName(employee.lastName);     
        setEmail(employee.email);
        setGender(employee.gender);
        setImageFile(employee.imageFile);    
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('gender', gender);

    if (imageFile) {
      formData.append('imageFile', imageFile); // Append image file if it exists
    }

    const response = await axios.put(`${url}/employee/${id}`, formData,
      {
        headers: {              
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      }
    );

    const result = response.data;    
    alert(result['message']);

    if(result['status'] === true){            
        window.location.href = '/admin/employee';
    }
  }

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected file
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />
      <AppNavbar />            
      <Container 
        id="employee_update" 
        name="employee_update"
        component="main" maxWidth="lg">        
        <CssBaseline />            
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ marginTop: '16px'}}
          separator={<NavigateNextRoundedIcon fontSize="small" />}
        >            
          <Link href="/admin/employee"
            sx={{ color: 'text.primary'}}
            underline="hover"            
          >
            ข้อมูลพนักงาน
          </Link>
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            แก้ไข
          </Typography>
        </Breadcrumbs>

        <Container maxWidth="xs" sx={{alignContent: 'center'}}> 
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="ชื่อ"
                  value={firstName}
                  onChange={ (e) => setFirstName(e.target.value) }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="นามสกุล"
                  name="lastName"
                  value={lastName}
                  onChange={ (e) => setLastName(e.target.value) }
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="ชื่อผู้ใช้"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={ (e) => setUsername(e.target.value) }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="รหัสผ่าน"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={ (e) => setPassword(e.target.value) }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="อีเมล"                  
                  autoComplete="email"
                  value={email}
                  onChange={ (e) => setEmail(e.target.value) }
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend">เพศ</FormLabel> {/* Gender label */}
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)} // Handle gender change
                  row
                >
                  <FormControlLabel value="0" control={<Radio />} label="ชาย" />
                  <FormControlLabel value="1" control={<Radio />} label="หญิง" />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="contained"
                  required
                  startIcon={<CloudUploadIcon />}
                >
                  รูปภาพสินค้า
                  <VisuallyHiddenInput
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    onChange={handleImageChange} // Use the image change handler
                  />
                </Button>
                {imageFile && <Typography>{imageFile.name}</Typography>} {/* Display selected image name */}
              </Grid>              
            </Grid>
            <Button
              id="btnCreate"
              name="btnCreate"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              บันทึกข้อมูล
            </Button>
          </Box>
        </Container>        
      </Container>
    </Box>
  );
}
