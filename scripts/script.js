const result = async function() {
  try {
    const result = await getData();
    //console.log("Before (the raw result):", result);
    let tasks = Object.keys(result).map(key => ({
      id: key,
      description: result[key].description,
      done: result[key].done
    }));
    //console.log(tasks[0].description);
    addListToDom(tasks);
  } catch (error) {
    console.log(error);
  }
};
result();

const addEventListenerToAddbutton = function() {
  document.getElementById("submitButton").addEventListener("click", function() {
    // alert("I am an alert box!");
    const newTaskValue = document.getElementById("new-task").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      description: `${newTaskValue}`,
      done: "false"
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(
      "https://wincacademydatabase.firebaseio.com/patrick/tasks.json",
      requestOptions
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .then(reload => location.reload(true)) // Ik zou hier liever addListToDom aanroepen, maar daar heb ik een error in zitten die ik er niet uit krijg
      .catch(error => console.log("error", error));
  });
};
addEventListenerToAddbutton();

const addListToDom = function(tasks) {
  console.log(tasks);

  tasks.forEach(task => {
    let ul = document.getElementById("tasks");
    ul.appendChild(
      document.createElement("li")
    ).innerHTML = `${task.description}`; //${task.done}${task.id}`;
  });
};
addListToDom();
