import {View} from 'backbone.marionette';
import {ButtonsView, CollectionItemsView, CollectionCommentsView} from './views.js'
import {headerMenu} from "./models";
import {commentsList, postsList} from "./collections";

$(function() {
    const buttonsView = new ButtonsView({model: headerMenu});
    const collectionItemsView = new CollectionItemsView({
        collection: postsList
    })
});


