import { Col, Modal, FormLabel, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row, FormSelect, FormControl } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

interface ModalExcelFilePopUpProps {
  show: boolean;
  onClose: () => void;
}

function ModalExcelFilePopUp({ show, onClose }: ModalExcelFilePopUpProps) {
  const validationSchema = Yup.object({
    sourse: Yup.string().required('Source is required'),
    excelFile: Yup.mixed().required('Excel file is required').test(
      'fileFormat',
      'Unsupported file format',
      (value) => value instanceof File && ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(value.type)
    ),
  });

  interface FormValues {
    sourse: string;
    excelFile: File | null;
  }

  interface FormikHelpers {
    setSubmitting: (isSubmitting: boolean) => void;
  }

  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers) => {
    console.log(values);
    setSubmitting(false);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Formik
        initialValues={{ sourse: '', excelFile: null }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, setFieldValue, touched, errors }) => (
          <Form>
            <ModalHeader closeButton>
              <ModalTitle className="m-0">Source by Excel</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Row className="mb-3">
                <FormLabel htmlFor="sourse" className="col-sm-2 col-form-label text-start">
                  Source
                </FormLabel>
                <Col sm="10">
                  <FormSelect
                    id="sourse"
                    name="sourse"
                    value={values.sourse}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.sourse && !!errors.sourse}
                  >
                    <option value="">Select</option>
                    <option value="EXCEL">Excel</option>
                    <option value="PDF">Pdf</option>
                    <option value="DOC">Doc</option>
                    <option value="ZIP">Zip</option>
                  </FormSelect>
                  <FormControl.Feedback type="invalid">
                    {errors.sourse}
                  </FormControl.Feedback>
                </Col>
              </Row>
              <Row className="mb-3">
                <FormLabel htmlFor="excelFile" className="col-sm-2 col-form-label text-start">
                  Excel File
                </FormLabel>
                <Col sm="10">
                  <FormControl
                    type="file"
                    id="excelFile"
                    name="excelFile"
                    accept=".xlsx, .xls"
                    onChange={(event) => {
                      setFieldValue('excelFile', (event.currentTarget as HTMLInputElement).files?.[0] || null);
                    }}
                    onBlur={handleBlur}
                    isInvalid={touched.excelFile && !!errors.excelFile}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.excelFile}
                  </FormControl.Feedback>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <button type="submit" className="btn btn-primary btn-sm">
                Save
              </button>
              <button type="button" onClick={onClose} className="btn btn-outline-danger btn-sm">
                Close
              </button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default ModalExcelFilePopUp;
