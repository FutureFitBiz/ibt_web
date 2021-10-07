# web

you'll need to run the flask api as well, to be able to login

also - it will log you out if the api returns an error (this is just a catch all for now, ie for expired tokens or unauthorized pages etc)

removed

    "pdfmake": "^0.1.68",    
    "html2canvas": "^1.0.0-rc.7",   


## Project setup
```
git clone <project>
cd web
yarn install
```

### Run dev server (compiles and hot-reloads)
```
# tool
yarn serve:tool

# admin
yarn serve:admin

# then visit:
http://localhost:8080/

```
if you run both, one will start on the next available port..
probably :8081,
it will say in the terminal


### Build for production (compiles and minifies)
```
# tool
yarn build:tool

# admin
yarn build:admin

# these will build to:
dist/tool/
or
dist/admin/
```



### Render.com deployment

Render.com is setup to build & serve the project via a cdn. For the test server, the task runs automatically when pushing to the (currently) master branch.

If setting up a new instance, check VUE-CLI docs for setup specific instructions:


https://cli.vuejs.org/guide/deployment.html#render


edit the auto-generated settings to:
```
yarn build:<app>

# and set the dist folder
dist/<app>
```


### Render.com deployment - Redirects

make sure to do make this in "Redirects/Rewrites", so when you reload the page it knows what to do, because of vue-router history mode
```
/*   /index.html Rewrite
```
