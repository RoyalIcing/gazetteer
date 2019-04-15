var entryEditAccount61Fc2835 = (function () {



function EditAccount(_a) {
    var viewProfileResult = chunk2Dc0D675.a(chunk2Dc0D675.b.Viewer.profile);
    return React.createElement("div", null,
        React.createElement("h1", null, "Edit Account"),
        viewProfileResult.loaded && viewProfileResult.data && React.createElement(React.Fragment, null,
            React.createElement("h2", null,
                "Username: ",
                viewProfileResult.data.username)));
}


return {
  EditAccount: EditAccount
};
})();
//# sourceMappingURL=entry-EditAccount-61fc2835.js.map
