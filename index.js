// function showRepositories(event, data) {
//   let repos = JSON.parse(this.responseText);
//   console.log(repos);
//   const repoList = `<ul>${repos.map(r => "<li>" + r.name + "</li>").join("")}</ul>`;
//   document.getElementById("repositories").innerHTML = repoList;
// }

// data-repo-r.name using a data attribute to hold the repo name. Data attributes make it super easy to pass data around between DOM elements and JS
// onclick is explicitly passing this to the getCommits function


function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        "<li>" +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getRepositories() {
  // create XHR object and instantiate it
  const req = new XMLHttpRequest();


  // defining an event listener on the request to listen for the load event, which will tell us that the request is complete.
  // give this listener a callback function, which is simply a function that will get called when the event fires.
  req.addEventListener("load", showRepositories);
  // open is a method that comes with the XHR object
  // GET request means we want to read the URL or file
  // with open specify the type of request we want to make and the URL or file name we want to make it to
  // third parameter is true if we want async
  req.open("GET", "https://api.github.com/users/octocat/repos")

  // req.onload = function(){
  //   if(this.status === 200) {
  //   console.log(this.responseText);
  //   }
  // }

  //
  req.send();
}

function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open("GET", "https://api.github.com/repos/octocat/" + name + "/commits");
  req.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        "<li><strong>" +
        commit.author.login +
        "</strong> - " +
        commit.commit.message +
        "</li>"
    )
    .join("")}</ul>`;
  document.getElementById("commits").innerHTML = commitsList;
}
