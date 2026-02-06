import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Row, FormControl, FormLabel } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useLocation,useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  assign_name: Yup.number()
    .integer('Assign name must be an integer number')
    .required('Assign name is required'),
  action_name: Yup.string().required('Action name is required'),
  action_des: Yup.string().required('Action description is required'),
  sessionName: Yup.string().required('Session Name is required'),
  sessionId: Yup.number().required('Session ID is required'),
  lead_id: Yup.number().required('Lead ID is required'),
  assign_id: Yup.number().required('Assign ID is required'),
});

function EditLeadAction() {
    const navigate = useNavigate() 
    const doneSubmition = () => {
        navigate("/apps/ecommerce/leadaction")
    } 
    const location = useLocation()
    const item = location.state?.original
  return (
    <ComponentContainerCard title="Edit Lead Action">
      <Formik
        initialValues={{
          assign_name: item?.assign_name || '',
          action_name: item?.action_name || '',
          action_des: item?.action_des || '',
          sessionName:item?.sessionName || '',
          sessionId: item?.sessionId || '',
          lead_id: item?.lead_id || '',
          assign_id: item?.assign_id || '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
            const Id = item?.id;
        
            
            const payload = {
                id: Id,
                lead_id: values.lead_id,
                assign_id: values.assign_id,
                assign_name: values.assign_name,
                action_name: values.action_name,
                action_des: values.action_des,
                action_time: item?.action_time,  
                sessionId: values.sessionId,
                sessionName: values.sessionName,
            };
        
            try {
                const response = await fetch(`http://localhost:3000/crm-lead-action/${Id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
        
                if (response.ok) {
                    toast.success("Lead action updated successfully", { position: 'top-right' });
                    resetForm();
                    doneSubmition();
                } else {
                  toast.error('An unknown error occurred', {
                    position: "top-right"
                  })
                }
            } catch (error: any) {
              toast.error(`Error: ${error.message || 'An unknown error occurred'}`, {
                position: "top-right"
              });
            }
            setSubmitting(false);
        }}
        
      >
        {({ isSubmitting }) => (
          <Form>
            <Row>
              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="assign_name" className="col-sm-3 col-form-label text-start">
                    Assign Name
                  </FormLabel>
                  <Col sm="9">
                    <Field
                      as={FormControl}
                      type="text"
                      id="assign_name"
                      name="assign_name"
                      placeholder="Enter assign name"
                    />
                    <ErrorMessage name="assign_name" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="action_name" className="col-sm-3 col-form-label text-start">
                    Action Name
                  </FormLabel>
                  <Col sm="9">
                    <Field
                      as={FormControl}
                      type="text"
                      id="action_name"
                      name="action_name"
                      placeholder="Enter action name"
                    />
                    <ErrorMessage name="action_name" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="lead_id" className="col-sm-3 col-form-label text-start">
                    Lead ID
                  </FormLabel>
                  <Col sm="9">
                    <Field
                      as={FormControl}
                      type="number"
                      id="lead_id"
                      name="lead_id"
                      placeholder="Enter lead ID"
                    />
                    <ErrorMessage name="lead_id" component="div" className="text-danger" />
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <FormLabel htmlFor="assign_id" className="col-sm-3 col-form-label text-start">
                    Assign ID
                  </FormLabel>
                  <Col sm="9">
                    <Field
                      as={FormControl}
                      type="number"
                      id="assign_id"
                      name="assign_id"
                      placeholder="Enter assign ID"
                    />
                    <ErrorMessage name="assign_id" component="div" className="text-danger" />
                  </Col>
                </Row>
              </Col>

              <Col lg="6">
                <Row className="mb-3">
                  <FormLabel htmlFor="action_des" className="col-sm-3 col-form-label text-start">
                    Action Description
                  </FormLabel>
                  <Col sm="9">
                    <Field
                      as={FormControl}
                      type="text"
                      id="action_des"
                      name="action_des"
                      placeholder="Enter action description"
                    />
                    <ErrorMessage name="action_des" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="sessionName" className="col-sm-3 col-form-label text-start">
                    Session Name
                  </FormLabel>
                  <Col sm="9">
                    <Field
                      as={FormControl}
                      type="text"
                      id="sessionName"
                      name="sessionName"
                      placeholder="Enter session name"
                    />
                    <ErrorMessage name="sessionName" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <FormLabel htmlFor="sessionId" className="col-sm-3 col-form-label text-start">
                    Session ID
                  </FormLabel>
                  <Col sm="9">
                    <Field
                      as={FormControl}
                      type="number"
                      id="sessionId"
                      name="sessionId"
                      placeholder="Enter session ID"
                    />
                    <ErrorMessage name="sessionId" component="div" className="text-danger" />
                  </Col>
                </Row>

              </Col>
            </Row>

            <div className="d-flex align-items-start mt-3">
              <Button type="submit" variant="primary" className="me-2" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              <Link to="/app/ecommerce/crmlead">
                <Button type="button" variant="danger">
                  Cancel
                </Button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </ComponentContainerCard>
  );
}

export default EditLeadAction;
