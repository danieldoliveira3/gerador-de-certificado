import React, { useState } from 'react';
import './App.css';
import { Button, TextField } from '@material-ui/core'
import { jsPDF } from "jspdf";
import JSZip from 'jszip'
import certificado from "./certificado.png"
import { saveAs } from 'file-saver';

function App() {

  const [nome, setNome] = useState("");
  const [texto, setTexto] = useState("");
  const [emissao, setEmissao] = useState("");
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "in",
    format: [22.46, 15.88]
  });

  var zip = new JSZip();
  function salvar() {

    const nameArray = nome.split(",")
    if ((nome !== "" && nome.length !== 0)
      && (texto !== "" && texto.length !== 0)
      && (emissao !== "" && emissao.length !== 0)) {

      nameArray.map(
        name => {
          doc.setFontSize(50)
          doc.setFont("Helvetica", "bold")
          doc.text(name.toLocaleUpperCase(), centro, 5.8, { align: "center", maxWidth: 12 });
          zip.file(name + ".pdf", doc.output("blob"));
        })

      // return doc.save(nome + ".pdf")
      return zip.generateAsync({ type: 'blob' }).then(function (content) {
        saveAs(content, 'certificados.zip');
      });
    }


  }
  const centro = (22.46 / 2) + 2.5;
  doc.addImage(certificado, "png", 0, 0, 22.46, 15.88)
  //name of the person
  // doc.setFontSize(50)
  // doc.setFont("Helvetica", "bold")

  // doc.text(nome.toLocaleUpperCase(), centro, 5.8, { align: "center", maxWidth: 12 });

  //text of the event
  doc.setFontSize(35)
  doc.setFont("Helvetica", "normal")
  doc.text(texto, centro - 6, 7.8, { align: "justify", maxWidth: 12 });

  //date of emission
  doc.setFontSize(35)
  doc.setFont("Helvetica", "normal")
  doc.text(emissao, centro, 10.9, { align: "right", maxWidth: 12 });

  // doc.save("a4.pdf"); // will save the file in the current working directory
  return (
    <form className="App">
      <h1>Gerador de Certificados</h1>
      <TextField label="Lista de Nomes" required helperText="Separados por virgula." fullWidth onChange={e => setNome(e.target.value)}></TextField><br />

      {/* <TextField value="Daniel Carvalho de Oliveira Daniel Carvalho de Oliveira" label="Nome da pessoa" fullWidth onChange={e => setNome(e.target.value)}></TextField><br /> */}

      <TextField label="Texto" required fullWidth onChange={e => setTexto(e.target.value)}></TextField><br />
      <TextField label="Data de emissão" required helperText="Digite a data de emissão do certificado, por extenso." fullWidth onChange={e => setEmissao(e.target.value)}></TextField>
      <br /><br />
      <Button onClick={() => salvar()} fullWidth variant="outlined" color="primary">
        GERAR CERTIFICADO
      </Button>

    </form>
  );
}

export default App;
