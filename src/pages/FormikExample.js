import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Formik, Field, useField, FieldArray } from 'formik';
import { Input, Button, Checkbox, Radio, Select } from 'antd';
import * as yup from 'yup';

import Container from '../components/atoms/Container';
import MainHeading from '../components/atoms/MainHeading';
import SecondaryHeading from '../components/atoms/SecondaryHeading';
import StyledButton from '../components/atoms/StyledButton';

const { Option } = Select;

const RadioField = ({ placeholder, ...props }) => {
  const [field] = useField(props);
  return <Radio {...field}>{placeholder}</Radio>;
};

const SelectField = ({ placeholder, items, ...props }) => {
  const [field, meta, helper] = useField(props);

  return (
    <Select
      onChange={(value, option) => {
        helper.setValue(value);
        field.onChange(value, option);
      }}
      onBlur={(value) => {
        helper.setTouched(value);
        field.onBlur && field.onBlur(value);
      }}
      value={
        field.value === '' || field.value === null ? undefined : field.value
      }
      placeholder={placeholder}
    >
      {items}
    </Select>
  );
};

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const errorMessage = meta.error && meta.touched ? meta.error : '';

  return (
    <div>
      {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
      <Input {...field} />
    </div>
  );
};

const validationSchema = yup.object({
  firstName: yup.string().required().max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required(),
    }),
  ),
});

const FormikExample = () => {
  return (
    <Container>
      <Formik
        initialValues={{
          name: '',
          address: '',
          isRequired: false,
          specifications: [],
          gender: '',
          skills: [{ type: '', description: '' }],
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
        {({ values, errors, isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <MainHeading>Formik Example</MainHeading>
            <TextField name='name' label='Name' type='input' />
            <TextField name='address' label='address' type='input' />
            <Field name='isRequired' type='checkbox' as={Checkbox} />
            <div>
              <SecondaryHeading>Specifications</SecondaryHeading>
              <Field
                name='specifications'
                type='checkbox'
                as={Checkbox}
                value='hdmiPort'
              />
              <Field
                name='specifications'
                type='checkbox'
                as={Checkbox}
                value='bluetooth'
              />
              <Field
                name='specifications'
                type='checkbox'
                as={Checkbox}
                value='externalGraphicCard'
              />
            </div>
            <div>
              <SecondaryHeading>Gender</SecondaryHeading>
              <RadioField
                name='gender'
                placeholder='Male'
                value='male'
                type='radio'
              />
              <RadioField
                name='gender'
                placeholder='Female'
                value='female'
                type='radio'
              />
              <RadioField
                name='gender'
                placeholder='Other'
                value='other'
                type='radio'
              />
            </div>
            <div>
              <SecondaryHeading>Skills</SecondaryHeading>
              <FieldArray name='skills'>
                {(arrayHelpers) => (
                  <div>
                    {values.skills.map((_, index) => {
                      const skillDescription = `skills.${index}.description`;
                      const skillType = `skills.${index}.type`;

                      return (
                        <div key={index}>
                          <TextField
                            name={skillDescription}
                            type='input'
                            label='Description'
                          />
                          <SelectField
                            name={skillType}
                            placeholder='Type'
                            type='input'
                            items={[
                              <Option key='react' value='react'>
                                React
                              </Option>,
                              <Option key='csharp' value='csharp'>
                                C#
                              </Option>,
                              <Option key='html' value='html'>
                                HTML
                              </Option>,
                            ]}
                          />
                          <Button onClick={() => arrayHelpers.remove(index)}>
                            x
                          </Button>
                        </div>
                      );
                    })}
                    <Button
                      onClick={() => arrayHelpers.push({ name: '', type: '' })}
                    >
                      + Add pet
                    </Button>
                  </div>
                )}
              </FieldArray>
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
            <Button disabled={isSubmitting} htmlType='submit'>
              Submit
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
