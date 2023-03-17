import { Box, Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Header from "components/Header";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
};
export default function SinglePage(props) {
  const { pdf, name } = props;
  function handleDownload() {
    window.open(`${process.env.REACT_APP_BASE_URL}/download/${name}`, "_blank");
  }
  return (
    <Box m="1.5rem 5rem">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="2rem"
      >
        <Header
          title={name === "install" ? "Pv installation" : "Pv guidance"}
          subtitle={
            name === "install"
              ? "Displaying and Downloading Pv installation Document"
              : "Displaying and Downloading Pv guidance Document"
          }
        />
        <Button variant="contained" color="primary" onClick={handleDownload}>
          Download File
        </Button>
      </Box>
      <Box height="70vh" overflow="hidden">
        <Document file={pdf} options={options}>
          <Page height="600" pageNumber={1} />
        </Document>
      </Box>
    </Box>
  );
}
