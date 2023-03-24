/* -----------------------------------------------------------
# Author: WikiOur
# Author website: https://wikiour.com
# GitHub: https://github.com/wikiour
# YouTube: https://youtube.com/@wikiour
# Facebook: https://facebook.com/wikiour
# Instagram: https://instagram.com/wikiour
# Patreon: https://patreon.com/wikiour

Description: Lazy loading of images - Img & WebP
------------------------------------------------------------ */

function lazyLoadingPull() {
	//--------------------------------------------------------------------------------------------------------
	function loaderWebp() {
		const supportsWebp = (function () {
			const elem = document.createElement('canvas');
			if (!!(elem.getContext && elem.getContext('2d'))) {
				return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
			}
			return false;
		});

		const pictureElement = document.querySelector('picture');
		if (pictureElement) {
			const pictures = document.querySelectorAll('picture');
			pictures.forEach((picture) => {
				const sourcesWebp = picture.querySelector('source[type="image/webp"]');
				const images = picture.querySelector('img');
				
				if (sourcesWebp && images) {
					const sourcesWebpSrcSet = sourcesWebp.getAttribute("srcset");
					const imgSrc = images.getAttribute("src");
					if (imgSrc) {
						images.setAttribute("data-src", imgSrc);
						images.setAttribute("loading", "lazy");
						images.parentNode.classList.add("loading");
						images.insertAdjacentHTML("afterend", "<span class='loader'></span>");
					}
					if (sourcesWebpSrcSet) {
						sourcesWebp.setAttribute("data-srcset", sourcesWebpSrcSet);
						sourcesWebp.setAttribute("loading", "lazy");
					}

					function lazyLoadImg() {
						const images = document.querySelectorAll('picture img[data-src]');
						const options = {
							root: null,
							rootMargin: '1000px',
							threshold: 0
						}
						function preloadImage(img) {
							const src = img.getAttribute('data-src');
							if (!src) {
								return;
							}
							const tempImg = new Image();
							tempImg.onload = function () {
								img.src = src;
								img.removeAttribute('data-src');
								if (!tempImg.complete || img.naturalWidth === 0) {
									return;
								}
								img.removeAttribute('loading');
								const parentPicture = img.closest('picture');
								if (parentPicture.classList.contains('loading')) {
									parentPicture.classList.remove('loading');
								}
								const loaderSpan = parentPicture.querySelector('.loader');
								if (loaderSpan) {
									loaderSpan.remove();
								}
								const source = document.querySelector('source[data-srcset][type="image/webp"], source[loading]')
								if (source) {
									source.removeAttribute('data-srcset');
									source.removeAttribute('loading');
								}
							};
							tempImg.src = src;
						}
						const imageObserver = new IntersectionObserver((entries, observer) => {
							entries.forEach((entry) => {
								if (entry.isIntersecting) {
									const image = entry.target;
									preloadImage(image);
									imageObserver.unobserve(image);
								}
							});
						}, options);
						images.forEach((image) => {
							imageObserver.observe(image);
						});
					};

					function lazyLoadWebp() {
						const sources = document.querySelectorAll('picture source[data-srcset][type="image/webp"]');
						const options = {
							root: null,
							rootMargin: '1000px',
							threshold: 0
						}
						function preloadSource(source) {
							const srcset = source.getAttribute('data-srcset');
							if (!srcset) {
								return;
							}
							const tempImg = new Image();
							tempImg.onload = function () {
								source.setAttribute('srcset', srcset);
								source.removeAttribute('data-srcset');
								if (!tempImg.complete || source.naturalWidth === 0) {
									return;
								}
								source.removeAttribute('loading');
								const parentPicture = source.closest('picture');
								if (parentPicture.classList.contains('loading')) {
									parentPicture.classList.remove('loading');
								}
								const loaderSpan = parentPicture.querySelector('.loader');
								if (loaderSpan) {
									loaderSpan.remove();
								}
								const pictureImages = document.querySelectorAll('picture img[data-src], picture img[loading]');
								pictureImages.forEach((pictureImg) => {
									pictureImg.removeAttribute('data-src');
									pictureImg.removeAttribute('loading');
								});
							};
							tempImg.src = srcset.split(' ')[0];
						}
						const sourceObserver = new IntersectionObserver((entries, observer) => {
							entries.forEach((entry) => {
								if (entry.isIntersecting) {
									const source = entry.target;
									preloadSource(source);
									sourceObserver.unobserve(source);
								}
							});
						}, options);
						sources.forEach((source) => {
							sourceObserver.observe(source);
						});
					};

					if (supportsWebp()) {
						window.addEventListener('load', lazyLoadWebp);
						window.addEventListener('scroll', lazyLoadWebp);
						window.addEventListener('resize', lazyLoadWebp);
						window.addEventListener('orientationchange', lazyLoadWebp);
					} else {
						window.addEventListener('load', lazyLoadImg);
						window.addEventListener('scroll', lazyLoadImg);
						window.addEventListener('resize', lazyLoadImg);
						window.addEventListener('orientationchange', lazyLoadImg);
					}

				};
			});
		} else {
			return;
		}
	}; loaderWebp();

	function loaderImg() {
		const imgElement = document.querySelector('img:not(picture img)');
		if (imgElement) {
			console.log('Элемент img найден');
			const images = document.querySelectorAll('img:not(picture img)');
			for (let i = 0; i < images.length; i++) {
				const image = images[i]; 
				const src = image.getAttribute("src");
				if (src && !src.endsWith(".cvg, .ico")) {
					images[i].setAttribute("data-src", src);
					images[i].setAttribute("loading", "lazy");
					images[i].parentNode.classList.add('loading');
					images[i].insertAdjacentHTML("afterend", "<span class='loader'></span>");

					function lazyLoadImg() {
						const images = document.querySelectorAll('img:not(picture img)');
						const options = {
							root: null,
							rootMargin: '1000px',
							threshold: 0
						}

						function preloadImage(img) {
							const src = img.getAttribute('data-src');
							if (!src) {
								return;
							}
							const tempImg = new Image();
							tempImg.onload = function () {
								img.src = src;
								img.removeAttribute('data-src');
								if (!tempImg.complete || img.naturalWidth === 0) {
									return;
								}
								const parent = img.parentNode;
								parent.classList.remove('loading');
								img.removeAttribute('loading');
								const loader = parent.querySelector('span.loader');
								if (loader) {
									loader.remove();
								}
							};
							tempImg.src = src;
						}

						const imageObserver = new IntersectionObserver((entries, observer) => {
							entries.forEach((entry) => {
								if (entry.isIntersecting) {
									const image = entry.target;
									preloadImage(image);
									imageObserver.unobserve(image);
								}
							});
						}, options);
						images.forEach((image) => {
							imageObserver.observe(image);
						});
					};
					window.addEventListener('load', lazyLoadImg);
					window.addEventListener('scroll', lazyLoadImg);
					window.addEventListener('resize', lazyLoadImg);
					window.addEventListener('orientationchange', lazyLoadImg);
				}
			}
		} else {
			return;
		}
	}; loaderImg();

}; lazyLoadingPull();


