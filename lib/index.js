"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_persist_1 = require("mobx-persist");
var mobx_react_1 = require("mobx-react");
var react_1 = require("react");
var mobx_persist_2 = require("mobx-persist");
exports.persist = mobx_persist_2.persist;
/**
 * Sets up the auto hydration of the store when the app starts.
 * In React Native, saves to AsyncStorage
 * @param storageType (In Browser, LocalStorage. React Native, AsyncStorage)
 */
exports.HydrateStore = function (storageType) {
    return mobx_persist_1.create({
        storage: storageType,
        jsonify: true
    });
};
/**
 *
 * @param newStore
 */
exports.GenerateStore = function (newStore) {
    console.debug("Generating Store for Object:", newStore);
    var StoreContext = react_1.default.createContext(newStore);
    var StoreProvider = function (_a) {
        var children = _a.children;
        return (react_1.default.createElement(StoreContext.Provider, { value: newStore }, children));
    };
    return {
        inject: injectStore(StoreContext),
        useStore: useStore(StoreContext),
        Provider: StoreProvider,
        Consumer: StoreContext.Consumer,
        Context: StoreContext
    };
};
var injectStore = function (MobxStore) {
    return function inject(baseComponent) {
        var component = function (ownProps) {
            var store = react_1.default.useContext(MobxStore);
            if (store === {}) {
                console.error(new Error("You may not have assigned value to your store properties in the constructor. Move your default value assignations to the constructor."));
            }
            return mobx_react_1.useObserver(function () {
                return react_1.default.createElement(baseComponent, __assign({}, ownProps, store));
            });
        };
        component.displayName = baseComponent.name;
        return component;
    };
};
var useStore = function (MobxStore) { return function () {
    var store = react_1.default.useContext(MobxStore);
    // const [store, setStore] = useState({ userHandle: 'heeee' });
    // const store = { userHandle: '' };
    if (!store) {
        // this is especially useful in TypeScript so you don't need to be checking for null all the time
        throw new Error("You have forgot to use StoreProvider, shame on you.");
    }
    return store;
}; };
