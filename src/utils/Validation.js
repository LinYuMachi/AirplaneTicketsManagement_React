import ObjectUtils from "./ObjectUtils";


export default class FieldValidation {
  /**
   * joi's object schema
   */
  schema;
  constructor(schema) {
    this.schema = schema;
  }

  /**
   *
   * @param data
   * @param abortEarly
   * @param allowUnknown
   * @return any
   *
   * validates the data and returns the mapped error
   */
  validate(data, abortEarly = false, allowUnknown = false) {
    const { error, value } = this.schema.validate(data, { abortEarly: abortEarly, allowUnknown: allowUnknown });
    const mappedError = {};
    error?.details?.forEach(err =>
        ObjectUtils.assignProperty(mappedError, err?.message ?? 'No Error Message Found', err?.path ?? []))
    return mappedError;
  }
}