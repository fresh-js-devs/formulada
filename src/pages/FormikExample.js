import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Formik, Field, useField } from 'formik';
import { Input, Checkbox } from 'antd';

import Container from '../components/Container';

const TextField = ({ label, ...props }) => {
  const [field] = useField(props);

  console.log(field);

  return (
    <>
      <label>{label}</label>
      <Input {...field} />
    </>
  );
};

const FormikExample = () => {
  return (
    <Container>
      <Formik
        initialValues={{
          name: '',
          address: '',
          phoneNumber: '',
          isQuarantined: false,
        }}
      >
        {({ values, handleChange, handleBlur, errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField name='name' type='input' label='Name' />
            <TextField name='address' type='input' label='Address' />
            <TextField name='phoneNumber' type='input' label='Phone number' />
            <Field name='isQuarantined' type='checkbox' as={Checkbox}>
              I am in quarantine
            </Field>
            <SyntaxHighlighter language='json' style={dracula}>
              {JSON.stringify(values, null, 2)}
            </SyntaxHighlighter>
            <SyntaxHighlighter language='json' style={dracula}>
              {JSON.stringify(errors, null, 2)}
            </SyntaxHighlighter>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default FormikExample;
