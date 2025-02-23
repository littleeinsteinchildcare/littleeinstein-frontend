# Little Einstein Frontend

## Installing Homebrew (Mac Only)

If you haven't installed Homebrew yet, you can find more details [here](https://brew.sh/).

1. Open Terminal.
2. Run the following command:

   ```sh
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

3. Add Homebrew to your PATH:

   ```sh
   echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
   eval "$(/opt/homebrew/bin/brew shellenv)"
   ```

4. Verify the installation:

   ```sh
   brew --version
   ```

## Overview

This project is a web application that requires Node.js and npm for development. Follow the steps below to set up and run the project.

## Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed. You can check by running:

  ```sh
  node -v
  ```

  ```sh
  npm -v
  ```

  If Node.js is not installed, download and install it from the official website. If you have Homebrew installed, you can install Node.js with:

  ```sh
  brew install node
  ```

- Ensure you have `pre-commit` installed. You can check by running:

  ```sh
  pre-commit --version
  ```

  If `pre-commit` is not installed, install it using Homebrew:

  ```sh
  brew install pre-commit
  ```

  Or install it using pip:

  ```sh
  pip install pre-commit
  ```

- After installing `pre-commit`, ensure it is set up correctly by running:

  ```sh
  pre-commit install
  ```

  Then, to check that pre-commit hooks are working, run:

  ```sh
  pre-commit run --all-files
  ```

  Additionally, install the commit message hook by running:

  ```sh
  pre-commit install --hook-type
  ```

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/littleeinsteinchildcare/littleeinstein-frontend.git
```

### 2. Navigate to the Project Directory

```sh
cd littleeinstein-frontend
```

### 3. Install Dependencies

```sh
npm install
```

## Running the Development Server

```sh
npm run dev
```

The application should now be running. Open your browser and navigate to `http://localhost:3000` (or the port specified in your project).

## Additional Scripts

- To build the project:

  ```sh
  npm run build
  ```

- To start the production server:

  ```sh
  npm start
  ```

- To lint and format code:

  ```sh
  npm run lint
  ```
