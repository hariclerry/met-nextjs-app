# Technical Challenge

There are two options to choose from below. Pick the one that will best represent your skills or you find the most interesting!

## Option 1: Meet the Met!

Write a program that connects to the Met Museum of Art to display their art collections.

The Met provides a free and open API of their collection. Their API documentation can be found at: https://metmuseum.github.io/

### The Features

Your program should support the following features (time permitting):

- A view for paginated display of objects
- A view for individual object details
- Filter objects by department
- Search for object by ID
- Search for object by title
- Interface is mobile responsive
- Interface is stylized

## Getting Started

1. Clone the repository or unzip the zip folder and cd into the directory

2. Install dependencies
   `npm install`

3. Run app
   `npm run dev` in the root directory

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Technologies used

- React.js
- Next.js
- Tailwind CSS
- Typescript
- Node v18 and above

### Comments and Thoughts:

I have decided to work on the first option, which is to create a web application that displays the Met Museum of Art's collection. I have chosen this option because I am interested in building scalable, user-centric applications that can be used by a wide range of users. I have also chosen this option because I am interested in learning more about the Met Museum of Art and their collection. It was fun to exploring the api.

1 - I used React.js to create a dynamic and interactive user interface. This allows for better user experience and engagement
2 - I used Next.js to create a server-side rendered application. This allows for better performance, scalability, SEO and faster initial load times(assuming this was a real-world application that would be used by millions of users). some of the benefits of using Next.js for this app are;
    - Proxy requests to Met API.
    - Cache responses for faster subsequent loads.
    - handling secure API keys(Though it's not needed in this case but just to keep it in mind).
    - API routes for cross-device extensibility.
    - Handle pagination & filtering on the backend. 


4 - I used Tailwind CSS to create a responsive and modern design. This allows for easy customization and scalability.
6 - I used Typescript to create a type-safe application. This allows for better code quality and maintainability.

7 - Architecture
    - Next.js gives a well-defined structure to the application. It has a well-defined folder structure and a well-defined way of handling routing. This allows for better scalability and maintainability.
    - A modular component structure makes the app scalable & maintainable.

### Improvements

- Use debounce for search input to reduce API calls or add search button for user to click after typing.
- Clicking all should reset department selection.
- Improve error message shown to user.
- Search by title should use it's specific query option instead general query params.
- Could separate the search by Id into a different file but I assume if we want to combine queries.
- Add tests for components and pages.

NB: I have set initial page size to 99 to get some cool images. This can be changed to 1 in the code.