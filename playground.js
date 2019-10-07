// write a function to retrieve a blob of JSON
// make an ajax request! Use the 'fetch' function.
// api = http://rallycoding.herokuapp.com/api/music_albums

// function fetchAlbums() {
//   fetch('https://rallycoding.herokuapp.com/api/music_albums')
//     .then(res => res.json())
//     .then(json => console.log(json))
// }

// below code does the same as above
// async function fetchAlbums() {
//   const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
//   const json = await res.json()
  
//   console.log(json)
// }

// below code does the same as above
// const fetchAlbums = async () => {
//   const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
//   const json = await res.json()
  
//   console.log(json)
// }

// fetchAlbums()

// This comes from part 190
Survey.findOne({
  id: surveyId,
  recipients: {
    $elemMatch: { email: email, responded: false }
  }
})

// This comes from part 190
Survey.updateOne({
  id: surveyId,
  recipients: {
    $elemMatch: { email: email, responded: false }
  }
}, {
  
})