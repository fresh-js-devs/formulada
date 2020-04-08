import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Formik, Field, useField } from 'formik';
import { Input, Button, Checkbox, Radio, Select } from 'antd';
import * as yup from 'yup';

import Container from '../components/Container';
import MainHeading from '../components/MainHeading';
import SecondaryHeading from '../components/SecondaryHeading';

const { Option } = Select;

const SelectField = ({ label, placeholder, items, ...props }) => {
  const [field, meta, helper] = useField(props);
  const errorMessage = meta.error && meta.touched ? meta.error : '';

  return (
    <>
      <div>{label}*</div>
      <Select
        onChange={(value, option) => {
          helper.setValue(value);
          field.onChange(value, option);
        }}
        onBlur={(value) => {
          helper.setTouched(value);
          field.onBlur && field.onBlur(value);
        }}
        value={!field.value ? undefined : field.value}
        placeholder={placeholder}
      >
        {items}
      </Select>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </>
  );
};

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const errorMessage = meta.error && meta.touched ? meta.error : '';

  return (
    <>
      <label>{label}*</label>
      <Input {...field} />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </>
  );
};

const validationSchema = yup.object({
  name: yup.string().required().max(10),
  customExtra: yup.string().required(),
});

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
        // validate={(values) => {
        //   const errors = {};

        //   if (values.firstName === '') {
        //     errors.firstName = 'This field is required';
        //   }

        //   return errors;
        // }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          console.log(data);
          setSubmitting(false);
          // resetForm();
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit}>
            <MainHeading>Formulada</MainHeading>
            <TextField name='name' type='input' label='Full name' />
            <TextField name='address' type='input' label='Address' />
            <TextField name='phoneNumber' type='input' label='Phone number' />
            <Field name='isQuarantined' type='checkbox' as={Checkbox}>
              I am in quarantine
            </Field>
            <div>
              <SecondaryHeading>Extras</SecondaryHeading>
              <Field
                name='extras'
                type='checkbox'
                as={Checkbox}
                value='grilledBacon'
              >
                Grilled bacon
              </Field>
              <Field name='extras' type='checkbox' as={Checkbox} value='chedar'>
                Chedar
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
            </div>
            <div>
              <SecondaryHeading>Method of payment</SecondaryHeading>
              <Field name='paymentMethod' value='card' type='radio' as={Radio}>
                Card
              </Field>
              <Field name='paymentMethod' value='cash' type='radio' as={Radio}>
                Cash
              </Field>
              <Field
                name='paymentMethod'
                value='mealTickets'
                type='radio'
                as={Radio}
              >
                Meal Tickets
              </Field>
            </div>
            <div>
              <SecondaryHeading>Custom Extra</SecondaryHeading>
              <SelectField
                name='customExtra'
                placeholder='Select a Custom Extra'
                type='select'
                label='Choose an Extra'
                items={[
                  <Option key='fish' value='fish'>
                    Fish
                  </Option>,
                  <Option key='meat' value='meat'>
                    Meat
                  </Option>,
                  <Option key='vegetarian' value='vegetarian'>
                    Vegetarian
                  </Option>,
                  <Option key='vegan' value='vegan'>
                    Vegan
                  </Option>,
                ]}
              />
            </div>
            {/* <Input
            name='name'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          <Input
            name='address'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address}
          /> */}
            <Button disabled={!isValid || isSubmitting} htmlType='submit'>
              ORDER
            </Button>
            {/* <StyledButton disabled={isSubmitting} htmlType='submit'>
              Submit
            </StyledButton> */}
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
