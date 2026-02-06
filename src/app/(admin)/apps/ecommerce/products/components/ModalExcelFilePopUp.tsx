import { Col, Modal, FormLabel, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row, FormControl } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { BASE_URL } from '@/types/validationSchema';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
interface ModalExcelFilePopUpProps {
  show: boolean;
  onClose: () => void;
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
}

function ModalExcelFilePopUp({ show, onClose, setProducts }: ModalExcelFilePopUpProps) {
  const previewFile = "https://docs.google.com/spreadsheets/d/1DnDLU6CnI_0seDLzjgp2mSRrG32h1M-dumyCgIP1KjQ/edit?usp=sharing"
  const validationSchema = Yup.object({
    excelFile: Yup.mixed()
      .required('CSV file is required')
      .test(
        'fileFormat',
        'Only CSV files are allowed',
        (value) =>
          value &&
          value instanceof File &&
          ['text/csv', 'application/vnd.ms-excel'].includes(value.type)
      ),
  });

  const parseCSV = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result as string;
        const rows = text.split('\n').map((row) => row.split(','));

        const headers = rows[0].map((h) => h.trim());
        const data = rows.slice(1).map((row) => {
          const item: any = {};
          row.forEach((value, index) => {
            item[headers[index]] = value.trim();
          });
          return item;
        });

        resolve(data);
      };

      reader.onerror = () => reject('Error reading file');
      reader.readAsText(file);
    });
  };

  const handleSubmit = async (
    values: { excelFile: File | null },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      if (!values.excelFile) return;

      const csvData = await parseCSV(values.excelFile);

      setProducts(csvData);

     
      const formData = new FormData();
      formData.append('file', values.excelFile);

      await fetch(`${BASE_URL}upload-csv`, {
        method: 'POST',
        body: formData,
      });

      console.log('Uploaded CSV:', csvData);
    } catch (error) {
      console.error('CSV Upload Error:', error);
    }

    setSubmitting(false);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Formik
        initialValues={{ excelFile: null }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleBlur, setFieldValue, touched, errors }) => (
          <Form>
            <ModalHeader closeButton>
              <ModalTitle className="m-0">Upload CSV</ModalTitle>
            </ModalHeader>

            <ModalBody>
              <Row className="mb-3">
                <FormLabel htmlFor="excelFile" className="col-sm-3 col-form-label text-start">
                  CSV File
                </FormLabel>
                <Col sm="9">
                  <div className="mb-3">
                  <a href={previewFile} target="_blank" rel="noopener noreferrer">
                    Preview File   <IconifyIcon icon="fa6-solid:circle-info" className="me-1 text-primary" />
                  </a>
                  </div>
                  <FormControl
                    type="file"
                    id="excelFile"
                    name="excelFile"
                    accept=".csv"
                    onChange={(event) => {
                      const file = (event.currentTarget as HTMLInputElement).files?.[0] || null;
                      setFieldValue('excelFile', file);
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
                Upload
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
