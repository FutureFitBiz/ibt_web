module.exports = class BundlesizeWebpackPlugin {
 constructor(options) {
   this.options = options;
 }
 apply(compiler) {
   console.log("FROM BUNDLESIZE PLUGIN");
   console.log(this.options)
 }
};


class MetaInfoPlugin {
  constructor(options) {
    this.options = { filename: 'meta.json', ...options };
  }

  apply(compiler) {
    compiler.hooks.done.tap(this.constructor.name, stats => {

      const data = `VUE_APP_HASH=${stats.hash}`

      return new Promise((resolve, reject) => {
        // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
        // In this example, we use setTimeout(...) to simulate async code.
        // In reality, you will probably be using something like XHR or an HTML5 API.
        // setTimeout( function() {
        //   resolve("Success!")  // Yay! Everything went well!
        // }, 250)
        fs.writeFile('src/hash.js', data, function(err) {
          if (err) {
            reject()
          } else {
            resolve()
          }
          console.log('Saved!');
        });
      })


    });
  }
}
