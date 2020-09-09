# Vaadin-router 22.70kb
Pros
- from readme it seems to have tons of features that we want("All features one might expect from a modern router are supported: async route resolution, animated transitions, navigation guards, redirects, and more")
- really great route parameters features(`/(user[s]?)/:id` and `/user/(.*)`)
- sweet lifecycle support
- code-splitting available
- animations support

Cons
- I see nothing related to history.pushState()

# type-route 29.29kb
Pros
- has code-splitting support
- really sweet query string functionality
- seems to be flexible and can cover lesser encountered needs
- beautiful route params 
- clean nested routes
- https://typehero.org/type-route/docs/guides/type-route-without-react -> it is not react dependant, we could probably use it on example-tailwind

Cons
- no info on animations
- I see no navigation guard but https://typehero.org/type-route/docs/guides/preventing-navigation might be helpful when it comes to integrating that behaviour

# Router5 29.97kb
Pros
- extensive router options
- beautiful lifecycle(here they call it plugins)
- good middleware support 
- "preventing navigation" that basicaly serves as nav guards
- async support

Cons
- no animations support

# Vue-router-next 17.49kb
Pros
- obviously easy to use cause it's made for vue
- has transitions support, nav guards, async, redirects 

Cons

- no info on history.pushState() besides createWebHistory()
- no info on url anchors
- still a WiP so I don't know when it's going to get stable
- no google analytics or tag manager info

---

Highway
- transition heaven, seems to be best animation/transition support yet
- google tag manager + analytics
- url anchor
- besides these this solution seems to be missing some key features like complex route parameters, async routes, nav guards but it's small size makes me wonder if we can use this in combination with another router solution to get the best of both worlds

Reach router
- cool code-splitting
- nice animation support
- has basic features like redirect, match or programmatic navigation
- createHistory(source) looks to be in relation with history.pushState()
- I see nothing about nav guards or lifecycle 
- weak route params support 

Page.js
- really small bundle size
- docummented pushState behaviour
- great route parameters features
- no navigation guard in docs
- no lifecycle either
- no animations

UI-router
- confusing documentation
- extensive transitions support
- 0 info about needed features

tiny-emmiter
- this could probably aid other router solutions that don't have great animation support
- more uses cases than I can think of considering it serves the basic function of event emmiting

React-enroute
- great route parameters support thanks to path-to-regexp
- cool-ish nesting
- component defining routes might be difficult to transpile to Vue but I'm not sure yet
- lacks features like async, transitions, nav guards, redirects 

Wouter
- small size and basic features
- lacks async, nav guards, transitions
- at least they have redirects 

Summary:

The top contenders would be Vaadin-router, Router5 and type-route both look promising but lack animation support, Highway seems to be the only one that has Google analytics + tag manager support(or at least the only one that talks about it in the docs) and as I said in the notes I'm wondering if we can(or if it would be efficient to) use this in combination with another router, vue-next-router looks pretty good but I'm not too convinced over it. The rest of the routers do offer small bundle sizes but most of them cut async or good lifecycle for this and I don't think it's worth it