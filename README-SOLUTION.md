# Ball Don't Lie

## How to build and start the project locally

### Tech Stack used - NodeJS (24.13.0LTS), React (19), TypeScript (5.7.2)

### Prerequisites

The project was developed using Node 24.13.0LTS (You could use `nvm` to easily install and switch between different versions of `node`). Additionally, the `OS` used was `Windows 10`.

### Installation process (via Terminal)

1. Download in a directory of your choosing using any of the following:
   - Over SSH:
     ```bash
     git clone git@github.com:plamenpetkov8/ball-dont-lie.git
     ```
   - over HTTPS:
     ```
     git clone https://github.com/plamenpetkov8/ball-dont-lie.git
     ```

2. From the root of the project execute the following command to install module's dependencies:

```bash
npm install
```

2. Add a .env.local in the root of the repository containing a `VITE_BALLDONTLIE_API_KEY=${YOUR_AUTHORIZATION_KEY}` key-value pair where you should replace `${YOUR_AUTHORIZATION_KEY}` with your authorization key for accessing the "Ball Dont Lie" API

3. There are 2 different types of build  
   4.1 Dev Build
   - execute the following to create a dev build and host it on a dedicated dev server with one command simultaneously:

   ```bash
   npm run dev
   ```

   **NOTE**: Now you could see the UI following the provided link in the terminal (most commonly [localhost:5173](http://localhost:5173/)). If by any chance you have any other process running on that port, the next available one would be appointed

   4.2 Production Build
   - create a production build:

   ```bash
   npm run build
   ```

   - host your newly created optimized production build on a special server provided by vite:

   ```bash
   npm run preview
   ```

   **NOTE**: Now you could see the UI following the provided link in the terminal (most commonly [localhost:4173](http://localhost:4173/)). If by any chance you have any other process running on that port, the next available one will be appointed

4. ENJOY THE APP!!!

### Unit and Integration Testing

1. Test results in the Terminal:

```bash
npm run test
```

2. Test results in the Terminal (watches each testing file for changes and re-executes)

```bash
npm run test:watch
```

3. Test results in a dedicated UI provided by Vite:

```bash
npm run test:ui
```

**NOTE**: Upon the execution of the last command, you will be automatically redirected to the Testing UI

### Check your project with `esling`

```bash
npm run lint
```
