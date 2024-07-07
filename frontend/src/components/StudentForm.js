import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box } from "@mui/material";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  phone: Yup.string().required("Required"),
});

const StudentForm = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Box marginBottom={2}>
            <Field
              name="name"
              as={TextField}
              label="Name"
              fullWidth
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
          </Box>
          <Box marginBottom={2}>
            <Field
              name="email"
              as={TextField}
              label="Email"
              fullWidth
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
          </Box>
          <Box marginBottom={2}>
            <Field
              name="phone"
              as={TextField}
              label="Phone"
              fullWidth
              error={touched.phone && !!errors.phone}
              helperText={touched.phone && errors.phone}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default StudentForm;
