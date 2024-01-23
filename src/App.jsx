import { useState } from 'react'
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import './App.css'
import Ciudadanos from './app/components/Ciudadanos/Ciudadanos';
import Vacantes from './app/components/Vacantes/Vacantes';

function App() {
  const [pagina, setPagina] = useState('1');

  const changePage = (event, numPagina) => {
    setPagina(numPagina);
  };

  return (
    <TabContext value={pagina}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={changePage}>
            <Tab label="Ciudadanos" value="1" />
            <Tab label="Vacantes" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" className="px-0 h-full max-h-[94%]"><Ciudadanos /></TabPanel>
        <TabPanel value="2" className="px-0 h-full max-h-[94%]"><Vacantes /></TabPanel>
      </TabContext>
  )
}

export default App
