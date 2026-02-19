# Deploying to Netlify

There are two main ways to deploy this Next.js application to Netlify:

## Method 1: Git Integration (Recommended)
This method automatically redeploys your site whenever you push changes to GitHub, GitLab, or Bitbucket.

1.  **Push your code** to a Git provider (e.g., GitHub).
2.  Log in to [Netlify](https://app.netlify.com/).
3.  Click **"Add new site"** > **"Import an existing project"**.
4.  Select your Git provider and the `aston-martin-website` repository.
5.  **Build Settings**:
    *   **Base directory**: (leave empty)
    *   **Build command**: `npm run build`
    *   **Publish directory**: `.next`
6.  Click **Deploy**.

## Method 2: Netlify CLI (Manual)
If you want to deploy directly from your terminal without Git.

1.  Install Netlify CLI:
    ```bash
    npm install -g netlify-cli
    ```
2.  Login to Netlify:
    ```bash
    netlify login
    ```
3.  Initialize and deploy:
    ```bash
    netlify init
    # Follow the prompts to create a new site
    ```
4.  Deploy to production:
    ```bash
    netlify deploy --prod
    ```

## Configuration
A `netlify.toml` file is already included in your project root to handle basic configuration automatically.
