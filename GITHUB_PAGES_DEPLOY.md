# GitHub Pages Deployment

## 1. Set repository homepage in package.json

Add this line to your package.json (replace USERNAME and REPO):

```
  "homepage": "https://USERNAME.github.io/REPO",
```

## 2. Add deploy scripts (already present)

```
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
```

## 3. Push your code to GitHub

```
git init
git remote add origin https://github.com/USERNAME/REPO.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

## 4. Deploy

```
npm run deploy
```

---

- Make sure your Vite config uses `base: '/REPO/'` if deploying to a project subpath.
- After deploy, visit https://USERNAME.github.io/REPO
