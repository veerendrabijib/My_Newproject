# MyProject17

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


 <div class="section" id="setup-instructions">
    <div class="section-header" onclick="toggle(this)">
      <span class="toggle-icon">▶</span>
      <h2>🚀 Setup Instructions</h2>
      <span class="section-label label-config">SETUP</span>
    </div>
    <div class="section-body">
      <h3>Prerequisites</h3>
      <div class="info-box">Make sure you have Node.js (v18+), MongoDB, and Angular CLI installed.</div>

      <h3>Backend Setup</h3>
      <div class="step"><div class="step-num">1</div><div class="step-content">
        <strong>Clone/create the project</strong>
        <div class="cmd">mkdir books-library && cd books-library && mkdir backend frontend</div>
      </div></div>
      <div class="step"><div class="step-num">2</div><div class="step-content">
        <strong>Install backend dependencies</strong>
        <div class="cmd">cd backend && npm install</div>
      </div></div>
      <div class="step"><div class="step-num">3</div><div class="step-content">
        <strong>Configure environment variables</strong>
        Create the .env file with your MongoDB URI and JWT secret.
      </div></div>
      <div class="step"><div class="step-num">4</div><div class="step-content">
        <strong>Start MongoDB</strong>
        <div class="cmd">mongod --dbpath /data/db</div>
      </div></div>
      <div class="step"><div class="step-num">5</div><div class="step-content">
        <strong>Run backend</strong>
        <div class="cmd">npm run dev</div>
        Server starts on http://localhost:5000
      </div></div>

      <h3>Frontend Setup</h3>
      <div class="step"><div class="step-num">1</div><div class="step-content">
        <strong>Create Angular project</strong>
        <div class="cmd">cd ../frontend && ng new . --routing --style=css --standalone</div>
      </div></div>
      <div class="step"><div class="step-num">2</div><div class="step-content">
        <strong>Install dependencies</strong>
        <div class="cmd">npm install tailwindcss postcss autoprefixer ng2-pdf-viewer</div>
        <div class="cmd">npx tailwindcss init</div>
      </div></div>
      <div class="step"><div class="step-num">3</div><div class="step-content">
        <strong>Add Tailwind to styles.css</strong>
        <div class="cmd">@tailwind base; @tailwind components; @tailwind utilities;</div>
      </div></div>
      <div class="step"><div class="step-num">4</div><div class="step-content">
        <strong>Copy all component files</strong>
        Copy each component, service, guard and interceptor file from this document.
      </div></div>
      <div class="step"><div class="step-num">5</div><div class="step-content">
        <strong>Run frontend</strong>
        <div class="cmd">ng serve</div>
        App starts on http://localhost:4200
      </div></div>

      <h3>Create Admin User (MongoDB Shell)</h3>
      <pre>use books_library
db.users.updateOne(
  { email: "admin@library.com" },
  { $set: { role: "admin" } }
)</pre>
    </div>
  </div>