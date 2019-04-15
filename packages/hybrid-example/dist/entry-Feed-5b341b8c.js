var entryFeed5B341B8C = (function () {



function Feed(_a) {
    var feedListResult = chunk2Dc0D675.a(chunk2Dc0D675.b.Feed.list);
    return (React.createElement("div", null,
        React.createElement("h1", null, "Feed"),
        feedListResult.loaded && feedListResult.data && (React.createElement(React.Fragment, null,
            React.createElement("ul", null, feedListResult.data.map(function (item, index) { return (React.createElement("li", { key: index }, item.description)); }))))));
}


return {
  Feed: Feed
};
})();
//# sourceMappingURL=entry-Feed-5b341b8c.js.map
