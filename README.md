# Form to Excel

Form to Excel is a web application that allows users to submit form data and automatically export it to an Excel file. This tool is ideal for collecting data from multiple users and organizing it in a structured format.

## Features

- **Form Submission**: Easily submit data through a user-friendly form interface.
- **Excel Export**: Automatically export submitted form data to an Excel (.xlsx) file.
- **Data Management**: View and manage submitted data within the app.
- **Responsive Design**: Works seamlessly across desktops, tablets, and mobile devices.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Supabase for database management
- **Excel Export**: ExcelJS or a similar library for handling Excel files
- **Deployment**: Vercel

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later)
- A [Supabase](https://supabase.io/) account and project set up

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/bharabhi01/form-to-excel.git
    cd form-to-excel
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up Supabase:

   - Go to your [Supabase dashboard](https://app.supabase.io/).
   - Create a new project if you haven't already.
   - Navigate to the "Settings" tab and get your API keys and the project URL.
   - Create a `.env` file in the root of your project and add the following environment variables:

     ```bash
     REACT_APP_SUPABASE_URL=your-supabase-url
     REACT_APP_SUPABASE_ANON_KEY=your-anon-key
     ```

4. Install Semantic UI:

    - Semantic UI is already included in the dependencies, but if you need to add or customize styles, install Semantic UI:

      ```bash
      npm install semantic-ui-css semantic-ui-react
      ```

    - Import the CSS in your `index.js` or `App.js`:

      ```javascript
      import 'semantic-ui-css/semantic.min.css';
      ```

5. Start the development server:

    ```bash
    npm start
    ```

6. Open your browser and navigate to `http://localhost:3000`.

### Deployment

To deploy the application, follow these steps:

1. Build the application:

    ```bash
    npm run build
    ```

2. Deploy the `build` folder to your preferred hosting provider, such as [Vercel](https://vercel.com/).

