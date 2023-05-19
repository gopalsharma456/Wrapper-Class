
const UserNameInput = document.getElementById('userName');
const showDetailsBtn = document.getElementById('showDetails');
const profileInfoDiv = document.getElementById('profileInfo');
const reposInfoDiv =  document.getElementById('reposInfo');
const repoStarDiv = document.getElementById('repoStars');


showDetailsBtn.addEventListener('click', async ()=> {

     const userName= UserNameInput.value;
     const res = await fetch(`https://api.github.com/users/${userName}`);
     const data = await res.json();

     showProfile(data);
     showReposInfo(userName);
   
})


const showProfile=(data)=> {

    repoStarDiv.style.display= 'flex';

       profileInfoDiv.innerHTML = `<div class="card-profile">
                                      <div class="card-img">
                                          <img src=${data.avatar_url} alt="">
                                      </div>
                                      <div class="card-body">
                                          <div class="card-title">
                                          <h2>${data.name}</h2>
                                          </div>
                                          <div class="card-subHeading">
                                          <h4>${data.login}</h4>
                                          </div>
                                          <div class="card-text">
                                          <p>${data.bio}</p>
                                          <p>${data.followers} followers  &nbsp; ${data.following} following</p>

                                          <button>
                                              <a href=${data.html_url}>Do checkout Profile</a>
                                          </button>
                                          </div>
                                      </div>
                                    </div>`

     
}


const showReposInfo= async (userName)=>{
     
   const res = await fetch(`https://api.github.com/users/${userName}/repos`)
   const projects = await res.json();
   projects.sort((a,b)=> new Date(b.updated_at) - new Date(a.updated_at));
   showRepos(projects);
   const filterSelect = document.getElementById('filter');
   filterSelect.addEventListener('change',()=> {
   const filterValue = filterSelect.value;

   if(filterValue === 'stars')
   {
        projects.sort((a,b)=> b.stargazers_count - a.stargazers_count);
       
   }
   else if(filterValue === 'forks')
   {
        projects.sort((a,b)=> b.forks_count - a.forks_count);
   }
   else if(filterValue === 'updated')
   {
        projects.sort((a,b)=> new Date(b.updated_at) - new Date(a.updated_at));
   }
   else if(filterValue === 'size')
   {
    projects.sort((a,b)=> b.size - a.size);
   }

   showRepos(projects);

   })


}


const showRepos=(projects)=> {
    
    let outputHTML = '';
    console.log("All the repo info", projects);
    projects.forEach((repo)=> {

        outputHTML += `<div class="project-card">
                          <div class="card-body">
                              <div class="card-title">
                              <h2 id="repo-name">${repo.name}</h2>
                          </div>
                              <div class="card-text">
                                <p id="description">${repo.description}</p>
                                <div class="card-subHeading">
                                    <h3>${repo.language}</h3>
                                </div>
                                  <span> &#11088;  
                                  ${repo.stargazers_count} stars 
                                  &#x2442;
                                  ${repo.forks_count} forks</span>
                                  <span>
                                  
                                  ${repo.size} KB</span>
                                  </div>
                                  </div>
                                  <div id="button-div">
                                  <button id="viewRepo">
                                      <a href=${repo.html_url}>
                                          View Repo
                                      </a>
                                  </button>
                              </div>
                      </div>`

    })

    reposInfoDiv.innerHTML = outputHTML;


}
