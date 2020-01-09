# My Sandbox Project

### Objective/Purpose/Whathaveyou

This project is really just to experiment a bit in the MERN stack. I started out by just building out some basic components. Since I've been meaning to get around to building something with React Hooks and Google Maps, I figured this would be a good place to try that as well.

So I don't necessarily have any grand plans for this codebase, however, I won't stop it from evolving into something useful if that ends up happening, either!!

It's also become kind of like a compilation project as well. While nothing is finished, I'm working on:

* A register/login component with jwt auth (I actually built a custom hook for this (it's called useLoginForm))
* A 'Google Geocode' custom hook...
* A user display page that shows off some user 'accounts' from jsonplaceholder (yet again, another custom hook here, too)

Some fun things I wanted to try to accomplish with this app -

* Combine user records (from the jsonplaceholder endpoint OR my mongoDB instance) with Google Maps API to generate some cool behavior (ie., if you provide an address, we determine which users live closest to the given address and sort the user list from closest to furthest away)
