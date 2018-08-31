import {Post, PostComment} from "./models";

let list;
let postsNumber;
let loadedPosts;

let PostsList = Backbone.Collection.extend({
    url: '/posts',
    model: Post
});
let postsList = new PostsList();

fetch('http://localhost:3000/posts')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        postsList.reset(data);
        list = data;
        postsNumber = list.length;
    });
let onClickSocial = function () {
    if (list) {
        const socialList = list.filter(item => item.topic_type === 'social');
        postsList.reset(socialList);
    } else setTimeout(() => {
        const socialList = list.filter(item => item.topic_type === 'social');
        postsList.reset(socialList);
    }, 40000);
};

let onClickDiscovery = function () {
    if (list) {
        const discoveryList = list.filter(item => item.topic_type === 'discovery');
        postsList.reset(discoveryList);
    } else setTimeout(() => {
        const socialList = list.filter(item => item.topic_type === 'social');
        postsList.reset(socialList);
    }, 40000);
};

let commentslist;

let CommentsList = Backbone.Collection.extend({
    url: '/comments',
    model: PostComment
});
let commentsList = new CommentsList();

fetch('http://localhost:3000/comments')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        commentsList.reset(data);
        commentslist = data;
    });


export {postsList, onClickSocial, onClickDiscovery, postsNumber, commentsList};
