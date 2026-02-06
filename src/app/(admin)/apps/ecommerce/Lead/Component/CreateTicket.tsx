import { Button, Col, FormControl, FormLabel, FormSelect, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import ComponentContainerCard from '@/components/ComponentContainerCard';

function CreateTicket() {
 
    const formik = useFormik({
    initialValues: {
      subject: "",
      priority: "",
      category: "",
      description: ""
    },
    onSubmit: (values) => {
     
      console.log('Form submitted:', values);
        formik.resetForm();
    }
  });

  return (
    <ComponentContainerCard title="Create Ticket">
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col lg="6">
            <Row className="mb-3">
              <FormLabel htmlFor="subject" className="col-sm-2 col-form-label text-start">
                Subject
              </FormLabel>
              <Col sm="10">
                <FormControl
                  type="text"
                  id="subject"
                  name="subject"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  placeholder="Enter subject"
                />
                <FormControl.Feedback type="invalid">
                  {formik.errors.subject}
                </FormControl.Feedback>
              </Col>
            </Row>

            <Row className="mb-3">
              <FormLabel htmlFor="priority" className="col-sm-2 col-form-label text-start">
                Priority
              </FormLabel>
              <Col sm="10">
                <FormSelect
                  id="priority"
                  name="priority"
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                >
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </FormSelect>
                <FormControl.Feedback type="invalid">
                  {formik.errors.priority}
                </FormControl.Feedback>
              </Col>
            </Row>
          </Col>

          <Col lg="6">
            <Row className="mb-3">
              <FormLabel htmlFor="category" className="col-sm-2 col-form-label text-start">
                Category
              </FormLabel>
              <Col sm="10">
                <FormSelect
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                >
                  <option value="">Select</option>
                  <option value="Technical">Technical</option>
                  <option value="Billing">Billing</option>
                  <option value="General">General</option>
                </FormSelect>
                <FormControl.Feedback type="invalid">
                  {formik.errors.category}
                </FormControl.Feedback>
              </Col>
            </Row>

            <Row className="mb-3">
              <FormLabel htmlFor="description" className="col-sm-2 col-form-label text-start">
                Description
              </FormLabel>
              <Col sm="10">
                <FormControl
                  as="textarea"
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  placeholder="Enter description"
                  rows={4}
                />
                <FormControl.Feedback type="invalid">
                  {formik.errors.description}
                </FormControl.Feedback>
              </Col>
            </Row>
          </Col>

          <div className="d-flex align-items-start">
            <Button type="submit" variant="primary" className="me-1">
              Submit
            </Button>
            <Button type="button" variant="danger">
              Cancel
            </Button>
          </div>
        </Row>
      </form>
    </ComponentContainerCard>
  );
}

export default CreateTicket;
