##This is the Front end for HappyDayz Event planning application written in JSX using React library and Vite framework

### Component Rendering Pipeline

- requested data for event contains info for event as well as an array of pages and each page contains an array of modules composing that page.

#### Module Renderer

- Helper function that accesses the correct module component from the component directory and returns respective component passing the module data contents as prop "data".
