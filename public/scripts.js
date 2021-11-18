// call to trigger download event - needed for full API access
$(".download_test").attr("src", imgArr[0].urls.full);
$("#download").attr("href", imgArr[0].links.download_location);
$("#download").click(async function () {
  let download = await fetch(`${imgArr[0].links.download_location}`, {
    method: "GET",
    headers: {
      Authorization: "Client-ID cNlSmrvPU2c8D2g26mR8gtxLY5h0Z6WCcTBmbAsPW0Y",
    },
  });
  let res = await download.json();
  console.log(res);
});
