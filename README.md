# enhance-invoices

First off, let me admit, this application was the hardest port of the invoices app to date. There is a lot I learned a lot that delighted me as well.

Secondly, this is not as feature complete as I would like for it to be. I will outline the features I want to add below.

## What is this app?

I have been working on porting Kent C Dodds Remix application that he used in his Remix Frontend Master's Workshop to various frameworks to get an understanding of each framework and how they compare and really to investigate if there are other frameworks I like using/may like using more.

Some of the features of the original app:

- Nested routing
- Optimistic UI
- Deferred Data loading, ie Streaming

## Enhance Application

As I said above, I had to learn a ton in this application while building with enhance. Some of it was a delight because it forced me to get into the details a bit more of this application that I am already familiar with. Some of it was incredibly difficult and I ran up against some walls that I didn't get past, _**not because the framework cannot do it**_ but because there are things I see that cause my eyes to gloss over.

So here are some of my take aways:

### Enahnce is fast

Using best practices for building functional web apps, enhance splits your application architecture into pure functions that are backed by lambda and dynamo db.

In the current wave of nested routing, a nested route is typically a route that has it's own layout but any parent route's layout would also be applied to the nested layout. _As far as I can tell_ this isn't currently available in enhance. _**BUT**_, that is not a bad thing because of the application architecture.

DynamoDB is fast. So although you may be doing similar data fetching on `/sales/invoices` and on `/sales/invoices/$invoiceId`, the perceptive time to load is not there. I do like that Nested Layouts in other frameworks, like Remix, Svelte, and Next app router, inherit from their parent route but I don't think this is a big deal

### DynamoDB is great with @begin/data

As the enhance/begin team said, @begin/data is nice syntactic sugar for DynamoDB. The sugar is appreciated. Also, I'm pretty sure a DynamoDB wrapper like this could be it's own great business 🤷‍♂️

I probably have a lot more to learn in this regard but working with begin data was simultaneously great and left a bit to be desired, from myself. What did I desire I hear you say? I wish there was a more simple/straight forward way to query joined tables or tables that reference another table's document's key. Read carefully, _I am probably missing something and could probably make better documents than referencing other document keys like I am doing_.

But again, it is fast. I made schemas but didn't really get the full use out of them since I am not making use of the validator that comes from the @begin/validator package.

### Custom elements have me like 😕

There is a lot that is really great about server rendered custom elements. Particularly if you have a custom element on any given page, the api route's data for that page is exposed to the element through a state property which has a store object where you can get your api data for your custom element rendering.

But, again this is just me, adding progressive enhancement like

```js

class MyElement extends HTMLElement {
    constructor() {
          super()
          this.someProperty = this.querySelector('some html element')
    }

    someFunction()

    customElements.define('my-element', MyElement)
}

```

That is actually really difficult for me to wrap my mind around. I guarantee this is a me thing so this is no comment on the architecture/api for pregressive enhancement. Having started with react to get away from `document.something` and having used it for years, this is really difficult, even if it is lower level and mimic's the platform.

I think there is a great educational opportunity here though for someone on the enhance team to take a component in react, svelte, vue, etc and show what it looks like as a custom element in enhance.

### Tailwind works with Enhance 🥳

### Lists

Working with Enhance has shown me that one of the most used methods or UI implementations is by using lists. In react you would map over an array and for each element return the jsx. In enhance, you map over an array and return the html, but because you are returning an array of html markup, not javascript (jsx), you will make heavy use of `.join("/n")`

### Elements vs Components

In React, vue, svelte, and so on, we know we have components. Components have props. And props, or properties, can be virtually anything. You can pass functions, objects, arrays, more components, etc.

In Enhance, you don't really have the same concept. You have attributes. And you can give your custom elements any amount of attributes. So instead of typically passing an object of props you would just pass each object property as an attribute. If you need to do anything more complex than that, consider putting it into an object in the api route that would be passed to the custom elements store that you get from the state.

#### Pure functions

Custom elements are pure functions. You are held accountable to this in enhance because you can't import anything into your custom element file. So where as you may have your long list of imports in any other frontend framework, you don't have that in enhance. Whatever you need should come from the attributes and store.

This is actually a really nice feature. Some components get so large that you can't really seem to discern what the component itself is doing. But with pure functions that are responsible for a certain bit of ui, you can easily compose your custom elements because they are all exposed to the same store/state rather than passing it around everywhere.

#### Api routes

I have already mentioned features of api routes but more like svelte and sveltekit, enhance has api routes that run parallel with your ui routes. This means you can use any of the traditional http methods in a api route. Most often you reach for get which will return the data in the store for the api route that is exposed to the custom elements state as well as reaching for post for handling mutations.

If you need to do any importing and use of different libraries/packages/etc you can do all of that here in your api routes. You can expose functions to your custom element as well. So for instance, in this app there is a function called `currencyFormatter` that is used a good bit. But you can import it in your custom element as you would a react component. But, you can add it to your api route, return it in the get method, and then use it in your html.

### Conclusion & Additions

All in all I really do like enhance. I don't know what it would take for me to get over my mental block of progressively enhancing custom elements as mentioned above. It is my own preference, nothing more. I love the pure functions. I really like api routes being used as the 'store' for a custom element.

I am a typescript lover and I know I can get most of the typescript goodies with JSDoc, however, I just don't like writing JSDoc.

_You can use typescript with enhance_ I just found it to be rather difficult when I initially tried to do so. This was also probably a me problem.

And that is it! Below are additions to this app you can add should you so choose. I do think this could be a good demo app but I am equally sure that the enhance team may want to tidy things up a bit and make it more feature complete.

- [ ] - add enhance/form-elements to all forms
- [ ] - for invoice line-items, we need a way to add and remove line items to the form. All that should need to be added is a function to add a new random id to a lineitems array that is used to render lineItem inputs as well as a function to remove line item inputs. Check the `<new-invoice></new-invoice>` custom element to begin looking at line items. If you clone this repo and start the server, got to `/sales/invoices/new` to see the form and the plus icon and minus icon that should add and remove inputs
- [ ] - add browser folder
- [ ] - add deposit route to display deposits for a given deposit id. If you go to `/sales/invoices` and click on an invoice in the invoice list, you will see a deposit on the invoice details pain. Clicking that deposit should navigate you to a route like `/sales/deposits/$depositId`
- [ ] - On that page you should have the ability to delete deposits. If you want to look at code for how this is done in other frameworks, [here is how it is done](https://github.com/Benanna2019/Svelte-Invoices/tree/main/src/routes/sales/deposits) in the svelte version of this app.
- [ ] - use the `@begin/validator` package to add validation for forms
- [ ] - add users. This could probably just be another table in DynamoDB and then you could give the customers a property of user_id that relates to the user key. The the user would only be able to see customers they have/create
- [ ] - after adding a user, add session capabilities to routes.
- [ ] - To mirror the other apps, add github OAuth

