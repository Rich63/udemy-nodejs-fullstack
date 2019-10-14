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

choice = 'yes' || 'no'
// This comes from part 190
Survey.updateOne({
  id: surveyId,
  recipients: {
    $elemMatch: { email: email, responded: false }
  }
}, {
  $inc: { [choice]: 1 }, // step 1
  $set: { 'recipients.$.responded': true }  // step 2
})

/* 
  step 1 explained:
  This dollar sign I see is called a mongo operator. It allows us to put together some kind
  of intelligent or slightly intelligent logic inside of a query that we issue to our database.
  So this says find the choice property and remember choice is going to be either yes or no.
  So essentially find either the yes property or the no property and increment so I can see stands for 
  increment it by exactly 1.
  So in other words provide one vote to either the yes or the no property on the given survey that was
  just found. Now of course we want to allow the decision of whether or not we are incrementing the yes
  or the no property to be determined on the fly. So in order to kind of calculate the key to use inside
  this object right here we're going to use a little bit of yes 2016 syntax called qi interpellation.
  So if we put on here square brackets choice like so this does not create an array.
  Let me be really clear about that. 
  It does not create an array.
  Instead when this object right here is the value evaluated by the javascript runtime it's going to say
  OK what's the value of the choice variable. If the value of choice is yes then it's going to replace
  this thing right here with yes. Otherwise if it's no it's going to replace it with no. So in other words
  we are saying we don't really know at the time that we are writing the code whether choice is going to
  be yes or no. So only when we are kind of trying to actually update the given survey only after we have
  an actual choice assigned will we actually figure out what this key right or should be in total.
  Again this little block right here says increment either yes or no by exactly 1 on the survey record
  that was found.
  OK. 
  So that clearly takes care of step 1. We are incrementing the appropriate feedback property by one.

  step 2:
  And this object direct here we'll put a comma and then the next line down. So this is another key
  value property inside the second object right here. We're going to say Dollar Sign set we're going
  to pass in an object. And this is where things get weird. We're you give it a key inside of a string
  of recipients dot dollars dollar sign dot responded are going to say that's going to be true like so.
  OK.
  So I think that in your head you understand more or less what this line is meant to accomplish.
  It is meant to update this responded property to True.
  But the real question is how does this kind of modifier actually work how does this actually update
  that property. So we're doing here is we are making use of another Mongo operator. We are saying that
  we want to set or update one of the properties inside of the survey record that was found by this
  initial query right here. So we are saying in the survey that was found look at the recipient's sub
  document collection inside that Subotnick collection. There are a bunch of different records to make
  sure that we are updating just the recipient that we really care about. We place dollar sign right
  here this dollar sign lines up with the dollar element or Elham match from the original query that
  was issued up here. So remember this line right here is going to find just the sub document collection
  recipient that we actually care about.
  And so maybe they are at index 500 inside of our list of recipients. So that 500 of an index is then
  used right here in place of the dollar sign. So you can imagine this thing is saying go into some
  documents collection find the appropriate recipient who was just found in the original query right here.
  Look at the respondent property and set that property to now be true rather than false like it was before.
  And that's pretty much it.
  So I know this clearly has we've written it out is really confusing.
  It's really crazy.
  But I want to give you a very intense a really in-depth query that you might find yourself writing when
  you are making use of Mongo.
*/