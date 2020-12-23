import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
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
export type WizardFormStep<P> = P & {
  exitWizardForm: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (i: number) => void;
  submitForm: SubmitForm; // returns success or failure with a message
  validations: ValidationError<P> | undefined; // validation errors
  setStore: SetStore<P>;
};

// T is whatever is in the store
interface PathProps<T = {}> {
  children: React.ReactElement[]; // the steps of the form (needs to be of length at least 0)
  show: boolean;
  setShow: (show: boolean) => void;
  title: string;
  hideButtons?: boolean;
  onSubmit: (store: T) => boolean;
  initialStore: Partial<T>[];
  schemas: ZodSchema<Partial<T>>[];
}

/**
 * Not using React.FC as a work around to allow for generics for Wizard Form.
 * Do not do this normally. I will try to find a better way to do this
 */
const WizardForm = <T extends {}>({
  children,
  show,
  setShow,
  title,
  hideButtons = false,
  onSubmit,
  initialStore,
  schemas,
}: PathProps<T>) => {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(
    curIndex === children.length - 1,
  );
  const [CurStep, setCurStep] = useState<React.ReactElement>(children[0]);

  const [store, setCompleteStore] = useState<Array<Partial<T>>>(initialStore);
  // TODO const [curStore, setCurStore] = useState<>

  // keeps track of the errors for each field
  const [validations, setValidations] = useState<
    Array<ValidationError<Partial<T>> | undefined>
  >(children.map(() => undefined));
  // TODO maybe add a thing to keep track of whether or not an entire step is validated. Then use this in the dots to display which have errors? (i.e. make them red dots)

  useEffect(() => {
    setCurStep(children[curIndex]);
    setIsFirst(curIndex === 0);
    setIsLast(curIndex === children.length - 1);
  }, [curIndex, children]);

  /**
   * Use this to exit the wizard form without submitting.
   */
  const exitWizardForm = () => {
    setShow(false);
  };

  const validatePickedValues = <P extends {} | unknown = unknown>(
    schema: ZodSchema<P>,
    toParse: Partial<P>,
    toValidate: Array<keyof P>,
  ) => {
    const result = schema.safeParse(toParse);
    let changedErrors: ValidationError<P> | undefined;
    if (!result.success) {
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
        { ...validations[curIndex] } as ValidationError<P>,
      );
    } else {
      changedErrors = toValidate.reduce(
        (pre, key) => ({ ...pre, [key]: { success: true, error: undefined } }),
        { ...validations[curIndex] } as ValidationError<P>,
      );
    }
    return changedErrors;
  };

  /**
   * Validates and updates current step.
   * @param i The step to validate.
   * @return If the data is all valid.
   */
  const validateStep = (i: number): boolean => {
    const stepValidations = validatePickedValues<Partial<T>>(
      schemas[i],
      store[i],
      Object.keys(store[i]) as (keyof T)[],
    );

    setValidations({
      ...validations,
      [i]: { ...validations[i], ...stepValidations },
    });

    // TODO const noErrors = (Object.values(stepValidations) as Array<
    //   { success: true; error: undefined } | { success: false; error: ZodIssue }
    // >).reduce((pre, cur) => pre && cur.success, true);
    const validationWithError = (Object.values(stepValidations) as Array<
      { success: true; error: undefined } | { success: false; error: ZodIssue }
    >).find((data) => !data.success);

    return validationWithError === undefined;
  };

  /**
   * Validates current form step.
   * @return If the data is all valid.
   */
  const validateCurrent = (): boolean => {
    // validate everything that hasn't been validated yet
    return validateStep(curIndex);
  };

  /**
   * Use this to navigate the wizard form to a specific step.
   * This will validate all the steps from the current step
   * to the selected step and navigate to either the first
   * step that is invalid or to the selected step.
   * @param step The step to change to.
   */
  const setStep = (step: number) => {
    // if clicked a later step, validate all steps from current to the selected step
    if (step > curIndex) {
      for (let i = curIndex; i < Math.min(step, children.length); i++) {
        if (!validateStep(i)) {
          setCurIndex(i);
          return;
        }
      }
    }

    // if reached here, all previous steps are valid
    if (step <= 0) setCurIndex(0);
    if (step >= children.length) setCurIndex(children.length - 1);
    setCurIndex(step);
  };

  /**
   * Use this to navigate the wizard form to the next step.
   * This will first validate the current step and will
   * move to the next one if possible.
   */
  const nextStep = () => {
    // first validate
    const dataIsValid = validateCurrent();

    if (dataIsValid && curIndex + 1 < children.length) {
      setCurIndex(curIndex + 1);
    }
  };

  /**
   * Use this to navigate the wizard form to the previous step.
   */
  const prevStep = () => {
    if (curIndex - 1 >= 0) setCurIndex(curIndex - 1);
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

  const setStore: SetStore<T> = (value: Partial<T>) => {
    const changedValues = { ...store[curIndex], ...value };
    setCompleteStore({ ...store, [curIndex]: changedValues });

    // get the changed edited fields and set that they were changed
    const changedEditedFields = (Object.keys(value) as Array<keyof T>).reduce<
      Partial<{ [key in keyof T]: boolean }>
    >((prev, key) => {
      prev[key] = true;
      return prev;
    }, {});

    // every time there's a change, validate it
    const changedErrors = validatePickedValues<Partial<T>>(
      schemas[curIndex],
      changedValues,
      Object.keys(changedEditedFields) as (keyof T)[],
    );

    setValidations({
      ...validations,
      [curIndex]: { ...validations[curIndex], ...changedErrors },
    });
  };

  // TODO need to figure out how to have loading thing on top
  return (
    <Modal
      dialogClassName="wizard-form-modal-dialog"
      show={show}
      onHide={() => setShow(false)}
      centered
    >
      <div className="h-100 w-100">
        {/* TODO add border-radius to top and bottom rows */}
        <div className="wizard-form-top-bar">
          <Button variant="no-show" onClick={() => setShow(false)}>
            <miscIcons.orangeX />
          </Button>
          <span className="title">{title}</span>
          <span className="reset">Reset</span>
        </div>

        {/* TODO <div className="d-flex align-items-center justify-content-around h-100"> */}
        <div className="wizard-form-middle">
          {React.cloneElement(CurStep, {
            nextStep,
            prevStep,
            setStep,
            exitWizardForm,
            submitForm,
            setStore,
            validations: validations[curIndex],
            ...store[curIndex],
          })}
        </div>

        <div className="wizard-form-bottom-bar">
          <div className="d-flex">
            {children.map((c, i) => (
              <div className="mx-1">
                <Button variant="no-show" onClick={() => setStep(i)}>
                  {i === curIndex ? (
                    <miscIcons.smallEllipseActive />
                  ) : (
                    <miscIcons.smallEllipseInactive />
                  )}
                </Button>
              </div>
            ))}
          </div>

          <div className="d-flex">
            <div className="mr-2">
              {isFirst ? (
                <div>
                  <Button variant="no-show" onClick={prevStep}>
                    <miscIcons.smallLeftArrowDisabled />
                  </Button>
                </div>
              ) : (
                <div>
                  <Button variant="no-show" onClick={prevStep}>
                    <miscIcons.smallLeftArrow />
                  </Button>
                </div>
              )}
            </div>

            <div className="ml-2">
              {isLast ? (
                <div>
                  <Button variant="no-show" onClick={nextStep}>
                    <miscIcons.smallRightArrowDisabled />
                  </Button>
                </div>
              ) : (
                <div>
                  <Button variant="no-show" onClick={nextStep}>
                    <miscIcons.smallRightArrow />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WizardForm;
