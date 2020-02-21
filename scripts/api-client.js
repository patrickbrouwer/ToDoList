const getData = async function() {
  const apiUrl = `https://wincacademydatabase.firebaseio.com/patrick/tasks.json`;
  try {
    const res = await fetch(apiUrl, { method: "GET" });
    const data = await res.json();
    //console.log("The data in getData function ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
getData();
