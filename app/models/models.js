URI = new Mongo.Collection("uri");
Vector = new Mongo.Collection("vector");
Relationships = new Mongo.Collection("relationships");

Events = new Mongo.Collection("events");
Events.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});

// On Client and Server

let Questions = new EasySearch.Index({
    collection: Relationships,
    fields: ['question'],
    engine: new EasySearch.Minimongo()
  });
