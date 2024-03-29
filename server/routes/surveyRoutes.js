// see Flow creating new survey.png just to get the last result i added this text
const _ = require('lodash')
const { Path } = require('path-parser')
const { URL } = require('url')
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    // BEFORE REFACTOR
    // const events = _.map(req.body, ({ email, url }) => {
    //   const pathname = new URL(url).pathname
    //   const p = new Path('/api/surveys/:surveyId/:choice')
    //   const match = p.test(pathname)
    //   if (match) {
    //     return { email, surveyId: match.surveyId, choice: match.choice }
    //   }
    // })
    
    // const compactEvents = _.compact(events)
    // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId')
    // console.log(uniqueEvents)

    // res.send({})
    
    // AFTER REFACTOR
    const p = new Path('/api/surveys/:surveyId/:choice')

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname)
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice }
        }
      })    
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        // This comes from part 190
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          $inc: { [choice]: 1 }, // step 1
          $set: { 'recipients.$.responded': true },  // step 2
          lastResponded: new Date()
        }).exec()
      })
      .value()

    res.send({})
  })

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    // get title, subject, body, recipients from req.body (destructuring)
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      // So again this will take the list of email addresses. Split it into
      // an array and then return an object for every e-mail address in there
      // with a property of email and the value of the actual email address.
      // So that's pretty much it for creating the survey as far as these very
      // simple straightforward properties
      _user: req.user.id, // set the user relation
      dateSent: Date.now()
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      // after survey is send decrease the users credits
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
