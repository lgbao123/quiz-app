function urltoFile(url, filename, mimeType) {
   return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
   );
}
function getBase64(file) {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
   });
}

async function getBase64ImageFromUrl(imageUrl) {
   var res = await fetch(imageUrl);
   var blob = await res.blob();

   return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
         resolve(reader.result);
      }, false);

      reader.onerror = () => {
         return reject(this);
      };
      reader.readAsDataURL(blob);
   })
}
async function getFileFromUrl(url, name, defaultType = 'image/jpeg') {
   const response = await fetch(url);
   const data = await response.blob();
   return new File([data], name, {
      type: data.type || defaultType,
   });
}
export { urltoFile, getBase64, getBase64ImageFromUrl, getFileFromUrl }