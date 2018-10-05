'use strict'

const apiKey = 'C7QZP8GvGG5pa10GxlYeb3f2jHhOcjX6BtiilFft' 
const searchURL = 'https://developer.nps.gov/api/v1/parks?'

function listenFormInput() {
  $('form').submit(event => {
    event.preventDefault()
    const stateSearch = $("#state-search").val()
    const maxResults  =$('#max-results').val()
    getNatlParks(stateSearch, maxResults)
  });
}

function getNatlParks(stateSearch, maxResults=10) {
  fetch(`https://api.nps.gov/api/v1/parks?stateCode=${stateSearch}&limit=${maxResults}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(responseJson => renderNatlParks(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function renderNatlParks(responseJson) {
  console.log("renderNatlParks ran")
  console.log(responseJson)
  $('#results-list').empty()
  // use array.map() to iterate through responseJson.data:
  responseJson.data.map(element => {
    $('#results-list').append(
      `<li><h3><a href="${element.url}" target="_blank">${element.fullName}</a></h3>
      <p>${element.description}</p>`)
  })
  // For loop works also:
    /* for (let i = 0; i < responseJson.data.length; i++) {
    $('#results-list').append(
      `<li><h3><a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].fullName}</a></h3>
      <p>${responseJson.data[i].description}</p>`)
  } */
  $('.repo-container').removeClass('hidden')
}    

$(listenFormInput)