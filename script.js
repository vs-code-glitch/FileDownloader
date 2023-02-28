const fileInput = document.querySelector("input"),
  downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault(); //prevent form from submitting
  fetchFile(fileInput.value);
});

function fetchFile(url) {
  //fetching file & returning response as blob
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      //URL.cerateObjURL creates a url of passed object
      let tempUrl = URL.createObjectURL(file);
      let aTag = document.createElement("a");
      aTag.href = tempUrl; //passing tempUrl as href value of <a> tag
      //passing file last name as download value of <a> tag
      aTag.download = url.replace(/^.*[\\\/]/, "");
      document.body.appendChild(aTag); // adding <a> tag inside body
      console.log(aTag);
      aTag.click(); //clicking <a> tag so the file download

      aTag.remove(); //removing <a> tag once file download
    })
    .catch(() => {
      //catch method will call if any error comes during downloading
      downloadBtn.innerText = "Downlaod File";
      alert("Failed to download file!");
    });
}
