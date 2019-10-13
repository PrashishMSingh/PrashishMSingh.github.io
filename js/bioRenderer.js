class BioRenderer{
  constructor(parentElement, personalBio){
    this.parentElement = parentElement;
    this.personalBio = personalBio;
    this.renderHeaderInfo()
  }

  renderHeaderInfo = () =>{
    var personalInfoElm = document.createElement('div')
    personalInfoElm.classList.add('personal-header-info')
    var ul = document.createElement('ul')
    var personalData = this.personalBio.personalInfo
    Object.keys(personalData).map(key =>{
      var li = document.createElement('li')
      li.setAttribute('class', key)
      this.renderItem(key, personalData, li)
      ul.appendChild(li)
    })
    personalInfoElm.appendChild(ul)
    this.parentElement.appendChild(personalInfoElm)
  }

  getIcon = className =>{
    var i = document.createElement('i')
    i.style.margin= '0 5px'
    i.style.color= 'white'
    i.setAttribute('class', className)
    return i
  }

  renderItem = (key, item, element) =>{
    if(typeof item[key] === "object"){
      if(Array.isArray(item[key])){
        this.getArrValue(key, item, element)
      }else{
        if(key === 'address'){
          var i = this.getIcon('far fa-compass')
          element.appendChild(i)
        }
        this.getObjValue(key, item, element)
      }
    }else{
      var span = document.createElement('span')
      if(key === 'email'){
        var i = this.getIcon('fas fa-envelope')
        span.appendChild(i)
        console.log('span : ', span)
      }
      span.innerHTML += item[key]
      span.setAttribute('class', key)
      element.appendChild(span)
    }
  }

  getObjValue = (key, object, element) =>{
    var seperator = ' '
    var obj = object[key]
    var commaSperatorList = ['city', 'street', 'houseNo']
    var span = document.createElement('span')
    span.setAttribute('class', key)

    Object.keys(obj).map(key =>{
      if(commaSperatorList.includes(key)){
        seperator = ', '
      }
      if(typeof obj[key] !== 'object'){
        span.innerHTML += obj[key] + seperator
        element.appendChild(span)
      }else{
        this.renderItem(key,obj, element)
      }
    })
  }

  getArrValue = (parentKey, item , element) =>{
    item[parentKey].map(obj =>{
      if(obj === 'object'){
        Object.keys(obj).map(key =>{
            this.renderItem(key, obj, element)
        })
      }else{
        var span = document.createElement('span')
        span.setAttribute('class', parentKey)
        if(parentKey === 'lanLine'){
          var icon = this.getIcon('fas fa-phone-square-alt')
          span.appendChild(icon)
        }else if(parentKey === 'mobile'){
          var icon = this.getIcon('fas fa-mobile-alt')
          span.appendChild(icon)
        }
        span.innerHTML += obj
        element.appendChild(span)
      }

    })
  }
}

var topInfoWrapper = document.getElementsByClassName('header-info-wrapper')[0]
var bioRenderer = new BioRenderer(topInfoWrapper, personalBio)
