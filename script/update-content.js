/*
  Used for dumi transformation,
  Can be used to batch modify examples files to demo import form,
  Other projects should be used according to specific situations.
*/

const fs = require('fs');
const glob = require('glob');

const paths = glob.sync('./docs/examples/*.jsx');

paths.forEach(path => {
  const name = path.split('/').pop().split('.')[0];
  fs.writeFile(
    `./docs/demo/${name}.md`,
    `## ${name}

<code src="../examples/${name}.jsx">
`,
    'utf8',
    function(error) {
      if(error){
        console.log(error);
        return false;
      }
      console.log(`${name} updated successfully~`);
    }
  )
});
