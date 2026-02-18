# Deployment Instructions

## 1. Push to GitHub

Run the following commands in your terminal to push your changes to GitHub:

```bash
git add .
git commit -m "chore: configure github pages deployment"
git push origin main
```

## 2. Configure GitHub Pages

1.  Go to your GitHub repository in your browser.
2.  Navigate to **Settings** > **Pages**.
3.  Under **Build and deployment**:
    - Set **Source** to **GitHub Actions**.
    - (Do not select "Deploy from a branch").
4.  The deployment workflow will automatically run. You can check its progress in the **Actions** tab.

## 3. Your Website URL

### Scenario A: User/Organization Site

If you want your URL to be `https://<username>.github.io`:

1.  Rename your repository to `<username>.github.io`.
2.  The site will be available at `https://<username>.github.io`.

### Scenario B: Project Site

If your repository is named `amrelshabrawydev` and your username is `Amr-Elshabrawy-Dev`:

1.  The site will be available at `https://Amr-Elshabrawy-Dev.github.io/amrelshabrawydev`.
2.  **Note**: For project sites, you might need to set a `basePath` in `next.config.ts` if assets fail to load. However, since the user requested `https://amrelshabrawydev.github.io`, we assume Scenario A is the goal.

## 4. Verification

Once the "Deploy to GitHub Pages" action completes (green checkmark), click on the deployment URL provided in the Actions logs to verify your site is live.
