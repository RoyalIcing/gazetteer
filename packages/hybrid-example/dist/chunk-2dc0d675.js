var chunk2Dc0D675 = (function () {


// Data source identifiers
function uniqueDataSource(from) {
    return { type: "symbol", symbol: Symbol.for("DataSource." + from) };
}
function urlParam(paramName) {
    return { type: "urlParam", param: paramName };
}
function dataSourceIdentifierToString(identifier) {
    if (identifier.type === "symbol") {
        return identifier.symbol.toString();
    }
    else if (identifier.type === "urlParam") {
        return "urlParam:" + identifier.param;
    }
    else {
        throw new Error("Unknown data source identifier");
    }
}

var DataSources = {
    Feed: {
        list: uniqueDataSource("Feed.list")
    },
    Viewer: {
        profile: uniqueDataSource("Viewer.profile")
    },
    URLParams: {
        username: urlParam("username")
    }
};

var DataSourceContext = React.createContext(function (identifier) {
    return { loaded: false };
});
function useDataSource(identifier) {
    var resultForDataSource = React.useContext(DataSourceContext);
    return resultForDataSource(identifier);
}
function useRequiredDataSource(identifier) {
    var result = useDataSource(identifier);
    if (result.loaded && result.data != null) {
        return result.data;
    }
    else {
        if (result.loaded && result.error != null) {
            throw new Error("Required data source " + dataSourceIdentifierToString(identifier) + " error: " + result.error.message);
        }
        throw new Error("Required data source " + dataSourceIdentifierToString(identifier) + " not loaded");
    }
}


return {
  a: useDataSource,
  b: DataSources,
  c: useRequiredDataSource
};
})();
//# sourceMappingURL=chunk-2dc0d675.js.map
