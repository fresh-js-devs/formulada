import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Formik, Field, useField } from 'formik';
import { Input, Checkbox, Radio, Select } from 'antd';

import Container from '../components/Container';
import SecondaryHeading from '../components/SecondaryHeading';

const { Option } = Select;

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

const SelectField = ({ label, placeholder, options, ...props }) => {
  const [field, meta, helper] = useField(props);

  return (
    <>
      <div>{label}</div>
      <Select
        onChange={(value, option) => {
          helper.setValue(value);
          field.onChange(value, option);
        }}
        onBlur={(value) => {
          helper.setTouched(value);
          field.onBlur(value);
        }}
        value={!field.value ? undefined : field.value}
        placeholder={placeholder}
      >
        {options}
      </Select>
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
          extras: [],
          paymentMethod: '',
          customExtra: '',
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
            <SecondaryHeading>Extras</SecondaryHeading>
            <Field name='extras' type='checkbox' as={Checkbox} value='cheddar'>
              Cheddar
            </Field>
            <Field name='extras' type='checkbox' as={Checkbox} value='eggs'>
              Eggs
            </Field>
            <Field name='extras' type='checkbox' as={Checkbox} value='chilli'>
              Chilli
            </Field>
            <Field name='extras' type='checkbox' as={Checkbox} value='olives'>
              Olives
            </Field>
            <SecondaryHeading>Method of payment</SecondaryHeading>
            <Field name='paymentMethod' type='radio' as={Radio} value='card'>
              Card
            </Field>
            <Field name='paymentMethod' type='radio' as={Radio} value='cash'>
              Cash
            </Field>
            <Field
              name='paymentMethod'
              type='radio'
              as={Radio}
              value='mealTickets'
            >
              Meal tickets
            </Field>
            <SelectField
              placeholder='Select an extra'
              name='customExtra'
              type='select'
              label='Chose an Extra'
              options={[
                <Option key='fish' value='fish'>
                  Fish
                </Option>,
                <Option key='meat' value='meat'>
                  Meat
                </Option>,
                <Option key='beyondMeat' value='beyondMeat'>
                  Beyond Meat
                </Option>,
                <Option key='vegan' value='vegan'>
                  Vegan
                </Option>,
              ]}
            />

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
