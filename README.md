# GAASHAAN Landing Page

Simple one-page blue and white landing page for GAASHAAN.

## Structure

1. `index.html` contains the first-screen hero, app preview, APK download button, and subscription modal.
2. `styles.css` contains the light GAASHAAN visual system, phone mockup, responsive layout, and modal styling.
3. `script.js` handles reveal animation, phone preview tabs, magnetic hover, and the subscription modal.

## APK Download

The download buttons point to:

```text
downloads/gaashaan-latest.apk
```

Place the production APK at that path to enable direct downloads.

## Update APK Workflow

Run this after building a new Dhakhsade APK:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\update-apk.ps1
```

Then commit and push:

```powershell
git add .
git commit -m "Update GAASHAAN APK"
git push
```

Netlify will redeploy from GitHub and the same website buttons will download the new APK.
