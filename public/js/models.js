import {View} from "backbone.marionette";

let HeaderMenu= Backbone.Model.extend({});
let headerMenu = new HeaderMenu({
    defaults:{
        status: 'social'
    }
});

let Post = Backbone.Model.extend({});
let PostComment = Backbone.Model.extend({});


export {Post, headerMenu, PostComment}
