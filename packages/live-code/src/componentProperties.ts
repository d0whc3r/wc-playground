/*!
Use the two interfaces and two objects below to register
the properties and attributes the Web Component is expected to receive.
These will be passed down as props to the React App underneath.

To understand the difference between properties and attributes,
please refer to this article:
https://alligator.io/web-components/attributes-properties/
*/

/**
 * Update this interface to reflect the types of the properties
 */
export interface IComponentProperties {
  code: string;
}

/**
 * Update this object with the initial values of the properties
 */
export const componentProperties: IComponentProperties = {
  code: '',
};

/**
 * Update this interface to reflect the attributes of the Web Component
 * NB: The type of an attribute is always a string
 */
export interface IComponentAttributes {
  code: string;
}

/**
 * Update this object with the initial values of the attributes
 */
export const componentAttributes: IComponentAttributes = {
  code: 'Live Code',
};
