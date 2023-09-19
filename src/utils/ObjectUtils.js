import {produce} from "immer";

export default class ObjectUtils {
  /**
   * @param obj object to assign property
   * @param value value to assign
   * @param properties nested property names to assign the value to (if the property doesn't exist, it's created) (e.g. ["a", "b"] = obj.a.b)
   * @returns any object after assign the value
   *
   * Example usage:
   * 1. assignProperty({}, "Bob", "person", "pet", "name")
   *    return {
   *      "person": {
   *        "pet": {
   *          "name: "Bob"
   *        }
   *      }
   *    }
   *
   * 2. assignProperty(
   *    {
   *      "person": {
   *        "pet": {
   *          "name: "Alice"
   *        }
   *      }
   *    }, "Bob", "person", "pet", "name")
   *    return {
   *      "person": {
   *        "pet": {
   *          "name: "Alice"
   *        }
   *      }
   *    }
   */
  static assignProperty(obj, value, ...properties) {
    let currentObj = obj;
    for (let i = 0; i < properties.length - 1; i++) {
      const property = properties[i];
      if (!currentObj[property]) {
        currentObj[property] = {};
      }
      currentObj = currentObj[property];
    }
    currentObj[properties[properties.length - 1]] = value;
    return obj;
  }

  /**
   * same as ObjectUtils#assignProperty but returns a copy of the object with the updated field
   * the old object is left untouched
   */
  static assignPropertyCopy(obj, value, ...properties) {
    return produce(obj, (draft) => ObjectUtils.assignProperty(draft, value, properties));
  }

  /**
   * @param obj obj to check property
   * @param properties nested property names(e.g. ["a", "b"] = obj.a.b)
   * @return boolean that specifies if a property exist in the obj
   */
  static hasProperty(obj, ...properties){
    // Check if the object is null or undefined
    if (obj === null || obj === undefined) {
      return false;
    }
    let currentObj = obj;
    for (const property of properties) {
      if (currentObj && property in currentObj) {
        currentObj = currentObj[property];
      } else {
        return false;
      }
    }
    return true;
  }

  /**
   * @param obj obj to get property
   * @param properties nested property names(e.g. ["a", "b"] = obj.a.b)
   * @return any the property if it exists, otherwise null is returned
   */
  static getProperty(obj, ...properties){
    if (!ObjectUtils.hasProperty(obj, ...properties)) return null;
    let currentObj = obj;
    for (const property of properties) {
      currentObj = currentObj[property];
    }
    return currentObj;
  };
}