// ==UserScript==
// @name         BatX
// @namespace    BatX
// @version      0.1
// @description  BatX does, uh, batty things. Totally normal batty things.
// @author       Batty!
// @match        *://e621.net/*
// @require      http://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

jQuery.noConflict();

jQuery(function($) {
	'use strict';

	$(document).click(function(e) {
		if (e.target) {
			let target = $(e.target);
			let ancestor = target.closest('a');

			if (ancestor) {
				let href = ancestor.attr('href');
				let match = /^(?:https?:\/\/e621.net)?\/post\/show\/(\d+)/.exec(href);

				if (match.length > 0) {
					if (e.altKey) {
						e.preventDefault();

						//document.location.href = 'https://e621.net/post/show/' + match[1] + '#big';
						window.open('https://e621.net/post/show/' + match[1] + '#big');
					}
				}
			}
		}
	});

	if (/#big$/.test(document.location.href)) {
		$(function() {
			// Make sure CSS knows batx is here
			let body = $('body');
			body.addClass('batx');

			// Lightbox
			let lightbox = $('<div id="batx-lightbox">');
				// Sidebar
				let sidebar_container = $('<div id="batx-sidebar-container">');
				let sidebar = $('.sidebar');
				sidebar.appendTo(sidebar_container);
				sidebar_container.appendTo(lightbox);
				// Image
				let image_container = $('<div id="batx-image-container">');
				let image = $('#image');
				let new_image = $('<img id="batx-image">');
				new_image.attr('src', image.attr('src'));
					// Make the image clickable
					let link = $('<a>');
					link.attr('href', image.attr('src'));
					new_image.appendTo(link);
					link.appendTo(image_container);
				image_container.appendTo(lightbox);
			lightbox.appendTo(body);

			/*

			// You want to see my original code? Here:
			$('body').addClass('batx').append(
				$('<div id="batx-lightbox">').append(
					$('<div id="batx-sidebar-container">').append(
						$('.sidebar'))).append(
					$('<div id="batx-image-container">').append(
						$('<a>').attr('href', $('#image').attr('src')).append(
							$('').attr('src', $('#image').attr('src'))))));

			*/
		});
	}
});
