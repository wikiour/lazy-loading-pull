# Lazy loading of images - Img & WebP

Library for lazy loading of images - Easy and productive library for lazy loading of images. Lazy loading of images (<a href="https://wikiour.github.io/lazy-loading-pull">lazy loading</a>) is a web page performance optimization technique that allows images to be loaded only when they become visible on the user's screen. You can download the <strong>lazy-loading-pull library</strong> from the repository on <a href="https://github.com/wikiour/lazy-loading-pull">GitHub</a> or install it via <a href="https://www.npmjs.com/package/lazy-loading-pull">npm</a>.</p>

![lazy-loading-pull](/img/lazy-loading-pull.jpg)

---
## Connecting the lazy-loading-pull library
```
Remote connection:
<script src="https://wikiour.github.io/lazy-loading-pull/index.js"></script>
```
```
Connecting via npm
npm i -D lazy-loading-pull
```
You can also download the repository and use it in your project https://github.com/wikiour/lazy-loading-pull

---
Lazy loading can be useful for pages with lots of images, such as galleries, blogs and online stores, which can significantly slow down the page loading time. Lazy loading of images can speed up page loading, reduce traffic usage, and improve user experience.

You can use our "<a href="https://wikiour.github.io/lazy-loading-pull">lazy-loading-pull</a>" JavaScript library to implement lazy image loading. This library uses the "data-src" attribute instead of "src" for images to be lazily loaded. When the user scrolls the page and the image becomes visible, JavaScript loads the image from "data-src" to "src." Our library works with any image.

We also use the "loading" attribute with a value of "lazy," which is supported by browsers starting with Chrome 76, Firefox 75, and Opera 63. This attribute indicates that the browser should lazily load the image when it appears in the scope.

#### Your html construction could look like this for our library
```
<div class="container-img">
  <img src="./img/image.jpg" alt="Images">
</div>
```

```
<div class="container-img-picture">
  <picture>
    <source srcset="./img/image.webp" type="image/webp" />
    <img src="./img/image.png" alt="Images">
  </picture>
</div>
```

#### You must use the technical classes loading and loader in your CSS
With the loading and loader classes you can define the appearance of your loader. Here is an example of how to use these classes.
```
.loading {
	position: relative;
}

.loader {
	position: absolute;
	z-index: 11;
	top: 45%;
	left: 45%;
	transform: translate(-50%, -50%);
	width: 50px;
	height: 50px;
	border: 5px solid #ffffff;
	border-top-color: #525252;
	border-radius: 50%;
	animation: spin 1s ease-in-out infinite;
	display: none;
}

.loading::after {
	content: "";
	position: absolute;
	z-index: 10;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #b4b4b4;
}

.loading .loader {
	display: block;
}

@keyframes spin {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}
```

#### Lazy loading can provide several benefits:

* Faster page loading: lazy loading allows images to load only when they become visible on the user's screen. This means the page loads faster because not all images are loaded at once.

* Save traffic: lazy loading saves traffic because images are loaded only when they're actually needed. This is especially useful for users with a mobile internet connection, where traffic restrictions can be strict.

* Improved user experience: lazy loading  improves the user experience because users don't have to wait long to see page content. It can also reduce user bounce because pages load faster and users get the information they were looking for faster.

* SEO optimization: lazy loading can help in SEO optimization because fast user experience is one of the search engine ranking factors. 

In order to lazily load images, our "<a href="https://wikiour.github.io/lazy-loading-pull">lazy-loading-pull</a>" library uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">Intersection Observer API</a>, which detects when an item appears on the screen and is ready to be loaded. This API allows you to load images only when they are in the user's field of view. We also apply a pre-loading of the image before the user reaches it for 1000px (you can change this parameter in rootMargin: '1000px', ) this avoids waiting for the user to load.

TheIntersection Observer API is a JavaScript interface that allows you to monitor the intersection of elements on a page with other elements or scopes, such as the browser window.

The Intersection Observer API is used to detect when an element appears on or leaves the screen to perform certain actions, such as lazily loading images. Instead of loading all images at once, we use the Intersection Observer API to determine when an image becomes visible on the screen and only then start loading it. This can speed up page loading and reduce the amount of data transferred.

The IntersectionObserverEntry object contains information about the intersection state, such as the size and coordinates of the element, its relationship to another element or scope, and the time when the intersection occurred.

Overall, the Intersection Observer API can be a very useful tool for improving performance and user experience on websites.


##### Ready Loaders:

- https://cssloaders.github.io/
- https://www.cssportal.com/css-loader-generator/
- https://loading.io/css
- https://whirl.netlify.app/

---

- Author: WikiOur
- Author website: https://wikiour.com
- GitHub: https://github.com/wikiour
- YouTube: https://youtube.com/@wikiour
- Facebook: https://facebook.com/wikiour
- Instagram: https://instagram.com/wikiour
- Patreon: https://patreon.com/wikiour
