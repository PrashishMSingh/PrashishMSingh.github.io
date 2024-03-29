class Renderer{
  constructor(elementClass){
    this.renderer = document.getElementsByClassName(elementClass)[0]
    this.projectTypeList = []
    this.currentIndex = 0
    this.renderItem()
  }

  renderItem = () =>{
    this.projectNav = document.createElement('nav')
    this.projectNavUl = document.createElement('ul')
    this.projectWrapper = document.createElement('div')

    this.projectWrapper.classList.add('project-wrapper')
    this.projectWrapper.classList.add('clear-fix')
    this.projectNav.classList.add('projects-tab')
    this.projectNav.classList.add('clear-fix')

    this.projectNav.appendChild(this.projectNavUl)
    this.renderer.appendChild(this.projectNav)
    this.renderer.appendChild(this.projectWrapper)

    this.renderNavItems()
    this.projectNav.onclick = this.navOnClick
  }

  setCurrentIndex = (index) =>{
    this.currentIndex = index
  }

  addProjectsTable = (table) =>{
    this.table = table
    this.projectWrapper.appendChild(table.getTableElement())
    this.table.generateTableBody(this.projectTypeList[this.currentIndex])
    this.table.generateTableHeader(this.projectTypeList[this.currentIndex])
  }

  navOnClick = (e) =>{
    var selectedClass = e.target.parentElement.classList[0]
    var index = this.projectTypeList.indexOf(selectedClass)
    this.currentIndex = index

    if(selectedClass){
      this.table.generateTableBody(this.projectTypeList[index])
      this.table.generateTableHeader(this.projectTypeList[index])
      Array.from(this.projectNavUl.children).map(child =>{
        if(child.classList.contains('active') && !child.classList.contains(selectedClass)){
          child.classList.remove('active')
        }else if(child.classList.contains(selectedClass) && !child.classList.contains('active')){
          child.classList.add('active')
        }
      })
    }
  }

  renderNavItems = () =>{
    var contents = personalBio.bodyInfo
    console.log(contents)
    Object.keys(contents).map((key, i) =>{
      var projectNavLi = document.createElement('li');
      var anchor = document.createElement('a');
      anchor.setAttribute('href', '#')
      anchor.onclick = (e) =>{
        e.preventDefault()
      }

      projectNavLi.classList.add(key);
      if(i === this.currentIndex){
        projectNavLi.classList.add('active')
      }

      console.log(contents[key])
      this.projectTypeList.push(key)
      anchor.innerHTML = key.toUpperCase();
      projectNavLi.appendChild(anchor)
      this.projectNavUl.appendChild(projectNavLi);
    })
  }

}


class ProjectsTable{
  constructor(projectType){
    this.projectTable = document.createElement('table')
    this.projectTable.setAttribute('cellspacing', 0)
    this.projectTable.setAttribute('cellpadding', 0)
    this.tBody = document.createElement('tbody')
    this.tHead = document.createElement('thead')
    this.projectTable.appendChild(this.tHead)
    this.projectTable.appendChild(this.tBody)
  }

  getTableElement =()=>{
    return this.projectTable;
  }

  generateTableHeader = (content) =>{
    this.tHead.innerHTML = ''
    var tableHeaderItems= personalBio.bodyInfo
    var headerContentList = tableHeaderItems[content].tableHeader
    var tr = document.createElement('tr')

    headerContentList.map(content =>{
      var td = document.createElement('td')
      td.innerHTML = content
      tr.appendChild(td)
    })
    this.tHead.appendChild(tr)
  }

  generateTableBody = (projectType) =>{
    this.tBody.innerHTML = ''
    var bodyItems= personalBio.bodyInfo
    var bodyContentList = bodyItems[projectType].content
    var buttonList = ['Github', 'Documentation']

    bodyContentList.map(project =>{
      var tr = document.createElement('tr')
      Object.keys(project).map(detail =>{
        var td = document.createElement('td')

        if(buttonList.includes(detail)){
          if(project[detail]){
            var a = document.createElement('a')
            a.setAttribute('href', project[detail])
            a.innerHTML = detail.toUpperCase()
            var btn = document.createElement('button')
            btn.appendChild(a)
            btn.setAttribute('class', 'linkBtn')
            td.appendChild(btn)
          }

        }else{
          td.innerHTML = project[detail]
          td.setAttribute('class', detail)
        }
        tr.appendChild(td)
      })
      this.tBody.appendChild(tr)
    })
  }
}

var renderer = new Renderer('body-info-wrapper')

var projectTable = new ProjectsTable()
renderer.addProjectsTable(projectTable)
