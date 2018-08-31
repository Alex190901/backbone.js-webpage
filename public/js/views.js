import {View} from "backbone.marionette";
import {onClickSocial, onClickDiscovery, postsNumber, commentsList} from "./collections";

let currentlyPostsNumber = postsNumber;

const ButtonsView = View.extend({
    template: _.template(
        '<button class = "filter-button" id="filter-button-social">Social</button> ' +
        '<button class = "filter-button" id="filter-button-discovery"> Discovery </button>'),
    render: function () {
        let attributes = this.model.toJSON();
        this.$el.html(this.template(attributes));
        this.onClickSocial();
        return this;
    },
    events: {
        'click #filter-button-social': 'onClickSocial',
        'click #filter-button-discovery': 'onClickDiscovery'
    },
    initialize: function () {
        this.setElement($('#content-menu'));
        this.render();
    },
    onClickSocial: function () {
        onClickSocial()
    },
    onClickDiscovery: function () {
        onClickDiscovery()
    }
});

function timeSince(date) {

    let seconds = Math.floor(((new Date().getTime() / 1000) - date));

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds";
}

const ItemsView = View.extend({
    tagName: 'div',
    id: 'item',
    className: 'item',
    template: _.template(
        "<div class= 'author'>" +
        "<img src= <%=author.image_url%> class = 'author-img'>" +
        "<div class = 'author-details'>" +
        "<p class = 'name'><%= author.name%></p>" +
        "<p class = 'time'><%= timestamp%></p>" +
        "</div>" +
        "</div>" +
        "<div class = 'post-body'><%= body %></div>" +
        "<div class = 'post-comments'>" +
        "<div class = 'post-comments-controls'>" +
        "<button class='comments-buttons'><img src=\"../assets/logo.png\"/><%= ratings_count%></button>" +
        "<button class='comments-buttons'><img src=\"../assets/message.png\"/><%= comments_count %></button>" +
        "<button class='comments-buttons'><img src=\"../assets/share.png\"/><%= shares_count %></button>" +
        "</div>" +
        "<div id= <%= id%> class='comments-body'></div>" +
        "</div>"
    ),

    render: function () {
        let attributes = this.model.toJSON();
        attributes.timestamp = timeSince(attributes.timestamp);
        this.$el.html(this.template(attributes));
        return this;
    },
    initialize: function () {
        this.model.on('change', this.render, this);
    },
    events: {
        'click .comments-buttons': 'onClickComments',
    },
    onClickComments: function () {
        let localList = commentsList;
        if(localList){
            if (this.model.attributes.opened){
                this.model.set({opened: false});
                localList = [];
            } else {
                this.model.set({opened: true});
                localList = localList.filter(item => item.attributes.topic_id === this.model.attributes.id);
            }
        }
        const collectionCommentsView = new CollectionCommentsView({
            el: '#' + this.model.attributes.id,
            collection: localList,
        });
    },
});
const CommentsView = View.extend({
    tagName: 'div',
    id: 'comment',
    className: 'comments-body',
    template: _.template(
        "<div class= 'author-comment'>" +
        "<img src= <%=author.image_url%> class = 'author-img'>" +
        "</div>" +
        "</div>" +
        "<div class = 'comment-body'>" +
        "<div class = 'author-comment-details'>" +
        "<p class = 'name'><%= author.name%></p>" +
        "<p class = 'time'><%= timestamp%></p>" +
        "<%= body %>" +
        "</div>" +
        "</div>"
    ),

    render: function () {
        let attributes = this.model.toJSON();
        attributes.timestamp = timeSince(attributes.timestamp);
        this.$el.html(this.template(attributes));
        return this;
    },
    initialize: function () {
        this.model.on('change', this.render, this);
    },
});

const CollectionItemsView = Backbone.View.extend({
    el: '#items-container',
    render: function () {
        this.addAll();
    },
    addOne: function (post) {
        this.Element = '#items-container';
        let postView = new ItemsView({model: post});
        this.$el.append(postView.render().el);
    },
    removeOne: function () {
        let element = document.getElementById('item');
        element.parentNode.removeChild(element);
    },
    addAll: function () {
        let element = document.getElementById('item');
        if (element) {
            for (let i = 0; i < currentlyPostsNumber; i++) {
                this.removeOne()
            }
            this.collection.forEach(this.addOne, this);
        } else {
            this.collection.forEach(this.addOne, this);
        }
        currentlyPostsNumber = this.collection.length;
    },
    initialize: function () {
        this.collection.on('add', this.addOne, this);
        this.collection.on('reset', this.addAll, this);
    }
});

const CollectionCommentsView = Backbone.View.extend({
    render: function () {
        this.addAll();
    },
    addOne: function (comment) {
        let commentView = new CommentsView({model: comment});
        this.$el.append(commentView.render().el);

    },
    removeOne: function () {
        let element = document.getElementById('comment');
        element.parentNode.removeChild(element);
    },
    addAll: function () {
        // let element = document.getElementById('comment');
        if (1 === 2) {
            for (let i = 0; i < currentlyPostsNumber; i++) {
                this.removeOne()
            }
            this.collection.forEach(this.addOne, this);
        } else {
            this.collection.forEach(this.addOne, this);
        }
    },
    initialize: function () {
        // this.collection.on('add', this.addOne, this);
        // this.collection.on('reset', this.addAll, this);
        // this.collection.on('change', this.addAll, this);
        this.render();
    }
});
export {ButtonsView, CollectionItemsView, CollectionCommentsView};