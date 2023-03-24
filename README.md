# shadow-dom-click-tracking

This repository provides a solution for tracking clicks within Shadow DOM using Google Tag Manager (GTM). 

The provided JavaScript code can be directly inserted into your website or imported as a separate file.


## Overview

Shadow DOM is a technique used in web development to encapsulate the implementation details of a component from the rest of the web page. This makes it difficult to track user interactions with the component using traditional event tracking methods. The provided code solves this problem by tracking clicks within Shadow DOM and pushing the data to GTM's dataLayer.

## Usage

To use this solution for tracking clicks within Shadow DOM direct insert your website follow instructions below.

1. Download the shadow-dom-click-tracking.js file from the repository.
2. If you want to use the code directly in your website, add the following line to the ```<head>``` section of your HTML file:
```javascript
<script src="path/to/shadow-dom-click-tracking.js"></script>
```
3. Replace path/to with the actual path where you saved the file.

Alternatively, if you want to use Google Tag Manager

1. download the shadow-dom-click-tracking.json file from the repository.
2. In your Google Tag Manager account, create a new container or select an existing one.
3. Click on "Admin" in the left-hand navigation, then select "Import Container".
4. Choose the shadow-dom-click-tracking.json file that you downloaded and import it.


## Customization

- You can customize the behavior of the code by modifying the following variables
  
### 1. EVENT_NAME

- This variable sets the name of the custom event that is pushed to the dataLayer in Google Tag Manager. You can replace this with anything you want for custom event in Google Tag Manager Container.

- For example:
```javascript
var EVENT_NAME = 'anything_you_want';
```

### 2. Specific Element
- This variable sets the CSS selector for the specific shadow DOM element you want to track clicks for. By default, the code tracks clicks for all shadow DOM elements on the page. If you want to track clicks for a specific shadow DOM element, you can set this variable to a CSS selector that matches that element. 

- For example:
```javascript
var elementToObserveSelector = '#ch-plugin';
```

### 3. Debug Mode
- This variable enables or disables debug mode in the code. When debug mode is enabled, the code logs debug information to the console, including the dataLayer push and the clicked Shadow DOM element. 
- By default, debug mode is disabled. To enable debug mode, set this variable to true.