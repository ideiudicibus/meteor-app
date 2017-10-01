this.Attachments = new FS.Collection("Attachments", {
  stores: [
    new FS.Store.FileSystem("attachments", {
      //path:"C:\\Users\\ignazio\\projects\\futgam-heroku\\filestore",
      path:"C:\\Users\\ignazio\\projects\\futgam-heroku\\filestore"
      //,
      /*transformWrite: function(fileObj, readStream, writeStream) {
        if (gm.isAvailable) {
          if (fileObj.original.type.substr(0, 5) === 'image') {
            return gm(readStream, fileObj.name()).autoOrient().stream().pipe(writeStream);
          } else {
            return readStream.pipe(writeStream);
          }
        } else {
          return readStream.pipe(writeStream);
        }
      }*/
    })
  ]
});