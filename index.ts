/*--------BASICS TYPESCRIPT--------*/

console.log("This is TS file");

// Basic Types
let a: string = "string_val";
let e: number = 12;
let b: boolean = true;
let c: null = null;
let d: object = {};
let arr: string[] = ["2", "sdd"];
let arr1: number[] = [1, 2];
let arr2: object[] = [{ name: "Ajmal" }];
let bigint: bigint = 213223423n;
let person: { name: string; age: number } = {
  name: "Ajmal",
  age: 27,
};

/* 
TUPLES 
(A tuple in TypeScript is an array with a fixed number of elements where each element can have a different type. Tuples are useful when you want to represent a group of values with known types and order.
eg: const [getter, setter] = useState(second)) */
// Define a tuple type for the location
type Location = [string, number, number];
// Create a tuple instance
const userLocation: Location = ["New York", 40.7128, -74.006];
// Accessing elements in the tuple
const city: string = userLocation[0];
const latitude: number = userLocation[1];
const longitude: number = userLocation[2];

/* 
ENUMS 
(Enums help organize related constants and improve code clarity, making them ideal for representing a fixed set of options or states. */
enum UserRole {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

let role: UserRole = UserRole.Guest;

function checkAccess(role: UserRole) {
  if (role === UserRole.Admin) {
    console.log("Access granted");
  } else {
    console.log("Access denied");
  }
}

checkAccess(UserRole.Admin); // Output: "Access granted"
checkAccess(UserRole.User); // Output: "Access denied"

/*
ANY
(the any type is a type that can represent any JavaScript value without any type checks. It essentially opts out of type checking for variables declared with this type, providing maximum flexibility at the expense of type safety.)
*/
// Using 'any' to allow any type of value
let data: any;
data = true; // Assign a boolean
data = { name: "Alice", age: 30 }; // Assign an object

/*
UNKNOWN
(the unknown type is a safer alternative to any. While unknown allows you to assign any value to a variable, you must perform type checking before performing operations on it. This ensures that the operations are type-safe.)
*/
let input: unknown;
input = "Hello, world!"; // Assign a string
input = 42; // Assign a number
input = { name: "Alice", age: 30 }; // Assign an object
// Type checking is required before using the value
if (typeof input === "string") {
  console.log(input.toUpperCase()); // TypeScript knows 'input' is a string here
}
// Type assertions can also be used
input = "TypeScript";
console.log((input as string).length); // Use 'as' to assert type

/*
NEVER
(The never type represents values that never occur. It's used to indicate that a function never returns a value, such as in cases where the function always throws an error or goes into an infinite loop. Variables of type never cannot be assigned any value, not even null or undefined.)
*/
// A function that always throws an error
function throwError(message: string): never {
  throw new Error(message);
}
// A function that never returns
function infiniteLoop(): never {
  while (true) {
    // Code that never terminates
  }
}

/*
VOID
(the void type is used to represent the absence of a value. It is commonly used as the return type for functions that do not return a value. This is similar to undefined in JavaScript, but void is more explicit about the intention that a function does not return anything.)
*/
// Function that performs a side effect but does not return a value
function logMessage(message: string): void {
  console.log(message);
}
// Usage
logMessage("Hello, TypeScript!"); // Output: "Hello, TypeScript!"

/*
TYPE
(the type keyword is used to define custom types, allowing you to create aliases for more complex type definitions or to combine existing types into new ones. This feature enhances code readability and maintainability by providing descriptive names for complex types and enabling more expressive type compositions.)
*/
// Define a type alias for a complex object
type User = {
  id: number;
  name: string;
  email: string;
};

// Use the type alias to declare variables or function parameters
let user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

let userArr: User[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
  },
];

function getUserEmail(user: User): string {
  return user.email;
}

console.log(getUserEmail(user)); // Output: "alice@example.com"

// a) Union Types
// Define a union type
type ID = number | string;
// Variables can be of either type in the union
let userId: ID = 123;
userId = "abc123";
console.log(userId); // Output: "abc123"

// b) Intersection Types
// Define two interfaces
interface Name {
  firstName: string;
  lastName: string;
}
interface Age {
  age: number;
}
/*
or
type Name =  {
  firstName: string;
  lastName: string;
}
type Age =  {
  age: number;
}
*/
// Create an intersection type
type Person = Name & Age;
// A variable of type Person must have all properties
let personNew: Person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
};
console.log(personNew); // Output: { firstName: "John", lastName: "Doe", age: 30 }

/*
INTERFACE
(You can use extends with both interfaces and classes to inherit properties and methods from other interfaces or classes.)
*/
// Define a basic interface
interface Animal {
  name: string;
  age: number;
}
// Extend the Animal interface to create a new interface
interface Dog extends Animal {
  breed: string;
  bark(): void;
}
// Use the extended interface
let myDog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Golden Retriever",
  bark: () => console.log("Woof!"),
};
myDog.bark(); // Output: "Woof!"
console.log(myDog.name); // Output: "Buddy"

/*
TYPE vs INTERFACE
(both type and interface are used to define and describe the shapes of objects and other complex data types. While they have overlapping functionality, there are key differences between them, and choosing between the two often depends on specific use cases.)
/**
### When to Use `interface` vs. `type`

#### Use `interface` when:
- You need to take advantage of declaration merging.
- You are defining object shapes or class interfaces.
- You prefer the clarity and readability of extending interfaces for object hierarchies.

#### Use `type` when:
- You are working with complex types, such as unions, intersections, or tuples.
- You need to define aliases for primitive types or function types.
- You want to represent a more versatile range of types beyond just objects.
**/

// ### Differences Between `type` and `interface`

// #### 1. Declaration Merging
// **Interface**: Supports declaration merging, which allows you to define multiple interfaces with the same name, and TypeScript will automatically merge them into a single interface.
interface UserI {
  name: string;
}

// Another declaration of the same interface
interface UserI {
  age: number;
}

// Merged interface includes both properties
const userI: UserI = {
  name: "Alice",
  age: 30,
};

//- **Type**: Does not support declaration merging. If you try to define a `type` with the same name more than once, it will result in an error.
type UserT = {
  name: string;
};
// Error: Duplicate identifier 'User'.
type UserT = {
  age: number;
};

// #### 2. Extensibility
// - **Interface**: Can be extended using the `extends` keyword, which is useful for building complex object hierarchies.
interface AnimalI {
  name: string;
}
interface DogI extends AnimalI {
  breed: string;
}
const myDogE: DogI = {
  name: "Buddy",
  breed: "Golden Retriever",
};

// - **Type**: Can also be extended, but this is done using intersections.
type AnimalT = {
  name: string;
};
type DogT = AnimalT & {
  breed: string;
};
const myDogT: DogT = {
  name: "Buddy",
  breed: "Golden Retriever",
};

// #### 3. Representing Different Types
// - **Interface**: Primarily used for defining object shapes and can describe classes.
interface PersonR {
  name: string;
  age: number;
}
class EmployeeR implements PersonR {
  name: string;
  age: number;
  position: string;
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }
}

// - **Type**: More versatile and can represent a variety of types, including primitives, union types, tuples, and more.
// Union type
type ID_T = number | string;
// Tuple type
type Point = [number, number];
// Function type
type Stringify = (value: number) => string;
// Using a union type
let userIdT: ID_T = 123;
userId = "abc123";
const point: Point = [10, 20];
const stringify: Stringify = (value) => value.toString();

/*
OPTIONAL FIELD:
In TypeScript, optional fields allow you to define properties within an interface or a type that may or may not be present. This feature helps create flexible and adaptable data structures, especially when dealing with optional or partial data.
To make a field optional in an interface or type, you append a question mark (?) to the field name.
*/
interface UserProfile {
  username: string; // Required field
  email?: string; // Optional field
  age?: number; // Optional field
}
// Creating an object that matches the UserProfile interface
const user1: UserProfile = {
  username: "Alice",
  email: "alice@example.com",
};
const user2: UserProfile = {
  username: "Bob",
  age: 25,
};
console.log(user1); // Output: { username: "Alice", email: "alice@example.com" }
console.log(user2); // Output: { username: "Bob", age: 25 }

/*
TYPE ASSERTIONS:
Type assertions in TypeScript allow you to explicitly tell the compiler what the type of a variable should be. This can be useful when you have more information about the type of a value than TypeScript is able to infer on its own. Type assertions do not perform any runtime type checking or conversion—they simply instruct the compiler to treat a value as a particular type during the compile time.
*/
let someValue: any = "Hello, World!";
let strLength: number = (<string>someValue).length;
//or
let strLength1: number = (someValue as string).length;

/*
FUNCTIONS
*/
// Regular Functions
function add(a: number, b: number): number {
  return a + b;
}
console.log(add(5, 3)); // Output: 8

// Function Expressions
const multiply = function (a: number, b: number): number {
  return a * b;
};
console.log(multiply(4, 5)); // Output: 20

// Arrow Functions
const subtract = (a: number, b: number): number => {
  return a - b;
};
console.log(subtract(10, 4)); // Output: 6

// Optional Parameters
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}
console.log(greet("Alice")); // Output: Hello, Alice!
console.log(greet("Alice", "Hi")); // Output: Hi, Alice!

// Default Parameters
function power(base: number, exponent: number = 2): number {
  return base ** exponent;
}
console.log(power(3)); // Output: 9
console.log(power(3, 3)); // Output: 27

// Rest Parameters
function sum(...numbers: number[]): void {
  console.log(numbers.reduce((total, num) => total + num, 0));
}
sum(1, 2, 3); // Output: 6
sum(4, 5, 6, 7); // Output: 22

// Function Overloading
function display(value: string): void;
function display(value: number): void;
function display(value: string | number): void {
  console.log(`Value: ${value}`);
}

display("Hello"); // Output: Value: Hello
display(42); // Output: Value: 42

// Function Types
type Operation = (a: number, b: number) => number;
// const add: Operation = (a, b) => a + b;
// const multiply: Operation = (a, b) => a * b;

// console.log(add(5, 3)); // Output: 8
// console.log(multiply(4, 5)); // Output: 20

// Callback Functions
function fetchData(url: string, callback: (data: string) => void): void {
  // Simulate fetching data
  const data = "Sample data from " + url;
  callback(data);
}

fetchData("https://api.example.com", (data) => {
  console.log(data); // Output: Sample data from https://api.example.com
});

//   Generic Functions
// function identity<T>(arg: T): T {
//   return arg;
// }

// console.log(identity<string>("Hello")); // Output: Hello
// console.log(identity<number>(42)); // Output: 42

/*
CLASS WITH ALL ACCESS MODIFIERS
Public (public):
The name property and getDetails() method are marked as public, meaning they can be accessed from anywhere, including outside the class.

Protected (protected):
The department property and getDepartment() method are protected, allowing access within the class and its subclasses (Manager in this case).

Private (private):
The salary property and getSalary() method are private, restricting access to within the Employee class only. The showSalary() method provides a way to access the private getSalary() method from outside the class.
*/
class Employee {
  // Public property: accessible from anywhere
  public name: string;

  // Protected property: accessible within the class and its subclasses
  protected department: string;

  // Private field: encapsulated within the class
  private _salary: number;

  // Readonly property: can only be assigned once
  public readonly employeeId: number;

  constructor(
    name: string,
    department: string,
    salary: number,
    employeeId: number
  ) {
    this.name = name;
    this.department = department;
    this._salary = salary;
    this.employeeId = employeeId;
  }

  // Getter for salary
  public get salary(): number {
    return this._salary;
  }

  // Setter for salary: provides control over salary changes
  public set salary(newSalary: number) {
    if (newSalary < 0) {
      throw new Error("Salary cannot be negative.");
    }
    this._salary = newSalary;
  }

  // Public method: can be called from outside the class
  public getDetails(): string {
    return `Employee Name: ${this.name}, Department: ${this.department}, Employee ID: ${this.employeeId}`;
  }

  // Protected method: can be accessed by subclasses
  protected getDepartment(): string {
    return `Department: ${this.department}`;
  }

  // Private method: accessible only within this class
  private getSalary(): number {
    return this._salary;
  }

  // Public method to access private method
  public showSalary(): string {
    return `Salary: ${this.getSalary()}`;
  }
}

class Manager extends Employee {
  // Public method in subclass
  public getManagerDetails(): string {
    // Can access protected property
    return `${this.getDetails()}, ${this.getDepartment()}`;
  }
}

// Create an instance of the Employee class
const emp = new Employee("Alice", "Engineering", 75000, 12345);
console.log(emp.getDetails()); // Output: "Employee Name: Alice, Department: Engineering, Employee ID: 12345"
console.log(emp.showSalary()); // Output: "Salary: 75000"

// Using the setter to update salary
emp.salary = 80000;
console.log(emp.showSalary()); // Output: "Salary: 80000"

// Attempting to set a negative salary
try {
  emp.salary = -5000; // Throws an error: "Salary cannot be negative."
} catch (error) {
  console.error(error.message);
}

// Attempting to modify a readonly property will result in an error
// emp.employeeId = 67890; // Error: Cannot assign to 'employeeId' because it is a read-only property.

// Create an instance of the Manager class
const manager = new Manager("Bob", "HR", 90000, 67890);
console.log(manager.getManagerDetails()); // Output: "Employee Name: Bob, Department: HR, Employee ID: 67890, Department: HR"

// Accessing properties directly
console.log(emp.name); // Accessible: Output "Alice"
// console.log(emp.department); // Error: Property 'department' is protected and only accessible within class 'Employee' and its subclasses.
// console.log(emp.salary); // Accessible through the getter

/*
* 
--------ADVANCED TYPESCRIPT--------
*
*/

/*
GENERICS
(Generics in TypeScript are a feature that allows you to create reusable components (such as functions, classes, and interfaces) that can operate with multiple types while maintaining type safety. Generics provide a way to define placeholders for types, which are then specified when the component is used.)

Generic Function (identity):
The function identity<T> takes a value of type T and returns it. The type T is specified when calling the function, allowing it to work with different types.

Generic Class (Box):
The class Box<T> uses a generic type T to handle a value. You can create instances of Box with different types and get or set values while maintaining type safety.

Generic Interface (Pair):
The Pair<K, V> interface defines a key-value pair with generic types K and V. You can also create generic interfaces to define the shape of objects that can work with different data types.
*/
// Generic Function
function identity<T>(value: T): T {
  return value;
}

let numG = identity<number>(27);
console.log(identity("Hello")); // Output: "Hello"
console.log(identity(42)); // Output: 42
console.log(identity({ name: "ajmal" })); // Output: 42

// Generic function to return the first element of an array
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}
// Using the generic function with different types
const firstNumber = getFirstElement([1, 2, 3, 4]); // number
const firstString = getFirstElement(["a", "b", "c"]); // string
console.log(firstNumber); // Output: 1
console.log(firstString); // Output: "a"

// Generic Class
class Box<T> {
  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  public getValue(): T {
    return this._value;
  }

  public setValue(value: T): void {
    this._value = value;
  }
}
const stringBox = new Box<string>("Generic String");
console.log(stringBox.getValue()); // Output: "Generic String"
const numberBox = new Box<number>(123);
console.log(numberBox.getValue()); // Output: 123

// Generic Interface
interface Pair<K, V> {
  key: K;
  value: V;
}
const pair: Pair<string, number> = {
  key: "age",
  value: 30,
};
console.log(pair); // Output: { key: 'age', value: 30 }

// Stack Implementation with Generics
class Stack<T> {
  private items: T[] = [];

  // Push an item onto the stack
  public push(item: T): void {
    this.items.push(item);
  }

  // Pop an item off the stack
  public pop(): T | undefined {
    return this.items.pop();
  }

  // Peek at the top item without removing it
  public peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  // Below doesn't have T coz, T is used in methods where the type of the elements in the stack is relevant
  // Check if the stack is empty
  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Get the size of the stack
  public size(): number {
    return this.items.length;
  }
}

// Example usage with numbers
const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log(numberStack.peek()); // Output: 30
console.log(numberStack.pop()); // Output: 30
console.log(numberStack.size()); // Output: 2
console.log(numberStack.isEmpty()); // Output: false

// Example usage with strings
const stringStack = new Stack<string>();
stringStack.push("a");
stringStack.push("b");
stringStack.push("c");

console.log(stringStack.peek()); // Output: "c"
console.log(stringStack.pop()); // Output: "c"
console.log(stringStack.size()); // Output: 2
console.log(stringStack.isEmpty()); // Output: false

/*
LITERAL TYPES:
Literal types are specific values that a variable or function parameter can hold. Literal types allow you to define a set of exact values that are acceptable, enhancing type safety by restricting the values to a defined set.
*/
// String Literal Type
type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction): void {
  console.log(`Moving ${direction}`);
}

move("up"); // Valid
move("down"); // Valid
// move("side"); // Error: Argument of type '"side"' is not assignable to parameter of type 'Direction'.

// Number Literal Type
type Status = 200 | 400 | 500;

function handleStatus(code: Status): void {
  switch (code) {
    case 200:
      console.log("Success");
      break;
    case 400:
      console.log("Bad Request");
      break;
    case 500:
      console.log("Server Error");
      break;
  }
}

handleStatus(200); // Valid
handleStatus(400); // Valid
// handleStatus(404); // Error: Argument of type '404' is not assignable to parameter of type 'Status'.

// Boolean Literal Type
type IsActive = true | false;

function toggle(status: IsActive): void {
  console.log(`Active: ${status}`);
}

toggle(true); // Valid
toggle(false); // Valid
// toggle(null); // Error: Argument of type 'null' is not assignable to parameter of type 'IsActive'.

// LITERAL TYPE use case:
// Action Types
type CounterActionType = "INCREMENT" | "DECREMENT";
// Action Creator
interface CounterAction {
  type: CounterActionType;
  payload?: number;
}

const increment = (amount: number): CounterAction => ({
  type: "INCREMENT",
  payload: amount,
});
const decrement = (amount: number): CounterAction => ({
  type: "DECREMENT",
  payload: amount,
});

// Reducer
interface CounterState {
  count: number;
}
const initialState: CounterState = { count: 0 };
const counterReducer = (
  state: CounterState = initialState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + (action.payload || 0) };
    case "DECREMENT":
      return { count: state.count - (action.payload || 0) };
    default:
      return state;
  }
};

/*
NAMESPACE:
(A namespace is a way to organize code into logical units, making it easier to manage and avoid name collisions. Namespaces provide a way to group related code together. They are especially useful for organizing large code-bases and managing dependencies.)
Namespaces: Organize code into logical groups to avoid naming conflicts.
Export Members: Use export to make namespace members accessible outside the namespace.
Usage: Access namespace members with the namespace prefix.
*/
// Define a namespace
namespace MathUtils {
  export function add(x: number, y: number): number {
    return x + y;
  }
  export function subtract(x: number, y: number): number {
    return x - y;
  }
  // Define an interface within the namespace
  export interface Point {
    x: number;
    y: number;
  }
}

// Using the namespace
const sumNum = MathUtils.add(5, 3);
console.log(`Sum: ${sumNum}`); // Output: Sum: 8
const difference = MathUtils.subtract(10, 4);
console.log(`Difference: ${difference}`); // Output: Difference: 6
const pointNum: MathUtils.Point = { x: 10, y: 20 };
console.log(`Point: (${pointNum.x}, ${pointNum.y})`); // Output: Point: (10, 20)

/*
TYPE GUARDS:
TypeScript needs to know what type a variable is before you can perform certain operations on it. When working with union types or any situation where a variable could be one of several types, Type Guards help you narrow the type, so you can safely access properties or methods that are specific to one of those types.
*/
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(`String value: ${value.toUpperCase()}`);
  } else if (typeof value === "number") {
    console.log(`Number value: ${value.toFixed(2)}`);
  }
}
printValue("Hello"); // Output: String value: HELLO
printValue(42); // Output: Number value: 42.00

/*Index Signatures
Index signatures in TypeScript allow you to define objects that can have arbitrary keys of a certain type, and you specify the type of the values associated with those keys. This is particularly useful when working with objects where the keys are not known in advance or when you want to enforce a specific structure for objects with dynamic properties.*/
// Define an interface with an index signature
interface StudentGrades {
  [subject: string]: number; // Key is a string, value is a number
}
// Create an object using the interface
const grades: StudentGrades = {
  math: 95,
  science: 88,
  history: 76,
};
// Access and modify properties using the index signature
console.log(`Math grade: ${grades.math}`); // Output: Math grade: 95
console.log(`Science grade: ${grades["science"]}`); // Output: Science grade: 88
// Add new properties dynamically
grades.english = 90;
console.log(`English grade: ${grades.english}`); // Output: English grade: 90
// Iterate over properties
for (const subject in grades) {
  console.log(`${subject}: ${grades[subject]}`);
}
// Output:
// math: 95
// science: 88
// history: 76
// english: 90

interface StringArray {
  [index: number]: string;
}
const fruits: StringArray = ["Apple", "Banana", "Cherry"];
console.log(fruits[0]); // Output: Apple
console.log(fruits[1]); // Output: Banana

/*
KEYOF OPERATOR
(The keyof operator creates a union type of the keys of an object.)
*/
// Define an interface
interface PersonI {
  name: string;
  age: number;
  email: string;
}
// Use keyof to create a type that is a union of keys of the Person interface
type PersonKeys = keyof PersonI; // "name" | "age" | "email"
// Function that accepts keys of the Person interface
function getProperty(person: PersonI, key: PersonKeys) {
  return person[key];
}
// Example usage
const personI: PersonI = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",
};
const personName = getProperty(personI, "name");
console.log(personName); // Output: Alice
const personAge = getProperty(personI, "age");
console.log(personAge); // Output: 30
// const personGender = getProperty(person, "gender"); // Error: Argument of type '"gender"' is not assignable to parameter of type 'PersonKeys'.

/**
 * UTILITY TYPES:
 * 
// Partial: Makes all properties optional.
// Required: Makes all properties required.
// Readonly: Makes all properties read-only.
// Record: Creates a type with a set of properties of a given type.
// Pick: Creates a type by picking a subset of properties.
// Omit: Creates a type by omitting a subset of properties.
// Exclude: Excludes types from a union.
// Extract: Extracts types from a union.
// NonNullable: Excludes null and undefined from a type.
// ReturnType: Gets the return type of a function.
// InstanceType: Gets the instance type of a constructor function.
 */

// Interface representing a person with name and age properties
interface PersonP {
  name: string;
  age: number;
}

// Partial: Creates a type with all properties of T set to optional.
// Useful when you want to work with objects where some properties might be missing.
type PartialPerson = Partial<PersonP>;
// Equivalent to: { name?: string; age?: number; }

// Required: Creates a type with all properties of T set to required.
// Useful when you want to ensure all properties must be provided.
type RequiredPerson = Required<PersonP>;
// Equivalent to: { name: string; age: number; }

// Readonly: Creates a type with all properties of T set to read-only.
// Useful when you want to prevent properties from being modified after initialization.
type ReadonlyPerson = Readonly<PersonP>;
// Equivalent to: { readonly name: string; readonly age: number; }

// Record: Constructs a type with a set of properties K of type T.
// Useful for creating objects with fixed keys and a common type for all values.
type NameRecord = Record<"firstName" | "lastName", string>;
// Equivalent to: { firstName: string; lastName: string; }

// Pick: Creates a type by picking a set of properties K from T.
// Useful when you only need a subset of properties from an object.
type NameOnly = Pick<PersonP, "name">;
// Equivalent to: { name: string; }

// Omit: Creates a type by omitting a set of properties K from T.
// Useful when you want all properties except a few specific ones.
type AgeOnly = Omit<PersonP, "name">;
// Equivalent to: { age: number; }

/**
 * MODULES:
  are a way to organize and encapsulate code by dividing it into separate files or namespaces. Modules help manage dependencies, enhance code readability, and prevent global namespace pollution.
 */

//-> mathUtils.ts
// Exporting a function
export function addNum(a: number, b: number): number {
  return a + b;
}
// Exporting a constant
export const PI: number = 3.14159;
// Exporting a class
export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
  subtract(a: number, b: number): number {
    return a - b;
  }
}

//-> index.ts
// Importing individual exports
// import { add, PI } from './mathUtils';
// // Importing the entire module
// import * as MathUtils from './mathUtils';
// // Importing a class
// import { Calculator } from './mathUtils';

console.log(add(2, 3)); // Output: 5
console.log(PI); // Output: 3.14159

const calc = new Calculator();
console.log(calc.add(10, 5)); // Output: 15
console.log(calc.subtract(10, 5)); // Output: 5

console.log(MathUtils.add(7, 8)); // Output: 15
console.log(MathUtils.PI); // Output: 3.14159

/**
 * TYPE ALIASES 
 are a way to create a new name for a type. This can simplify complex type definitions, improve code readability, and make types easier to reuse.
 */
// Define a type alias for a complex type
type PointP = {
  x: number;
  y: number;
};
// Use the alias to define a variable
const pointP: PointP = { x: 10, y: 20 };
console.log(pointP); // Output: { x: 10, y: 20 }

/**
 * DECORATORS
  are a special kind of declaration that can be attached to classes, methods, properties, or parameters to modify their behavior. They provide a way to add metadata or modify class behavior in a declarative manner.
  Types of Decorators
1. Class Decorators: Applied to the class constructor. They can be used to modify class behavior or add metadata.
2. Method Decorators: Applied to methods within a class. They can be used to modify method behavior or add metadata.
3. Property Decorators: Applied to properties within a class. They can be used to add metadata or modify property behavior.
4. Parameter Decorators: Applied to function parameters. They are used to add metadata about parameters.
 */
// Class Decorator
function LogClass(target: Function) {
  console.log(`Class ${target.name} is decorated`);
}
@LogClass
class MyClass {
  constructor(public name: string) {}
}
const instance = new MyClass("Test"); // Output: Class MyClass is decorated
