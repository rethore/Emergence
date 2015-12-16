URI = new Mongo.Collection("uri");
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
