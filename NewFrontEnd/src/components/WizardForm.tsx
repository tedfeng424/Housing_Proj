// TODO eventually separate the zod stuff in this into a separate function
/* Documentation of this component is at the bottom */
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ZodSchema, ZodIssue } from 'zod';
import { miscIcons } from '../assets/icons/all';

type ValidationError<P> = Partial<
  {
    [key in keyof P]:
      | { success: true; error: undefined }
      | { success: false; error: ZodIssue };
  }
>;

/**
 * Each child component will be given:
 * - nextStep()/prevStep() function to navigate the form
 * - an exit() function to exit the form (i.e. when the user completes the form)
 * - a submitForm() which can be called when you would like to submit the form (it returns T/F based on success of onSubmit and validationChecks)
 * // TODO
 */
type SubmitForm = () => Promise<{ success: boolean; message?: string }>;
type SetStore<P> = (value: Partial<P>) => void;
type SetSchema = (schema: ZodSchema<any>) => void;
type SetInitialStore = <P extends {}>(value: Partial<P>) => void;
export type WizardFormStep<P> = P & {
  exitWizardForm: () => void;
  nextStep: () => void;
  prevStep: () => void;
  submitForm: SubmitForm; // returns success or failure with a message
  validations: ValidationError<P> | undefined; // validation errors
  setStore: SetStore<P>;
  // setSchema: SetSchema;
  // setInitialStore: SetInitialStore;
};

// T is whatever is in the store
interface PathProps<T = {}> {
  children: React.ReactElement[]; // the steps of the form (needs to be of length at least 0)
  show: boolean;
  setShow: (show: boolean) => void;
  hideButtons?: boolean;
  onSubmit: (store: T) => boolean;
  initialStore: Partial<T>[];
  schemas: ZodSchema<T>[];
}

/**
 * Not using React.FC as a work around to allow for generics for Wizard Form.
 * Do not do this normally. I will try to find a better way to do this
 */
const WizardForm = <T extends {}>({
  children,
  show,
  setShow,
  hideButtons = false,
  onSubmit,
  initialStore,
  schemas,
}: PathProps<T>) => {
  const [index, setIndex] = useState<number>(0);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(index === children.length - 1);
  const [CurStep, setCurStep] = useState<React.ReactElement>(children[0]);

  const [store, setCompleteStore] = useState<Array<Partial<T>>>(initialStore);
  // TODO const [curStore, setCurStore] = useState<>

  // keeps track of the errors for each field
  const [validations, setValidations] = useState<
    Array<ValidationError<Partial<T>> | undefined>
  >(children.map(() => undefined));

  useEffect(() => {
    setCurStep(children[index]);
    setIsFirst(index === 0);
    setIsLast(index === children.length - 1);
  }, [index, children]);

  /**
   * Use this to exit the wizard form without submitting.
   */
  const exitWizardForm = () => {
    setShow(false);
  };

  /**
   * Use this to navigate the wizard form to the next step.
   * If validateOnlyAtSubmit is false, it will only go to the
   * next step if this step is validated.
   */
  const nextStep = () => {
    // validate if needed
    // TODO if (!validateOnlyAtSubmit && !validationsOverride[index]) return;

    if (index + 1 < children.length) setIndex(index + 1);
  };

  /**
   * Use this to navigate the wizard form to the previous step.
   */
  const prevStep = () => {
    if (index - 1 >= 0) setIndex(index - 1);
  };

  /**
   * Use this to submit the form (it checks validation values first).
   * Returns T/F based on success of validation values and onSubmit.
   * (i.e. returns false if any validations are false, returns false
   * if onSubmit returns false, otherwise returns true).
   */
  const submitForm: SubmitForm = async () => {
    // validateCurrent // TODO handle this case
    // if (validate errors exist) return; // TODO

    // Everything should be validated by this point
    const combined = store.reduceRight((pre, cur) => ({ ...pre, ...cur }));
    const success = await onSubmit(combined as T);
    if (success) exitWizardForm();
    return { success };
  };

  const validatePickedValues = <P extends {} | unknown = unknown>(
    schema: ZodSchema<P>,
    toParse: Partial<P>,
    toValidate: Array<keyof P>,
  ) => {
    const result = schema.safeParse(toParse);
    let changedErrors: ValidationError<P> | undefined;
    if (result && !result.success) {
      // console.log(result.error.isEmpty); // TODO use this to check if errors exist
      const { fieldErrors } = result.error.formErrors;
      changedErrors = toValidate.reduce(
        (pre, key) => {
          if (fieldErrors[key as string]) {
            return {
              ...pre,
              [key]: { success: false, error: fieldErrors[key as string][0] },
            };
          }
          return { ...pre, [key]: { success: true, error: undefined } };
        },
        { ...validations[index] } as ValidationError<P>,
      );
    }
    return changedErrors;
  };

  /**
   * Validates current form step.
   */
  const validateCurrent = () => {
    // validate everything that hasn't been validated yet
    let changedErrors: ValidationError<Partial<T>> | undefined;
    console.log(index);
    const schema = schemas[index];
    if (schema) {
      changedErrors = validatePickedValues<Partial<T>>(
        schema,
        store[index],
        Object.keys(store[index]) as (keyof T)[],
      );
    }
    return changedErrors;
  };
  // need to validate on arrows. need to pass errors

  const setStore: SetStore<T> = (value: Partial<T>) => {
    const changedValues = { ...store[index], ...value };
    setCompleteStore({ ...store, [index]: changedValues });

    // get the changed edited fields and set that they were changed
    const changedEditedFields = (Object.keys(value) as Array<keyof T>).reduce<
      Partial<{ [key in keyof T]: boolean }>
    >((prev, key) => {
      prev[key] = true;
      return prev;
    }, {});

    // every time there's a change, validate it
    let changedErrors: ValidationError<T> | undefined;
    const schema = schemas[index];
    if (schema) {
      changedErrors = validatePickedValues<Partial<T>>(
        schema,
        changedValues,
        Object.keys(changedEditedFields) as (keyof T)[],
      );
    }

    setValidations({
      ...validations,
      [index]: { ...validations[index], ...changedErrors },
    });
  };

  // TODO const setSchema: SetSchema = <P extends Partial<T>>(schema: ZodSchema<P>) => {
  //   if (!schemasInitialized[index]) {
  //     setZodSchemas({ ...zodSchemas, [index]: schema });
  //     setSchemasInitialized({ ...schemasInitialized, [index]: true });
  //   }
  // };

  // TODO const setInitialStore: SetInitialStore = <P extends Partial<T>>(
  //   value: Partial<P>,
  // ) => {
  //   if (!storeInitialized[index]) {
  //     setCompleteStore({ ...store, [index]: { ...value } as Partial<T> });
  //     setStoreInitialized({ ...storeInitialized, [index]: true });
  //   }
  // };

  // TODO need to figure out how to have loading thing on top
  return (
    <Modal
      dialogClassName="wizard-form-modal-dialog"
      show={show}
      onHide={() => setShow(false)}
      centered
    >
      <Container className="h-100 py-4">
        <div className="d-flex align-items-center justify-content-around h-100">
          <Col xs={1} className="d-flex arrow-icon justify-content-center">
            {!isFirst && !hideButtons && (
              <div>
                <Button variant="no-show" onClick={prevStep}>
                  <miscIcons.leftArrow />
                </Button>
              </div>
            )}
          </Col>

          <Col xs={10} className="d-flex">
            {React.cloneElement(CurStep, {
              nextStep,
              prevStep,
              exitWizardForm,
              submitForm,
              setStore,
              // TODO setSchema,
              // TODO setInitialStore,
              validations: validations[index],
              ...store[index],
            })}
          </Col>

          {/* TODO need to make the button look disabled when you can't move forward */}
          <Col xs={1} className="d-flex arrow-icon justify-content-center">
            {!isLast && !hideButtons && (
              <div>
                <Button
                  variant="no-show"
                  onClick={() => {
                    const curErrors = validateCurrent();
                    if (curErrors) {
                      console.log(curErrors);
                      setValidations({
                        ...validations,
                        [index]: { ...validations[index], ...curErrors },
                      });
                    } else {
                      nextStep();
                    }
                  }}
                >
                  <miscIcons.rightArrow />
                </Button>
              </div>
            )}
          </Col>
        </div>
      </Container>
    </Modal>
  );
};

export default WizardForm;

/**
 * DOCUMENTATED EXAMPLES
 */

/* Basic example (each form step as a component):
<WizardForm show={show} setShow={setShow}>
  <FakeStepTest1 />
  <FakeStepTest2 />
  <FakeStepTest3 />
  <FakeStepTest4 />
</WizardForm>;
*/

/* Basic example with hidden buttons:
<WizardForm show={show} setShow={setShow} hideButtons>
  <FakeStepTest1 />
  <FakeStepTest2 />
  <FakeStepTest3 />
  <FakeStepTest4 />
</WizardForm>;
*/

/* Basic example (each form step as a container)
    (NOTE: if you need to use nextStep(), prevStep(), or exit(), then you should NOT use this):
<WizardForm show={show} setShow={setShow}>
  <Container>
    <Row>
      <Col>HELLO</Col>
    </Row>
  </Container>
  <Container>
    <Row>
      <Col>HELLO</Col>
    </Row>
  </Container>
  <Container>
    <Row>
      <Col>HELLO</Col>
    </Row>
  </Container>
  <Container>
    <Row>
      <Col>HELLO</Col>
    </Row>
  </Container>
</WizardForm>
*/

// TODO the below is used for testing and should be deleted when this form has been finalized

export const FakeStepTest1: React.FC = () => (
  <Container>
    <Row>
      <Col>HELLO</Col>
    </Row>
  </Container>
);

export const FakeStepTest2: React.FC = () => (
  <Container>
    <Row>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
    </Row>
  </Container>
);

export const FakeStepTest3: React.FC = () => (
  <Container>
    <Row>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
    </Row>
    <Row>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
    </Row>
    <Row>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
    </Row>
    <Row>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
    </Row>
    <Row>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
    </Row>
  </Container>
);

export const FakeStepTest4: React.FC = () => (
  <Container>
    <Row>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
    </Row>
  </Container>
);

/**
 * Hook to access function to update WizardForm's "local store". It's shared among all children.
 * Works similar to useState, except also can provide zod schema for validation here.
 */
// const useWizardFormStorage = <P extends Partial<T>>(
//   initialValue: P,
//   schema?: ZodSchema<P>,
// ) => {
//   const setStoreWrapper: SetStore<P> = (
//     value: Partial<P>,
//     shouldValidate = true,
//   ) => {
//     const changedValues = { ...store[index], ...value };
//     setCompleteStore({ ...store, [index]: changedValues });

//     // get the changed edited fields and set that they were changed
//     const changedEditedFields = (Object.keys(value) as Array<keyof P>).reduce<
//       Partial<{ [key in keyof P]: boolean }>
//     >((prev, key) => {
//       prev[key] = true;
//       return prev;
//     }, {});
//     setEditedFields({
//       ...editedFields,
//       [index]: { ...editedFields[index], changedEditedFields },
//     });

//     // every time there's a change, validate it
//     let changedErrors: ValidationError<P> | undefined;
//     if (schema && shouldValidate) {
//       changedErrors = validatePickedValues<P>(
//         schema,
//         changedValues,
//         Object.keys(changedEditedFields) as (keyof P)[],
//       );
//     }

//     setErrors({ ...errors, [index]: { ...errors[index], ...changedErrors } });
//   };

//   if (!schemasInitialized[index]) {
//     setZodSchemas({ ...zodSchemas, [index]: schema });
//     setSchemasInitialized({ ...schemasInitialized, [index]: true });
//   }

//   if (!storeInitialized[index]) {
//     if (initialValue) {
//       setStoreWrapper(initialValue, false);
//     }
//     setStoreInitialized({ ...storeInitialized, [index]: true });
//   }

//   return [store[index] as P & T, errors[index], setStoreWrapper] as [
//     Partial<P>,
//     ValidationError<P> | undefined,
//     SetStore<P>,
//   ];
// };
