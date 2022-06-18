var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { DateTime } = require("luxon");

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual properties

// Virtual properties are document properties that you can get and set but that do not get persisted to MongoDB. The getters are useful for formatting or combining fields, while setters are useful for de-composing a single value into multiple values for storage. 
// The example in the documentation constructs (and deconstructs) a full name virtual property from a first and last name field, which is easier and cleaner than constructing a full name every time one is used in a template.

// Virtual for author's full name
AuthorSchema
  .virtual('name')
  .get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  var fullname = '';
  if (this.first_name && this.family_name) {
      fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
      fullname = '';
  }
  return fullname;
  });

// Virtual for author's lifespan
AuthorSchema
  .virtual('lifespan')
  .get(function() {
  var lifetime_string = '';
  if (this.date_of_birth) {
      lifetime_string = this.date_of_birth.getYear().toString();
  }
  lifetime_string += ' - ';
  if (this.date_of_death) {
      lifetime_string += this.date_of_death.getYear()
  }
  return lifetime_string;
  });

// Virtual for author's URL
AuthorSchema
  .virtual('url')
  .get(function () {
  return '/catalog/author/' + this._id;
  });

AuthorSchema
  .virtual('date_of_birth_formatted')
  .get(function () {
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
  });

AuthorSchema
  .virtual('date_of_death_formatted')
  .get(function () {
    return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
  });

AuthorSchema
  .virtual('lifespan')
  .get(function () {
    let lifespan = '';
    if (this.date_of_birth) {
      lifespan = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
    }
    lifespan += ' - ';
    if (this.date_of_death) {
      lifespan += DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    }
    return lifespan;
  });

//Export model
module.exports = mongoose.model('Author', AuthorSchema);


