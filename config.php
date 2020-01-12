<?php
// Define your settings here. Set them as null or empty to not use their respective features.

// General settings.
const CONTACT_EMAIL = 'example@example.com'; // The email you want to be contacted at. Optional.
const HTTPS_PROXY = false; // Set this to true if you're using an HTTPS proxy like Cloudflare for your site's main domain, or false if you're not or don't know what that is. Required.
const TIMEZONE = 'America/New_York'; // The timezone used by the site. Required.
const ALLOW_PROXY = false; // Allows or disallows users to sign in with a proxy.
const ALLOW_SIGNUP = true; // Disables signup.

// Info settings.
const SITE_NAME = "Galaxy Plaza";

// Database settings.
const DB_HOST = 'localhost'; // The hostname of your database server. Required.
const DB_USER = 'root'; // The username you'll use to access the database. Required.
const DB_PASS = ''; // The password you'll use to access the database. Optional.
const DB_NAME = 'galaxy_plaza'; // The name of the database. Required.

// Local Image settings.
const IMAGE_LOCAL = true;
const IMAGE_LOCAL_BASE_DIR = "C://xampp//htdocs//galaxyplaza_offdevice//assets//img//";
const IMAGE_LOCAL_BASE_URL = "/assets/img/";

// Cloudinary settings.
const USE_CLOUDINARY = false;
const CLOUDINARY_CLOUDNAME = 'example'; // The cloud name of your Cloudinary account. Required.
const CLOUDINARY_UPLOADPRESET = 'example'; // The unsigned upload preset of your Cloudinary account. Required.

// Gravatar settings.
const GRAVATAR_IMAGE_SIZE = "256"; // ex: 96px, 128px, 256px.

// ReCAPTCHA settings.
const RECAPTCHA_PUBLIC = null; // Your ReCAPTCHA public key. Optional.
const RECAPTCHA_SECRET = null; // Your ReCAPTCHA private key. Optional.
?>