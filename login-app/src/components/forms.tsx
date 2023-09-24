import React, { useState } from "react";
import { FormGroup, Label, Input, Form, Card, CardText, CardBody, Alert } from 'reactstrap';
import axios from 'axios';

const FormLabel: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/data', { email, senha });
      setSuccessMessage("Cadastro realizado!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      setErrorMessage("");
      console.log(response.data);
    } catch (error) {
      console.error(error)
      setSuccessMessage("");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      setErrorMessage("Senha muito grande! Tente uma menor!");
    }
  };

  return (
    <div>
      {successMessage && (
        <Alert color="success" style={{ marginBottom: "10px" }}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert color="danger" style={{ marginBottom: "10px" }}>
          {errorMessage}
        </Alert>
      )}

      <Form style={{ color: 'gray' }} onSubmit={handleSubmit} method="post" >
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="Entre com seu email aqui..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for='examplePassword'>Password</Label>
          <Input 
            id='examplePassword'
            name="password"
            placeholder="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </FormGroup>
        <button type="submit">Cadastrar conta</button>
      </Form>
    </div>
  );
};

export default FormLabel;
