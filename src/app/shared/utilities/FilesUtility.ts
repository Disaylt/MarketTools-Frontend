export class FilesUtility{
    static download(data : Blob, name : string){
        var downloadURL = window.URL.createObjectURL(data);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = name;
          link.click();
    }
}